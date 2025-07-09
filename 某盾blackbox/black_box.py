import requests
from loguru import logger
import time
import random
import base64
from Crypto.Cipher import DES3
from Crypto.Util.Padding import pad, unpad
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64
import urllib.parse
import re
import json

def OOQO0O(Ooo0Q, oQoOQ):
    return Ooo0Q <= oQoOQ

def oQ000o(Ooo0Q, oQoOQ):
    return Ooo0Q // oQoOQ

def Q0O0oQ(Ooo0Q, oQoOQ):
    return Ooo0Q ^ oQoOQ

def oQQOo0(Ooo0Q, oQoOQ):
    return Ooo0Q >> oQoOQ

def QOOQQo(Ooo0Q, oQoOQ):
    return Ooo0Q | oQoOQ

def OOQoQQ(Ooo0Q, oQoOQ):
    return Ooo0Q & oQoOQ

def Qo0O0o(Ooo0Q, oQoOQ):
    return Ooo0Q != oQoOQ

def oQQQQQ(Ooo0Q, oQoOQ):
    return Ooo0Q * oQoOQ

def OoQOQQ(Ooo0Q, oQoOQ):
    return Ooo0Q << oQoOQ

def QOQooo(Ooo0Q, oQoOQ):
    return Ooo0Q % oQoOQ

def QQ0QoO(Ooo0Q, oQoOQ):
    return Ooo0Q - oQoOQ

def QO00o(Ooo0Q, oQoOQ):
    return Ooo0Q or oQoOQ

def QoOoO0(Ooo0Q, oQoOQ):
    return Ooo0Q >= oQoOQ

def ooO0oO(Ooo0Q, oQoOQ):
    return isinstance(Ooo0Q, oQoOQ)

def o0OO0O(Ooo0Q, oQoOQ):
    return Ooo0Q > oQoOQ

def QOoOQ0(Ooo0Q, oQoOQ):
    return Ooo0Q + oQoOQ

def oOoQoo(Ooo0Q, oQoOQ):
    return (Ooo0Q % 0x100000000) >> oQoOQ

def oQoo0o(Ooo0Q, oQoOQ):
    return Ooo0Q == oQoOQ

def QQ0o00(Ooo0Q, oQoOQ):
    return Ooo0Q < oQoOQ

def OO0oQo(Ooo0Q, oQoOQ):
    return Ooo0Q != oQoOQ

def Qo00O0(Ooo0Q, oQoOQ):
    return Ooo0Q == oQoOQ

def OOooo(Ooo0Q, oQoOQ):
    return Ooo0Q and oQoOQ

