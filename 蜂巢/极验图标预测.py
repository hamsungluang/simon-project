import onnxruntime
import numpy as np
from PIL import Image
from torchvision import transforms
import ddddocr
import os

#transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

def process_img_pil(pil_img):
    tensor = transform(pil_img).unsqueeze(0)
    return tensor.numpy()

def euclidean_distance(a, b):
    return np.linalg.norm(a - b, axis=1)

def predict_similarity_batch_from_arrays(onnx_path, img1_np, img2_np_list):
    ort_session = onnxruntime.InferenceSession(onnx_path)

    N = len(img2_np_list)
    img1_np_batch = np.repeat(img1_np, N, axis=0)
    img2_np_batch = np.concatenate(img2_np_list, axis=0)

    ort_inputs = {
        'input1': img1_np_batch,
        'input2': img2_np_batch
    }

    output1, output2 = ort_session.run(['output1', 'output2'], ort_inputs)

    distances = euclidean_distance(output1, output2)
    max_dist = distances.max()
    similarities = 1 - distances / max_dist if max_dist > 0 else np.ones_like(distances)

    return similarities.tolist()

def crop_image(img, box):
    x1, y1, x2, y2 = box
    return img.crop((x1, y1, x2, y2))

def box_center(box):
    x1, y1, x2, y2 = box
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    return cx, cy

def auto_answer(onnx_path, full_img_path):
    ocr_det = ddddocr.DdddOcr(det=True,show_ad=False)
    with open(full_img_path, 'rb') as f:
        img_bytes = f.read()

    det_res = ocr_det.detection(img_bytes)
    boxes = det_res
    print(boxes)

    # 分类 box
    img = Image.open(full_img_path).convert('RGB')
    question_boxes = []
    option_boxes = []
    for box in boxes:
        _, y1, _, y2 = box
        y_center = (y1 + y2) // 2
        if y_center > 340:
            question_boxes.append(box)
        else:
            option_boxes.append(box)

    if len(question_boxes) == 0:
        print("未检测到题目区域！")
        return
    if len(option_boxes) == 0:
        print("未检测到选项区域！")
        return

    question_boxes_sorted = sorted(question_boxes, key=lambda box: box[0])  # 按x1排序
    option_np_list = []
    option_centers = []
    for box in option_boxes:
        option_pil = crop_image(img, box)
        option_np = process_img_pil(option_pil)
        option_np_list.append(option_np)
        option_centers.append(box_center(box))

    print("\n【答题结果】")
    for i, q_box in enumerate(question_boxes_sorted):
        question_pil = crop_image(img, q_box)
        question_np = process_img_pil(question_pil)
        similarities = predict_similarity_batch_from_arrays(onnx_path, question_np, option_np_list)
        max_idx = np.argmax(similarities)
        max_center = option_centers[max_idx]

        print(f"标题{i+1}: 中心坐标=({(q_box[0]+q_box[2])//2},{(q_box[1]+q_box[3])//2}) --> 匹配选项中心=({max_center[0]},{max_center[1]})")

if __name__ == '__main__':
    onnx_path = 'mafeng.onnx'
    full_img_path = 'img.png'

    auto_answer(onnx_path, full_img_path)
