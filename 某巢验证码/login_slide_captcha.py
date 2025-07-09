# ======================
# -*-coding: Utf-8 -*-
# ======================
import json
import time
import random
import base64
import hashlib
import ddddocr
import requests

from loguru import logger
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


def download_captcha_img(bg_img_url, fg_img_url):
    resp_bg = requests.get(url=bg_img_url).content
    resp_fg = requests.get(url=fg_img_url).content

    with open('./img/bg_pic.png', 'wb') as bg:
        bg.write(resp_bg)

    with open('./img/fg_pic.png', 'wb') as slide:
        slide.write(resp_fg)


def generate_uuid_v4():
    # 生成 16 个随机字节（128 位）
    uuid_bytes = [random.randint(0, 255) for _ in range(16)]

    # 设置 UUID v4 的固定位（第 6-7 字节的高位为 0x40，第 8-9 字节的高位为 0x80）
    uuid_bytes[6] = (uuid_bytes[6] & 0x0F) | 0x40  # 第 7 字节的高 4 位设为 4
    uuid_bytes[8] = (uuid_bytes[8] & 0x3F) | 0x80  # 第 9 字节的高 2 位设为 10

    # 转换为十六进制字符串
    hex_str = ''.join(f'{byte:02x}' for byte in uuid_bytes)

    # 格式化为 UUID v4 的标准形式
    return f'{hex_str[:8]}-{hex_str[8:12]}-{hex_str[12:16]}-{hex_str[16:20]}-{hex_str[20:]}'


def get_captcha():
    uuid = generate_uuid_v4()
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://www.fcbox.com",
        "Pragma": "no-cache",
        "Referer": "https://www.fcbox.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = f"https://acs.fcbox.com/captcha/querySlideImage/{uuid}"
    data = {}
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data).json()
    # logger.info(response)

    # 下载验证码图片
    resp_data = response['data']
    bg_img_url = resp_data['shadeImageUrl']
    fg_img_url = resp_data['slideImageUrl']
    download_captcha_img(bg_img_url, fg_img_url)

    check_id = resp_data['checkId']
    client_ip = resp_data['clientIp']
    aes_key = resp_data['key']
    x = resp_data['pointX']
    y = resp_data['pointY']

    return {
        'checkId': check_id,
        'clientIp': client_ip,
        'key': aes_key,
        'uuid': uuid,
        'pointX': x,
        'pointY': y
    }


def get_distance():
    slide = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    with open('./img/fg_pic.png', 'rb') as f:
        target_bytes = f.read()
    with open('./img/bg_pic.png', 'rb') as f:
        background_bytes = f.read()
    res = slide.slide_match(target_bytes, background_bytes, simple_target=True)

    return res.get('target')[0]


def generate_bezier_trajectory(start_x, y, time_interval=20):
    # 识别移动距离
    end_x = get_distance()
    # logger.info(f'distance: {end_x}')

    trajectory = []
    current_time = int(time.time() * 1000)  # 起始时间（毫秒）
    duration = 1000  # 动画总时间（毫秒）
    start_time = current_time

    # 控制点（调整 control_x 可改变曲线形状）
    control_x = (start_x + end_x) // 2 + 10  # 使用整数除法
    while current_time <= start_time + duration:
        elapsed = current_time - start_time
        progress = min(elapsed / duration, 1.0)  # 0 → 1
        # 二次贝塞尔曲线公式（结果转为整数）
        current_x = int(
            (1 - progress) ** 2 * start_x
            + 2 * (1 - progress) * progress * control_x
            + progress ** 2 * end_x
        )
        trajectory.append({
            "x": current_x,  # 直接存储整数
            "y": y,
            "time": current_time
        })
        current_time += time_interval

    # 确保最后一个点是 end_x（整数）
    if trajectory[-1]["x"] != end_x:
        trajectory.append({
            "x": end_x,
            "y": y,
            "time": current_time
        })

    return trajectory


def trajectory_convert(trajectory):
    result = ""
    for point in trajectory:
        result += str(point['x']) + str(point['y']) + str(point['time'])
    return result


def aes_ecb_encrypt(plaintext, key):
    key_bytes = key.encode('utf-8')
    data_bytes = plaintext.encode('utf-8')

    padded_data = pad(data_bytes, AES.block_size)

    cipher = AES.new(key_bytes, AES.MODE_ECB)
    encrypted = cipher.encrypt(padded_data)

    return base64.b64encode(encrypted).decode('utf-8')


def check_data_algo(params, trajectory):
    json_data = params
    client_ip = json_data['clientIp']
    check_id = json_data['checkId']
    uuid = json_data['uuid']
    track_data = trajectory
    key = json_data['key']

    md5_input = client_ip + check_id + uuid + trajectory_convert(track_data)
    md5_hash = hashlib.md5(md5_input.encode('utf-8')).hexdigest()

    data = json.dumps({
        'sign': md5_hash,
        'track': track_data
    }, separators=(',', ':'))

    # AES-ECB 加密
    encrypted = aes_ecb_encrypt(data, key)
    return encrypted


def get_check_data(encrypt_data):
    # 轨迹生成
    x = encrypt_data['pointX']
    y = encrypt_data['pointY']
    trajectory = generate_bezier_trajectory(x, y)
    # logger.info(trajectory)

    check_data = check_data_algo(encrypt_data, trajectory)
    return check_data


def verify(encrypt_data):
    uuid = encrypt_data['uuid']
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://www.fcbox.com",
        "Pragma": "no-cache",
        "Referer": "https://www.fcbox.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = f"https://acs.fcbox.com/captcha/checkCode/{uuid}"

    data = get_check_data(encrypt_data)
    response = requests.post(url, headers=headers, data=data)
    logger.info(response.text)


def main():
    try:
        # 获取验证码
        encrypt_data = get_captcha()

        # 校验验证码
        verify(encrypt_data)
    except Exception as e:
        logger.error(e)


if __name__ == '__main__':
    for _ in range(10):
        main()
