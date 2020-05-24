# README
## Group-23-Azure-Ant's RoadTrip Planner Web Application
This project leverages the power of many APIs to display helpful information when planning a road trip. The app allows the user to navigate between locations, view, add and remove nearby places or restaurants, as well as viewing relevant weather information. The user can save and load their trips.
### Motivation
There are many apps that allow the ability to navigate within cities and find nearby places. The functionality to scale this to throughout different cities and generally create a road trip has not been widely adopted. This application will help bridge the gap between city transit and full inter-city road trips.
### Features
* Navigation To and From places using google maps API
* Considering different nearby places and restaurants using google places API
* Save future planned trips with google drive
* Load planned trips with google drive
* View weather information regarding destinations using weather API
* Sign in with OAuth2.0
### Application Screenshots
Please visit [Design Screenshots](https://github.com/jake-good/Group-23-Azure-Ant/wiki/Design-Screenshots), to view various screenshots of the application in use. 
### Build/Install
To learn how to build/install the application, please visit [here](https://github.com/jake-good/Group-23-Azure-Ant/wiki/Running-the-Webpage). 
### Contributing
To learn how to contribute to the project, please visit [here](https://github.com/jake-good/Group-23-Azure-Ant/wiki/Using-Git-and-Github).  
### Code Style
The project generally uses standard code style. Use of camel case fields and variables, as well as proper indentations. 
### Technology
Please view various technology and APIs used [here](https://github.com/jake-good/Group-23-Azure-Ant/wiki/APIs-and-Dependencies).
### Disclaimer
This application will use your google login to save files to google drive. This will be a JSON file that saves your trips, when you choose to do so. This file will be accessed when loading your trips on return to the application. If you delete this file, then the all of your trips will no longer be saved and cannot be accessed ny the application. 
When you close or refresh the web page, you will remained logged in, unless your clear your site data, or log in as another user. 

