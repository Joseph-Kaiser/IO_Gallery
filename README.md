# IO_Gallery
IO_Gallery is a Discrete, Local and Dynamic media gallery;

Store your media in a safe enviroment, camouflaged by a project folder

## Installation
Use the NPM package manager to install the dependencies.
```bash
npm install
```

## Usage
1. Start the main server via Init.bat;
2. Access the Gallery via http://localhost:8000/;
3. Check the info card on the front page / chart in the File Structure segment;
4. Set up the media accordingly;
5. Click on the main logo, and follow the first access procedure to set up your password;
6. Log In;

## Features
- Desktop & Mobile ready (check Local Access)
- Password protected
- Dynamically loaded media straight from folders;
- Search feature for Albums & Galleries;
- Media size filter
- Media type filter

## Customization
The user is able to: 
- Set a custom password 
- Change login images, by adding/removing media from public/CustomLogin
- -Planned- Change background image 

## File Structure Setup

1. Navigate to the /Public folder of this project;
2. Create a new folder named Albums
3. Inside Albums, create albums folders with any name
4. Add galleries folders to the respective albums folders

The filesystem should look like this example:

- public/Albums/Digital-Art/Landscapes/-multiple Landscapes media files
- public/Albums/Digital-Art/Urban/-------multiple Animals media files
- public/Albums/Photography/Animals/--multiple Animals media files

## Local Access

Since the app is runned by a server, it can be accessed by other devices on the network.

1. Open CMD and check your IPV4 Address, by using the ipconfig command
2. Open the browser on your smarthphone/tablet/laptop and navigate to http://IPV4:8000

## License
[MIT](https://choosealicense.com/licenses/mit/)