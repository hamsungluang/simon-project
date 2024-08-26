# -*- coding: utf-8 -*-
# @Time    : 2023/11/27 16:06
# @File    : test2.py
from curl_cffi import requests
# import requests
import re
import json
import execjs
import redis
from loguru import logger

s = requests.Session()
connect_pool = redis.ConnectionPool(host='127.0.0.1', port=6379, db=1, password='',
                                    decode_responses=True)
redis = redis.StrictRedis(connection_pool=connect_pool)
headers = {
    "authority": "market.yandex.ru",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0"
}


def get_data(keyword, page):
    url = "https://market.yandex.ru"
    params = {
        "text": keyword,
        "page": page
    }
    response = s.get(url, headers=headers, impersonate="edge101", timeout=15,
                     )
    # response = s.get(url, headers=headers, params=params, timeout=15)
    logger.info(response.url)
    return response.text


def pass_captcha(formaction, powprefix, powcomplexity):
    url = "https://market.yandex.ru" + formaction
    logger.info(url)
    code = s.get('https://market.yandex.ru/captchapgrd').text
    # with open('./解混淆v3.js', 'r', encoding='utf-8') as f:
    #     code = f.read()
    with open('./get_params.js', 'r', encoding='utf-8') as f:
        params_code = execjs.compile(f.read())
    with open('./environment.js', 'r', encoding='utf-8') as f:
        environment = f.read()
    with open('./run.js', 'r', encoding='utf-8') as f:
        run = f.read()
    execjs.compile(environment + code + run).call('toredis', '1')
    rdata = redis.blpop('1')[1]
    logger.info(rdata)
    params = params_code.call('get_params', powprefix, powcomplexity)
    params['rdata'] = rdata
    logger.info(params)
    resp = s.post(url, headers=headers, json=params, impersonate="edge101")
    logger.info(resp.url)


def search():

    text = get_data('nike', '1')
    ssr_data = re.findall("window.__SSR_DATA__=(.*?)</script>", text)
    # logger.info(text)
    if ssr_data:
        ssr_data_str = ssr_data[0].replace('"', '').replace('{', '{"').replace(':', '\":\"').replace('}', '"}').replace(
            ',',
            '\",\"')
        ssr_data_dic = json.loads(ssr_data_str)
        logger.info(ssr_data_dic)
        pass_captcha(ssr_data_dic['formAction'], ssr_data_dic['powPrefix'], ssr_data_dic['powComplexity'])
    else:
        logger.info('done')


if __name__ == '__main__':
    search()
