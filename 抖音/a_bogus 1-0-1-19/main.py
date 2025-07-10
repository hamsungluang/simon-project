import time

import requests
import execjs
import urllib.parse
import subprocess

cookies = {
    'enter_pc_once': '1',
    'UIFID_TEMP': '163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5c44c51fa6beff8f1f2615be624638d06da543fe1615ff22d824b3a4fa37ba408f98d3680ba08a400b3b43a0b0371b573f',
    'x-web-secsdk-uid': 'c18a4bc4-53a7-4081-8e62-402297aad4e8',
    's_v_web_id': 'verify_mc7mrpp3_jZ50cpm8_tTuE_4WHG_Bdc8_ilGs5tY9qhIh',
    'hevc_supported': 'true',
    'dy_swidth': '1440',
    'dy_sheight': '900',
    'strategyABtestKey': '%221750594564.979%22',
    'passport_csrf_token': 'f2da8cc2ca0b06e0c9cdca8a12bd8f4c',
    'passport_csrf_token_default': 'f2da8cc2ca0b06e0c9cdca8a12bd8f4c',
    'fpk1': 'U2FsdGVkX1+6V29wOjpXPnfuzFsUqNSHDLLqzbwfHdUz4FZNT5X/lux6Lqy9fy4qdWvh9pfqEPHxtEkqN5cOsg==',
    'fpk2': '5b2ba492da1bf8b88f5f71b161575820',
    '__security_mc_1_s_sdk_crypt_sdk': '480d649c-455e-89dc',
    '__security_mc_1_s_sdk_cert_key': 'bcb0ed8b-4aff-ac98',
    '__security_mc_1_s_sdk_sign_data_key_web_protect': 'c66b80c1-4e29-8d6c',
    'bd_ticket_guard_client_web_domain': '2',
    'UIFID': '163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5cb1348391d76f63e2f9da4d719c4da32217a9b2949c98efebcf51e3c9c7e1d0966c784065b26bf6b319b04de558d7cb318383c29fa3a83356e1edcec69ee2d2b9c261a4ab36ad07403666f4f2b321382d22bc25bc620e23bcf48eaac8ccce297a7305d63b5b82ddf5a8eb9dc5afb305639b5d8324a5feb6a13e74d04fbdcf11b6',
    'ttwid': '1%7CWyYocgLDvrhOE05tTaXwGccMmsbGaL6fgBfLTq3gHyM%7C1750598062%7C02e665991982dd3e3b50248c982e5165e3dc8009e177a747c441a8533b486bce',
    'bd_ticket_guard_client_data': 'eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSUZBejNLcjl5TDNvY1czTGlIM3FTK1JmS3pRYzBWb0xaYXNHUExTc3kreStYOVdOU0hydWY3emlFN0JiMktiSDc0Y0NTVjVoRjhGZUJyRVZ1eEpDUlE9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D',
    'biz_trace_id': 'ed6b6a1c',
    'odin_tt': '50f37bdb868a32fcdd19bc1b295a81525027d2cf80eb24ec5024a0e792fc45a8989f5236e3a3458bea6e3b0d7a9471318ec8af7c8810c81290854ccdf9364cf1d7c050960fc96b069fc764d442a04a40',
    'download_guide': '%221%2F20250622%2F0%22',
    '__ac_signature': '_02B4Z6wo00f01mtPLQAAAIDBGC4A9H20LOprbymAAPKaff',
    'IsDouyinActive': 'true',
    'home_can_add_dy_2_desktop': '%220%22',
    'stream_recommend_feed_params': '%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1440%2C%5C%22screen_height%5C%22%3A900%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A4%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.douyin.com/user/MS4wLjABAAAAtw6AwaGxwUE4kc4VAwLkrZ2yHRRB-oCa9-h5LSP1nRg?from_tab_name=main',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'uifid': '163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5cb1348391d76f63e2f9da4d719c4da32217a9b2949c98efebcf51e3c9c7e1d0966c784065b26bf6b319b04de558d7cb318383c29fa3a83356e1edcec69ee2d2b9c261a4ab36ad07403666f4f2b321382d22bc25bc620e23bcf48eaac8ccce297a7305d63b5b82ddf5a8eb9dc5afb305639b5d8324a5feb6a13e74d04fbdcf11b6',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    # 'cookie': 'enter_pc_once=1; UIFID_TEMP=163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5c44c51fa6beff8f1f2615be624638d06da543fe1615ff22d824b3a4fa37ba408f98d3680ba08a400b3b43a0b0371b573f; x-web-secsdk-uid=c18a4bc4-53a7-4081-8e62-402297aad4e8; s_v_web_id=verify_mc7mrpp3_jZ50cpm8_tTuE_4WHG_Bdc8_ilGs5tY9qhIh; hevc_supported=true; dy_swidth=1440; dy_sheight=900; strategyABtestKey=%221750594564.979%22; passport_csrf_token=f2da8cc2ca0b06e0c9cdca8a12bd8f4c; passport_csrf_token_default=f2da8cc2ca0b06e0c9cdca8a12bd8f4c; fpk1=U2FsdGVkX1+6V29wOjpXPnfuzFsUqNSHDLLqzbwfHdUz4FZNT5X/lux6Lqy9fy4qdWvh9pfqEPHxtEkqN5cOsg==; fpk2=5b2ba492da1bf8b88f5f71b161575820; __security_mc_1_s_sdk_crypt_sdk=480d649c-455e-89dc; __security_mc_1_s_sdk_cert_key=bcb0ed8b-4aff-ac98; __security_mc_1_s_sdk_sign_data_key_web_protect=c66b80c1-4e29-8d6c; bd_ticket_guard_client_web_domain=2; UIFID=163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5cb1348391d76f63e2f9da4d719c4da32217a9b2949c98efebcf51e3c9c7e1d0966c784065b26bf6b319b04de558d7cb318383c29fa3a83356e1edcec69ee2d2b9c261a4ab36ad07403666f4f2b321382d22bc25bc620e23bcf48eaac8ccce297a7305d63b5b82ddf5a8eb9dc5afb305639b5d8324a5feb6a13e74d04fbdcf11b6; ttwid=1%7CWyYocgLDvrhOE05tTaXwGccMmsbGaL6fgBfLTq3gHyM%7C1750598062%7C02e665991982dd3e3b50248c982e5165e3dc8009e177a747c441a8533b486bce; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCSUZBejNLcjl5TDNvY1czTGlIM3FTK1JmS3pRYzBWb0xaYXNHUExTc3kreStYOVdOU0hydWY3emlFN0JiMktiSDc0Y0NTVjVoRjhGZUJyRVZ1eEpDUlE9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; biz_trace_id=ed6b6a1c; odin_tt=50f37bdb868a32fcdd19bc1b295a81525027d2cf80eb24ec5024a0e792fc45a8989f5236e3a3458bea6e3b0d7a9471318ec8af7c8810c81290854ccdf9364cf1d7c050960fc96b069fc764d442a04a40; download_guide=%221%2F20250622%2F0%22; __ac_signature=_02B4Z6wo00f01mtPLQAAAIDBGC4A9H20LOprbymAAPKaff; IsDouyinActive=true; home_can_add_dy_2_desktop=%220%22; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1440%2C%5C%22screen_height%5C%22%3A900%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A4%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22',
}

