import re
import json
import execjs
import requests

from loguru import logger

with open('result_1.js', 'r', encoding='utf-8') as f:
    js = f.read()
with open('result_2.js', 'r', encoding='utf-8') as f:
    js2 = f.read()

ctx = execjs.compile(js)
ctx2 = execjs.compile(js2)


def yun_pan_1_waf_pass():
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "referer": "https://yunpan1.wang/",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0"
    }
    url = "https://yunpan1.wang/"
    response = requests.get(url, headers=headers)
    logger.info(response)

    client_id = re.findall(r'SafeLineChallenge\(\"(.*?)\"', response.text)[0]
    logger.info(client_id)

    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://yunpan1.wang",
        "Pragma": "no-cache",
        "Referer": "https://yunpan1.wang/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://challenge.rivers.chaitin.cn/challenge/v2/api/issue"
    data = {
        "client_id": client_id,
        "level": 2
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)

    res = response.json()
    logger.info(res)
    data = res['data']['data']
    issue_id = res['data']['issue_id']

    result = ctx.call('f', data)
    # result = ctx2.call('get_result', data)

    url = "https://challenge.rivers.chaitin.cn/challenge/v2/api/verify"
    data = {
        "issue_id": issue_id,
        "result": result,
        "serials": [
            [
                0,
                619,
                349
            ],
            [
                1,
                620,
                349
            ],
            [
                17,
                622,
                348
            ],
            [
                17,
                625,
                348
            ],
            [
                23,
                631,
                347
            ],
            [
                31,
                636,
                346
            ],
            [
                38,
                644,
                345
            ],
            [
                46,
                654,
                344
            ],
            [
                54,
                665,
                342
            ],
            [
                61,
                678,
                340
            ],
            [
                68,
                692,
                340
            ],
            [
                76,
                708,
                339
            ],
            [
                83,
                730,
                339
            ],
            [
                91,
                752,
                339
            ],
            [
                98,
                776,
                339
            ],
            [
                106,
                804,
                339
            ],
            [
                121,
                828,
                339
            ],
            [
                122,
                852,
                339
            ],
            [
                136,
                880,
                339
            ],
            [
                137,
                902,
                339
            ],
            [
                151,
                930,
                340
            ],
            [
                158,
                958,
                342
            ],
            [
                166,
                982,
                342
            ],
            [
                173,
                1006,
                342
            ],
            [
                181,
                1026,
                342
            ],
            [
                188,
                1042,
                342
            ],
            [
                196,
                1059,
                342
            ],
            [
                204,
                1072,
                342
            ],
            [
                211,
                1085,
                342
            ],
            [
                218,
                1097,
                342
            ],
            [
                226,
                1108,
                342
            ],
            [
                233,
                1117,
                342
            ],
            [
                248,
                1126,
                342
            ],
            [
                248,
                1136,
                342
            ],
            [
                256,
                1142,
                342
            ],
            [
                263,
                1150,
                342
            ],
            [
                271,
                1158,
                342
            ],
            [
                278,
                1163,
                342
            ],
            [
                285,
                1168,
                342
            ],
            [
                293,
                1172,
                342
            ],
            [
                308,
                1176,
                342
            ],
            [
                309,
                1180,
                342
            ],
            [
                323,
                1182,
                342
            ],
            [
                324,
                1184,
                342
            ],
            [
                338,
                1186,
                342
            ],
            [
                347,
                1187,
                342
            ],
            [
                354,
                1189,
                342
            ],
            [
                362,
                1192,
                342
            ],
            [
                369,
                1193,
                342
            ],
            [
                375,
                1194,
                342
            ],
            [
                383,
                1194,
                342
            ],
            [
                391,
                1195,
                342
            ],
            [
                406,
                1196,
                342
            ],
            [
                451,
                1196,
                342
            ]
        ],
        "client": {
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
            "platform": "Win32",
            "language": "zh-CN,en,en-GB,en-US",
            "vendor": "Google Inc.",
            "screen": [
                1707,
                1067
            ],
            "visitorId": "45e67b478a2e9a6e5b59e0ba5b0d3369",
            "score": 0,
            "target": []
        }
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)

    res = response.json()
    logger.success(res)

    jwt = res['data']['jwt']

    cookies = {
        "sl-challenge-jwt": jwt
    }
    url = "https://yunpan1.wang/"
    response = requests.get(url, headers=headers, cookies=cookies)

    logger.success(response)


if __name__ == '__main__':
    yun_pan_1_waf_pass()
