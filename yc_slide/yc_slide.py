# ======================
# -*-coding: Utf-8 -*-
# ======================
import time
import base64
import ddddocr
import requests

from PIL import Image
from io import BytesIO
from loguru import logger

session = requests.Session()


def get_ip():
    # 隧道的host与端口
    proxy = ""
    # 用户名和密码(隧道代理分配的)
    username = ""
    password = ""
    proxies = {
        "http": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": proxy},
        "https": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": proxy}
    }
    session.proxies.update(proxies)


def get_slide_img():
    headers = {
        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "i",
        "referer": "https://app.yichuapp.cn/index/invite/index/?from=110828",
        "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
    }
    url = "https://app.yichuapp.cn/_guard/easy_slide.png"
    timestamp = str(int(time.time() * 1000))
    params = {
        "t": timestamp
    }
    # b51c39e3jDlh
    response = session.get(url, headers=headers, params=params)

    # 410x200 切割出背景图片 -> 340x200
    img = Image.open(BytesIO(response.content))

    cropped_bg_img = img.crop((0, 0, 340, 200))  # 裁剪右侧 70px
    cropped_bg_img.save("slide_bg.png")

    cropped_fg_img = img.crop((345, 80, 395, 130))
    cropped_fg_img.save("slide_fg.png")

    with open("slide_bg.png", "rb") as f:
        bg_bytes = f.read()
    with open("slide_fg.png", "rb") as f:
        fg_bytes = f.read()

    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    det_result = det.slide_match(fg_bytes, bg_bytes, simple_target=True)["target"]
    distance_x = det_result[0]
    distance_y = det_result[1] - 7
    logger.info(f'x: {distance_x}, y: {distance_y}')

    return distance_x, distance_y


def _0x5cc496(_0x49fb4d, _0x45898e):
    _0x2f7fee = ''
    _0x45898e = _0x45898e + 'zVbhsiCROg'
    for _0x351fbd in range(len(_0x49fb4d)):
        _0x37b77c = ord(_0x49fb4d[_0x351fbd]) ^ ord(_0x45898e[_0x351fbd % len(_0x45898e)])
        _0x2f7fee += chr(_0x37b77c)
    return _0x2f7fee


def get_guard_ret(guard, x, y):
    _0x564781 = guard[:8]
    _0x1499fd = _0x5cc496(f"{x}x{y}", _0x564781)
    guard_ret = base64.b64encode(_0x1499fd.encode('utf-8')).decode('utf-8')
    return guard_ret


def get_index_html(x, y):
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "referer": "https://app.yichuapp.cn/index/invite/index/?from=110828",
        "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
    }
    guard = session.cookies.get_dict().get('guard')
    guard_ret = get_guard_ret(guard, x, y)
    session.cookies.update({
        "guardret": guard_ret
    })
    url = "https://app.yichuapp.cn/index/invite/index/"
    params = {
        "from": "110828"
    }
    response = session.get(url, headers=headers, params=params).text
    if '忆初' in response:
        logger.success('验证通过')
    else:
        logger.error("验证失败")


def main():
    try:
        # get_ip()
        distance_x, distance_y = get_slide_img()
        get_index_html(distance_x, distance_y)
    except Exception as e:
        logger.error(e)


if __name__ == '__main__':
    # 限制同一 ip 的请求频率
    for i in range(10):
        main()
        time.sleep(1)
