from __future__ import print_function
import sys
sys.path.append("/usr/lib/python3/dist-packages")
from optparse import OptionParser
import random
import math
import json
import segmentationCode as segment
from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
from flask import Flask, render_template, make_response, jsonify, request, json
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

PORT = 3200


@app.route("/segmentation",  methods=["POST"])
def qs():
    print(request.data)
    params = json.loads(request.data)
    segment.exec_segmentation(params)
    res = make_response(jsonify(params), 200)
    

    #res = make_response(jsonify({"error": "No Query String"}), 404)
    return res

if __name__ == "__main__":
    print("Server running in port %s"%(PORT))
    app.run(host='localhost', port=PORT)


''' curl -H "Accept: application/json" -H "Accept-type: application/json" -X POST -d '{"seed":"1","asize":"2","psize":"2","address":"","len0":"6","len1":"6","base0":"","base1":"6","numaddrs":"32"}' http://localhost:3200/segmentation

        '''
    