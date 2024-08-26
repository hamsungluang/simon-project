import execjs
# import requests
from curl_cffi import requests
url='https://shopee.co.th/api/v4/search/search_items?by=relevancy&extra_params=%7B%22global_search_session_id%22%3A%22gs-77fd6f22-e782-422d-a0d8-8fca9a9304e8%22%2C%22search_session_id%22%3A%22ss-600202f4-6b55-45a2-b017-d82a1651a6a6%22%7D&keyword=nike&limit=60&newest=60&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2&view_session_id=2c33168d-ffe4-4369-b76b-6f89a696f89b'
k1=execjs.compile(open('./xin.js',encoding='utf-8').read())
da=k1.call('_super1',url)
# print(da)



k2=execjs.compile(open('./Af.js',encoding='utf-8').read())
Af=k2.call('_kkk')[0]

# print(Af)

header_1={
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Af-Ac-Enc-Dat":Af ,
    # "Af-Ac-Enc-Sz-Token":"yQLIO24KC8Xxp5JoTbDT0g==|hDH1CcmQBVFuOYskUek40o6TIjLcwXnDBC19lySig1bHRHKJikcqAivTS4Hjd84sHkg81gBEAqwljA==|6CtL6yD02uayVt1G|08|3",#未验证，可以固定或者置空
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Cookie": "SPC_F=xVbwS1AE0RSlCvAcr2W0GMy7Y0mgzV6x; REC_T_ID=ee5ae532-54a7-11ee-bd61-2cea7fa8964e; SPC_R_T_ID=mQ0bASHyFFL3ZD+hxmp76Q7pELflHKOMoB7WTCZnFQ6HIQUGh5tCdDp+wx5ePpq/7sE110ayzGXe+QX/HSCEQ1FT+y1tVctNReyCRl+Era5cle9YVpyfjKlf7PcdPwNx7BjMGgDPw3RE/E3U00sCNhqQ49x1vGF1j2SwN11g3dM=; SPC_R_T_IV=WDhidjdlbmdvYmNYaEtLSQ==; SPC_T_ID=mQ0bASHyFFL3ZD+hxmp76Q7pELflHKOMoB7WTCZnFQ6HIQUGh5tCdDp+wx5ePpq/7sE110ayzGXe+QX/HSCEQ1FT+y1tVctNReyCRl+Era5cle9YVpyfjKlf7PcdPwNx7BjMGgDPw3RE/E3U00sCNhqQ49x1vGF1j2SwN11g3dM=; SPC_T_IV=WDhidjdlbmdvYmNYaEtLSQ==; SPC_SI=1y8AZQAAAABRdUlnM2hKegsMdwAAAAAAenpMRUJEeXA=; _gcl_au=1.1.478050411.1694879074; csrftoken=fznw2Q4Gq4eT0QRz6L1of7MtX0zldSgP; _QPWSDCXHZQA=9f34efae-e241-42df-a279-a33fd414f21d; REC7iLP4Q=1ce25649-9f7e-41e0-8a11-1cd7d6880e12; _med=refer; shopee_webUnique_ccd=EyK1gDY2Y9N%2BD2ifaf4N7A%3D%3D%7CCfk2yPTy63V4OZUqrtptGBOArfWFWejJN5SVhmuuBsQP8n4G2nA7xe2DDhA%2FYKy05a%2BPYr4Dde8%3D%7C%2FkN0e%2FNENGKy7lSv%7C08%7C3; ds=4be19d48f851333a8ff71f99e6d9eb81; AMP_TOKEN=%24ERROR; _ga=GA1.2.1872575390.1694879100; _gid=GA1.2.1002811726.1694879110; _ga_EZBZ7XZP0H=GS1.1.1694879100.1.1.1694879133.27.0.0",#你自己的cookie
    "Pragma": "no-cache",
    "Referer": "https://shopee.co.th/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2%E0%B8%96%E0%B8%B7%E0%B8%AD-%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2-10-%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%B4%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B9%8C-(A291)-%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2%E0%B8%9C%E0%B9%89%E0%B8%B2-i.13672518.19568184133?sp_atk=7927b538-a2a1-4841-b0a1-a0df8c7ae274&xptdk=7927b538-a2a1-4841-b0a1-a0df8c7ae274",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    # "Sz-Token":"yQLIO24KC8Xxp5JoTbDT0g==|hDH1CcmQBVFuOYskUek40o6TIjLcwXnDBC19lySig1bHRHKJikcqAivTS4Hjd84sHkg81gBEAqwljA==|6CtL6yD02uayVt1G|08|3",#未验证，可以固定或者置空
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
    "X-Api-Source": "pc",
    # "X-Csrftoken": "KcHvOyJS50fBX9TfrxaseQrCFR3TXLJ1",#未验证，可以固定或者置空
    "X-Requested-With": "XMLHttpRequest",
    "X-Shopee-Language": "en",
    "X-Sz-Sdk-Version": "3.0.0-2&1.5.1"
}
header_2=dict(da,**header_1)
# print(header_2)

res = requests.get(url=url, headers=header_2,impersonate="chrome110")
print(res.text)