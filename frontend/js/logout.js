import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "/pages/index.html";
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
});

