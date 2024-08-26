import execjs
import json
import urllib
import time
import random

from curl_cffi import requests
from urllib import parse
from db.SqlClient import SqlClient
from db.RedisClient import RedisClient
from loguru import logger


class YandexSpider:
    def __init__(self):
        self.sql_client = SqlClient()
        self.redis_client = RedisClient()
        cookies = {
            "is_gdpr": "0",
            "is_gdpr_b": "CI/1PRDZywE=",
            "gdpr": "0",
            "_ym_uid": "1692581700422354097",
            "my": "YycCAAEA",
            "_ym_d": "1693465530",
            "yandexuid": "3819412481692178607",
            "yuidss": "3819412481692178607",
            "i": "sw199pjvOpfcgN+kUrTdbyA8bniNMrIdrfGMZAO70cdoyfaiMqVpqJpdNhaaRuq6J2oCJ2jJuHZx5NnFaVHkuNSobxc=",
            "ymex": "1696125138.oyu.2349301871693464243#2008824247.yrts.1693464247",
            "yp": "2008825478.multib.1#1693619538.yu.2349301871693464243#2008919882.udn.cDpsdWFuZ2h4",
            "L": "WzRmQ0lhVmZ9WkNkemJUbVMAXUVlcGENLkUGJwkaIQ==.1693559882.15452.331649.e6d8104b99379bf895f103d8e51cdc6e",
            "yandex_login": "luanghx",
            "yashr": "4500314571696374745",
            "Session_id": "3:1698022816.5.0.1693559882272:bhZecA:c8.1.2:1|1885910048.0.2.0:3.3:1693559882|3:10277589.683669.kE7LBXGrKMur-l3RUMtzIYe-LMk",
            "sessar": "1.1183.CiB823jN3jTq7Gvpt7MHEcYk63WmWL_N_-7GtquzeaSTcw.BR2tVYT_NvpBOdD1xcJuyd1lKdrAXj-zhyPWNM4dbb8",
            "sessionid2": "3:1698022816.5.0.1693559882272:bhZecA:c8.1.2:1|1885910048.0.2.0:3.3:1693559882|3:10277589.683669.fakesign0000000000000000000",
            "_ym_isad": "2",
            "bh": "EkAiQ2hyb21pdW0iO3Y9IjExOCIsIk1pY3Jvc29mdCBFZGdlIjt2PSIxMTgiLCJOb3Q9QT9CcmFuZCI7dj0iOTkiGgUieDg2IiIPIjExOC4wLjIwODguNTciKgI/MDoJIldpbmRvd3MiQggiMTUuMC4wIkoEIjY0IlJbIkNocm9taXVtIjt2PSIxMTguMC41OTkzLjg5IiwiTWljcm9zb2Z0IEVkZ2UiO3Y9IjExOC4wLjIwODguNTciLCJOb3Q9QT9CcmFuZCI7dj0iOTkuMC4wLjAiIg==",
            "_yasc": "ck9SPou3IrhPn13XEI75XdortGyrghoog5bur9DMYI48NhIUEkaLiuU+UdFVjUorDq1cu6b4"
        }
        headers = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://wordstat.yandex.ru",
            "Referer": "https://wordstat.yandex.ru/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69",
            "X-Requested-With": "XMLHttpRequest",
            "$X-Retpath-Y": "https://wordstat.yandex.ru/#\\u0021/?words=%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C%20%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.s = requests.Session()
        self.s.cookies.update(cookies)
        self.s.headers.update(headers)

    def search_keyword(self, word_id):
        sql = 'select word from oz_keyword where id=%s ;' % word_id
        return self.sql_client.search(sql)

    def get_resp(self, keyword):
        url = "https://wordstat.yandex.ru/stat/words"
        data = {
            "db": "",
            "filter": "all",
            "map": "world",
            "page": "1",
            "page_type": "words",
            "period": "monthly",
            "regions": "",
            "sort": "cnt",
            "type": "list",
            "words": keyword
        }
        try:
            response = self.s.post(url, data=data, impersonate='edge101')
        except Exception:
            return self.get_resp(keyword)
        else:
            try:
                text = response.json()
                return text
            except Exception:
                logger.exception('cookie失效')
                return None

    def decode_text(self, text):
        ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69'
        with open('D:\OzonSpider\yandex\DecodeText.js', 'r', encoding='utf-8') as file:
            result = file.read()
            context1 = execjs.compile(result)
            a = context1.call("decode", ua, text['data'], text['key'])
            b = urllib.parse.unquote(a)
            data = json.loads(b)
            return data

    def parse_text(self, data):
        result_list = []
        if data['content'].get('includingPhrases'):
            for l in data['content']['includingPhrases']['items']:
                if l['phrase'] != 'none':
                    result_id = self.insert_word(l['phrase'])
                    l['result_id'] = result_id
                    l['number'] = l['number'].replace(u'\xa0', '')
                    l['type'] = 0
                    result_list.append(l)
                else:
                    continue
        if data['content'].get('phrasesAssociations'):
            for r in data['content']['phrasesAssociations']['items']:
                if r['phrase'] != 'none':
                    result_id = self.insert_word(r['phrase'])
                    r['result_id'] = result_id
                    r['number'] = r['number'].replace(u'\xa0', '')
                    r['type'] = 1
                    result_list.append(r)
                else:
                    continue
        return result_list

    def save_data(self, word_id, word, data):
        sql_insert = "insert into db_ozon.yandex_keyword(word_id, word, result_id, result_word, result_count, `type`) values (%s,'%s',%s,'%s','%s',%s);" % (
            word_id, word.replace("'", r"\'").replace('"', r'\"'), data['result_id'],
            data['phrase'].replace("'", r"\'").replace('"', r'\"'), data['number'], data['type'])
        self.sql_client.write(sql_insert)

    def insert_word(self, word):
        sql_insert = "insert ignore into db_ozon.oz_keyword(word) value ('%s');" % word.replace("'", r"\'").replace('"',
                                                                                                                    r'\"')
        self.sql_client.write(sql_insert)
        sql_search = "select id, word from oz_keyword where word='%s'" % word.replace("'", r"\'").replace('"', r'\"')
        id = self.sql_client.search(sql_search)[0][0]
        return id

    def to_redis(self, a):
        sql = "select word_id from monitor_keyword where monitor_status=1 limit %s,10;" % a
        word_id_list = self.sql_client.search(sql)
        return word_id_list

    def everyday_to_redis(self):
        a = 0
        while True:
            word_id_list = self.to_redis(a)
            if word_id_list:
                for w in word_id_list:
                    self.redis_client.rpush(name='YANDEX', value=w[0])
                a += 10
            else:
                break

    def run(self):
        while True:
            word_id = self.redis_client.blpop('YANDEX')
            if word_id:
                try:
                    word_t = self.search_keyword(word_id)
                    if word_t:
                        word = word_t[0][0]
                        if word != 'None' and word:
                            logger.info('正在获取{}', word)
                            text = self.get_resp(word)
                            if text:
                                data = self.decode_text(text)
                                result_list = self.parse_text(data)
                                if result_list:
                                    for r in result_list:
                                        self.save_data(word_id, word, r)
                                    # time.sleep(random.randint(0, 2))
                            else:
                                self.redis_client.rpush('YANDEX', word_id)
                                break
                except Exception:
                    logger.exception('出现错误')
                    self.redis_client.rpush('YANDEX', word_id)
                    break


if __name__ == '__main__':
    ys = YandexSpider()
    ys.everyday_to_redis()
    ys.run()
