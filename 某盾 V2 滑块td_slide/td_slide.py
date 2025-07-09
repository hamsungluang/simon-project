from Crypto.Cipher import AES
import base64
import string
import random
import time
from loguru import logger
import hashlib
import requests
from io import BytesIO
from PIL import Image
import json
import cv2
import numpy as np


def bytes_to_cv2(img):
    """
    将二进制数据转换为 OpenCV 图像。

    参数：
    img (bytes): 读取的二进制图片数据。

    返回：
    numpy.ndarray: OpenCV 格式的 BGR 图像。
    """
    # 将二进制数据转换为 NumPy 数组
    img_buffer_np = np.frombuffer(img, dtype=np.uint8)
    # 解码为 OpenCV 图像格式
    img_np = cv2.imdecode(img_buffer_np, cv2.IMREAD_COLOR)
    return img_np


def get_distance(bg, tp, save_path=None):
    """
    计算滑块验证码缺口的位置，并在背景图上标记。

    参数：
    bg (bytes): 背景图片的二进制数据。
    tp (bytes): 滑块图片的二进制数据。
    save_path (str, 可选): 若提供路径，则保存标记后的图片。

    返回：
    dict: 缺口位置的坐标 {'x': x 坐标, 'y': y 坐标}，若未找到则返回 None。
    """

    # 将二进制数据转换为 OpenCV 图像
    bg_img = bytes_to_cv2(bg)
    tp_img = bytes_to_cv2(tp)

    # 转换为灰度图，并进行高斯模糊，减少噪声影响
    tp_gray = cv2.GaussianBlur(cv2.cvtColor(tp_img, cv2.COLOR_BGR2GRAY), (5, 5), 0)
    bg_gray = cv2.GaussianBlur(cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY), (5, 5), 0)

    # 使用 Canny 边缘检测提取图像特征
    lower_threshold = 30  # 低阈值
    high_threshold = 100  # 高阈值
    tp_edge = cv2.Canny(tp_gray, lower_threshold, high_threshold)
    bg_edge = cv2.Canny(bg_gray, lower_threshold, high_threshold)

    # 使用模板匹配算法 (TM_CCORR_NORMED) 计算滑块与背景的最佳匹配位置
    result = cv2.matchTemplate(bg_edge, tp_edge, cv2.TM_CCORR_NORMED)

    # 获取匹配位置的最大值（即最匹配的点）
    _, _, _, max_loc = cv2.minMaxLoc(result)

    # 寻找滑块图像的轮廓
    contours, _ = cv2.findContours(tp_edge, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        # 选择面积最大的轮廓
        contour = max(contours, key=cv2.contourArea)
        # 获取该轮廓的边界框
        x, y, width, height = cv2.boundingRect(contour)

        # 在背景图上绘制矩形标记滑块缺口位置
        cv2.rectangle(
            bg_img,
            (max_loc[0] + x, max_loc[1] + y),
            (max_loc[0] + x + width, max_loc[1] + y + height),
            (0, 255, 0),
            2,
        )  # 绿色矩形框，线宽 2

        # 如果提供了保存路径，则保存标记后的图片
        if save_path:
            cv2.imwrite(save_path, bg_img)

        # 返回缺口的 x, y 坐标
        return {"x": max_loc[0] + x, "y": max_loc[1] + y}
    else:
        return None  # 未找到匹配的缺口


def md5(text):
    md5_obj = hashlib.md5()
    md5_obj.update(text.encode("utf-8"))
    return md5_obj.hexdigest()


def swap_characters(input_str):
    return (
        input_str.replace("q", "tem1")
        .replace("p", "q")
        .replace("tem1", "p")
        .replace("I", "tem2")
        .replace("J", "I")
        .replace("tem2", "J")
    )


def encrypt_aes_cbc(data, key):
    iv = "Mnz14C2tXod8AUJ5"
    block_size = AES.block_size
    pad = lambda s: s + (block_size - len(s) % block_size) * chr(
        block_size - len(s) % block_size
    )
    data = pad(data)
    cipher = AES.new(key.encode("latin-1"), AES.MODE_CBC, iv.encode("latin-1"))
    encrypted = cipher.encrypt(data.encode("latin-1"))
    return swap_characters(
        base64.b64encode(encrypted).decode("latin-1").swapcase().replace("+", "~")
    )


def generate_random_string(length):
    characters = string.ascii_lowercase + string.digits
    random_string = "".join(random.choice(characters) for _ in range(length))
    return random_string


def reconstruct_image(segment_sequence, image_binary):
    """
    重新构建图像，将输入图像拆分为8x2的网格并按照指定的顺序重新排列。

    :param segment_sequence: bgImageSplitSequence 参数,16进制字符串列表，表示重新排列的顺序
    :param image_binary: 二进制图像数据
    :return: 重新排序后的图像二进制数据
    """
    # 加载图像
    img_io = BytesIO(image_binary)
    original_img = Image.open(img_io)

    # 定义图像尺寸和分割参数
    img_width, img_height = 320, 180
    segment_width, segment_height = img_width // 8, img_height // 2

    # 拆分图像
    image_layers = [{}, {}]
    for layer in range(2):
        y_start = layer * segment_height
        for i in range(8):
            x_start = i * segment_width
            crop_box = (
                x_start,
                y_start,
                x_start + segment_width,
                y_start + segment_height,
            )
            image_layers[layer][i] = original_img.crop(crop_box)

    # 创建新图像
    new_image = Image.new("RGB", (img_width, img_height))
    new_image_layers = [{}, {}]

    # 重新排序
    for index, hex_value in enumerate(segment_sequence):
        position = int(hex_value, 16)
        layer, segment = divmod(position, 8)
        original_layer = 1 if index >= 8 else 0
        new_image_layers[layer][segment] = image_layers[original_layer][index % 8]

    # 拼接图像
    for layer in range(2):
        for i in range(8):
            new_image.paste(
                new_image_layers[layer][i], (segment_width * i, segment_height * layer)
            )

    # 转换为二进制数据
    img_byte_arr = BytesIO()
    new_image.save(img_byte_arr, format="PNG")
    return img_byte_arr.getvalue()


def tongdun_slide(blackbox):

    session = requests.Session()
    

    # 图片接口 p1 ~ p9 生成
    init_time = str(int(time.time() * 1000))
    init_time_3 = init_time[-3:]
    random_string = generate_random_string(13)
    random_string_4 = random_string[:4]
    window_fmOpt_token = "dossen-" + init_time + "-" + random_string
    p1 = (
        "b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F"
        + "^^"
        + window_fmOpt_token
        + "^^dossen^^dossen_h5"
    )

    p2 = blackbox + "^^1^^1^^1"

    key = "rsp67ou9" + init_time_3 + "-" + random_string_4

    p9_data = "161155^^|^^|^^" + str(int(time.time() * 1000))

    p3_data = md5(p1 + "^^" + p2) + "^^|^^|^^|" + md5(p9_data)
    logger.info(f"key:{key}")
    p3 = encrypt_aes_cbc(p3_data, key)

    p4_data = "|^^|^^|"
    p4 = encrypt_aes_cbc(p4_data, key)

    p5 = "web"

    p8 = generate_random_string(8)

    p6 = encrypt_aes_cbc(p8 + "https://login.dossen.com/sso/checkLogin", key)

    p7 = md5(p6) + md5(p9_data) + generate_random_string(32)

    p9 = encrypt_aes_cbc(p9_data, key)
    

    # 图片接口请求
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://login.dossen.com",
        "Pragma": "no-cache",
        "Referer": "https://login.dossen.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
        "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
    }
    url = "https://sphinx.tongdun.net/sphinx/validatecode/v1"
    params = {"p1": p1, "p2": p2}
    data = {
        "p3": p3,
        "p4": p4,
        "p5": p5,
        "p6": p6,
        "p7": p7,
        "p8": p8,
        "p9": p9,
        "mode": "2",
    }
    response = session.post(url, headers=headers, params=params, data=data)
    res = response.json()
    logger.info(res)

    validateCodeObj = res["validateCodeObj"]
    bgImageSplitSequence = validateCodeObj["bgImageSplitSequence"]
    bg_binary_data = requests.get(
        "https://static.tongdun.net" + validateCodeObj["slideBgi"]
    ).content
    slide_binary_data = requests.get(
        "https://static.tongdun.net" + validateCodeObj["slideImage"]
    ).content

    new_bg_binary_data = reconstruct_image(bgImageSplitSequence, bg_binary_data)

    value = get_distance(new_bg_binary_data, slide_binary_data, "result.jpg")
    value = value["x"]
    

    # 验证接口 p1 ~ p9 生成
    init_time = str(int(time.time() * 1000))
    init_time_3 = init_time[-3:]
    random_string = generate_random_string(13)
    random_string_4 = random_string[:4]
    window_fmOpt_token = "dossen-" + init_time + "-" + random_string
    p1 = (
        "b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F"
        + "^^"
        + window_fmOpt_token
        + "^^dossen^^dossen_h5"
    )

    p2 = blackbox + "^^3^^1^^1"

    key = "rsp67ou9" + init_time_3 + "-" + random_string_4

    p9_data = "161155^^|^^|^^" + str(int(time.time() * 1000))

    userAnswer = str(round(value)) + "|10|" + str(int(time.time() * 1000))

    p3_data = (
        md5(p1 + "^^" + p2)
        + "^^"
        + json.dumps(validateCodeObj, separators=(",", ":"))
        + "^^"
        + userAnswer
        + "^^|"
        + md5(p9_data)
    )
    logger.info(f"key:{key}")
    p3 = encrypt_aes_cbc(p3_data, key)

    p4_data = "|^^iy,eu,k4,fy,jz,f7,iy,9c,1,0,m78qqpzi%2n746,1,6a,j|2n74f,1,6v,1n|2n74k,1,7g,2t|2n74r,1,81,3x|2n758,1,8o,53|2n758,1,9b,6a|2n75g,1,a0,7c|2n75m,1,aq,8b|2n75t,1,bd,96|2n760,1,c1,a0|2n768,1,cl,as|2n76h,1,d3,bh|2n76o,1,dl,c5|2n76v,1,e1,cr|2n773,1,eh,db|2n77a,1,ev,dv|2n77h,1,fb,ef|2n77x,1,fo,ey|2n77x,1,fz,fe|2n78c,1,g9,fs|2n78c,1,gg,g2|2n78r,1,gl,g9|2n78y,1,gp,gf|2n795,1,gt,gl|2n79f,1,gv,gn|2n79t,1,gx,gq|2n7a8,1,gx,gr|2n7am,1,gx,gs|2n7ec,1,gy,gq|2n7ek,1,h1,gn|2n7es,1,h6,gi|2n7ez,1,hd,gd|2n7f6,1,hl,g7|2n7fe,1,hs,g2|2n7fm,1,hz,fx|2n7ft,1,i5,fu|2n7g0,1,ib,fq|2n7g8,1,ie,fn|2n7gf,1,ih,fm|2n7gv,1,in,fh|2n7h9,1,ir,ff|2n7ho,1,iu,fd|2n7ib,1,iw,fd|2n7ir,1,j0,fd|2n7ir,1,j3,fd|2n7j6,1,j6,fd|2n7jc,1,ja,fd|2n7jk,1,jd,fd|2n7jz,1,jk,fd|2n7ke,1,jp,fb|2n7l8,1,js,f9|2n7lm,1,jv,f8|2n7m2,1,jx,f7|2n7n5,1,jz,f7,c|2n7ot,2,jz,f7|2n7pe,1,jz,f6|2n7pt,1,k0,f5|2n7r2,1,k1,f5|2n7ra,1,k4,f5|2n7rh,1,k9,f5|2n7ro,1,ki,f5|2n7rw,1,ku,f5|2n7s4,1,l7,f6|2n7sc,1,ll,f6|2n7sq,1,lz,f7|2n7sr,1,me,f7|2n7te,1,my,f8|2n7te,1,nd,fb|2n7tf,1,ns,fc|2n7ts,1,o5,fc|2n7u0,1,oc,fd|2n7uf,1,oj,fd|2n7ug,1,on,fd|2n7v0,1,op,fd|2n824,3,op,fd,d|2n82f,1,op,fd|2n840,1,op,fd|2n84t,1,on,fd|2n86h,1,ol,fd|2n86w,1,oj,fd|2n87i,1,oh,fd|2n89e,1,oh,f9|2n89t,1,og,f5|2n8a2,1,of,f2|2n8a8,1,od,ex|2n8an,1,ob,eq|^^479"
    p4 = encrypt_aes_cbc(p4_data, key)

    p5 = "web"

    p8 = generate_random_string(8)

    p6 = encrypt_aes_cbc(p8 + "https://login.dossen.com/sso/checkLogin", key)

    p7 = md5(p6) + md5(p9_data) + generate_random_string(32)

    p9 = encrypt_aes_cbc(p9_data, key)
    

    # 验证接口请求
    url = "https://sphinx.tongdun.net/sphinx/validatecode/v1"
    params = {"p1": p1, "p2": p2}
    data = {
        "p3": p3,
        "p4": p4,
        "p5": p5,
        "p6": p6,
        "p7": p7,
        "p8": p8,
        "p9": p9,
        "mode": "2",
    }
    response = session.post(url, headers=headers, params=params, data=data)
    res = response.json()
    logger.success(res)


if __name__ == "__main__":
    blackbox = "sWPHx1739777735RGlxtMKDKLd"  # blackbox 指纹会过期
    tongdun_slide(blackbox)
