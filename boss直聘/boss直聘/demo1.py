# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests

cookies = {
    'wd_guid': 'ddb43bad-ed3e-4d2d-9e1d-0e406d738963',
    'historyState': 'state',
    '__g': '-',
    '_bl_uid': 'I5lm6kpbcL0b4R2X9p4j77hsOO63',
    'Hm_lvt_194df3105ad7148dcf2b98a91b5e727a': '1689927289',
    'Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a': '1689927289',
    '__zp_stoken__': '51f9eOFZnZ2VyZi0vS0suZA1VOnI0QX5ze3x9AwwGEhkjNiYtOVMvFXxADBxPH35WT3tNJEM8BmdqOH1bDT5Kd28MPC5JOntPOClhFCgKam8BHAkJZgN1fAY9O0wYV0EdDUJ%2FX0dDCwVaeXw%3D',
    '__c': '1689927289',
    '__a': '27024285.1689927289..1689927289.2.1.2.2',
}

headers = {
    'authority': 'www.zhipin.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.8',
    'cache-control': 'no-cache',
    # 'cookie': 'wd_guid=ddb43bad-ed3e-4d2d-9e1d-0e406d738963; historyState=state; __g=-; _bl_uid=I5lm6kpbcL0b4R2X9p4j77hsOO63; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1689927289; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1689927289; __zp_stoken__=51f9eOFZnZ2VyZi0vS0suZA1VOnI0QX5ze3x9AwwGEhkjNiYtOVMvFXxADBxPH35WT3tNJEM8BmdqOH1bDT5Kd28MPC5JOntPOClhFCgKam8BHAkJZgN1fAY9O0wYV0EdDUJ%2FX0dDCwVaeXw%3D; __c=1689927289; __a=27024285.1689927289..1689927289.2.1.2.2',
    'pragma': 'no-cache',
    'referer': 'https://www.zhipin.com/web/geek/job?query=python&city=100010000&page=2',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Brave";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

params = {
    'scene': '1',
    'query': 'python',
    'city': '100010000',
    'experience': '',
    'payType': '',
    'partTime': '',
    'degree': '',
    'industry': '',
    'scale': '',
    'stage': '',
    'position': '',
    'jobType': '',
    'salary': '',
    'multiBusinessDistrict': '',
    'multiSubway': '',
    'page': '3',
    'pageSize': '30',
}

response = requests.get('https://www.zhipin.com/wapi/zpgeek/search/joblist.json', params=params, cookies=cookies, headers=headers).json()
print(response)
