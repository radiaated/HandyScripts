## Stream videos locally within your network
#### Prerequisite
- Python3
- Flask
#### Install
1. Download this directory
2. Install Flask by running command in terminal
	```
	pip install Flask
	```
3. Keep all your videos in directory `files`
4. Run the command in terminal
	```
	flask run --host=0.0.0.0
	```
	Then terminal displays where the flask is running the web application as:
	```
	 * Running on all addresses (0.0.0.0)
	 * Running on http://127.0.0.1:5000
	 * Running on http://192.168.x.y:5000
	```
	`http://192.168.x.y:5000` is the local IP of the device where you are currently running the flask application locally within the network by executing above commands. 
	
5. In any other devices within the local network open the browser or any streaming application (like vlc) and go to:
	```
	http://192.168.x.y:5000/f/video_file_name.mp4
	```
___
#### Wassup, whas here?
- Home page with a list of all videos/files in the directory `files`
- Supports video seeking
