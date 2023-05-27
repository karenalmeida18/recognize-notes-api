import torch
from torchvision import transforms, models
from torch import nn

class_list = ['nota-10', 'nota-2', 'nota-20', 'nota-200', 'nota-5', 'nota-50', 'nota-100']

# Transformações a serem aplicadas de acordo com o modelo pretreinado do ImageNet
train_transform = transforms.Compose([
    transforms.Resize((225, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def load_model_trained():        
    model_vgg16 = models.vgg16_bn(pretrained=True)
    # Fine tunning - Subtitui a camada de classificação (última)
    num_input = list(model_vgg16.children())[-1][-1].in_features # 4096 -> Ultimo elemento da ultima camada da rede (classifier)
    new_classifier = list(model_vgg16.classifier.children())[:-1] # Ùltima camada - (menos) o último elemento (classifier)
    new_classifier.append(nn.Linear(num_input, len(class_list))) # Anexo na última camada a minha camada de classficao adaptada
    model_vgg16.classifier = nn.Sequential(*new_classifier) # Aplica ao modelo a nova camada de classificao
    model_vgg16.load_state_dict(torch.load('./vgg16_net-4.pt', map_location=torch.device('cpu')))
    return model_vgg16
