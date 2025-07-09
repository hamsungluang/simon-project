import os
import re
import cv2
import pickle
import hashlib


def calculate_file_md5(image_path):
    """计算文件的 MD5 值"""
    md5_hash = hashlib.md5()

    # 读取图像并转换为灰度图像
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # 将图像编码为二进制数据
    success, encoded_image = cv2.imencode('.jpg', img)  # 转换为 .jpg 格式
    if success:
        binary_image = encoded_image.tobytes()  # 转为二进制数据
        md5_hash.update(binary_image)  # 更新 MD5
    return md5_hash.hexdigest()


def generate_pkl(bg_folder, newbg_folder, output_pkl_file):
    # 初始化两个字典
    hists = {}
    histsx = {}

    # 遍历 newbg 文件夹中的文件（已标注的图像）
    for newbg_filename in os.listdir(newbg_folder):
        match = re.match(r'(\d+)_bg_(\d+)\.png', newbg_filename)
        if match:
            angle = int(match.group(1))
            image_id = match.group(2)

            # 找到 bg 文件夹中对应的原图
            bg_filename = f'bg_{image_id}.png'
            bg_image_path = os.path.join(bg_folder, bg_filename)

            if os.path.exists(bg_image_path):
                # 计算图像的 MD5 值（灰度图）
                md5_value = calculate_file_md5(bg_image_path)

                # 保存 MD5 值和角度值到字典中
                hists[bg_filename] = md5_value
                histsx[bg_filename] = angle

    # 将字典保存到 pkl 文件
    pkl_data = {'hists': hists, 'histsx': histsx}
    with open(output_pkl_file, 'wb') as pkl_file:
        pickle.dump(pkl_data, pkl_file)
    print(f"pkl 文件已保存：{output_pkl_file}")


# 调用函数生成 pkl 文件
bg_folder = 'bg'  # 原图文件夹路径
newbg_folder = 'newbg'  # 标注好的图像文件夹路径
output_pkl_file = 'output.pkl'  # 输出的 pkl 文件路径
generate_pkl(bg_folder, newbg_folder, output_pkl_file)
