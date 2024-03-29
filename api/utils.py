import torch
from torchvision import transforms, models
from torch import nn
# import boto3

# AWS_SECRET_ACCESS_KEY = 'eEKTFuYdb7yMI5ucC14B4dl3KgeFxj0442WxxWJj'
# AWS_ACCESS_KEY_ID = 'AKIASEHZLSSODJSWRLUZ'

# def get_file_from_s3(bucket_name, file_key, local_path):
#     s3 = boto3.client(
#         's3',
#         aws_access_key_id=  AWS_ACCESS_KEY_ID,
#         aws_secret_access_key= AWS_SECRET_ACCESS_KEY,
#     )
#     s3.download_file(bucket_name, file_key, local_path)

class_list = ['nota-10', 'nota-2', 'nota-20', 'nota-200', 'nota-5', 'nota-50', 'nota-100']

# Transformações a serem aplicadas de acordo com o modelo pretreinado do ImageNet
train_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def load_model_trained():
    model_path = 'model.pt'
    # Carrega o modelo pretreinado - sequeezenet
    model = models.squeezenet1_1(pretrained=True)
    # Fine tunning - Subtitui a camada de classificação (última)
    model.classifier[1] = nn.Conv2d(512, len(class_list), kernel_size=(1, 1))
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.load_state_dict(torch.load(model_path, map_location=torch.device(device)))
    return model
