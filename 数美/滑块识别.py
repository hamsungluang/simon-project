import cv2
import numpy as np


def extract_slide(img):
    """
    从滑块图片中提取有效滑块区域（去除上下空白部分）

    参数:
        img: 输入的滑块图片(numpy数组格式，BGR三通道)

    返回值:
        img[start_r:end_r + 1, :, :]: 裁剪后的有效滑块区域
        start_r: 滑块起始行号(上边界)
        end_r: 滑块结束行号(下边界)
    """
    start_r = 0  # 初始化滑块起始行
    end_r = 0  # 初始化滑块结束行

    # 从上到下逐行扫描，寻找滑块的上边界
    for r in range(img.shape[0]):  # img.shape[0]是图片高度(行数)
        # 计算当前行所有像素值的和(判断是否有非零像素)
        if np.sum(img[r, :, :]) > 0:  # 如果当前行有非零像素
            start_r = r  # 记录滑块起始行

            # 从起始行继续向下扫描，寻找滑块的下边界
            for rr in range(r + 1, img.shape[0]):
                if np.sum(img[rr, :, :]) == 0:  # 遇到全零行(空白行)
                    end_r = rr  # 记录滑块结束行
                    break  # 找到下边界后退出循环
            break  # 找到上下边界后退出外层循环

    # 返回裁剪后的滑块区域和边界坐标
    return img[start_r:end_r + 1, :, :], start_r, end_r


# 读取背景图片和滑块图片
# bg.jpg - 包含滑块缺口的背景图片
# slide.png - 滑块图片
bg = cv2.imread('bg.jpg')  # 读取背景图(BGR格式)
slide = cv2.imread('slide.png')  # 读取滑块图(BGR格式)

# 提取滑块有效区域(去除上下空白部分)
# real_slide - 裁剪后的有效滑块区域
# start_r - 滑块在原始图片中的起始行
# end_r - 滑块在原始图片中的结束行
real_slide, start_r, end_r = extract_slide(slide)

# 裁剪背景图，使其高度与滑块匹配(只处理滑块可能出现的区域)
# 这样可以减少计算量并提高匹配精度
real_bg = bg[start_r:end_r + 1, :, :]

# 边缘检测(使用Canny算法)
# 参数说明:
#   70 - 低阈值，用于边缘连接
#   200 - 高阈值，用于强边缘检测
canny_bg = cv2.Canny(real_bg, 70, 200)  # 背景图边缘检测
canny_slide = cv2.Canny(real_slide, 70, 200)  # 滑块边缘检测

# 模板匹配(在背景中寻找滑块位置)
# cv2.TM_CCOEFF_NORMED - 使用归一化相关系数匹配方法
res = cv2.matchTemplate(canny_bg, canny_slide, cv2.TM_CCOEFF_NORMED)

# 获取匹配结果中的最佳匹配位置
# min_val - 最小匹配值
# max_val - 最大匹配值(最佳匹配分数)
# min_loc - 最小匹配位置
# max_loc - 最大匹配位置(最佳匹配位置)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

# 计算滑块在背景图中的位置
x1, y1 = max_loc  # 最佳匹配位置的左上角坐标
# 计算右下角坐标(加上滑块的宽度和高度)
x2, y2 = x1 + real_slide.shape[1], y1 + real_slide.shape[0]

# 在背景图上绘制红色矩形框标记匹配到的滑块位置
# (0, 0, 255) - BGR颜色格式(红色)
# 2 - 线宽(像素)
cv2.rectangle(real_bg, (x1, y1), (x2, y2), (0, 0, 255), 2)

# 显示处理结果
cv2.imshow("bg", real_bg)  # 显示带标记的背景图
cv2.imshow("slide", real_slide)  # 显示裁剪后的滑块图

# 等待用户按键(0表示无限等待)
cv2.waitKey(0)
