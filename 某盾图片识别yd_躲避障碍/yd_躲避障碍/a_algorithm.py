import math
import heapq
import random
import requests

from io import BytesIO
from PIL import Image, ImageDraw

GRID_WIDTH = 320
GRID_HEIGHT = 160


# 膨胀障碍物的函数
def inflate_obstacles(obstacle_boxes):
    inflated_boxes = []
    for box in obstacle_boxes:
        x1, y1, x2, y2 = box
        x1 = max(0, x1 - 8)
        y1 = max(0, y1 - 8)
        x2 = min(GRID_WIDTH, x2 + 8)
        y2 = min(GRID_HEIGHT, y2 + 8)
        inflated_boxes.append([x1, y1, x2, y2])
    return inflated_boxes


# 判断某点是否在障碍物内
def is_point_in_obstacle(point, obstacle):
    x, y = point
    x1, y1, x2, y2 = obstacle
    return x1 <= x <= x2 and y1 <= y <= y2


# A* 算法的节点类
class Node:
    def __init__(self, position, parent=None):
        self.position = position
        self.parent = parent
        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.position == other.position

    def __lt__(self, other):
        return self.f < other.f


# 启发式函数（欧几里得距离）
def heuristic(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)


# A* 路径规划算法
def astar(start, end, obstacle_boxes):
    open_list = []
    closed_list = set()

    start_node = Node(start)
    end_node = Node(end)

    heapq.heappush(open_list, start_node)

    directions = [(-1, -1), (-1, 0), (-1, 1),
                  (0, -1), (0, 1),
                  (1, -1), (1, 0), (1, 1)]

    while open_list:
        current_node = heapq.heappop(open_list)
        closed_list.add(current_node.position)

        if current_node == end_node:
            path = []
            while current_node:
                path.append(current_node.position)
                current_node = current_node.parent
            return path[::-1]

        for direction in directions:
            new_position = (current_node.position[0] + direction[0], current_node.position[1] + direction[1])
            if new_position[0] < 0 or new_position[0] >= GRID_WIDTH or new_position[1] < 0 or new_position[
                1] >= GRID_HEIGHT:
                continue
            if any(is_point_in_obstacle(new_position, box) for box in obstacle_boxes):
                continue
            new_node = Node(new_position, current_node)
            if new_node.position in closed_list:
                continue
            new_node.g = current_node.g + 1
            new_node.h = heuristic(new_node.position, end_node.position)
            new_node.f = new_node.g + new_node.h
            if any(open_node for open_node in open_list if open_node == new_node and open_node.g <= new_node.g):
                continue
            heapq.heappush(open_list, new_node)
    return []


# 从 URL 加载图片的函数
def load_image_from_url(image_url):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    return img


# 主函数，接收图片 URL、障碍物、终点并返回轨迹
def get_trajectory(image_url, original_obstacle_boxes, start, end):
    # 从 URL 加载图像
    image = load_image_from_url(image_url)

    # 膨胀障碍物
    obstacle_boxes = inflate_obstacles(original_obstacle_boxes)

    # 运行A*算法
    path = astar(start, end, obstacle_boxes)

    # 输出路径
    if not path:
        print("未找到路径")
        return []

    # 在路径点上加入时间
    t_start = random.randint(50, 80)  # 初始时间
    t_current = t_start
    tracks = []
    for point in path:
        tracks.append([point[0], point[1], t_current])  # 加入时间
        t_current += random.randint(5, 10)  # 时间递增

    # 返回轨迹
    draw = ImageDraw.Draw(image)

    # 绘制原始障碍物（不包括膨胀部分）
    for box in original_obstacle_boxes:
        draw.rectangle(box, fill="red")

    # 绘制起点和终点
    draw.ellipse((start[0] - 3, start[1] - 3, start[0] + 3, start[1] + 3), fill="green", outline="green")  # 起点用绿色圆点表示
    draw.ellipse((end[0] - 3, end[1] - 3, end[0] + 3, end[1] + 3), fill="yellow", outline="yellow")  # 终点用黄色圆点表示

    # 绘制路径
    for i in range(len(path) - 1):
        draw.line([path[i], path[i + 1]], fill="blue", width=1)  # 路径用蓝色线条表示

    # plt.imshow(image)
    # plt.axis("off")  # 隐藏坐标轴
    # plt.show()
    return tracks, image