class oo0OOQ:
    @staticmethod
    def _x64Add(Ooo0Q, oQoOQ):
        Ooo0Q = [oOoQoo(Ooo0Q[0], 16), OOQoQQ(Ooo0Q[0], 65535), oOoQoo(Ooo0Q[1], 16), OOQoQQ(Ooo0Q[1], 65535)]
        oQoOQ = [oOoQoo(oQoOQ[0], 16), OOQoQQ(oQoOQ[0], 65535), oOoQoo(oQoOQ[1], 16), OOQoQQ(oQoOQ[1], 65535)]
        o0Ooo = [0, 0, 0, 0]
        o0Ooo[3] += QOoOQ0(Ooo0Q[3], oQoOQ[3])
        o0Ooo[2] += oOoQoo(o0Ooo[3], 16)
        o0Ooo[3] &= 65535
        o0Ooo[2] += QOoOQ0(Ooo0Q[2], oQoOQ[2])
        o0Ooo[1] += oOoQoo(o0Ooo[2], 16)
        o0Ooo[2] &= 65535
        o0Ooo[1] += QOoOQ0(Ooo0Q[1], oQoOQ[1])
        o0Ooo[0] += oOoQoo(o0Ooo[1], 16)
        o0Ooo[1] &= 65535
        o0Ooo[0] += QOoOQ0(Ooo0Q[0], oQoOQ[0])
        o0Ooo[0] &= 65535
        return [QOOQQo(OoQOQQ(o0Ooo[0], 16), o0Ooo[1]), QOOQQo(OoQOQQ(o0Ooo[2], 16), o0Ooo[3])]

    @staticmethod
    def _x64Multiply(Ooo0Q, oQoOQ):
        Ooo0Q = [oOoQoo(Ooo0Q[0], 16), OOQoQQ(Ooo0Q[0], 65535), oOoQoo(Ooo0Q[1], 16), OOQoQQ(Ooo0Q[1], 65535)]
        oQoOQ = [oOoQoo(oQoOQ[0], 16), OOQoQQ(oQoOQ[0], 65535), oOoQoo(oQoOQ[1], 16), OOQoQQ(oQoOQ[1], 65535)]
        o0Ooo = [0, 0, 0, 0]
        o0Ooo[3] += oQQQQQ(Ooo0Q[3], oQoOQ[3])
        o0Ooo[2] += oOoQoo(o0Ooo[3], 16)
        o0Ooo[3] &= 65535
        o0Ooo[2] += oQQQQQ(Ooo0Q[2], oQoOQ[3])
        o0Ooo[1] += oOoQoo(o0Ooo[2], 16)
        o0Ooo[2] &= 65535
        o0Ooo[2] += oQQQQQ(Ooo0Q[3], oQoOQ[2])
        o0Ooo[1] += oOoQoo(o0Ooo[2], 16)
        o0Ooo[2] &= 65535
        o0Ooo[1] += oQQQQQ(Ooo0Q[1], oQoOQ[3])
        o0Ooo[0] += oOoQoo(o0Ooo[1], 16)
        o0Ooo[1] &= 65535
        o0Ooo[1] += oQQQQQ(Ooo0Q[2], oQoOQ[2])
        o0Ooo[0] += oOoQoo(o0Ooo[1], 16)
        o0Ooo[1] &= 65535
        o0Ooo[1] += oQQQQQ(Ooo0Q[3], oQoOQ[1])
        o0Ooo[0] += oOoQoo(o0Ooo[1], 16)
        o0Ooo[1] &= 65535
        o0Ooo[0] += QOoOQ0(QOoOQ0(QOoOQ0(oQQQQQ(Ooo0Q[0], oQoOQ[3]), oQQQQQ(Ooo0Q[1], oQoOQ[2])), oQQQQQ(Ooo0Q[2], oQoOQ[1])), oQQQQQ(Ooo0Q[3], oQoOQ[0]))
        o0Ooo[0] &= 65535
        return [QOOQQo(OoQOQQ(o0Ooo[0], 16), o0Ooo[1]), QOOQQo(OoQOQQ(o0Ooo[2], 16), o0Ooo[3])]

    @staticmethod
    def _x64Rotl(Ooo0Q, oQoOQ):
        oQoOQ %= 64
        if oQoOQ == 0:
            return Ooo0Q
        if oQoOQ < 32:
            return [QOOQQo(OoQOQQ(Ooo0Q[0], oQoOQ), oOoQoo(Ooo0Q[1], QQ0QoO(32, oQoOQ))), QOOQQo(OoQOQQ(Ooo0Q[1], oQoOQ), oOoQoo(Ooo0Q[0], QQ0QoO(32, oQoOQ)))]
        oQoOQ -= 32
        return [QOOQQo(OoQOQQ(Ooo0Q[1], oQoOQ), oOoQoo(Ooo0Q[0], QQ0QoO(32, oQoOQ))), QOOQQo(OoQOQQ(Ooo0Q[0], oQoOQ), oOoQoo(Ooo0Q[1], QQ0QoO(32, oQoOQ)))]

    @staticmethod
    def _x64LeftShift(Ooo0Q, oQoOQ):
        oQoOQ %= 64
        if oQoOQ == 0:
            return Ooo0Q
        if oQoOQ < 32:
            return [QOOQQo(OoQOQQ(Ooo0Q[0], oQoOQ), oOoQoo(Ooo0Q[1], QQ0QoO(32, oQoOQ))), OoQOQQ(Ooo0Q[1], oQoOQ)]
        return [OoQOQQ(Ooo0Q[1], QQ0QoO(oQoOQ, 32)), 0]

    @staticmethod
    def _x64Xor(Ooo0Q, oQoOQ):
        return [Q0O0oQ(Ooo0Q[0], oQoOQ[0]), Q0O0oQ(Ooo0Q[1], oQoOQ[1])]

    @staticmethod
    def _x64Fmix(Ooo0Q):
        Ooo0Q = oo0OOQ._x64Xor(Ooo0Q, [0, oOoQoo(Ooo0Q[0], 1)])
        Ooo0Q = oo0OOQ._x64Multiply(Ooo0Q, [4283543511, 3981806797])
        Ooo0Q = oo0OOQ._x64Xor(Ooo0Q, [0, oOoQoo(Ooo0Q[0], 1)])
        Ooo0Q = oo0OOQ._x64Multiply(Ooo0Q, [3301882366, 444984403])
        Ooo0Q = oo0OOQ._x64Xor(Ooo0Q, [0, oOoQoo(Ooo0Q[0], 1)])
        return Ooo0Q

    @staticmethod
    def hash128(Ooo0Q, oQoOQ=0):
        Ooo0Q = Ooo0Q or ""
        oQoOQ = oQoOQ or 0
        oQOO0 = QOQooo(len(Ooo0Q), 16)
        ooo00 = QQ0QoO(len(Ooo0Q), oQOO0)
        oQ0QQ = [0, oQoOQ]
        oO0oO = [0, oQoOQ]
        ooQOo = [0, 0]
        QOOOo = [0, 0]
        ooooQ = [2277735313, 289559509]
        QO00o = [1291169091, 658871167]
        QQQQQ = 0
        while QQQQQ < ooo00:
            ooQOo = [QOOQQo(QOOQQo(QOOQQo(OOQoQQ(ord(Ooo0Q[QQQQQ + 4]), 255), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 5]), 255), 8)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 6]), 255), 16)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 7]), 255), 24)), QOOQQo(QOOQQo(QOOQQo(OOQoQQ(ord(Ooo0Q[QQQQQ]), 255), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 1]), 255), 8)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 2]), 255), 16)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 3]), 255), 24))]
            QOOOo = [QOOQQo(QOOQQo(QOOQQo(OOQoQQ(ord(Ooo0Q[QQQQQ + 12]), 255), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 13]), 255), 8)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 14]), 255), 16)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 15]), 255), 24)), QOOQQo(QOOQQo(QOOQQo(OOQoQQ(ord(Ooo0Q[QQQQQ + 8]), 255), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 9]), 255), 8)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 10]), 255), 16)), OoQOQQ(OOQoQQ(ord(Ooo0Q[QQQQQ + 11]), 255), 24))]
            ooQOo = oo0OOQ._x64Multiply(ooQOo, ooooQ)
            ooQOo = oo0OOQ._x64Rotl(ooQOo, 31)
            ooQOo = oo0OOQ._x64Multiply(ooQOo, QO00o)
            oQ0QQ = oo0OOQ._x64Xor(oQ0QQ, ooQOo)
            oQ0QQ = oo0OOQ._x64Rotl(oQ0QQ, 27)
            oQ0QQ = oo0OOQ._x64Add(oQ0QQ, oO0oO)
            oQ0QQ = oo0OOQ._x64Add(oo0OOQ._x64Multiply(oQ0QQ, [0, 5]), [0, 1390208809])
            QOOOo = oo0OOQ._x64Multiply(QOOOo, QO00o)
            QOOOo = oo0OOQ._x64Rotl(QOOOo, 33)
            QOOOo = oo0OOQ._x64Multiply(QOOOo, ooooQ)
            oO0oO = oo0OOQ._x64Xor(oO0oO, QOOOo)
            oO0oO = oo0OOQ._x64Rotl(oO0oO, 31)
            oO0oO = oo0OOQ._x64Add(oO0oO, oQ0QQ)
            oO0oO = oo0OOQ._x64Add(oo0OOQ._x64Multiply(oO0oO, [0, 5]), [0, 944331445])
            QQQQQ += 16
        ooQOo = [0, 0]
        QOOOo = [0, 0]
        if oQOO0 >= 15:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 14])], 48))
        if oQOO0 >= 14:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 13])], 40))
        if oQOO0 >= 13:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 12])], 32))
        if oQOO0 >= 12:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 11])], 24))
        if oQOO0 >= 11:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 10])], 16))
        if oQOO0 >= 10:
            QOOOo = oo0OOQ._x64Xor(QOOOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 9])], 8))
        if oQOO0 >= 9:
            QOOOo = oo0OOQ._x64Xor(QOOOo, [0, ord(Ooo0Q[QQQQQ + 8])])
            QOOOo = oo0OOQ._x64Multiply(QOOOo, QO00o)
            QOOOo = oo0OOQ._x64Rotl(QOOOo, 33)
            QOOOo = oo0OOQ._x64Multiply(QOOOo, ooooQ)
            oO0oO = oo0OOQ._x64Xor(oO0oO, QOOOo)
        if oQOO0 >= 8:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 7])], 56))
        if oQOO0 >= 7:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 6])], 48))
        if oQOO0 >= 6:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 5])], 40))
        if oQOO0 >= 5:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 4])], 32))
        if oQOO0 >= 4:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 3])], 24))
        if oQOO0 >= 3:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 2])], 16))
        if oQOO0 >= 2:
            ooQOo = oo0OOQ._x64Xor(ooQOo, oo0OOQ._x64LeftShift([0, ord(Ooo0Q[QQQQQ + 1])], 8))
        if oQOO0 >= 1:
            ooQOo = oo0OOQ._x64Xor(ooQOo, [0, ord(Ooo0Q[QQQQQ])])
            ooQOo = oo0OOQ._x64Multiply(ooQOo, ooooQ)
            ooQOo = oo0OOQ._x64Rotl(ooQOo, 31)
            ooQOo = oo0OOQ._x64Multiply(ooQOo, QO00o)
            oQ0QQ = oo0OOQ._x64Xor(oQ0QQ, ooQOo)
        oQ0QQ = oo0OOQ._x64Xor(oQ0QQ, [0, len(Ooo0Q)])
        oO0oO = oo0OOQ._x64Xor(oO0oO, [0, len(Ooo0Q)])
        oQ0QQ = oo0OOQ._x64Add(oQ0QQ, oO0oO)
        oO0oO = oo0OOQ._x64Add(oO0oO, oQ0QQ)
        oQ0QQ = oo0OOQ._x64Fmix(oQ0QQ)
        oO0oO = oo0OOQ._x64Fmix(oO0oO)
        oQ0QQ = oo0OOQ._x64Add(oQ0QQ, oO0oO)
        oO0oO = oo0OOQ._x64Add(oO0oO, oQ0QQ)
        return f"{oQ0QQ[0]:08x}{oQ0QQ[1]:08x}{oO0oO[0]:08x}{oO0oO[1]:08x}"
    


