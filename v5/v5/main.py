import re
import json
import execjs
import ddddocr
import asyncio
import requests
import websockets

from track import *
from loguru import logger
from bs4 import BeautifulSoup

slide = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)

# WebSocket 服务器地址
ws_url = "wss://freetvks2vi2.verify5.com/api"


def get_demo():
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,zh-TW;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        # 'Cookie': 'JSESSIONID=12f6a51822884000',
    }

    response = requests.get('https://www.verify5.com/demo', headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    config_div = soup.find('div', {'v5-config': True})
    config_str = config_div['v5-config']

    return config_str


async def websocket_crawler(ans, token):
    try:
        # 连接到 WebSocket 服务器
        async with websockets.connect(ws_url) as websocket:
            logger.info("已连接到 WebSocket 服务器")
            await websocket.send(ans[0])
            await websocket.send(ans[1])
            await websocket.send(ans[2])
            logger.debug("已发送初始消息")
            response = await websocket.recv()
            logger.debug(f"收到消息: {response}")
            decode_1 = json.loads(
                execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('decode', response, token, ""))
            logger.info(decode_1)
            u = decode_1["data"]["u"]
            ans2 = execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('getParam_pic', u, token)
            await websocket.send(ans2[0])
            response = await websocket.recv()
            logger.debug(f"收到图片消息: {response}")
            decode_2 = json.loads(
                execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('decode', response, token, u))
            logger.info(decode_2)

            bg = decode_2["data"]["b"]
            sm = decode_2["data"]["s"]
            res = slide.slide_match(requests.get(sm).content, requests.get(bg).content, simple_target=True)
            x = res["target"][0]
            # print(x)
            track = generate_slider_track(x)
            logger.info(track)
            word = '{"requestId":"Req_17458947744764","command":"53031DCA131946D78173670CE98E8812","data":{"s":"11111111111111111111111111111","f":"c539ddb69c64cc6167f04f2b3339cfc9758884ac"}}'.replace(
                "11111111111111111111111111111", track)
            ans3 = execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('getParam_track', u, token, word)
            # print(ans3)
            await websocket.send(ans3[0])
            response = await websocket.recv()
            logger.debug(f"收到验证消息: {response}")
            decode_2 = json.loads(
                execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('decode', response, token, u))
            logger.success(decode_2)
    except Exception as e:
        logger.error("发生错误:", e)
    finally:
        logger.warning("连接已关闭")


def main():
    token_res = get_demo()
    match = re.search(r"token:'([^']+)'", token_res)
    token = match.group(1)
    logger.info(token)
    ans = execjs.compile(open('v5.js', 'r', encoding='utf-8').read()).call('getParam', token)
    asyncio.get_event_loop().run_until_complete(websocket_crawler(ans, token))


if __name__ == '__main__':
    main()
