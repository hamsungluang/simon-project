import time
import ddddocr
from Crypto.Cipher import DES
from Crypto.Util.Padding import pad
import base64
from mode_run import GTrace
import cv2
import json
from PIL import Image
import numpy as np
import re
import requests
import random
def get_slide_distance(bg_content, fg_content):
    """
    识别滑块缺口
    :param bg_content: 带有缺口的滑块背景字节流
    :param fg_content: 缺口字节流
    :return: 距离
    """
    target = cv2.imdecode(np.asarray(bytearray(fg_content), dtype=np.uint8), 0)
    template = cv2.imdecode(np.asarray(bytearray(bg_content), dtype=np.uint8), 0)
    result = cv2.matchTemplate(target, template, cv2.TM_CCORR_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    return max_loc[0]


def get_random(distance):
    """
    返回滑块xyt的轨迹
    :param distance:  414
    :return: [[0, 0, 0], [207, -1, 102], [207, 0, 201], [207, 0, 300], [207, 0, 401], [207, -1, 501], [416, 0, 602], [415, 1, 702], [418, -1, 801], [416, 1, 901], [414, 0, 1001]]
    """
    ge = list()
    ge.append([0, 0, 0])
    for i in range(10):
        x = 0
        y = random.randint(-1, 1)
        t = 100 * (i + 1) + random.randint(0, 2)
        ge.append([x, y, t])
    for items in ge[1:-5]:
        items[0] = distance // 2
    for items in ge[-5:-1]:
        items[0] = distance + random.randint(1, 4)
    ge[-1][0] = distance
    return ge

def des_encrypt(text, key):
    """des ecb 加密"""
    des_obj = DES.new(key.encode('utf-8'), DES.MODE_ECB)
    encrypt_text = des_obj.encrypt(pad(str(text).encode('utf-8'), DES.block_size, style='x923')[:-1] + bytes([0]))
    return base64.b64encode(encrypt_text).decode('utf-8')

for p in range(25):
    time.sleep(0.3)
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Origin": "https://castatic.fengkongcloud.cn",
        "Referer": "https://castatic.fengkongcloud.cn/",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://captcha.fengkongcloud.cn/ca/v1/register"
    params = {
        "organization": "RlokQwRlVjUrTUlkIqOg",
        "lang": "zh-cn",
        "model": "slide",
        "captchaUuid": "20230515165848sY4d3ZDPBKKKkZmANe",
        "appId": "default",
        "channel": "DEFAULT",
        "callback": "sm_1684141146318",
        "rversion": "1.0.4",
        "sdkver": "1.1.3",
        "data": "{}"
    }
    response = requests.get(url, headers=headers, params=params)
    # print(response.text)
    data = re.findall("sm_\d+(.*)", response.text)[0].replace('(', '').replace(')', '')
    data = json.loads(data)
    # print(data)
    rid = data["detail"]["rid"]
    _bg = data["detail"]["bg"]
    _fg = data["detail"]["fg"]
    bg_height = data["detail"]["bg_height"]
    bg_width = data["detail"]["bg_width"]

    url_bg = "https://castatic.fengkongcloud.cn" + _bg
    url_fg = "https://castatic.fengkongcloud.cn" + _fg
    # print(url_bg, url_fg)


    bg_con = requests.get(url_bg, headers=headers).content
    with open('bg.jpg', 'wb') as f:
        f.write(bg_con)

    img = Image.open('bg.jpg')
    out = img.resize((300, 150), Image.ANTIALIAS)
    out.save('new_bg.jpg')

    s_con = requests.get(url_fg, headers=headers).content
    with open('fg.png', 'wb') as f:
        f.write(s_con)

    imgs = Image.open('fg.png')
    out = imgs.resize((45, 150), Image.ANTIALIAS)
    out.save('new_fg.png')

    with open('new_bg.jpg', 'rb')as f:
        target_bytes = f.read()
    with open('new_fg.png', 'rb')as f:
        background_bytes = f.read()

    # 缺口距离
    distance = get_slide_distance(target_bytes, background_bytes)
    print(f"缺口距离为{distance}")
    # 轨迹
    x = get_random(distance)
    # x = GTrace().running(distance)
    print(f"生成的轨迹是 {x}")
    #时间
    _time1 = x[-1][2]
    _time2 = x[-1][0]
    _time = _time1 - _time2

    print(_time)
    # 时间加密
    encrypt_time = des_encrypt(_time, "1e008ea8")
    # 距离加密
    encrypt_distance = des_encrypt((distance/300),  "74274da5")
    # print(encrypt_distance)
    # 轨迹加密
    encrypt_x = des_encrypt(x, "25e224dd")
    # print(encrypt_x)
    ku = des_encrypt("default", "01a2233a")
    xo = des_encrypt("DEFAULT", "6a50dff1")
    er = des_encrypt("zh-cn", "b5fa6ac1")
    xw = des_encrypt("11", "c80970fe")
    gd = des_encrypt(0, "3445319d")
    un = des_encrypt(150, "65d0c077")
    zk = des_encrypt(300, "5e176f66")
    ym = des_encrypt(-1, "2e204d45")
    ke = des_encrypt(1, "a5079e3b")
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Origin": "https://www.ishumei.com",
        "Referer": "https://www.ishumei.com/trial/captcha.html",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://captcha.fengkongcloud.cn/ca/v2/fverify"
    params = {
        "er": er,
        "fm": str(encrypt_x),
        "act.os": "web_pc",
        "gd": gd,
        "organization": "RlokQwRlVjUrTUlkIqOg",
        "un": un,
        "zk": zk,
        "xo": xo,
        "rid": str(rid),
        "xw": xw,
        "fg": str(encrypt_time),
        "ke": ke,
        "callback": "sm_{}".format(str(int(time.time() *1000))),
        "lm": str(encrypt_distance),
        "ostype": "web",
        "captchaUuid": "20230518142214G35TQnZyxE5s6E4HZh",
        "protocol": "172",
        "ku": ku,
        "ym": ym,
        "rversion": "1.0.4",
        "sdkver": "1.1.3"
    }
    # print(params)
    response = requests.get(url, headers=headers, params=params)

    print(response.text)
    print(response)





