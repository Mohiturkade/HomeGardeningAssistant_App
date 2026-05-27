const signupBtn = document.getElementById("signup-btn");
const signupMessage = document.getElementById("signup-message");

signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {

    const res = await fetch("http://localhost:3000/users/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {

      console.log("signup successfully");

      signupMessage.innerText =
        "Account created successfully ✅";

      setTimeout(() => {
        window.location.href = "/frontend/pages/dashboard.html";
      }, 1500);

    } else {

      signupMessage.innerText = data.message;

    }

  } catch (error) {

    signupMessage.innerText = error.message;

    console.log("failed");

  }
});