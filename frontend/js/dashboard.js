let buttons = document.querySelectorAll(".add-plant-btn");
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("close-btn");
let signoutBtn = document.getElementById("signout-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("show-popup");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("show-popup");
});

signoutBtn.addEventListener("click" ,async () => {
  try {
    const res = await fetch("http://localhost:3000/users/logout", {
      method: "POST",
      credentials: "include",
      

    })
    const data = await res.json();
    console.log(data);
    if(res.ok){
     alert("Logout Succesfully✅")
    window.location.href = "/index.html"

    }
  } catch (error) {
    console.log(error.message)
  }
})
