import argparse
import torch
import json
import os
from torchvision import models, transforms
from PIL import Image
import numpy as np

def parse_args():
    parser = argparse.ArgumentParser(description='RBC Detection and Classification')
    parser.add_argument('image_path', type=str, help='Path to input image')
    parser.add_argument('--output', type=str, required=True, help='Output JSON path')
    parser.add_argument('--yolo-model', type=str, required=True, help='Path to YOLO model')
    parser.add_argument('--resnet-model', type=str, required=True, help='Path to ResNet model')
    return parser.parse_args()

def main():
    args = parse_args()
    
    # Load YOLO model
    yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path=args.yolo_model)
    
    # Load ResNet model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    resnet_model = models.resnet50()
    num_classes = 4  # T, SG, Others, Diff
    resnet_model.fc = torch.nn.Linear(resnet_model.fc.in_features, num_classes)
    resnet_model.load_state_dict(torch.load(args.resnet_model, map_location=device))
    resnet_model.to(device)
    resnet_model.eval()
    
    # Open image
    image = Image.open(args.image_path)
    
    # YOLO detection
    results = yolo_model(image)
    detections = results.pandas().xyxy[0].to_dict('records')
    
    # Prepare transformation for ResNet
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    # Classification counts
    counts = {
        'T': 0,
        'SG': 0,
        'Others': 0,
        'Diff': 0
    }
    
    class_map = {0: 'T', 1: 'SG', 2: 'Others', 3: 'Diff'}
    
    # Process each detection
    for det in detections:
        x1, y1, x2, y2 = int(det['xmin']), int(det['ymin']), int(det['xmax']), int(det['ymax'])
        
        # Extract ROI
        roi = image.crop((x1, y1, x2, y2))
        
        # Classify ROI
        roi_tensor = transform(roi).unsqueeze(0).to(device)
        with torch.no_grad():
            outputs = resnet_model(roi_tensor)
            _, predicted = torch.max(outputs, 1)
            class_idx = predicted.item()
            class_name = class_map[class_idx]
            
        # Update counts
        counts[class_name] += 1
    
    # Save results
    with open(args.output, 'w') as f:
        json.dump({
            'total': sum(counts.values()),
            'counts': counts,
            'image_path': args.image_path
        }, f)

if __name__ == '__main__':
    main()