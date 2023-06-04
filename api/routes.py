from flask import request, jsonify, make_response
import torch
from PIL import Image
from utils import train_transform, class_list, load_model_trained
from app import app

model = load_model_trained()
model.eval()

@app.route('/recognize-banknotes', methods=['POST'])
def recognize_banknotes():
    try:
        if ('image' not in request.files):
            return make_response(jsonify({ 'message': 'image file is required'}), 400)

        image_event = request.files['image']
        image_opened = Image.open(image_event)
        # Transform image to tensor and apply transforms
        image_tensor = train_transform(image_opened)
        # Simulate batch size 1
        batch = image_tensor.unsqueeze(0)
        # Pass batch input
        output = model(batch)
        # Get class probabilities
        probs = torch.nn.functional.softmax(output, dim=1)
        # With argmax get index of predicted class
        pred_class = probs.argmax().item()
        class_name = class_list[pred_class]
        return make_response(jsonify({'message': 'Success in recognize image', 'data': { 'class': class_name } }), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({ 'message': 'Internal server error'}), 500)
    
if __name__ == '__main__':
    app.run()