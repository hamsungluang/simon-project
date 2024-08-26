# -*- coding: utf-8 -*-
# import execjs
import time
import sys
import os
import random
import execjs

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from utils.generate_random_str import random_str
from utils.proxy_util import borrow_proxy, delate_proxy
from curl_cffi import requests
from loguru import logger
from settings import *


class GetData:
    def __init__(self):
        self.k1 = execjs.compile(open('../js/header_sap_v1612.js', encoding='utf-8').read())
        self.k2 = execjs.compile(open('../js/af_v2.js', encoding='utf-8').read())
        pass

    def get_cookies(self, host):
        headers = {
            "authority": host.replace("https://", ""),
            "referer": host,
            "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.41'
        }
        url = f"{host}/api/v4/pages/is_short_url/"
        params = {
            "path": "search"
        }
        proxies = borrow_proxy()
        try:
            response = requests.get(url, headers=headers, params=params, impersonate="chrome110",
                                    proxies=proxies['proxy_dic'],
                                    timeout=5)
            csrftoken = random_str(32)
            cookies = {
                "_med": "refer",
                "csrftoken": csrftoken,
                "language": "zhHans",
            }
            cookies = dict(cookies, **dict(response.cookies))
            return cookies
        except Exception as e:
            # delate_proxy(proxies)
            logger.error(e)

    def get_data(self, host, url, costs):
        b = int(time.time() * 1000)
        cookies = self.get_cookies(host)
        # cookies_dic = borrow_cookies()
        costs.append(f"get cookie cost: {int(time.time() * 1000) - b}")
        if cookies:
            # cookies = cookies_dic['cookies']
            b = int(time.time() * 1000)
            da = self.k1.call('_super1', url)
            params = {
                'api': url
            }
            try:
                pass
                
            except Exception as e:
                logger.error('get sap error --{}', e)
            else:
                costs.append(f"js-1 cost: {int(time.time() * 1000) - b}")
                af = self.k2.call('_kkk')[0]
                b = int(time.time() * 1000)
                try:
                    pass
                   

                except Exception as e:
                    logger.error('get af error --{}', e)
                else:
                    costs.append(f"js-2 cost: {int(time.time() * 1000) - b}")
                    header_1 = {
                        "accept": "application/json",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "af-ac-enc-dat": af,
                        "af-ac-enc-sz-token": "",
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "pragma": "no-cache",
                        "referer": host,
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43",
                        "x-api-source": "pc",
                        "x-csrftoken": cookies['csrftoken'],
                        "x-requested-with": "XMLHttpRequest",
                        "x-shopee-language": "zh-Hant",
                        "x-sz-sdk-version": "3.4.0-2&1.6.12",
                        # "x-sap-ri": da.get('x-sap-ri'),
                        # "x-sap-sec": da.get('x-sap-sec')
                    }
                    header_2 = dict(da, **header_1)
                    proxies = borrow_proxy()
                    try:
                        b = int(time.time() * 1000)
                        res = requests.get(url=url, headers=header_2, impersonate="chrome110",
                                           proxies=proxies['proxy_dic'],
                                           timeout=5,
                                           cookies=cookies)
                        costs.append(f"search cost: {int(time.time() * 1000) - b}")
                        data = res.json()
                        logger.info(costs)
                        if data.get('captcha'):
                            delate_proxy(proxies)
                            # delate_cookies(cookies_dic)
                        return data
                    except Exception as e:
                        logger.error(e)
                        # delate_proxy(proxies)
        else:
            logger.warning('获取cookies失败')


if __name__ == '__main__':
    from parse.parse_shop_base import ParseShopBase

    site = 5
    offset = 0
    shop_id = 282697021
    item_id = 11263280816
    host = HOST_DIC[str(site)]
    # url = f"{host}/api/v4/shop/get_shop_base?entry_point=&need_cancel_rate=true&request_source=shop_home_page&shopid={shop_id}&version=1"
    url = f"{host}/api/v4/shop/rcmd_items?bundle=shop_page_category_tab_main&limit=90&offset={offset}&shop_id={shop_id}&sort_type=13&upstream=pdp"
    # url = f"{host}/api/v4/pdp/get_pc?shop_id={shop_id}&item_id={item_id}"
    for i in range(10):
        data = GetData().get_data(host, url, costs=[])
        logger.info(data)
