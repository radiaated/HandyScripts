from pynput.keyboard import Listener, Key
import time
import pyperclip
import requests
import sys

args = sys.argv[1:]

params = {args[ind]: args[ind+1] for ind in range(len(args) - 1) if ind % 2 == 0 }

for key in params.keys():
    if key != "-u":
        print(f"{key} is invalid argument!\t")

if params.get("-u"):
    set_url = params["-u"].strip()
    set_url = set_url[:len(set_url) - 1] if set_url[len(set_url) - 1] == "/" else set_url
else:
    set_url = "http://localhost:8080"


current = set()


def on_press(key):

    try:

        if hasattr(key, "char") and key.char == "c" and Key.ctrl in current:

                copied_text = pyperclip.paste()

                requests.post("{url}/clipboard/".format(url=set_url), json={"copied_text": copied_text}, headers={"Content-Type": "application/json"})

        if key == Key.ctrl:
            current.add(key)

        time.sleep(1)
    except:
        print("Error!")

def on_release(key):

    try:
        current.remove(key)
    except KeyError:
        pass
    
  
with Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()

print("Listening to ctrl+c")