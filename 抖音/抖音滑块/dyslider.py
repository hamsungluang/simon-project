# -*- coding = utf-8 -*- 
# @Time :2023/4/18 14:32
# @File: dyslider.py
# @Software: PyCharm


import cv2
import json
import time
import random
import execjs
import requests
from node_vm2 import VM


class Slider():
    def __init__(this, url):
        this.start_url = url
        this.session = requests.session()
        this.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://haohuo.jinritemai.com',
            'Pragma': 'no-cache',
            'Referer': 'https://haohuo.jinritemai.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

    def identify(this):
        # 读取背景图片和缺口图片
        bg_img = cv2.imread('bg.jpg')  # 背景图片
        slice_img = cv2.imread('slice.png')  # 缺口图片
        # 转换为灰度图
        bg = cv2.cvtColor(bg_img, cv2.COLOR_RGB2GRAY)
        slice = cv2.cvtColor(slice_img, cv2.COLOR_RGB2GRAY)
        # 识别边缘
        bg = cv2.Canny(bg, 255, 255)
        slice = cv2.Canny(slice, 255, 255)
        # 开始匹配
        res = cv2.matchTemplate(bg, slice, cv2.TM_CCOEFF_NORMED)
        # 获取匹配度最好的一个结果
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        return max_loc[0]

    def get_tracks(this, distance, _y):
        """
        获取轨迹参数
        """
        tracks = list()
        y, v, t, current = 0, 0, 1, 0
        mid = distance * 3 / 4
        exceed = random.randint(40, 90)
        z = random.randint(30, 150)
        while current < (distance + exceed):
            if current < mid / 2:
                a = 2
            elif current < mid:
                a = 3
            else:
                a = -3
            a /= 2
            v0 = v
            s = v0 * t + 0.5 * a * (t * t)
            current += int(s)
            v = v0 + a * t
            y += random.randint(-3, 3)
            z = z + random.randint(5, 10)
            tracks.append([min(current, (distance + exceed)), y, z])
        while exceed > 0:
            exceed -= random.randint(0, 5)
            y += random.randint(-3, 3)
            z = z + random.randint(5, 9)
            tracks.append([min(current, (distance + exceed)), y, z])
        tr = []
        for i, x in enumerate(tracks):
            tr.append({
                'x': x[0],
                'y': _y,
                'relative_time': x[2]
            })
        return tr

    def get_detail(this):
        def get_fp():
            with open('./dyslider.js', 'r', encoding='utf-8') as f:
                jscode = f.read()
                js = execjs.compile(jscode)
                fp = js.call('create_sv_webid')
            return fp

        base_url = 'https://ecom.ecombdapi.com/aweme/v2/shop/promotion/pack/'
        data = {
            'ui_params': '{"from_live":false,"from_video":null,"three_d_log_data":null,"follow_status":null,"which_account":null,"ad_log_extra":null,"from_group_id":null,"bolt_param":null,"transition_tracker_data":null,"selected_ids":null,"window_reposition":null,"is_short_screen":null,"full_mode":true}',
            'use_new_price': '1',
            'is_h5': '1',
            'bff_type': '2',
            'is_in_app': '0',
            'origin_type': '',
            'promotion_ids': this.start_url.split('=')[1],
            'meta_param': '',
            'source_page': '',
            'request_additions': '',
            'isFromVideo': 'false',
        }
        params = f'?is_h5=1&is_native_h5=1&verifyFp={get_fp()}&a_Bogus='
        response = this.session.post(base_url + params, headers=this.headers, data=data)
        dicc = json.loads(response.json()['bdturing'])
        this.fp = dicc['fp']
        # this.fp = 'verify_ljzss8tl_vDGdZbYw_3id1_4eHR_9ST8_dvP2ty378BXL'
        return dicc['detail']

    def load_pictures(this):
        this.detail = this.get_detail()
        params = {
            "lang": "zh",
            "app_name": "",
            "h5_sdk_version": "2.28.11",
            "h5_sdk_use_type": "cdn",
            "sdk_version": "3.8.6",
            "iid": "0",
            "did": "0",
            "device_id": "0",
            "ch": "web_text",
            "aid": "2985",
            "os_type": "2",
            "mode": "slide",
            "tmp": str(int(time.time() * 1000)),
            "platform": "pc",
            "webdriver": "false",
            "fp": this.fp,
            "type": "verify",
            "detail": this.detail,
            "server_sdk_env": {"idc": "hl", "region": "CN", "server_type": "whale"},
            "subtype": "slide",
            "challenge_code": "3058",
            "os_name": "windows",
            "h5_check_version": "3.8.6"
        }
        headers = {
            'authority': 'verify.snssdk.com',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'origin': 'https://haohuo.jinritemai.com',
            'pragma': 'no-cache',
            'referer': 'https://haohuo.jinritemai.com/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        }
        response = this.session.get('https://verify.snssdk.com/captcha/get', params=params, headers=headers)
        # print(response.json())
        url_bg = response.json()['data']['question']['url1']
        url_slice = response.json()['data']['question']['url2']
        this.tipy = response.json()['data']['question']['tip_y']
        this.id = response.json()['data']['id']
        print(this.id, this.tipy)
        slice, bg = this.session.get(url_slice), this.session.get(url_bg)
        with open('slice.png', 'wb') as f, open('bg.jpg', 'wb') as g:
            f.write(slice.content)
            g.write(bg.content)
        print('Pictures downloaded ~')

    def genCaptBody(this, _y):
        with open('./dyslider.js', 'r', encoding='utf-8') as f:
            jscode = f.read()
            distance = this.identify()
            print(distance)
            track = this.get_tracks(round(distance * 340 / 552), _y)
            with VM() as vm:
                vm.run(jscode)
                vm.run(f'encrypt("{this.id}",{json.dumps(track)})')
                captchaBody = vm.run("window.captchaBody")
        return captchaBody

    def verify(this):
        params = {
            "lang": "zh",
            "app_name": "",
            "h5_sdk_version": "2.28.11",
            "h5_sdk_use_type": "cdn",
            "sdk_version": "3.8.6",
            "iid": "0",
            "did": "0",
            "device_id": "0",
            "ch": "web_text",
            "aid": "2985",
            "os_type": "2",
            "mode": "slide",
            "tmp": str(int(time.time() * 1000)),
            "platform": "pc",
            "webdriver": "false",
            "fp": this.fp,
            "type": "verify",
            "detail": this.detail,
            "server_sdk_env": '{"idc":"lf","region":"CN","server_type":"whale"}',
            "subtype": "slide",
            "challenge_code": "99999",
            "os_name": "windows",
            "h5_check_version": "3.8.6",
            "xx-tt-dd": 'qJI7ttpVdGKKbSBvYqmaf0aPo'
        }
        data = {
            'captchaBody': this.genCaptBody(this.tipy)
        }
        url = 'https://verify.snssdk.com/captcha/verify'
        response = this.session.post(url, params=params, json=data, headers=this.headers)
        print(response.json())


if __name__ == '__main__':
    url = 'https://haohuo.jinritemai.com/ecommerce/trade/detail/index.html?id=3563439494428551706'
    obj = Slider(url)
    obj.load_pictures()
    obj.verify()
