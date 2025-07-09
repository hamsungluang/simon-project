# ======================
# -*-coding: Utf-8 -*-
# ======================
import re
import json
import random
import base64
import subprocess

from loguru import logger
from datetime import datetime
from curl_cffi import requests

from io import BytesIO
from tkinter import Tk
from tkinter.ttk import Label
from PIL import ImageTk, Image

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

session = requests.Session()


def extract_eval_content(js_code):
    match = re.search(r'eval\s*\(', js_code)
    if not match:
        return None

    start = match.end()  # eval( 之后的位置
    stack = ['(']
    i = start

    while i < len(js_code) and stack:
        if js_code[i] == '(':
            stack.append('(')
        elif js_code[i] == ')':
            stack.pop()
        i += 1

    return js_code[match.start():i]


def extract_var_until_last_semicolon(js_code):
    # 找到 var _$= 的起始位置
    start_match = re.search(r'var _\$=', js_code)
    if not start_match:
        return None

    start_index = start_match.start()

    # 找到最后一个分号的位置
    end_index = js_code.rfind(';')
    if end_index == -1:
        return None

    return js_code[start_index:end_index + 1]  # 包括分号


def re_resp(response):
    result = re.findall('<title>(.*?)</title>', response)[0]
    return result


def procurement_list_1():
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": ua
    }
    url = "http://www.yngp.com/page/procurement/procurementList.html"
    response = session.get(url, headers=headers, verify=False)
    response.encoding = 'utf-8'
    resp_title = re_resp(response.text)
    logger.warning(resp_title)
    # logger.info(session.cookies.get_dict())

    eval_js = extract_eval_content(response.text)
    subprocess_eval_js = subprocess.run(['node', '-e', eval_js], capture_output=True, text=True).stderr
    # logger.info(subprocess_eval_js)

    navigator = "navigator={'userAgent': '%s'}; " % ua
    match_js = navigator + re.findall(r'setTimeout\(function\(\)\{(.*?);\$\(_\$\[2]\)', subprocess_eval_js)[0]
    match_js = ';'.join(match_js.split(';')[:-1])
    input_variable = "x08c924"
    match_js = match_js.replace('$(_$[1])', '""') + ';console.log(%s);}' % input_variable
    # logger.info(match_js)

    answer_value = subprocess.run(['node', '-e', match_js], capture_output=True, text=True).stdout.replace('\n', '')
    # logger.info(answer_value)

    return answer_value


