let loginstate = sessionStorage.getItem("loginState")
const navWrap = document.getElementsByClassName("nav-content")

function navbar(state){
    if(state){
        return `
            <li><a href="#" onclick="clearstate()">Logout</a></li>
        `
    }else{
        return `
            <li><a href="page/login.html">Login</a></li>
            <li><a href="page/register.html">Register</a></li>
        `
    }
}
navWrap[0].innerHTML += navbar(loginstate)
function cleatstate(){
    sessionStorage.setItem('loginState',JSON.stringify(false))
}
function backpage(){
    history.back();
}