import time
import json
import os
from PIL import Image
import numpy as np

import requests
from flask import Flask, request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

total_info = []

@app.route('/api/', methods=['GET'])
def get_all_info():
     return jsonify(total_info)

#this method is get for now just to test, later should change to post
@app.route('/api/', methods=['POST'])
def submit_image():
    image = request.files["photo"]
    path = os.path.join(os.getcwd() + "/images/  " + image.filename)
    print(path)
    image.save(path)
    return "success!"

   
   
if __name__ == "__main__":
    app.run(debug=True)
    # analyze(r'/Users/yannbonzom/Desktop/Programming/MAIS Hacks 2022/nutri_tracker/server/images/photo.jpg')