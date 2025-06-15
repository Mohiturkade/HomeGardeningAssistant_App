import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOCK-6585AyJxjB9BNrpvQRMboH2XlKmo",
  authDomain: "homegardeningassistant.firebaseapp.com",
  projectId: "homegardeningassistant",
  storageBucket: "homegardeningassistant.appspot.com",
  messagingSenderId: "152673905645",
  appId: "1:152673905645:web:12390b05bc256bd2b5d5e4",
  measurementId: "G-18HWMSLKFC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const loginMessage = document.getElementById("login-message");

  loginMessage.innerText = "";

  if (!email || !password) {
    loginMessage.innerText = "Please enter both email and password.";
    loginMessage.style.color = "red";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      loginMessage.innerText = "Login Successful ✅";
      loginMessage.style.color = "green";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    })
    .catch((error) => {
      loginMessage.innerText = "Login failed ❌: " + error.message;
      loginMessage.style.color = "red";
    });
});
