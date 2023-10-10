const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", function () {
  nav.classList.add("active");
});

closeMenu.addEventListener("click", function () {
  nav.classList.remove("active");
});
