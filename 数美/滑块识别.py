import cv2
import numpy as np


def extract_slide(img):
    start_r = 0
    end_r = 0
    for r in range(img.shape[0]):
        if np.sum(img[r, :, :]) > 0:
            start_r = r
            for rr in range(r + 1, img.shape[0]):
                if np.sum(img[rr, :, :]) == 0:
                    end_r = rr
                    break
            break
    return img[start_r:end_r + 1, :, :], start_r, end_r


bg = cv2.imread('bg.jpg')
slide = cv2.imread('slide.png')
real_slide, start_r, end_r = extract_slide(slide)

real_bg = bg[start_r:end_r+1, :, :]
canny_bg = cv2.Canny(real_bg, 70, 200)
canny_slide = cv2.Canny(real_slide, 70, 200)
res = cv2.matchTemplate(canny_bg, canny_slide, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
x1, y1 = max_loc
x2, y2 = x1 + real_slide.shape[1], y1 + real_slide.shape[0]
cv2.rectangle(real_bg, (x1, y1), (x2, y2), (0, 0, 255), 2)
cv2.imshow("bg", real_bg)
cv2.imshow("slide", real_slide)
cv2.waitKey(0)
