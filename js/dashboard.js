// GET DATA FROM LOCAL STORAGE
const userLoggin = localStorage.getItem("userData");

// CHECKING DATA
if (userLoggin === null) {
  window.location.replace("http://127.0.0.1:7777/login.html");
}
