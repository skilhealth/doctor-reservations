function func() {
  var username = document.getElementById("Username/Email").value;
  var pass = document.getElementById("Password").value;

  if (username == 'skilhealth01' && pass == '12345'){
    alert("Succesfull Login")
    window.location.assign("home.html")
  }
  else{
    alert("Login Invalid")
  }
}

