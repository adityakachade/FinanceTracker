
````markdown
# 💰 FinanceTracker

A personal finance manager that helps you track income, expenses, and visualize spending patterns — all in real-time.

[🔗 Live Demo](https://trackthefinance.netlify.app/)  
[📦 View on GitHub](https://github.com/adityakachade/FinanceTracker)

---

## 📌 Overview

**FinanceTracker** is a modern, responsive web app built to help individuals take control of their financial lives. With Firebase integration for authentication and real-time database updates, users can manage transactions, view dashboards, and monitor spending on any device.

---

## 🚀 Features

- 🔐 User authentication with Firebase
- ➕ Add, edit, and delete transactions (income & expenses)
- 📊 Interactive financial dashboard with charts
- 📂 Transaction categorization and summaries
- ⚡ Real-time updates using Firestore
- 📱 Fully responsive for mobile and desktop

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Authentication & Firestore Database
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Deployment**: Netlify

---

## 📷 Screenshots

### 🏠 Home Page
![Home Page](assets/Home.png)
![Uploading image.png…]()

### 📊 Dashboard View
![Dashboard](assets/dashBoard.png)

> Replace `homepage.png` and `dashboard.png` with the **exact filenames** of your screenshots in the `assets/` folder.

---

## 🧪 Getting Started

### ⚙️ Prerequisites

* Basic knowledge of web development
* A free [Firebase account](https://firebase.google.com/)

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/adityakachade/FinanceTracker
cd FinanceTracker
````

### 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password Authentication**
4. Enable **Firestore Database**
5. Get your Firebase config object

Then, create a file at `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
```

### ▶️ Run the App

* Open `index.html` directly in your browser, **or**
* Use a local server (e.g., Live Server in VS Code)

---

## 📁 Project Structure

```
FinanceTracker/
├── index.html              # Home page
├── auth.html               # Signup/Login
├── dashboard.html          # Main dashboard
├── about.html              # About the app
├── contact.html            # Contact page
│
├── css/
│   └── styles.css
│
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── contact.js
│   └── firebase-config.js
│
├── assets/                 # Screenshots and icons
│   ├── homepage.png
│   └── dashboard.png
└── README.md
```

---

## 🧭 Usage Guide

1. **Sign up** or **Log in** to your account
2. Access your **dashboard**:

   * Add income/expenses
   * See charts and summaries
   * Edit/delete past entries
3. Visit **About** or **Contact** pages to learn more or give feedback

---

## 📬 Contact

Created by **Aditya Kachade**
📧 [adityakachade@gmail.com](mailto:adityakachade@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/adityakachade/)