def get_blackbox(token_id):
    chars = "ghijklmnopqrstuv"
    all_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return chars[int(token_id[0], 16)] + token_id[1:4] + random.choice(all_chars) + token_id[4:14] + random.choice(all_chars) + token_id[14:22] + random.choice(all_chars) + token_id[22]



def RSA_Public_Encrypt(plain_text):
    # RSA 公钥
    public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuR3+MuPOVYuAKOS6O+J/ds+JAesgyFforFupDiDBBMTItdXyMrG6gUPFxj/pT/9uQSq8Zxl7BrdiKdi0G2ppEn4Nym+VRLTv2+lNa3kvlrj25Lop7wDZkVRecK5oDvdaQHrm4KKiF7jZNbHEreWGsINLpGvzBMRNztRtOJ6+XEQIDAQAB"

    # 加载公钥
    key = RSA.import_key(base64.b64decode(public_key))

    # 使用 PKCS1_v1_5 进行加密
    cipher = PKCS1_v1_5.new(key)
    encrypted_data = cipher.encrypt(plain_text.encode("utf-8"))

    # 返回 Base64 编码的加密结果
    return base64.b64encode(encrypted_data).decode("utf-8")


def replace_characters(input_str):
    return input_str.replace("+", "~")


def swap_characters_3DES2(s):
    # 使用字典映射实现字符互换
    swap_map = {"i": "j", "j": "i", "I": "J", "J": "I"}
    # 使用列表推导式逐个字符替换
    swapped_s = "".join([swap_map.get(char, char) for char in s])
    return swapped_s


