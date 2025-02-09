# final-course
## Project Overview

This project is the final course project for the [Course Name] course. It encompasses all the concepts and skills learned throughout the course, including [list key topics or skills].

## Features

-Dockerized Micro Services that works individualy
- Authenticate and store Users with JWT while keeping their data hidden (not storing the pasword in the DataBase instead store an encripted version of it)
- messaging and playing with other users in realtime using Websocket(Socket.io)
-Integrate Open Source code in an integral part of my app

## Installation

To install and run this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/selainbar/final-course.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
create a .env file for log-in and chat
on the log-in write:
"
PORT=5555
MONGO_CONNECTION_STRING=!!!!!***** youre MongoDb connection string *******!!!!!
JWT_REFRESH_SECRET=!!!!!***** youre secret *******!!!!!
JWT_ACCESS_SECRET= !!!!!***** youre other secret *******!!!!!
"
on the chat .env file write:

MONGO_CONNECTION_STRING=!!!!!***** youre MongoDb connection string *******!!!!!
PORT=3000

## Usage

To start the project, run:
```bash
docker-compose start
````

## about the project

the project is containing 5 backends and 3 frontend all Dockerized MicroServices
Backend:
login,
online,
chat,
invite,
game Backend(open source)

Frontend:
web,
desktop,
game Frontend (open source)

## About the Project

The project contains 5 backends and 3 frontends, all Dockerized MicroServices.

### Backend:
- **Login**: Create new users and store their data on MongoDB without storing their password as is. Instead, it encrypts it and only then stores it so not even the database can know your password. It then gives you a JWT for access with an expiration time and a refresh token which is for a lifetime and stores them both on HTTP-only cookies in the client to prevent simple JavaScript manipulations. Moreover, the app constantly checks the tokens and if the access token is expired, it checks the refresh token. If valid, it issues a new access token and if not, the user will disconnect from the main app and will be returned to the login page.
- **Online**: Using WebSocket Protocol to communicate in real-time with the app's active users and update it to all users using Socket.io.
- **Chat**: Using a WebSocket Protocol to communicate in real-time with the users' messages and their credentials and store all previous messages.
- **Invite**: Using WebSocket to communicate in real-time, sending and receiving invitation requests and answering them, and passing all the required data to launch a game.
- **Game Backend**: Handling and communicating with HTTP requests all the events of the specific game throughout the game's lifespan (creating the game all the way to winning).

### Frontend:
- **Web**: Several pages and components and navigating between them with React Router DOM.
- **Desktop**: Hosting on Electron window the app on the web to facilitate a desktop app.
- **Game Frontend**: Displaying the game board and events of the game according to the game logic similarly to both players.
game Frontend(open source)

### THE LOG-IN-JavaScript
create new users and store their data on mongoDB without storing their password as is instead it encript it and only then stores it so no even the DataBase can know youre password and then it gives you a JWT for Access with expiration time and a Refresh which is for a Life time and store them both on HTTP only cookies in the client to prevent simple javascript manipulations
more over the app constantly checking the tokens and if the access token is expired it checks the refresh token. if valid then it issue a new access token and if not the user will disconnect from the main app and will be returned to the log in page

### THE ONLINE-Javascript
using WebSocket Protocol to communicate in real time the app active users and update it to all users
using Socket.io

### THE Chat-JavaScript
using a WebSocket Protocol to communicate in real time the users messages and their credetials
and store all previous messages 

### THE INVITE-JavaScript
using WebSocket to communicate in real time sending and recieving invitation request and asnwering them and passing all the required data to lunch a game


### THE GAME Backend-JavaScript
handling and communicating with HTTP request all the events of the specific game 
throughout the game life span
(creating the game all the way to winning)

### THE WEB-REACT
several pages and components and navigating between them with react router dom


### THE DEKSTOP-ELECTRON
hosting on electron window the app on the web to facilitate desktop app

### THE GAME FRONTEND-TypeScript
displaying the game board and events of the game acording to the game logic simularly to both players


## Credit

sela inbar-Fullstack developer


## Contact

For any questions or feedback, please contact sela inbar at selainbar14@gmail.com