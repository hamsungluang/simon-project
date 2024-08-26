import json
import traceback
import time
import re
import datetime
import random

from loguru import logger
from fake_useragent import UserAgent
from DrissionPage import ChromiumPage, ChromiumOptions
from DrissionPage.common import ActionChains
from db.RedisClient import RedisClient

"""
报错问题总结：
1.没有找到元素。切换定位失败 [验证页面load太久了]
"""


class GetCookies:
    def __init__(self, port=9222, on_off=True):
        self.port = port
        self.ua = UserAgent(browsers=['edge']).random
        self.co = ChromiumOptions().set_paths(local_port=port, user_data_path=r'D:\edge_user_data' + r'\\' + str(port))
        self.co.set_argument('--user-agent', self.ua)
        self.co.set_headless(on_off=on_off)
        self.page = ChromiumPage(addr_driver_opts=self.co)
        self.ac = ActionChains(self.page)
        self.status = True  # 用于判断获取过程是否发生异常,cookie是否正常，True为正常
        self.ip_status = True  # 用于判断ip是否正常
        self.count = 0

    def open_web(self):
        url_list = [
            'https://www.ozon.ru/product/erektsionnye-koltsa-s-biserom-komplekt-erektsionnoe-koltso-dlya-chlena-nasadka-na-chlen-dlya-809017628/?oos_search=false',
            'https://www.ozon.ru/product/koltso-erektsionnoe-dlya-chlena-nabor-silikonovyh-erektsionnyh-kolets-dlya-muzhchin-stimulyator-977739986/?oos_search=false',
            'https://www.ozon.ru/product/nabor-raznotsvetnyh-erektsionnyh-kolets-dlya-chlena-946922577/?oos_search=false',
            'https://www.ozon.ru/product/erektsionnoe-koltso-dlya-muzhchin-goluboe-igrushka-dlya-par-stimulyator-dlya-parnya-seks-nabor-953052525/?oos_search=false']
        url = random.choice(url_list)
        self.page.get('https://www.ozon.ru/')
        # self.page.get(url)
        self.page.set.window.maximized()

    def move(self, ele):
        """模拟鼠标轨迹"""
        self.ac.move_to(ele, random.randint(10, 30), random.randint(10, 30))
        time.sleep(random.uniform(0, 1))
        self.ac.move_to(ele, random.randint(10, 30), random.randint(10, 30))
        time.sleep(random.uniform(0, 1))
        self.ac.move_to(ele)

    def location(self):
        '''切换定位'''
        self.page.wait.ele_display('tag:button@@text():Китай')
        ele = self.page.ele('tag:button@@text():Китай')
        if ele:
            self.move(ele)
            time.sleep(10)
            ele.click()
            self.page.wait.ele_display('tag:button@@text():Выбрать на карте')
            ele1 = self.page.ele('tag:button@@text():Выбрать на карте')
            if ele1:
                self.move(ele1)
                time.sleep(2)
                ele1.click()
                time.sleep(10)
                self.page.wait.ele_display('tag:button@@text():Курьером')
                ele2 = self.page.ele('tag:button@@text():Курьером')
                if ele2:
                    self.move(ele2)
                    ele2.click()
                    time.sleep(5)
                    ele3 = self.page.ele('tag:div@@label=Адрес доставки')
                    ele4 = ele3.ele('tag:textarea')
                    if ele4:
                        self.move(ele4)
                        ele4.click()
                        time.sleep(2)
                        ele4.input('улица Арбат, 6/2, Москва')
                        time.sleep(5)
                        ele5 = self.page.ele('tag:span@text():улица Арбат, 6/2, Москва', timeout=20)
                        if ele5:
                            self.move(ele5)
                            ele5.click(by_js=True)
                            time.sleep(8)
                            ele6 = self.page.ele('tag:button@@text():Продолжить',timeout=20)
                            if ele6:
                                self.move(ele6)
                                ele6.click(by_js=True)
                                time.sleep(2)
                                ele7 = self.page.ele('tag:button@@text():Сохранить адрес')
                                if ele7:
                                    self.move(ele6)
                                    time.sleep(2)
                                    ele7.click()
                                    self.page.wait.load_start(timeout=20)
                                    self.page.wait.load_complete(timeout=20)
                                    time.sleep(5)

                                else:
                                    self.status = False
                                    print('切换定位失败6')
                            else:
                                self.status = False
                                print('切换定位失败5')
                        else:
                            self.status = False
                            print('切换定位失败4')
                    else:
                        self.status = False
                        print('切换定位失败3')
                else:
                    self.status = False
                    print('切换定位失败2')
            else:
                self.status = False
                print('切换定位失败1')
        else:
            self.status = False
            print('切换定位失败')

    def verification(self):
        '''过验证'''
        iframe = self.page('@title=包含  Cloudflare  安全质询的小组件 ')
        # iframe = self.page('@title=Widget containing a Cloudflare security challenge')
        if iframe:
            try:
                t = iframe('确认您是真人', timeout=30)
                self.move(iframe('确认您是真人'))
                self.move(iframe('确认您是真人'))
                # self.page.wait.ele_display(iframe('Verify you are human'))
                time.sleep(10)
                self.page.wait.ele_display(iframe('tag:input'))
                self.page.wait.ele_display(iframe('tag:input'))
                ele_checkbox = iframe('tag:input', timeout=30)
                self.move(ele_checkbox)
                time.sleep(1)
                ele_checkbox.click()
                self.page.wait.load_start()
                self.page.wait.load_complete()
            except Exception as e:
                logger.exception(e)
        else:
            print('没有验证')

    def write_birth(self):
        '''输入出生信息'''
        ele = self.page.ele('@name=birthdate')
        if ele:
            self.move(ele)
            time.sleep(2)
            ele.click()
            ele.input('01011990')
            ele1 = self.page.eles('Подтвердить')[1]
            self.move(ele1)
            time.sleep(2)
            ele1.click()
            time.sleep(3)
            self.page.refresh()
            self.page.wait.load_complete()
            time.sleep(3)
        else:
            print('没找到birthdate元素')
            self.status = False

    def get_cookies(self):
        time.sleep(5)
        cookies = self.page.cookies
        cookies['is_adult_confirmed'] = "true"
        cookies['adult_user_birthdate'] = "1991-01-04"
        # print(cookies)
        self.page.quit()
        cookies_ua = {
            'cookies': cookies,
            'ua': self.ua,
            'c_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'count': 0
        }
        return cookies_ua

    def estimate_ip(self):
        '''判断ip是否可用'''
        text = self.page.html
        if re.findall('Доступ ограничен', text, re.S):
            logger.warning('当前IP不可用，稍后重试')
            self.ip_status = False

    def estimate_location(self):
        """判断定位是否正确"""
        html = self.page.html
        state = re.findall('window.__NUXT__.state=\'(.*?)\';', html, re.S)
        if state:
            state_dic = json.loads(state[0].replace('\\\\', '\\'))
            if state_dic['location']['current']['country'] == 'Россия':
                return True

    def run(self):
        self.open_web()
        self.verification()
        self.estimate_ip()
        if self.ip_status:
            # self.write_birth()
            if self.status:
                # self.location()
                if self.status:
                    if self.estimate_location():
                        cookies_ua = self.get_cookies()
                        if self.status:
                            logger.info('cookies获取成功')
                            r = RedisClient()
                            r.rpush('OZON:COOKIES:LOCAL', str(cookies_ua))
                        else:
                            logger.warning('cookies获取失败{}'.format(self.port))
                    else:
                        logger.warning('location error')
                        self.page.quit()
                else:
                    self.page.quit()
            else:
                self.page.quit()
        else:
            self.page.quit()


if __name__ == '__main__':
    import threading
    import random


    def get(port):
        while True:
            try:
                gc = GetCookies(port)
                gc.run()
                time.sleep(random.randint(1, 5))
            except Exception:
                traceback.print_exc()


    t1 = threading.Thread(target=get, args=(9221,))
    t2 = threading.Thread(target=get, args=(9222,))
    t3 = threading.Thread(target=get, args=(9223,))
    for t in [t1]:
        t.start()
        time.sleep(random.randint(1, 5))
