from __future__ import print_function
import sys
from optparse import OptionParser
import random
import math
import json
import segmentationCode as segment
from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
from flask import Flask, render_template, make_response, jsonify, request

app = Flask(__name__)

PORT = 3200

@app.route("/")
def home():
   return "<h1 style='color:red'>This is home!</h1>"

@app.route("/qstr")
def qs():
    if request.args:
        req = request.args
        res = {}
        for key, value in req.items():
            res[key] = value
        segment.exec_segmentation(res)
        res = make_response(jsonify(res), 200)
        return res

    res = make_response(jsonify({"error": "No Query String"}), 404)
    return res

if __name__ == "__main__":
    print("Server running in port %s"%(PORT))
    app.run(host='0.0.0.0', port=PORT)


