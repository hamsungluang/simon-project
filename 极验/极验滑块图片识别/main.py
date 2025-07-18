import cv2


# 读取背景图片和滑块图片
# 参数说明:
#   'bg.png' - 背景图片路径(包含滑块缺口)
#   'slide.png' - 滑块图片路径
# 返回值:
#   bg - 背景图片的NumPy数组
#   slide - 滑块图片的NumPy数组
bg = cv2.imread('bg.png')
slide = cv2.imread('slide.png')

# 使用Canny算法进行边缘检测
# 参数说明:
#   第一个参数 - 输入图像
#   70 - 低阈值，用于边缘连接
#   200 - 高阈值，用于强边缘检测
# 返回值:
#   canny_bg - 背景图的边缘检测结果
#   canny_slide - 滑块的边缘检测结果
canny_bg = cv2.Canny(bg, 70, 200)
canny_slide = cv2.Canny(slide, 70, 200)

# 执行模板匹配
# 参数说明:
#   canny_bg - 被搜索图像(背景图边缘)
#   canny_slide - 搜索模板(滑块边缘)
#   cv2.TM_CCOEFF_NORMED - 使用归一化相关系数匹配方法
# 返回值:
#   res - 匹配结果矩阵
res = cv2.matchTemplate(canny_bg, canny_slide, cv2.TM_CCOEFF_NORMED)

# 获取匹配结果中的极值信息
# 参数说明:
#   res - 模板匹配结果矩阵
# 返回值:
#   min_val - 最小匹配值
#   max_val - 最大匹配值(最佳匹配位置)
#   min_loc - 最小匹配值的位置坐标(行,列)
#   max_loc - 最大匹配值的位置坐标(缺口左上角坐标)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

# 计算滑块在背景图中的位置
# 获取缺口左上角坐标
x1, y1 = max_loc
# 计算缺口右下角坐标
# slide.shape[1] - 滑块宽度
# slide.shape[0] - 滑块高度
x2, y2 = x1 + slide.shape[1], y1 + slide.shape[0]

# 在背景图上绘制矩形框标记匹配结果
# 参数说明:
#   bg - 目标图像
#   (x1, y1) - 矩形左上角坐标
#   (x2, y2) - 矩形右下角坐标
#   (0,0,255) - 颜色(BGR格式，红色)
#   2 - 线宽
cv2.rectangle(bg, (x1, y1), (x2, y2), (0,0,255), 2)

# 显示处理结果
# 显示带标记的背景图
cv2.imshow("bg", bg)
# 显示原始滑块图
cv2.imshow("slide", slide)
# 等待用户按键
# 参数0表示无限等待
cv2.waitKey(0)