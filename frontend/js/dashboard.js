let buttons = document.querySelectorAll(".add-plant-btn");
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("close-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("show-popup");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("show-popup");
});
