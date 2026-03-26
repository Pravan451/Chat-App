
# Real-Time Chat Application (MERN + Socket.IO)

A full-stack real-time chat application that enables instant communication between users using WebSockets.

## Features

- User authentication using JWT
- Real-time messaging with Socket.IO
- Online/offline user status
- Scalable backend architecture
- Responsive user interface

## Tech Stack

Frontend: React.js, HTML, CSS  
Backend: Node.js, Express.js  
Database: MongoDB  
Real-time: Socket.IO  

## Project Structure

client/ → React frontend  
server/ → Node.js backend  

## Setup

1. Clone the repository
git clone https://github.com/your-username/chat-app.git

2. Install dependencies
cd server && npm install  
cd ../client && npm install  

3. Configure environment variables (server)
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret_key  

4. Run the application
cd server && npm start  
cd client && npm start  

## Live Demo

https://chat-app-1-kdzf.onrender.com/

## Description

This project demonstrates real-time communication using WebSockets and full-stack development using the MERN stack. It is designed to handle multiple users and simulate a scalable chat system.
