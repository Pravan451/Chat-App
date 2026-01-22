project live at : https://mern-chat-app-mf99.onrender.com
Real-Time Chat Application | MERN Stack + Socket.IO
A full-featured, real-time chat application built with the MERN stack. This project allows users to communicate instantly, customize their experience with themes, and manage their profiles with image uploads.

Key Features
Live Messaging: Real-time messaging using Socket.IO for instant communication without page refresh.

User Profiles: Users can create profiles and upload avatars, with images handled via Cloudinary.

Customizable Themes: Integration with DaisyUI to offer multiple themes for user customization.

Secure Authentication: User authentication powered by JWT to ensure secure communication channels.

Efficient State Management: Using Zustand for client-side state management, including authentication and online users.

Tech Stack
Frontend: React.js, Zustand, Tailwind CSS, DaisyUI

Backend: Node.js, Express.js

Database: MongoDB

Real-Time Communication: Socket.IO

Authentication: JWT

Cloud Services: Cloudinary (for image uploads)

Implementation Details
Socket.IO for Real-Time Communication
Server-Side: Handles events like sendMessage, typing, and disconnect to manage user interactions and message broadcasts.

Client-Side: Uses React Context to manage the socket instance across components and emits events like sendMessage and typing.

Frontend State Management with Zustand
useAuthStore: Stores authenticated user data and JWT token.

useMessageStore: Manages messages for active chats, ensuring the UI updates reactively when new messages arrive.

Getting Started
Prerequisites
Node.js (v16 or later)

npm / yarn

MongoDB account and connection string

Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/KaryampudiMadhav/mern-chat-app.git
Install backend dependencies

bash
Copy
Edit
cd your-chat-app-repo
npm install
Install frontend dependencies

bash
Copy
Edit
cd frontend
npm install
Set up environment variables

Create a .env file in the root (backend) directory with the following:

PORT=8000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the application

Backend: From the root directory, start the backend server.

Frontend: From a new terminal in the frontend directory, run the React app.

npm run dev
Author
Madhav Karyampudi

