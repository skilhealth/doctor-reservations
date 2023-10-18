let loginstate = sessionStorage.getItem("loginState")
const navWrap = document.getElementsByClassName("nav-content")
function navbar(state) {
    if (state == 1) {
        return `
            <li><a href="index.html" onclick="(sessionStorage.setItem('loginState',JSON.stringify(0)))">Logout</a></li>
        `
    }
    else {
        return `
            <li><a href="page/login.html">Login</a></li>
            <li><a href="page/register.html">Register</a></li>
        `
    }
}
function cekState() {
    if (sessionStorage.getItem("loginState") == 1) {
        window.location.href = "page/list-jadwal-temu.html"
    } else {
        window.location.href = "page/login.html"
    }
}

navWrap[0].innerHTML += navbar(loginstate)
function cleatstate() {
    sessionStorage.setItem('loginState', JSON.stringify(false))
}
function cleatstate() {
    sessionStorage.getItem('loginState')
}
function backpage() {
    history.back();
}