# React Firebase Auth Demo

This project demonstrates how to use Firebase for authentication and data storage in a React application. It includes a custom Firebase context API for managing user authentication and interacting with Firebase Realtime Database.

## Features

- User authentication with email and password
- User authentication with Google sign-in
- Store data in Firebase Realtime Database
- Retrieve data from Firebase Realtime Database

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AkshaySingh2005/react-firebase-auth-demo.git
   cd react-firebase-auth-demo

2. **Install Dependencies**

     Make sure you have Node.js installed. Then, install the project dependencies:

   ```bash
   npm install
   
3. **Configure Firebase**

     Replace the firebaseConfig object in src/firebase.js with your own Firebase configuration:

     ```
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        databaseURL: "YOUR_DATABASE_URL" // Add this if using Realtime Database
      };
 4. **Start the Development Server**
     ```bash
     npm start    
