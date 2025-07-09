import random
import time


def generate_slider_track(x_distance):
    # 生成开始和结束时间戳（当前时间）
    start_time = str(int(time.time() * 1000))
    end_time = str(int(time.time() * 1000) + 1000)  # 假设滑动耗时1秒

    # 初始化轨迹列表
    track = [start_time]

    # 生成移动轨迹点
    current_x = 0
    remaining_distance = x_distance
    y_base = -24  # 基础y坐标
    time_increment = 0

    while remaining_distance > 0:
        # 计算这一步的移动距离（随机但逐渐增加）
        step = min(max(1, int(remaining_distance * random.uniform(0.1, 0.3))), remaining_distance)
        current_x += step
        remaining_distance -= step

        # 时间增量（随机但逐渐增加）
        time_increment += random.randint(30, 100)

        # y坐标有小幅波动
        y_offset = random.randint(-3, 0)
        y = y_base + y_offset

        # 添加轨迹点
        track.extend([str(time_increment), str(current_x), str(y)])

    # 确保最终到达精确的目标距离
    if int(track[-2]) != x_distance:
        time_increment += random.randint(10, 50)
        track.extend([str(time_increment), str(x_distance), str(y_base)])

    # 添加结束时间戳
    track.append(end_time)

    # 拼接成逗号分隔的字符串
    track_str = ",".join(track)

    return track_str


# # 示例使用
# x_distance = 72  # 你想要移动的距离
# track_str = generate_slider_track(x_distance)
# print(track_str)