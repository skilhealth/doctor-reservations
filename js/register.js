// const form = document.getElementById("form");
// const nama = document.getElementById("nama");
// const telepon = document.getElementById("telepon");
// const email = document.getElementById("email");
// const pass = document.getElementById("password");
// const pass2 = document.getElementById("konfirmasi password");

function submitData() {
    let nama = document.forms["form-register"]["nama"].value.trim();
    let tanggal_lahir = document.forms["form-register"]["tanggal"].value.trim();
    let jenis_kelamin = document.forms["form-register"]["jenis_kelamin"].value.trim();
    let telepon = document.forms["form-register"]["telepon"].value.trim();
    let email = document.forms["form-register"]["email"].value.trim();
    let password = document.forms["form-register"]["password"].value.trim();
    let konfirmasi_password =
      document.forms["form-register"]["konfirmasi_password"].value.trim();
  
    if (nama.length == 0) {
      alert("Nama Masih Kosong!");
      return false;
    }
  
    if (tanggal_lahir.length == 0) {
      alert("Tanggal Lahir Masih Kosong!");
      return false;
    }
  
    if (jenis_kelamin.length == 0) {
      alert("Jenis Kelamin Masih Kosong!");
      return false;
    }
  
    if (telepon.length == 0) {
      alert("Telepone Masih Kosong!");
      return false;
    }
  
    if (email.length == 0) {
      alert("Email Masih Kosong!");
      return false;
    }
  
    if (password.length == 0) {
      alert("Password Masih Kosong!");
      return false;
    }
  
    if (konfirmasi_password.length == 0) {
      alert("Konfirmasi Password Masih Kosong!");
      return false;
    }
  
    if (password !== konfirmasi_password) {
      alert("Password Tidak Sama!");
      return false;
    }
  
    const setData = {
      name: nama,
      TanggalLahir: tanggal_lahir,
      JeniKelamin: jenis_kelamin,
      NoTelepon: telepon,
      Email: email,
      Password: password,
      KonfirmasPassword: konfirmasi_password,
    };
  
    //   SENDING DATA
    fetch("https://652c1049d0d1df5273ef1aa4.mockapi.io/registeruser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(setData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        window.location.replace("http://127.0.0.1:7777/landing-page.html");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  
  //   validateInputs();
  // });
  
  // const setError = (element, message) => {
  //   const inputControl = element.parentElement;
  //   const errorDisplay = inputControl.querySelector(".error");
  
  //   errorDisplay.innerText = message;
  //   inputControl.classList.add("error");
  //   inputControl.classList.remove("success");
  // };
  
  // const setSuccess = (element) => {
  //   const inputControl = element.parentElement;
  //   const errorDisplay = inputControl.querySelector(".error");
  
  //   errorDisplay.innerText = "";
  //   inputControl.classList.add("success");
  //   inputControl.classList.remove("error");
  // };
  // const isValidEmail = (email) => {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // };
  
  // const validateInputs = () => {
  //   const namaValue = nama.value.trim();
  //   const emailValue = email.value.trim();
  //   const teleponValue = telepon.value.trim();
  //   const passValue = password.value.trim();
  //   const pass2Value = konfirmasipassword.value.trim();
  
  //   if (namaValue === "") {
  //     setError(nama, "nama is required");
  //   } else {
  //     setSuccess(nama);
  //   }
  
  //   if (emailValue === "") {
  //     setError(email, "Email is required");
  //   } else if (!isValidEmail(emailValue)) {
  //     setError(email, "Provide a valid email address");
  //   } else {
  //     setSuccess(email);
  //   }
  
  //   if (teleponValue === "") {
  //     setError(telepon, "telepon is required");
  //   } else if (!isValidtelepon(teleponValue)) {
  //     setError(telepon, "Set telepon number");
  //   } else {
  //     setSuccess(telepon);
  //   }
  
  //   if (passwordValue === "") {
  //     setError(password, "Password is required");
  //   } else if (passwordValue.length < 8) {
  //     setError(password, "Password must be at least 8 character.");
  //   } else {
  //     setSuccess(password);
  //   }
  
  //   if (konfirmasipassword === "") {
  //     setError(konfirmasipassword, "Please confirm your password");
  //   } else if (konfirmasipasswordValue !== passwordValue) {
  //     setError(konfirmasipassword, "Passwords doesn't match");
  //   } else {
  //     setSuccess(konfirmasipassword);
  //   }
  // };
  