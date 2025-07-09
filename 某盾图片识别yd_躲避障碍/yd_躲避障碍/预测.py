import cv2
import time
import base64
import pickle
import hashlib
import numpy as np


def base642cv(base64_str, decode_type=cv2.IMREAD_COLOR, intensityalpha=False):
    """
    将 base64 编码的图片转换为 OpenCV 格式的图片。

    :param base64_str: base64 编码的图片字符串
    :param decode_type: 解码类型
    :param intensityalpha: 是否处理透明度通道（Alpha 通道）
    :return: 转换后的 OpenCV 图像
    """
    if "," in base64_str:
        base64_str = base64_str.split(",")[1]
    img_data = base64.b64decode(base64_str)
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, decode_type)

    if intensityalpha and img.shape[2] == 4:  # 处理带 Alpha 通道的图像
        output_image = np.zeros((img.shape[0], img.shape[1], 3), dtype=np.uint8)
        for i in range(img.shape[0]):
            for j in range(img.shape[1]):
                alpha = img[i, j, 3]
                if alpha > 0:  # 只有在透明度大于0时才显示
                    color_intensity = 255 if i % 2 == 0 else 0
                    color_value = np.array([color_intensity] * 3, dtype=np.uint8)
                    output_image[i, j] = (color_value * (alpha / 255.0)).astype(np.uint8)
        return output_image

    return img


def predict_angle(histmodel, histsx, bgimg, queimg):
    """
    根据直方图预测两张图片的角度（位移量）。

    :param histmodel: 已经计算好的直方图模型
    :param histsx: 存储直方图对应的位移数据
    :param bgimg: 背景图（base64 编码）
    :param queimg: 查询图（base64 编码）
    :return: 预测的位移量
    """
    start_time = time.time()

    # 转换背景图和查询图为 OpenCV 格式
    md5bg = base642cv(bgimg, decode_type=cv2.IMREAD_GRAYSCALE)
    bgimg = base642cv(bgimg, decode_type=cv2.IMREAD_UNCHANGED)
    bgimg = cv2.cvtColor(bgimg, cv2.COLOR_BGR2BGRA)
    bgimg[:, :, 3] = 0  # 设置 Alpha 通道透明

    queimg = base642cv(queimg, decode_type=cv2.IMREAD_UNCHANGED)
    queimg[:, :, 3] = 0  # 设置 Alpha 通道透明

    # 计算 MD5 值
    success, encoded_image = cv2.imencode('.jpg', md5bg)
    binary_image = encoded_image.tobytes()
    md5_hex = calculate_file_md5(binary_image)

    # 合并直方图加载和特征比较逻辑
    maxhist = ''
    for histk, histv in histmodel.items():
        if histv == md5_hex:
            maxhist = histk
            break

    dis = histsx.get(maxhist, 0)  # 获取直方图对应的位移量，默认为 0

    end_time = time.time()

    print(f"时间: {end_time - start_time}s, 最佳匹配: {maxhist}, 位移量: {dis}")

    # 计算两张图的位移量（x方向）
    x_distance = int(dis)

    h1, w1 = bgimg.shape[:2]
    h2, w2 = queimg.shape[:2]

    # 创建一个足够大的画布用于显示合成图像
    max_height = max(h1, h2)
    max_width = w1 + w2 + x_distance
    canvas = np.zeros((max_height, max_width, 4), dtype=np.uint8)

    # 将背景图和查询图放入画布中
    canvas[:h1, :w1] = bgimg
    canvas[:h2, x_distance:x_distance + w2] = queimg

    return dis  # 返回预测的位移量（角度）


def calculate_file_md5(binary_data):
    """
    计算二进制数据的 MD5 哈希值。

    :param binary_data: 二进制数据
    :return: MD5 哈希值的十六进制表示
    """
    md5_hash = hashlib.md5()
    md5_hash.update(binary_data)
    return md5_hash.hexdigest()


if __name__ == '__main__':
    with open('output.pkl', 'rb') as file:
        histograms = pickle.load(file)
    histmodel = histograms['hists']
    histsx = histograms['histsx']

    with open('bg/bg_1027072114.png', 'rb') as file:
        bgimg_base64 = base64.b64encode(file.read()).decode('utf-8')
    with open('que/que_1027072114.png', 'rb') as file:
        queimg_base64 = base64.b64encode(file.read()).decode('utf-8')

    predicted_displacement = predict_angle(histmodel, histsx, bgimg_base64, queimg_base64)
    print(f"x:为: {predicted_displacement}")
