# social_app

This is a simple social media app built with React and Firebase.
Social App

A minimal social media app built with React and Firebase.

Project Setup Instructions

**Clone the repository: **

git clone https://github.com/ammysharma11/social_app.git
cd social_app

Install dependencies:

npm install

Key dependencies:

react

react-dom

react-router-dom

firebase

axios (for Cloudinary/image upload)

dotenv (for environment variables)

These will be installed automatically from package.json, but you can install any individually with npm install <package> if needed.

Set environment variables:

Create a .env file in the project root:

REACT_APP_CLOUDINARY_CLOUD=your_cloud_name
REACT_APP_CLOUDINARY_PRESET=your_unsigned_preset
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key


Start the application:

npm start

Technologies Used

React.js

Firebase Authentication

Firebase Firestore

Firebase Storage (optional)

Cloudinary (image uploads)

Vercel (deployment)

CSS (custom styling)

Key Features Implemented

User signup, login, and logout

Profile with avatar, name, and bio

Create posts (text and image)

Real-time global feed

Clap system (multiple claps per post)

Responsive and modern UI

Limitations / Known Issues

No comments or messaging between users

No pagination or infinite scrolling in feed

No image compression or moderation

Basic form/input validation only
