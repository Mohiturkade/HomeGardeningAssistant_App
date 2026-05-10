// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCOCK-6585AyJxjB9BNrpvQRMboH2XlKmo",
    authDomain: "homegardeningassistant.firebaseapp.com",
    projectId: "homegardeningassistant",
    storageBucket: "homegardeningassistant.firebasestorage.app",
    messagingSenderId: "152673905645",
    appId: "1:152673905645:web:12390b05bc256bd2b5d5e4",
    measurementId: "G-18HWMSLKFC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile
  };

