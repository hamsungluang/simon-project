import re
import requests
import hashlib
import numpy as np
from PIL import Image
from DrissionPage import Chromium


def get_img():
    tab = Chromium().latest_tab
    tab.get("https://www.geetest.com/adaptive-captcha")
    tab.ele(".tab-item tab-item-3").click()
    ele = tab.ele("@class:geetest_btn_click").click()
    images = tab.eles("@class:geetest_item")
    row = 1
    col = 1
    for img in images:
        pattern = r'url\("([^"]+)"\)'
        match = re.search(pattern, img.attr("style"))
        if match:
            url = match.group(1)
            resp = requests.get(url)
            with open(f"img{row}{col}.png", "wb") as f:
                f.write(resp.content)
            if row == 3:
                row = 1
                col += 1
            else:
                row += 1


# 加载所有9张拼图碎片图片(命名格式为img11.png, img12.png,...,img33.png)
imgs = []
for i in range(1, 4):  # 行号1-3
    for j in range(1, 4):  # 列号1-3
        imgs.append(Image.open(f"img{i}{j}.png"))  # 加载图片并添加到列表

# 获取单张图片的宽度和高度(假设所有图片大小相同)
width, height = imgs[0].size

# 创建一个大背景图(3x3拼图)
bg = Image.new('RGB', (width * 3, height * 3))

# 将9张小图拼接成3x3的大图
for i in range(3):  # 行循环
    for j in range(3):  # 列循环
        # 计算当前图片在列表中的索引(行优先顺序)
        # 将图片粘贴到对应位置
        bg.paste(imgs[i * 3 + j], (j * width, i * height))

# 计算每张图片的MD5哈希值(用于唯一标识每张图片)
md5_list = []
for img in imgs:
    data = img.tobytes()  # 将图像转换为字节数据
    md5_list.append(hashlib.md5(data).hexdigest())  # 计算MD5哈希值

# 将MD5列表转换为3x3的numpy数组(与拼图布局对应)
md5_list = np.array(md5_list).reshape([3, 3])


def identify_slide(md5_list):
    """
    识别需要交换的拼图块位置

    参数:
        md5_list: 3x3的MD5哈希值矩阵

    返回值:
        包含两个坐标的列表，表示需要交换的两个拼图块的位置
        [[源行,源列], [目标行,目标列]]
    """
    result = [[0, 0], [0, 0]]  # 初始化结果

    # 遍历所有拼图块
    for i in range(3):  # 行循环
        for j in range(3):  # 列循环

            # 尝试向上交换
            if i - 1 >= 0:  # 检查是否在上边界内
                # 临时交换两个位置的MD5值
                md5_list[i - 1][j], md5_list[i][j] = md5_list[i][j], md5_list[i - 1][j]

                # 检查交换后是否形成完整的行或列(三个相同MD5值)
                # 检查第i-1行是否全部相同 或 第i行是否全部相同
                if (md5_list[i - 1][0] == md5_list[i - 1][1] == md5_list[i - 1][2]) or \
                        (md5_list[i][0] == md5_list[i][1] == md5_list[i][2]):
                    result[0] = [i, j]  # 源位置
                    result[1] = [i - 1, j]  # 目标位置
                    return result

                # 还原交换
                md5_list[i - 1][j], md5_list[i][j] = md5_list[i][j], md5_list[i - 1][j]

            # 尝试向下交换(逻辑同上)
            if i + 1 <= 2:
                md5_list[i + 1][j], md5_list[i][j] = md5_list[i][j], md5_list[i + 1][j]
                if (md5_list[i + 1][0] == md5_list[i + 1][1] == md5_list[i + 1][2]) or \
                        (md5_list[i][0] == md5_list[i][1] == md5_list[i][2]):
                    result[0] = [i, j]
                    result[1] = [i + 1, j]  # 注意这里应该是i+1而不是i-1(原代码有误)
                    return result
                md5_list[i + 1][j], md5_list[i][j] = md5_list[i][j], md5_list[i + 1][j]

            # 尝试向左交换
            if j - 1 >= 0:
                md5_list[i][j - 1], md5_list[i][j] = md5_list[i][j], md5_list[i][j - 1]
                # 检查列是否全部相同
                if (md5_list[0][j - 1] == md5_list[1][j - 1] == md5_list[2][j - 1]) or \
                        (md5_list[0][j] == md5_list[1][j] == md5_list[2][j]):
                    result[0] = [i, j]
                    result[1] = [i, j - 1]
                    return result
                md5_list[i][j - 1], md5_list[i][j] = md5_list[i][j], md5_list[i][j - 1]

            # 尝试向右交换(逻辑同上)
            if j + 1 <= 2:
                md5_list[i][j + 1], md5_list[i][j] = md5_list[i][j], md5_list[i][j + 1]
                if (md5_list[0][j + 1] == md5_list[1][j + 1] == md5_list[2][j + 1]) or \
                        (md5_list[0][j] == md5_list[1][j] == md5_list[2][j]):
                    result[0] = [i, j]
                    result[1] = [i, j + 1]
                    return result
                md5_list[i][j + 1], md5_list[i][j] = md5_list[i][j], md5_list[i][j + 1]

    return result  # 返回找到的交换位置


# 创建新的背景图(用于显示结果)
bg = Image.new('RGB', (width * 3, height * 3))

# 识别需要交换的拼图块
result = identify_slide(md5_list)
print("需要交换的位置:", result)  # 打印交换建议

# 执行交换(在图片列表中交换两个图片的位置)
imgs[result[0][0] * 3 + result[0][1]], imgs[result[1][0] * 3 + result[1][1]] = \
    imgs[result[1][0] * 3 + result[1][1]], imgs[result[0][0] * 3 + result[0][1]]

# 重新拼接交换后的完整图片
for i in range(3):
    for j in range(3):
        bg.paste(imgs[i * 3 + j], (j * width, i * height))

# 显示交换后的完整图片
bg.show()
