import random
import python_ghost_cursor

_tmp_pos = [[162, 91], [215, 90], [105, 99]]  # 识别的坐标
tracks = []

_point_1 = {"x": _tmp_pos[0][0], "y": _tmp_pos[0][1]}
_point_2 = {"x": _tmp_pos[1][0], "y": _tmp_pos[1][1]}
_point_3 = {"x": _tmp_pos[2][0], "y": _tmp_pos[2][1]}
_tracks_1 = python_ghost_cursor.path(_point_1, _point_2)
_tracks_2 = python_ghost_cursor.path(_point_2, _point_3)
t_start = random.randint(50, 100)
t_current = t_start
for row in _tracks_1+_tracks_2[1:]:
	point = [int(row["x"]), int(row["y"]), t_current]
	t_current += random.randint(15, 60)
	tracks.append(point)
