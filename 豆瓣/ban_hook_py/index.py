import time
import requests
import hmac_sha1
from loguru import logger

time_str = str(int(time.time()))
logger.info(time_str)

_sig = hmac_sha1.hmac_hash1("bf7dddc7c9cfe6f7", f"GET&%2Fapi%2Fv2%2Felendil%2Frecommend_feed&{time_str}")
# _sig = hmac_sha1.hmac_hash1("bf7dddc7c9cfe6f7", f"GET&%2Fapi%2Fv2%2Felendil%2Frecommend_feed&1735020310")
# GkjLBOM58foIvq1cv2c7SsEqnN4=
# GkjLBOM58foIvq1cv2c7SsEqnN4=
logger.info(_sig)

headers = {
    "Host": "frodo.douban.com",
    "user-agent": "api-client/1 com.douban.frodo/7.89.0(307) Android/30 product/blueline vendor/Google model/Pixel 3 brand/google  rom/android  network/wifi  udid/3e71b8653a2b6b25b07876b25012c50ae5074f2a  platform/mobile nd/1"
}
url = "https://frodo.douban.com/api/v2/elendil/recommend_feed"
params = {
    "start": "0",
    "count": "20",
    "screen_width": "1080",
    "screen_height": "2028",
    "wx_api_ver": "0",
    "opensdk_ver": "638058496",
    "webview_ua": "Mozilla/5.0 (Linux; Android 11; Pixel 3 Build/RQ1D.210205.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36",
    "sugar": "0",
    "update_mark": "1735019382.285319965",
    "network": "wifi",
    "enable_sdk_bidding": "1",
    "apikey": "0dad551ec0f84ed02907ff5c42e8ec70",
    "channel": "ali_market",
    "udid": "3e71b8653a2b6b25b07876b25012c50ae5074f2a",
    "os_rom": "android",
    "oaid": "EdGi3zYQCRzmwwB1YR7WKg==\n",
    "timezone": "Asia/Shanghai",
    "_sig": _sig,
    "_ts": time_str
}
response = requests.get(url, headers=headers, params=params)
logger.info(response.json())
