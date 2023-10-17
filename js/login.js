function Login() {
  let email = document.forms["form-login"]["email"].value.trim();
  let password = document.forms["form-login"]["password"].value.trim();

  if (email.length == 0) {
    alert("Email Masih Kosong!");
    return false;
  }

  if (password.length == 0) {
    alert("Password Masih Kosong!");
    return false;
  }

  // FETCH DATA
  const url = new URL(
    "https://652c1049d0d1df5273ef1aa4.mockapi.io/registeruser"
  );
  url.searchParams.append("Email", email); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false

  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((user) => {
      if (user.length === 0) {
        return alert("Email atau Password Salah!");
      } else {
        if (user[0].Password !== password) {
          return alert("Email atau Password Salah!");
        } else {
          sessionStorage.setItem("userData", JSON.stringify(user));
          alert("Login Berhasil!");
          setLoginStatus(true);
          setTimeout(function () {
            window.location.replace("./landing-page.html");
          }, 2000);
        }
      }
    })
    .catch((error) => {
      console.log(error);
      setLoginStatus(false);
    });
}

function setLoginStatus(isLoggedIn) {
  sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
}

// function func() {
//     var username = document.getElementById("Username/Email").value;
//     var pass = document.getElementById("Password").value;

//     if (username == 'skilhealth01' && pass == '12345'){
//       alert("Succesfull Login")
//       window.location.assign("home.html")
//     }
//     else{
//       alert("Login Invalid")
//     }
//   }
