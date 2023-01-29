# Importing necessary packages:
from torchvision.transforms.transforms import ToPILImage
import pickle as pkl
import numpy as np
import argparse
from PIL import Image

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import Dataset, DataLoader


import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1 import ImageGrid
import os

class Net(nn.Module):
  
  def __init__(self):
    super(Net, self).__init__()
    
    self.conv1 = nn.Conv2d(3, 20, 3)
    self.conv2 = nn.Conv2d(20, 40, 3)
    self.conv3 = nn.Conv2d(40, 60, 3)
    self.conv4 = nn.Conv2d(60, 80, 3)

    self.fc1 = nn.Linear(80 * 12*12, 120)
    self.fc2 = nn.Linear(120, 84)
    self.fc3 = nn.Linear(84, 201)


  def forward(self, x):
    x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
    x = F.max_pool2d(F.relu(self.conv2(x)), 2)
    x = F.max_pool2d(F.relu(self.conv3(x)), 2)
    x = F.max_pool2d(F.relu(self.conv4(x)), 2)

    x = x.view(-1, 80*12*12)
    x = F.relu(self.fc1(x))
    x = F.relu(self.fc2(x))
    x = self.fc3(x)
    return x

device = "cuda" if torch.cuda.is_available() else "cpu"
model = Net()
model.load_state_dict(torch.load('/BirdModel3.pth'))

if torch.cuda.is_available():
    model.cuda()

with open('/birdmap.pkl', 'rb') as f:
    bird_map = pkl.load(f)

def process_img(images):
  img = np.asarray(images)
  x = torch.from_numpy(img)
  x = x.permute(2, 0, 1)
  return x.float()

def predict_img(images):
    images = process_img(images)
    test_pred = torch.LongTensor()
    with torch.no_grad():
          images = images.to(device)
          outputs = model(images.float())
          _, predicted = torch.max(outputs.data, 1)
          #p1 = bird_name_map[predicted]
          p1 = predicted.item()
    return bird_map[p1]