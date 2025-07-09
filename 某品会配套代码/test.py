import requests
import hashlib
headers = {
    # 'Host': 'mapi.appvipshop.com',
    # 'authorization': 'OAuth api_sign=8bd9e7d814ea4dad35b46a58b4217a515445691a',
    # 'x-vip-host': 'mapi.appvipshop.com',
    # 'content-type': 'application/x-www-form-urlencoded',
    # 'user-agent': 'okhttp/4.9.1',
}

data = {
    'api_key': '23e7f28019e8407b98b84cd05b5aef2c',
    'app_name': 'shop_android',
    'app_version': '9.42.8',
    'bigSaleTagIds': '',
    'brandIds': '',
    'brandStoreSns': '',
    'categoryId': '',
    'channelId': '1',
    'channel_flag': '0_1',
    'clickFrom': 'userword',
    'client': 'android',
    'client_type': 'android',
    'couponIds': '',
    'darkmode': '0',
    'deeplink_cps': '',
    'device_model': 'Google Pixel 3',
    'did': '0.0.488b303f75e2323522a8ed6c9da1d86f.2e28ab',
    'elder': '0',
    'evgid': 'itg0e6C7desc9WOI7whauxkrce1Tnmectkj0f9gbLh7l8Yy8fZS8ASg24uPgOT1UB+J9Pn37EebSRw/foKbqomTNnj0y5EDKLAXFfooxVlQ=',
    'extParams': '{"priceVer":"2","video_playable":"1","mclabel":"1","cmpStyle":"1","statusVer":"2","ic2label":"1","video":"2","uiVer":"2","preheatTipsVer":"4","floatwin":"1","superHot":"1","exclusivePrice":"1","router":"1","coupons":"5","needVideoExplain":"1","rank":"2","needVideoGive":"1","attr":"2","bigBrand":"2","couponVer":"v2","videoExplainUrl":"1","live":"1","sellpoint":"1","reco":"1","vreimg":"1","search_tag":"2","tpl":"1","ads":"2","stdSizeVids":"","labelVer":"2","preheatView":"1"}',
    'fdc_area_id': '104104',
    'functions': 'RTRecomm,flagshipInfo,couponBarV2,lowPriceTabs,feedbackV2,otdAds,zoneCode,slotOp,survey,outfit,aiRealtime,floaterParams,tabGroupV2,bsAndSeason,propAndOpTag,parallelCall',
    'harmony_app': '0',
    'harmony_os': '0',
    'height': '2028',
    'isMultiTab': '0',
    'is_default_area': '1',
    'keyword': '纸',
    'lastPageProperty': '{"isBgToFront":"0","scene_entry_id":"-99","refer_page_id":"page_channel_1749782343450","text":"跑步鞋","module_name":"com.achievo.vipshop.search","type":"-99","is_back_page":"0"}',
    'maker': 'GOOGLE',
    'mars_cid': '2760c2a5-07c5-3a1c-a409-66e37ebaf574',
    'mobile_channel': 'rjx5hknt:::',
    'mobile_platform': '3',
    'net': 'WIFI',
    'operator': '',
    'os': 'Android',
    'osv': '11',
    'otddid': '',
    'other_cps': '',
    'page_id': 'page_te_globle_classify_search_1749782347314',
    'page_init_ts': '1749782353103',
    'phone_brand': 'google',
    'phone_model': 'pixel 3',
    'priceMax': '',
    'priceMin': '',
    'props': '',
    'province_id': '104104',
    'referer': 'com.achievo.vipshop.search.activity.TabSearchProductListActivity',
    'rom': 'Dalvik/2.1.0 (Linux; U; Android 11; Pixel 3 Build/RQ1D.210205.004)',
    'sd_tuijian': '0',
    'service_provider': '',
    'session_id': '2760c2a5-07c5-3a1c-a409-66e37ebaf574_shop_android_1749782109324',
    'skey': '6692c461c3810ab150c9a980d0c275ec',
    'sort': '0',
    'source': 'app',
    'source_app': 'android',
    'standby_id': 'rjx5hknt:::',
    'sys_version': '30',
    'tabFields': 'gender,tabs,priceTabs,discountTabs,tabGroupV2',
    'tfs_fp_token': 'BPG6dZ2Qb0ILjEURbjtRjYsZ60ZUSoTn6jVHouVdzD7YDqCc+sMG+DZpUf8Kkt1AayXNZebdeJLNe/8EnLn53uA==',
    'timestamp': '1749782353',
    'union_mark': 'blank&_&blank&_&rjx5hknt:::&_&blank&_&blank&_&blank',
    'vipService': '',
    'warehouse': 'VIP_NH',
    'width': '1080',
}
salt = "aee4c425dbb2288b80c71347cc37d04b"
li = salt
for k,v in data.items():
    li += f"{k}={v}&"
li = li.rstrip('&')
sha1 = hashlib.sha1()
sha1.update(li.encode('utf-8'))
one_enc = sha1.hexdigest()
print("第一次加密为-->",one_enc)
sha2 = hashlib.sha1()
sha2.update((salt+one_enc).encode("utf-8"))
two_enc = sha2.hexdigest()
print("第二次加密为-->",two_enc)
second = "OAuth api_sign="+ two_enc
headers['authorization'] = second

response = requests.post(
    'https://mapi.appvipshop.com/vips-mobile/rest/shopping/search/product/list/v1',
    headers=headers,
    data=data,
)
print(response.json())