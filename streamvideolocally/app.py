from flask import Flask, request, send_file, Response
import mimetypes
import os
import re

app = Flask(__name__)

# [No OC]
@app.after_request
def after_request(response):
    response.headers.add('Accept-Ranges', 'bytes')
    return response


@app.route(f"/f/<path:file_name>")
def send_file_partial(file_name):
    """ 
        Simple wrapper around send_file which handles HTTP 206 Partial Content
        (byte ranges)
        TODO: handle all send_file args, mirror send_file's error handling
        (if it has any)
    """
    loca = "files/" + file_name

    range_header = request.headers.get('Range', None)
    if not range_header: return send_file(loca)
    
    size = os.path.getsize(loca)    
    byte1, byte2 = 0, None
    
    m = re.search('(\d+)-(\d*)', range_header)
    g = m.groups()
    
    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])

    length = size - byte1
    if byte2 is not None:
        length = byte2 - byte1
    
    data = None
    with open(loca, 'rb') as f:
        f.seek(byte1)
        data = f.read(length)

    rv = Response(data, 
        206,
        mimetype=mimetypes.guess_type(loca)[0], 
        direct_passthrough=True)
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))

    return rv


@app.route("/")
def home():

    files_names = [x for x in os.listdir("files") if os.path.isfile(os.path.join("files/", x))]

    html = """
        <h1>All files</h1> <hr /> <ul>
    """

    for file_name in files_names:
        
        html += '<li><a href="/f/%s">%s</a></li>' % (file_name, file_name)

    html += "</ul>" 

    return html

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')