params = {
    'device_platform': 'webapp',
    'aid': '6383',
    'channel': 'channel_pc_web',
    'sec_user_id': 'MS4wLjABAAAAtw6AwaGxwUE4kc4VAwLkrZ2yHRRB-oCa9-h5LSP1nRg',
    'max_cursor': '0',
    'locate_query': 'false',
    'show_live_replay_strategy': '1',
    'need_time_list': '1',
    'time_list_query': '0',
    'whale_cut_token': '',
    'cut_version': '1',
    'count': '18',
    'publish_video_strategy_type': '2',
    'from_user_page': '1',
    'update_version_code': '170400',
    'pc_client_type': '1',
    'pc_libra_divert': 'Mac',
    'support_h265': '1',
    'support_dash': '0',
    'cpu_core_num': '4',
    'version_code': '290100',
    'version_name': '29.1.0',
    'cookie_enabled': 'true',
    'screen_width': '1440',
    'screen_height': '900',
    'browser_language': 'zh-CN',
    'browser_platform': 'MacIntel',
    'browser_name': 'Chrome',
    'browser_version': '137.0.0.0',
    'browser_online': 'true',
    'engine_name': 'Blink',
    'engine_version': '137.0.0.0',
    'os_name': 'Mac OS',
    'os_version': '10.15.7',
    'device_memory': '8',
    'platform': 'PC',
    'downlink': '10',
    'effective_type': '4g',
    'round_trip_time': '50',
    'webid': '7518746084303799859',
    'uifid': '163eead721bc91ca6f3a3cb4766a73c0638fabced1012e02c28bcbf3169aca5cb1348391d76f63e2f9da4d719c4da32217a9b2949c98efebcf51e3c9c7e1d0966c784065b26bf6b319b04de558d7cb318383c29fa3a83356e1edcec69ee2d2b9c261a4ab36ad07403666f4f2b321382d22bc25bc620e23bcf48eaac8ccce297a7305d63b5b82ddf5a8eb9dc5afb305639b5d8324a5feb6a13e74d04fbdcf11b6',
    'msToken': 'bZG6YR9gtnM2c5fhGHXclc0WGcXrN9sOOb6MLWFhXH5-2RqXAxDFrfAgFiI1Ee1SVk-zYnNRe2af6amjkaeH9fdcYn4HctOp1IvORda0XEyChd8Zxczf7RE6Qm90VrapqUb6iFBivE9FvjoeVMJAnmQIYwnYWwaIAIrKxsGGh9jB1MQvgFSSUA==',
    # 'a_bogus': 'Y60fgq7ExqmVPdFtuKbxyUnUqen/NsuyMPTKSPpT7OKKT1Uc58Nl2cGRJoqCspdZbupTk9IH5EzAbxncKzXsZq9kzmpkSpXSCz/5nwXLgHJ3GPk29pmTS4GEuJ-CUC4YsKQGNNEXAUlrIg53NHchAIF97/e9Q/RMzHPWd5Uh7xu25CjqqZ1Eur6pqh-g',
    'verifyFp': 'verify_mc7mrpp3_jZ50cpm8_tTuE_4WHG_Bdc8_ilGs5tY9qhIh',
    'fp': 'verify_mc7mrpp3_jZ50cpm8_tTuE_4WHG_Bdc8_ilGs5tY9qhIh',
}

# fp = execjs.compile(open("verifyFp.js", 'r').read()).call("fp")
#
# params['verifyFp'] = fp
# params['fp'] = fp
# print("fp:::", fp)

encode_params_string = urllib.parse.urlencode(params, safe="=")
print(encode_params_string)
url = 'https://www.douyin.com/aweme/v1/web/aweme/post/?' + encode_params_string
# print(url)
a_bogus = execjs.compile(open("sourceCode.js", 'r', encoding="utf-8").read()).call("get_abgous", url)
print("a_bogus:::", a_bogus)
params['a_bogus'] = a_bogus
response = requests.get('https://www.douyin.com/aweme/v1/web/aweme/post/', params=params, cookies=cookies,
                        headers=headers)
print(response.json()["aweme_list"][0])
