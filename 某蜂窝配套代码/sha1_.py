# sha1-v1
import struct

bitlen = lambda s: len(s) * 8


def ROL4(x, n):
    x &= 0xffffffff
    return ((x << n) | (x >> (32 - n))) & 0xffffffff


def madd(*args):
    return sum(args) & 0xffffffff


class sha1:
    block_size = 64
    digest_size = 20

    def __init__(self, data=b''):
        if data is None:
            self._buffer = b''
        elif isinstance(data, bytes):
            self._buffer = data
        elif isinstance(data, str):
            self._buffer = data.encode('ascii')
        else:
            raise TypeError('object supporting the buffer API required')

        self._sign = None

    def update(self, content):
        if isinstance(content, bytes):
            self._buffer += content
        elif isinstance(content, str):
            self._buffer += content.encode('ascii')
        else:
            raise TypeError('object supporting the buffer API required')

        self._sign = None

    def copy(self):
        other = self.__class__.__new__(self.__class__)
        other._buffer = self._buffer
        return other

    def hexdigest(self):
        result = self.digest()
        return result.hex()

    def digest(self):
        if not self._sign:
            self._sign = self._current()
        return self._sign

    def _current(self):
        msg = self._buffer

        # standard magic number
        # A = 0x67452301
        # B = 0xEFCDAB89
        # C = 0x98BADCFE
        # D = 0x10325476
        # E = 0xC3D2E1F0

        A = 0x67452301
        B = 0xEFCDAB89
        C = 0x98BADCFE
        D = 0x5E4A1F7C
        E = 0x10325476

        msg_len = bitlen(msg) & 0xffffffffffffffff

        zero_pad = (56 - (len(msg) + 1) % 64) % 64
        msg = msg + b'\x80'
        msg = msg + b'\x00' * zero_pad + struct.pack('>Q', msg_len)

        for idx in range(0, len(msg), 64):
            W = list(struct.unpack('>16I', msg[idx:idx + 64])) + [0] * 64

            for t in range(16, 80):
                T = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]
                W[t] = ROL4(T, 1)

            a, b, c, d, e = A, B, C, D, E

            # main loop:
            for t in range(0, 80):
                if 0 <= t <= 15:
                    f = (b & c) | ((~b) & d)
                    k = 0x5A827999

                elif t <= 19:
                    f = b ^ c ^ d
                    k = 0x6ED9EBA1

                elif t <= 39:
                    f = (b & c) | (b & d) | (c & d)
                    k = 0x8F1BBCDC

                elif t <= 59:
                    f = (b & c) | ((~b) & d)
                    k = 0x5A827999
                else:
                    f = b ^ c ^ d
                    k = 0xCA62C1D6

                S0 = madd(ROL4(a, 5), f, e, k, W[t])
                S1 = ROL4(b, 30)
                if t == 79:
                    a, b, d, c, e = S0, a, S1, c, d
                else:
                    a, b, c, d, e = S0, a, S1, c, d

            A = madd(A, a)
            B = madd(B, b)
            C = madd(C, c)
            D = madd(D, d)
            E = madd(E, e)

        result = struct.pack('>5I', A, B, C, D, E)
        return result


if __name__ == '__main__':
    s = b'GET&https%3A%2F%2Fmapi.mafengwo.cn%2Fdiscovery%2Fget_index%2Fv7&app_code%3Dcom.mfw.roadbook%26app_ver%3D11.0.2%26app_version_code%3D1052%26brand%3Dgoogle%26channel_id%3DMFW-WDJPPZS-1%26dev_ver%3DD2313.0%26device_id%3D82d917db80c8eae2%26device_mid%3D860000000000001%26device_type%3Dandroid%26hardware_model%3DPixel%25203%26has_notch%3D0%26jsondata%3D%257B%2522top_tab_id%2522%253A%252255%2522%252C%2522filter_id%2522%253A%2522all%2522%252C%2522top_refresh%2522%253A%25221%2522%252C%2522by_user%2522%253A%25221%2522%257D%26mfwsdk_ver%3D20140507%26o_coord%3Dwgs%26o_lat%3DMzAuNDg5NjIy%26o_lng%3DMTE0LjQyMDQ5MQ%253D%253D%26oauth_consumer_key%3D5%26oauth_nonce%3D536f6e42-bc4c-463f-acb5-ee145e63f10e%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1732784973%26oauth_token%3D0_0969044fd4edf59957f4a39bce9200c6%26oauth_version%3D1.0%26open_udid%3D82d917db80c8eae2%26screen_height%3D2028%26screen_scale%3D2.88%26screen_width%3D1080%26shumeng_id%3DDUx0wb9S3BzdWvrdsQ8G8T6MnVVJL6kbZPb2RFV4MHdiOVMzQnpkV3ZyZHNROEc4VDZNblZWSkw2a2JaUGIyc2h1%26sys_ver%3D11%26time_offset%3D480%26x_auth_mode%3Dclient_auth'
    s0 = sha1(s).hexdigest()
    print(s0)
