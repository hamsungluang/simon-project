import cv2
import numpy as np

img = cv2.imread('1.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.medianBlur(gray, 5)  # 中值滤波降噪

circles = cv2.HoughCircles(
	gray,
	cv2.HOUGH_GRADIENT,
	dp=1,
	minDist=100,
	param1=20,
	param2=20,
	minRadius=60,
	maxRadius=110
)

if circles is not None:
	circles = np.uint16(np.around(circles))
	
	for i, (x, y, r) in enumerate(circles[0, :]):
		#掩码
		mask = np.zeros_like(img)
		cv2.circle(mask, (x, y), r, (255, 255, 255), -1)
		masked_img = cv2.bitwise_and(img, mask)

		roi = masked_img[y - r:y + r, x - r:x + r]
		

		cv2.imwrite(f'circle_{i}.png', roi)

		cv2.circle(img, (x, y), r, (0, 255, 0), 2)
		print(x,y)
		cv2.circle(img, (x, y), 2, (0, 0, 255), 3)

cv2.imshow('Result', img)
cv2.waitKey(0)
cv2.destroyAllWindows()


