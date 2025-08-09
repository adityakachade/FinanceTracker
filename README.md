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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
FinanceTracker/
├── index.html              # Home page
├── auth.html               # User signup/login page
├── dashboard.html          # Financial dashboard
├── about.html              # About Us page
├── contact.html            # Contact page
│
├── css/
│   └── styles.css          # Custom CSS styles
│
├── js/
│   ├── auth.js             # Authentication logic (login/signup)
│   ├── dashboard.js        # Dashboard data handling and chart rendering
│   ├── contact.js          # Contact form validation and submission
│   └── firebase-config.js  # Firebase configuration and initialization
│
├── assets/                 # Images, icons, and other static assets
│
└── README.md               # Project overview and documentation

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

