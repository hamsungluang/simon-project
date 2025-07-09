import struct
import base64
# 常量
H0_INIT = 0x67452301
H1_INIT = 0xEFCDAB89
H2_INIT = 0x98BADCFE
H3_INIT = 0x10325476
H4_INIT = 0xC3D2E1F0

# 循环左移操作
def left_rotate(n, b):
    return ((n << b) | (n >> (32 - b))) & 0xFFFFFFFF

# 处理消息块
def process_block(block, H0, H1, H2, H3, H4):
    W = [0] * 80
    for i in range(16):
        W[i] = struct.unpack('>I', block[i*4:i*4+4])[0]

    # 扩展消息块
    for i in range(16, 80):
        W[i] = left_rotate(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1)

    A, B, C, D, E = H0, H1, H2, H3, H4

    for i in range(80):
        if i < 20:
            f = (B & C) | (~B & D)
            k = 0x5A827999
        elif i < 40:
            f = B ^ C ^ D
            k = 0x6ED9EBA1
        elif i < 60:
            f = (B & C) | (B & D) | (C & D)
            k = 0x8F1BBCDC
        else:
            f = B ^ C ^ D
            k = 0xCA62C1D6

        temp = left_rotate(A, 5) + f + E + W[i] + k & 0xFFFFFFFF
        E = D
        D = C
        C = left_rotate(B, 30)
        B = A
        A = temp

    # 计算最终哈希值
    H0 = (H0 + A) & 0xFFFFFFFF
    H1 = (H1 + B) & 0xFFFFFFFF
    H2 = (H2 + C) & 0xFFFFFFFF
    H3 = (H3 + D) & 0xFFFFFFFF
    H4 = (H4 + E) & 0xFFFFFFFF

    return H0, H1, H2, H3, H4

# SHA1算法实现
def sha1(data):
    # 将数据转换为字节并填充
    data = bytearray(data, 'utf-8')
    length = len(data) * 8  # 计算原始数据的比特长度

    # 填充数据：1个1，后面跟着0直到剩下64个比特用于长度
    data.append(0x80)  # 添加1
    while len(data) % 64 != 56:
        data.append(0x00)  # 填充0

    # 添加消息长度
    data += struct.pack('>Q', length)

    # 初始化哈希值
    H0, H1, H2, H3, H4 = H0_INIT, H1_INIT, H2_INIT, H3_INIT, H4_INIT

    # 按64字节块处理数据
    for i in range(0, len(data), 64):
        block = data[i:i+64]
        H0, H1, H2, H3, H4 = process_block(block, H0, H1, H2, H3, H4)

    # 结果输出为40位十六进制字符串
    return ''.join(format(i, '08x') for i in [H0, H1, H2, H3, H4])

# 测试
data = "android_id=9a8493c270cc2270&app_ver=87&channel=aliapp&device_id=5e9bdbbc3bc779c18511c1bb26351dad&device_udid=8f6e2b8cf3b2e3c36db8dea8368d7305&first_time=1706003627&from=app&last_time=1695744000&limit=8&mac=0E:D8:C1:64:25:37&nonce=4vlwb71740715028559&os_ver_code=30&system=1&timestamp=1740715028&with_super=0&with_video=1b2qKgtaW4,9z9D`Fmst?K5JZbLYOY]NP6ssGf2U~;zk9oCNgoytV!}wW7ia+`w9g"
encoded_data = base64.b64encode(data.encode("utf-8"))
# 将字节转换为字符串
encoded_data_str = encoded_data.decode('utf-8')

print(encoded_data_str)
print(sha1(encoded_data_str))  # 输出SHA1哈希值
