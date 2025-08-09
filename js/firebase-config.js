// firebase-config.js - For pure HTML/JS projects (Firebase v8)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd_qboEWxfksqp4ihUS6ulOkogVuVA-SY",
  authDomain: "real-time-updates-5d308.firebaseapp.com",
  projectId: "real-time-updates-5d308",
  storageBucket: "real-time-updates-5d308.appspot.com",
  messagingSenderId: "233653353230",
  appId: "1:233653353230:web:d571e79f407e12b0f8b55f",
  measurementId: "G-NSS2X91YMT"
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that instance
}

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Optimize Firestore connection (helps with some network issues)
db.settings({
  experimentalForceLongPolling: true,
  merge: true
});

// Make available globally (for other scripts to use)
window.auth = auth;
window.db = db;