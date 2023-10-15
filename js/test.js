console.log("test")
let token = ['GL652H','GR673H','GX654H','LM123N','PPQ123']

let btn = document.getElementById("test")
btn.addEventListener("click",(event) =>{
    event.preventDefault()
    sessionStorage.setItem('token', JSON.stringify(token) )
    window.location.href = "../page/list-jadwal-temu.html"
})