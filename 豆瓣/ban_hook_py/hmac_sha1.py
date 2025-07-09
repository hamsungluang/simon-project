import hmac
import base64
import hashlib
from loguru import logger


def hmac_hash1(key: str, data: str) -> str:
    try:
        # 将 key 转换为字节
        key_bytes = key.encode()
        # 将 data 转换为字节
        data_bytes = data.encode()

        # 使用 HMAC-SHA1 进行加密
        mac = hmac.new(key_bytes, data_bytes, hashlib.sha1)

        # 返回 Base64 编码的结果
        return base64.b64encode(mac.digest()).decode('utf-8')
    except Exception as e:
        logger.error(f"Error: {e}")


if __name__ == '__main__':
    # 测试代码
    _key = "bf7dddc7c9cfe6f7"
    _data = "GET&%2Fapi%2Fv2%2Felendil%2Frecommend_feed&1735019437"
    hashed_value = hmac_hash1(_key, _data)
    logger.info(f"HMAC Hash (Base64): {hashed_value}")
