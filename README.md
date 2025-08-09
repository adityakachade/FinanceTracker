# FinanceTracker

![Money Manager Screenshot](https://via.placeholder.com/800x400?text=Money+Manager+Screenshot)

**Money Manager** is a comprehensive personal finance application that helps you track your income and expenses, visualize your spending patterns, and achieve your financial goals. Built with modern web technologies and Firebase backend, it provides a seamless experience across all devices.

🔗 **Live Demo**: [https://trackthefinance.netlify.app/](https://trackthefinance.netlify.app/)

---

## Features

* **User Authentication**: Secure signup and login with Firebase Authentication
* **Transaction Management**: Add, edit, and delete income and expense transactions
* **Financial Dashboard**: Visualize your finances with interactive charts
* **Expense Tracking**: Categorize and monitor your spending
* **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
* **Real-time Updates**: See your financial data update instantly

---

## Technologies Used

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **UI Framework**: Tailwind CSS
* **Backend**: Firebase (Authentication, Firestore Database)
* **Data Visualization**: Chart.js
* **Icons**: Font Awesome

---

## Getting Started

### Prerequisites

* A [Firebase account](https://firebase.google.com/) (free)
* Basic understanding of web development

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adityakachade/FinanceTracker
   cd FinanceTracker
   ```

2. Set up Firebase:

   * Create a new Firebase project at [firebase.google.com](https://firebase.google.com/)
   * Enable **Authentication** (Email/Password method)
   * Set up **Firestore Database**
   * Get your Firebase configuration

3. Add Firebase configuration:
   Create `js/firebase-config.js` with your Firebase credentials:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyBd_qboEWxfksqp4ihUS6ulOkogVuVA-SY",
     authDomain: "real-time-updates-5d308.firebaseapp.com",
     projectId: "real-time-updates-5d308",
     storageBucket: "real-time-updates-5d308.appspot.com",
     messagingSenderId: "233653353230",
     appId: "1:233653353230:web:d571e79f407e12b0f8b55f",
     measurementId: "G-NSS2X91YMT"
   };
   firebase.initializeApp(firebaseConfig);
   ```

4. Run the Application:

   * Open `index.html` in your browser directly, or
   * Use a local development server (e.g., Live Server in VS Code)

👉 Or check out the live version: [https://trackthefinance.netlify.app/](https://trackthefinance.netlify.app/)

---

## File Structure

```
money-manager/
├── index.html              # Home page
├── auth.html               # Authentication page
├── dashboard.html          # Main dashboard
├── about.html              # About us page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # Custom styles
├── js/
│   ├── auth.js             # Authentication logic
│   ├── dashboard.js        # Dashboard functionality
│   ├── contact.js          # Contact form handling
│   └── firebase-config.js  # Firebase setup
├── assets/                 # Images and icons
└── README.md               # This file
```

---

## Usage

1. **Home Page**: View app features and get started
2. **Authentication**: Sign up or log in to access your dashboard
3. **Dashboard**:

   * View financial summary (balance, income, expenses)
   * Explore interactive spending charts
   * Add, edit, or delete transactions
4. **About Page**: Learn more about the app and its creators
5. **Contact Page**: Reach out to support or give feedback

🌐 **Try the app now**: [https://trackthefinance.netlify.app/](https://trackthefinance.netlify.app/)