def pan_yun_favicon():
    headers = {
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Proxy-Connection": "keep-alive",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    url = "http://www.yngp.com/__panyun/__platform/1/favicon.png"
    response = session.get(url, headers=headers, verify=False)
    # logger.debug(response.text)


def procurement_list_2(answer_value):
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "http://www.yngp.com",
        "Pragma": "no-cache",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    url = "http://www.yngp.com/page/procurement/procurementList.html"
    data = {
        "answer": answer_value
    }
    response = session.post(url, headers=headers, data=data, verify=False)
    response.encoding = 'utf-8'
    logger.info(session.cookies.get_dict())
    resp_title = re_resp(response.text)
    logger.success(resp_title)


def link_list():
    headers = {
        "Accept": "text/plain, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "0",
        "Origin": "http://www.yngp.com",
        "Pragma": "no-cache",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    url = "http://www.yngp.com/api/common/otheruse.linklist.svc"
    response = session.post(url, headers=headers, verify=False)
    logger.info(response.text)


def gg_ht_list(captcha_check_flag="0"):
    for page in range(1, 3):
        headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "http://www.yngp.com",
            "Pragma": "no-cache",
            "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
        }
        url = "http://www.yngp.com/api/procurement/Procurement.gghtMoreList.svc"
        params = {
            "captchaCheckFlag": captcha_check_flag,
            "p": page
        }
        data = {
            "current": page,
            "rowCount": "10",
            "searchPhrase": ""
        }
        response = session.post(url, headers=headers, params=params, data=data, verify=False)

        if '验证码' in response.text:
            resp = response.text.replace('，', ', ')
            logger.warning(f'page: {page}, {resp}')
            captcha_result = get_captcha()
            captcha_check_flag = check_captcha(captcha_result)
            gg_ht_list(captcha_check_flag)
        else:
            logger.success(f'page: {page}, {response.text}')


def display_image_and_get_click_x_y(image_base64):
    # 解码 Base64 图片数据
    try:
        image_data = base64.b64decode(image_base64)
        if len(image_data) == 0:
            raise ValueError("Decoded image data is empty.")
    except Exception as e:
        logger.error(e)
        return None

    # 将解码后的数据转换为 Image 对象
    try:
        image_pil = Image.open(BytesIO(image_data))
    except Exception as e:
        logger.error(e)
        return None

    # 创建 Tkinter 窗口
    root = Tk()
    root.title("Click on the Image")

    # 将 PIL Image 转换为 Tkinter 支持的 ImageTk 格式
    image_tk = ImageTk.PhotoImage(image_pil)

    # 创建标签以显示图片
    label = Label(root, image=image_tk)
    label.image = image_tk  # 防止垃圾回收
    label.pack()

    click_coordinates = []  # 用于存储所有点击的坐标

    def onclick(event):
        # 将每次点击的 (x, y) 坐标添加到列表中
        click_coordinates.append({"x": int(event.x), "y": int(event.y)})

    # 绑定点击事件
    label.bind("<Button-1>", onclick)

    # 进入 Tkinter 主循环
    root.mainloop()

    # 返回所有点击的坐标
    if click_coordinates:
        return click_coordinates
    else:
        logger.warning("Window closed without a click.")
        return None


def generate_uuid_v4():
    hex_digits = "0123456789abcdef"
    s = []

    # 生成 36 个随机十六进制字符
    for i in range(36):
        s.append(random.choice(hex_digits))

    # 固定第 14 位为 '4'（版本标识）
    s[14] = '4'

    # 处理第 19 位（变体标识，固定最高位为 '8', '9', 'a', 或 'b'）
    s[19] = hex_digits[(int(s[19], 16) & 0x3 | 0x8)]

    # 插入分隔符 '-'
    s[8] = s[13] = s[18] = s[23] = '-'

    return 'point-' + ''.join(s)


def millis_timestamp():
    # 获取当前 UTC 时间
    now = datetime.utcnow()
    # 转换为 13 位毫秒级时间戳
    timestamp = int(now.timestamp() * 1000)
    return timestamp


def get_captcha():
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "http://www.yngp.com",
        "Pragma": "no-cache",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    url = "http://www.yngp.com/api/captcha/captcha.get.svc"

    client_uid = generate_uuid_v4()
    ts = millis_timestamp()
    data = {
        "captchaType": "clickWord",
        "clientUid": client_uid,
        "ts": ts
    }
    data = json.dumps(data, separators=(',', ':'))
    response = session.post(url, headers=headers, data=data, verify=False).json()
    # logger.info(response)

    captcha_img = response['data']['repData']['originalImageBase64']
    word_list = response['data']['repData']['wordList']
    secret_key = response['data']['repData']['secretKey']
    token = response['data']['repData']['token']

    logger.debug(word_list)

    # 点选坐标识别
    word_cord = display_image_and_get_click_x_y(captcha_img)
    # logger.info(word_cord)

    result = {
        'secretKey': secret_key,
        'token': token,
        'clientUid': client_uid,
        'wordCord': word_cord
    }
    # logger.info(result)

    return result


def aes_encrypt(word, key_word):
    """
    复现 JavaScript 的 CryptoJS.AES.encrypt (ECB模式 + PKCS7填充)

    :param word: 待加密的字符串
    :param key_word: 密钥（UTF-8 格式）
    :return: Base64 编码的加密结果
    """
    # 将密钥和明文转换为 bytes (UTF-8)
    key = key_word.encode('utf-8')
    plaintext = word.encode('utf-8')

    # 检查密钥长度（AES-128/192/256 需要 16/24/32 字节）
    if len(key) not in [16, 24, 32]:
        raise ValueError("密钥长度必须是 16(AES-128)、24(AES-192) 或 32(AES-256) 字节")

    # 初始化 AES-ECB 加密器
    cipher = AES.new(key, AES.MODE_ECB)

    # 加密并应用 PKCS7 填充
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))

    # 返回 Base64 字符串（与 CryptoJS 行为一致）
    return base64.b64encode(ciphertext).decode('utf-8')


def check_captcha(captcha_result):
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "http://www.yngp.com",
        "Pragma": "no-cache",
        "Referer": "http://www.yngp.com/page/procurement/procurementList.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    url = "http://www.yngp.com/api/captcha/captcha.check.svc"
    ts = millis_timestamp()

    # pointJson 加密
    aes_key = captcha_result['secretKey']
    word_cord_list = captcha_result['wordCord']
    cord_json_str = json.dumps(word_cord_list, separators=(',', ':'))
    logger.info(cord_json_str)
    point_json = aes_encrypt(cord_json_str, aes_key)

    data = {
        "captchaType": "clickWord",
        "pointJson": point_json,
        "token": captcha_result["token"],
        "clientUid": captcha_result["clientUid"],
        "ts": ts
    }
    data = json.dumps(data, separators=(',', ':'))
    logger.debug(data)
    response = session.post(url, headers=headers, data=data, verify=False).json()
    logger.info(response)

    # pointJson error -> {"code":"","data":{},"message":"系统异常，请稍后再试！","status":500}

    token = response['data']['repData']['token']

    aes_text = token + '---' + cord_json_str
    captcha_check_flag = aes_encrypt(aes_text, aes_key)
    logger.info(f'captchaCheckFlag: {captcha_check_flag}')

    return captcha_check_flag


def main():
    answer_value = procurement_list_1()
    procurement_list_2(answer_value)
    link_list()
    gg_ht_list()


if __name__ == '__main__':
    main()
