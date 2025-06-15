import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile
} from './auth.js'; // Make sure this file exports `auth`

document.getElementById("signup-btn").addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  const message = document.getElementById("signup-message");

  message.innerText = "";
  message.style.color = "red";

  if (!name || !email || !password || !confirmPassword) {
    message.innerText = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the display name
    await updateProfile(user, {
      displayName: name
    });

    message.style.color = "green";
    message.innerText = "Signup successful ✅ Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } catch (error) {
    message.innerText = `Signup failed ❌: ${error.message}`;
  }
});



