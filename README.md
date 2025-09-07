🏋️‍♂️ Gym Management System

A simple Gym Management System website built using HTML, CSS, JavaScript, and Firebase.
This project helps gym owners and members manage registrations, memberships, schedules, and other essential information digitally.

🚀 Features

🔐 User Authentication (Sign up & Login using Firebase Authentication)

📝 Member Registration & Profile Management

📅 Class & Schedule Management

💳 Membership Plans (view and manage subscription details)

📊 Dashboard with Real-time Data

☁️ Firebase Realtime Database / Firestore Integration

📱 Responsive Design for mobile and desktop

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Backend & Database: Firebase (Authentication, Firestore/Realtime Database, Hosting)

📂 Project Structure
├── login.html          # Login page & Registration page
├── admin_dashboard.html      # Admin dashboard
├── member.html      # member dashboard
├── user.html        #user dashboarc
├── admin.css        #stylesheet of admin
├── member.css       #stylesheet of member
├── login.css        #stylesheet of login
├── user.css         #stylesheet of user
├── app.js           # Main JavaScript logic
├── firebase.js  # Firebase configuration
└── README.md           # Project documentation

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/your-username/gym-management-system.git
cd gym-management-system


Set up Firebase

Go to Firebase Console

Create a new project

Enable Authentication (Email/Password or Google Sign-in)

Create a Firestore Database or Realtime Database

Copy your Firebase config and replace it inside firebase.js

// firebase-config.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);


Open the project

Run with Live Server (VS Code extension)

Or simply open index.html in your browser


<img width="1347" height="617" alt="Screenshot 2025-09-07 124450" src="https://github.com/user-attachments/assets/24a77373-8f8c-40dd-8a70-916e04a2d6a0" />
Login page

<img width="1345" height="533" alt="Screenshot 2025-09-07 124543" src="https://github.com/user-attachments/assets/688ecfcf-c20b-45a3-ab2d-b2d386030098" />
Member page

<img width="1125" height="571" alt="Screenshot 2025-09-07 124617" src="https://github.com/user-attachments/assets/886866bc-64de-427b-9263-e4ce033cb491" />
Admin page


📌 Future Improvements

✅ Add payment gateway integration

✅ Advanced admin dashboard with analytics

✅ Attendance tracking for members

✅ Notifications & reminders (Email/SMS)

🤝 Contributing

Feel free to fork this repository and submit pull requests to improve features.

📜 License

This project is licensed under the MIT License – you are free to use, modify, and distribute it.# GYM-management-system
