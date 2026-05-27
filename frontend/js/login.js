const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {

    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {

      console.log("login successfully");

      loginMessage.innerText =
        "Login successfully ✅";

      setTimeout(() => {
        window.location.href = "/frontend/pages/dashboard.html";
      }, 1500);

    } else {

      loginMessage.innerText = data.message;

    }

  } catch (error) {

    loginMessage.innerText = error.message;

    console.log("failed");

  }
});
