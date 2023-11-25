from http.server import SimpleHTTPRequestHandler
import socketserver
import json
from datetime import datetime
import pandas as pd
import os

CLIPBOARD_CSV_FILE_PATH = "./clipboard.csv"


def init_csvfile():
  if not os.path.isfile(CLIPBOARD_CSV_FILE_PATH):
    with open(CLIPBOARD_CSV_FILE_PATH, "w+") as file:
      file.write("id,copied_text,date")


class MyServer(SimpleHTTPRequestHandler):

  def do_GET(self):

    try:
      init_csvfile()

      html = "<table style='width: 100%'>"
      df = pd.read_csv(CLIPBOARD_CSV_FILE_PATH, sep=",")
      tr = ""
      for i in reversed(range(len(df.index))):
        tr += f"<tr><td style='border-bottom: 1px solid #000000' id='{i}'>{df.loc[i, 'copied_text']}</td><td><button onclick='copyContent({i})'>Copy</button></td></tr>"
      html += tr + """</table>
          <script>

    const copyContent = async (id) => {
      let text = document.getElementById(id).innerHTML;
      try {
        await navigator.clipboard.writeText(text);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  </script>

          """
      self.send_response(200)
      self.send_header("Content-type", "text/html; charset=utf-8")
      self.send_header("Content-Length", str(len(html)))
      self.end_headers()

      self.wfile.write(bytes(html, "utf-8"))

    except:

      self.send_response(500)
      self.send_header("Content-type", "text/html; charset=utf-8")
      self.end_headers()

      self.wfile.write(bytes("<h1>Server Error</h1>", "utf-8"))

  def do_POST(self):

    try:

      init_csvfile()

      if self.path == "/clipboard/":
        x = self.data_string = self.rfile.read(
            int(self.headers['Content-Length']))

        data = json.loads(x.decode("utf-8"))

        df = pd.read_csv(CLIPBOARD_CSV_FILE_PATH, sep=",")

        copied_text = str(data["copied_text"]).strip()

        if len(copied_text) == 0:
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.end_headers()
          return json.dumps({"message": "Copied content is empty!"})

        if len(df.index) > 0 and copied_text == df.loc[len(df.index) - 1,
                                                      'copied_text']:
          self.send_response(400)
          self.send_header("Content-type", "application/json")
          self.end_headers()
          return json.dumps({"message": "Copied content is same as last one!"})

        df.loc[len(df.index)] = [len(df.index), copied_text, datetime.utcnow()]
        df.to_csv(CLIPBOARD_CSV_FILE_PATH, sep=",", index=False)

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        return json.dumps({"message": "Success"})

    except:

      self.send_response(500)
      self.send_header("Content-type", "application/json")
      self.end_headers()

      return json.dumps({"message": "Server error"})


handler_object = MyServer

PORT = 8080
my_server = socketserver.TCPServer(("", PORT), handler_object)
my_server.serve_forever()
