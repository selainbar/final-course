# final-course
## Project Overview

This project is the final course project for the [Course Name] course. It encompasses all the concepts and skills learned throughout the course, including [list key topics or skills].

## Features

-Dockerized Micro Services that works individualy
- Authenticate and store Users with JWT while keeping their data hidden (not storing the pasword in the DataBase instead store an encripted version of it)
- messaging and playing with other users in realtime using Websocket(Socket.io)

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
## Credit

sela inbar-Fullstack developer


## Contact

For any questions or feedback, please contact sela inbar at selainbar14@gmail.com