def encrypt_3des_cbc(data, key):
    iv = "12345678"  # 3DES 使用8字节IV
    block_size = DES3.block_size

    # 对数据进行填充
    data = pad(data.encode("latin-1"), block_size)

    cipher = DES3.new(key.encode("latin-1"), DES3.MODE_CBC, iv.encode("latin-1"))
    encrypted = cipher.encrypt(data)

    return replace_characters(
        swap_characters_3DES2(base64.b64encode(encrypted).decode("latin-1").swapcase())
    )


def generate_random_string():
    # 字符集
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    # 随机生成 127 长度的字符串
    random_string = "".join(random.choice(characters) for _ in range(108))
    # 在随机位置插入一个反斜杠
    insert_position = random.randint(0, len(random_string))
    random_string = (
        random_string[:insert_position] + "\\" + random_string[insert_position:]
    )
    return random_string


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
    "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}


partner = "jxhk"
app_name = "jxhk_web"
token_id = (
    partner
    + "-"
    + str(int(time.time() * 1000))
    + "-"
    + "".join(random.choices("0123456789abcdef", k=12))
)


timestamp = (
    str(int(time.time() * 1000)) + "-1" + "".join(random.choices("0123456789", k=10))
)
key = timestamp[:-1]

logger.info(key)


明文需要填充
de_a = ""
de_b = ""
de_c = ""
de_d = ""
de_g = ""
de_f = "1^^0^^0^^0^^0^^0"
de_ct = str(random.randint(5282, 5340))


