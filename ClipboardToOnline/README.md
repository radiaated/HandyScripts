# ClipboardToOnline

**\*Works only when `Ctrl + z` is pressed**
**\*Works only on a Linux machine**

### Running the server

Command to run the localserver on port 8080

```
python server.py
```

The server receives the copied content and write it to `clipboard.csv`.

`server.py` can also be run online, for example on [Replit](https://replit.com/) to share the clipboard with others.

---

### Run the keyboard keystroke listener on the Linux machine

`main.py` listens to the keyboard stroke `Ctrl + z`.

```
nohup python main.py &
```

`&` runs the python script `main.py` as a background process and `nohup` keeps running the python script `main.py` even if the terminal is closed.

#### Running the keyboard keystroke listener if `server.py` is run to Replit

```
nohup python main.py -u https://*.*.repl.co/ &
```

---

The copied contents are displayed in a webpage here:
`http://localhost:8080`

If server.py is run on Replit go the index page i.e.
`https://*.*.repl.co/`

`main.py` script can be set to be run after the Linux machine boots.

Done!
