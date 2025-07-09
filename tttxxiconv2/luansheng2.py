from flask import Flask, request, jsonify
import cv2
import base64
import numpy as np
import onnxruntime
from PIL import Image
from torchvision import transforms
import os

app = Flask(__name__)

# 图像预处理
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

def image_to_tensor(img):
    img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).convert("RGB")
    tensor = transform(img_pil).unsqueeze(0).numpy()
    return tensor

def base64_to_image(base64_str):
    img_data = base64.b64decode(base64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

def preprocess(img, input_width, input_height):
    img_height, img_width = img.shape[:2]
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (input_width, input_height))
    image_data = np.array(img) / 255.0
    image_data = np.transpose(image_data, (2, 0, 1))  # 通道首
    image_data = np.expand_dims(image_data, axis=0).astype(np.float32)
    return image_data, img_height, img_width

def detect_objects(image, session, model_inputs, input_width, input_height, confidence_thres=0.35, iou_thres=0.5):
    def calculate_iou(box, other_boxes):
        x1 = np.maximum(box[0], np.array(other_boxes)[:, 0])
        y1 = np.maximum(box[1], np.array(other_boxes)[:, 1])
        x2 = np.minimum(box[0] + box[2], np.array(other_boxes)[:, 0] + np.array(other_boxes)[:, 2])
        y2 = np.minimum(box[1] + box[3], np.array(other_boxes)[:, 1] + np.array(other_boxes)[:, 3])
        intersection_area = np.maximum(0, x2 - x1) * np.maximum(0, y2 - y1)
        box_area = box[2] * box[3]
        other_boxes_area = np.array(other_boxes)[:, 2] * np.array(other_boxes)[:, 3]
        return intersection_area / (box_area + other_boxes_area - intersection_area)

    def custom_NMSBoxes(boxes, scores, confidence_threshold, iou_threshold):
        if len(boxes) == 0:
            return []
        scores = np.array(scores)
        boxes = np.array(boxes)
        mask = scores > confidence_threshold
        filtered_boxes = boxes[mask]
        filtered_scores = scores[mask]
        if len(filtered_boxes) == 0:
            return []
        sorted_indices = np.argsort(filtered_scores)[::-1]
        indices = []
        while len(sorted_indices) > 0:
            current_index = sorted_indices[0]
            indices.append(current_index)
            if len(sorted_indices) == 1:
                break
            current_box = filtered_boxes[current_index]
            other_boxes = filtered_boxes[sorted_indices[1:]]
            iou = calculate_iou(current_box, other_boxes)
            non_overlapping_indices = np.where(iou <= iou_threshold)[0]
            sorted_indices = sorted_indices[non_overlapping_indices + 1]
        return indices

    img_data, img_height, img_width = preprocess(image, input_width, input_height)
    outputs = session.run(None, {model_inputs[0].name: img_data})
    outputs = np.transpose(np.squeeze(outputs[0]))
    rows = outputs.shape[0]
    boxes, scores = [], []

    x_factor = img_width / input_width
    y_factor = img_height / input_height

    for i in range(rows):
        classes_scores = outputs[i][4:]
        max_score = np.amax(classes_scores)
        if max_score >= confidence_thres:
            x, y, w, h = outputs[i][0], outputs[i][1], outputs[i][2], outputs[i][3]
            left = int((x - w / 2) * x_factor)
            top = int((y - h / 2) * y_factor)
            width = int(w * x_factor)
            height = int(h * y_factor)
            scores.append(max_score)
            boxes.append([left, top, width, height])

    indices = custom_NMSBoxes(boxes, scores, confidence_thres, iou_thres)
    return [boxes[i] for i in indices]

# 计算欧式距离
def euclidean_distance(a, b):
    return np.linalg.norm(a - b, axis=1)

def predict_similarity_batch(img1_tensor, img2_tensor_list):
    img1_np = np.repeat(img1_tensor, len(img2_tensor_list), axis=0)
    img2_np = np.concatenate(img2_tensor_list, axis=0)

    ort_inputs = {'input1': img1_np, 'input2': img2_np}
    output1, output2 = siamese_session.run(['output1', 'output2'], ort_inputs)

    distances = euclidean_distance(output1, output2)
    max_dist = distances.max()
    similarities = 1 - distances / max_dist if max_dist > 0 else np.ones_like(distances)
    return similarities.tolist()

def get_answer_coordinates(beijing_data, question_data):
    image_array_bg = base64_to_image(beijing_data)
    image_array_title = base64_to_image(question_data)

    # 裁切标题图像为3个 icon
    coordinates = [(15, 55), (65, 105), (115, 155)]
    icons = [image_array_title[:, x1:x2, :] for (x1, x2) in coordinates]
    icon_tensors = [image_to_tensor(icon) for icon in icons]

    boxes = detect_objects(image_array_bg, det_session, model_inputs, input_width, input_height)
    print(len(boxes))

    for box in boxes:
        x, y, w, h = box
        cv2.rectangle(image_array_bg, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv2.imwrite("detect_result.jpg", image_array_bg)

    centers = []
    for icon_tensor in icon_tensors:
        region_tensors = []
        valid_boxes = []
        for box in boxes:
            x, y, w, h = box
            x2, y2 = x + w, y + h
            if x >= 0 and y >= 0 and x2 <= image_array_bg.shape[1] and y2 <= image_array_bg.shape[0]:
                region_img = image_array_bg[y:y2, x:x2]
                region_tensor = image_to_tensor(region_img)
                region_tensors.append(region_tensor)
                valid_boxes.append(box)
        if not region_tensors:
            continue
        scores = predict_similarity_batch(icon_tensor, region_tensors)
        print(scores)
        best_index = int(np.argmax(scores))
        best_box = valid_boxes[best_index]
        x, y, w, h = best_box
        cx, cy = x + w // 2, y + h // 2
        centers.append(f"{cx},{cy}")

    return {'data': '|'.join(centers)}

@app.route('/ocr', methods=['POST'])
def get_coordinates():
    data = request.json
    beijing_data = data["beijing"]
    question_data = data["question"]
    result = get_answer_coordinates(beijing_data, question_data)
    return jsonify(result)

def init_detect_model(model_path):
    session = onnxruntime.InferenceSession(model_path, providers=['CPUExecutionProvider'])
    model_inputs = session.get_inputs()
    input_shape = model_inputs[0].shape
    return session, model_inputs, input_shape[2], input_shape[3]

if __name__ == '__main__':
    det_model_path = "best.onnx"
    siamese_model_path = "iconv2.onnx"
    det_session, model_inputs, input_width, input_height = init_detect_model(det_model_path)
    siamese_session = onnxruntime.InferenceSession(siamese_model_path, providers=['CPUExecutionProvider'])
    app.run(host='0.0.0.0', port=5000)