a = encrypt_3des_cbc(de_a, key)
b = encrypt_3des_cbc(de_b, key)
c = encrypt_3des_cbc(de_c, key)
d = encrypt_3des_cbc(de_d, key)
g = encrypt_3des_cbc(de_g, key)
f = encrypt_3des_cbc(de_f, key)
e = generate_random_string()
v = "JZuFK8iZfzhZG+BaqcUjAgNuPh8lFrtHCX3Ev7uGAGTj9gLkI0nL5bb/QS7zhKew"
w = encrypt_3des_cbc(v, key)
ct = encrypt_3des_cbc(de_ct, key)
idf = RSA_Public_Encrypt(timestamp)

params = {
    "partner": partner,
    "app_name": app_name,
    "token_id": token_id,
    "a": a,
    "b": b,
    "c": c,
    "d": d,
    "g": g,
    "f": f,
    "e": e,
    "v": v,
    "idf": idf,
    "w": w,
    "ct": ct,
    "_callback": f"_{str(int(time.time() * 1000))}_{str(random.randint(1000,9999))}",
}
# 将字典转换为URL编码的查询字符串
query_string = "?" + urllib.parse.urlencode(params)
print(query_string)
h = oo0OOQ.hash128(query_string)
logger.info(h)
params['h'] = h
logger.debug(params)

response = requests.get(
    "https://fp.tongdun.net/web3_8/profile.json", params=params, headers=headers
)

logger.success(response.text)
tokenId = re.findall('\"tokenId\":\"(.*?)\",\"xxid\"', response.text)[0]
logger.debug(f"tokenID：{tokenId}")
BlackBox = get_blackbox(tokenId)
logger.success(f"BlackBox：{BlackBox}")





headers = {
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://www.juneyaoair.com',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    'accept': 'application/json, text/plain, */*',
    'blackbox': BlackBox,
    'channelno': 'B2C',
    'clientversion': '1.0.0',
    'content-type': 'application/json',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'versioncode': '10000',
}

json_data = {
    'channelNo': 'B2C',
    'data': {
        'RouteType': 'OW',
        'FlightDirection': 'G',
        'PassengerType': [],
        'FlightNos': '',
        'CabinClassGo': '',
        'BrandCodeGo': '',
        'SegCondList': [
            {
                'SegNO': 0,
                'FlightDirection': 'G',
                'DepCity': 'SHA',
                'ArrCity': 'BJS',
                'FlightDate': '2025-01-16',
            },
        ],
        'ArrDateTimeGo': '',
        'IsTransferGo': 'N',
        'AirlinesFlagGo': '',
    },
    'blackBox': BlackBox,
}

response = requests.post('https://www.juneyaoair.com/api/flightFares/queryFlightSimple', headers=headers, json=json_data)
logger.success(response.content.decode('utf-8'))
logger.success(response)