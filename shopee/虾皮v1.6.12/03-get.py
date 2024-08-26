import execjs
# import requests
from curl_cffi import requests

keyword='adidas'
for i in range(1,6):
    print(f"采集第{i}页")
    url="https://shopee.co.th/api/v4/search/search_items?by=relevancy&extra_params=%7B%22global_search_session_id%22%3A%22gs-6521c30c-d5da-4d9f-97b0-00acc9a3dbe1%22%2C%22search_session_id%22%3A%22ss-433e125d-eaac-4533-b29b-b23bbbd4f50c%22%7D&keyword=nike&limit=60&match_id=11044952&newest=180&order=desc&page_type=search&scenario=PAGE_CATEGORY_SEARCH&version=2&view_session_id=220d7166-cabd-4aa5-b6e5-befa114cd988"
    k1=execjs.compile(open('./new7.js',encoding='utf-8').read())
    da=k1.call('_super1',url)
    # print(da)



    k2=execjs.compile(open('./NewAf.js',encoding='utf-8').read())
    Af=k2.call('_kkk')[0]

    # print(Af)

    header_1={
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Af-Ac-Enc-Dat":Af,
        # "Af-Ac-Enc-Sz-Token":"yQLIO24KC8Xxp5JoTbDT0g==|hDH1CcmQBVFuOYskUek40o6TIjLcwXnDBC19lySig1bHRHKJikcqAivTS4Hjd84sHkg81gBEAqwljA==|6CtL6yD02uayVt1G|08|3",#未验证，可以固定或者置空
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Cookie": "__LOCALE__null=TH; _gcl_au=1.1.1642171024.1704256502; csrftoken=yrBapIRd6xVKU1dLj1vOj3oHeTQXi0UB; SPC_R_T_ID=QVUUX6I1Bg7c0VDWVrdR3Q64ncUrQeaW/xnhpyQZkbm1egIX0RJLY7p4W13dw3NVZOW21yNV3uEi1mD5uRSNWhQHO8cpTCE3bfN+E0BFnMf8tX1sT4yMGxtx+UnU6LDWqYYykGb0SsCC6UAMnWnQj9wLbF6yyHPSgq05wQjVjkk=; SPC_R_T_IV=SHhONWlPZDBKTktZOEppaQ==; SPC_T_ID=QVUUX6I1Bg7c0VDWVrdR3Q64ncUrQeaW/xnhpyQZkbm1egIX0RJLY7p4W13dw3NVZOW21yNV3uEi1mD5uRSNWhQHO8cpTCE3bfN+E0BFnMf8tX1sT4yMGxtx+UnU6LDWqYYykGb0SsCC6UAMnWnQj9wLbF6yyHPSgq05wQjVjkk=; SPC_T_IV=SHhONWlPZDBKTktZOEppaQ==; SPC_SI=1MqTZQAAAAA5b2NBSjBYax9bDgAAAAAAakFTUWhwN2I=; SPC_SEC_SI=v1-Q2VDU1BLRldyQjlKcld4OPazU4b68cCntm+1bpEvM3fgr71wFUcKDf8xe0ed6TGyRinNZ2HBybw85dMTbMPt5dvCADIm8BPQgV+t1ymYYAA=; SPC_F=8odApgeDZLtOHpn3OvMS9vWkaLQXpgKl; REC_T_ID=76c6eac9-a9f1-11ee-a643-d230f9229ce9; _sapid=e5b00dc61c5399a32c431c1f7955810f14094a624f43f01fcfc094b8; _QPWSDCXHZQA=5566b04a-1b16-4c83-acdb-b8c644f5fd48; REC7iLP4Q=193fb04c-7c69-4cb8-9766-30b3400c40da; language=en; shopee_webUnique_ccd=1UQ8dGAlW11x8e4uoMJh8A%3D%3D%7CERX0Jst0b0uD9oH1EDF8VHFQauiqOJAJx%2FVlRL6wuAqavzkV%2FahC6RNcUtftl1fFtB4v4V%2FNx1DDAbA%3D%7CvP3Y4l3XDME8PfnX%7C08%7C3; ds=9d35f603dc78585e5e9ac4d1e4e10e95; _gid=GA1.3.1436509073.1704256549; _ga=GA1.1.1074487702.1704256508; _ga_LB1RXY1EGG=GS1.1.1704256507.1.1.1704258507.0.0.0; AMP_TOKEN=%24RETRIEVING",#你自己的cookie
        "Pragma": "no-cache",
        "Referer": "https://shopee.co.th/search?category=11044952&keyword=nike&page=2",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"120\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"120\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        # "Sz-Token":"1UQ8dGAlW11x8e4uoMJh8A==|ERX0Jst0b0uD9oH1EDF8VHFQauiqOJAJx/VlRL6wuAqavzkV/ahC6RNcUtftl1fFtB4v4V/Nx1DDAbA=|vP3Y4l3XDME8PfnX|08|3",#未验证，可以固定或者置空
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        # 'x-sap-access-f': '3.2.120.2.0|13|3.4.0-2_5.1.0_0_330|ba9328e658094ddf909a9f0ba942685efffcc14cf3a546|10900|1100',
        # 'x-sap-access-s': 'tT1iIKZAwY0MAbApuLXN-bqnTQqerTS_2UBVIPb4T98=',
        # 'x-sap-access-t': '1704258507',
        "X-Api-Source": "pc",
        # "X-Csrftoken": "yrBapIRd6xVKU1dLj1vOj3oHeTQXi0UB",#未验证，可以固定或者置空
        "X-Requested-With": "XMLHttpRequest",
        "X-Shopee-Language": "en",
        # 'x-sap-ri': "487f9565676b7cef2bd54b3d0301650f70ba01912e3cbcf5ecf1",
      # 'x-sap-sec': "h/ngIhFU+acVMacVB7cAMaJVB7cVMaJVMacvMacV3a3VMgc1MacuMacVng9B1SmVMadbM1cVXaMVMzR7IS8XcDlHZ6R5hZEPrt4N018Cntp3vYeioY4s/Ouk6or5YLhaBmzxRk/a9G5GqpHJz0cNfmyvT4eJNHpiY9NRMU1ICgwCEUP6bGl2rjptvexJhbvFccS1OZV2uYbg0wo15uREbwtYohJlaYQm+/h/8kMqksR+UXC9DfvZfp9fzGHOxJ66dp2Har5CEKoJy5T3LX/iFOAgZ1Es6rizb37zrYdq36oDJ0WP9M7pTpm8nmWsbRaujXx0Pjug6HPSs9/tMKu0OZNtOFFMwlftZmx2TsU7odv4Oz7b70EBaverrPdKU1fx6izO4s3UHFU728HkF2EJ9GBgmkrFNXzynvnGPo68vHRDAXa3sbpNLzhEE7w90JAa3zAyNZajx63JD7ggsC0qM63/LteuH4dBP+3gRFQ1U/nW29WKtgaehW1LgshuDFUMumrx3HN3yMaKOFMdHyhut6lcKdrZdC0Ju6d+1+LLwx+1MnbKMaTbm/4eu+rmaBuseMiOdgxrnLHsovycK8/zp8ddvhyUIZIeFPyEBs+WtdvkAxukV0RR7Fvy9ByxeI1d+iOxdhtHSIVdkSzTvqcDbUITZF9dooHmjFjXMJCTNSHk8amVMaQp33MRhK3031cVMadX1PqBNacVMbFVMacwMacVwatgCDowRrzFdQerVmQOcZX5BncAMacV3KLRsZfo3ehVMacVNacXMamVBacAMacVNacVMbFVMacwMacVAbMGhJT+vs9sp6H7Ua/RZnqumItAMacV3sL2hUhK3ecVMacV",
        "X-Sz-Sdk-Version": "3.4.0-2&1.6.12"
    }
    header_2=dict(da,**header_1)
    # print(header_2)

    res = requests.get(url=url, headers=header_2,impersonate="chrome110")
    print(res.text)