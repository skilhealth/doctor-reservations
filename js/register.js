function submitData() {
  let nama = document.forms["form-register"]["nama"].value.trim();
  let tanggal_lahir = document.forms["form-register"]["tanggal"].value.trim();
  let jenis_kelamin =
    document.forms["form-register"]["jenis_kelamin"].value.trim();
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
    alert("Telephone Masih Kosong!");
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
      alert("Pendaftaran Akun Berhasil!");
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 2000);
      setLoginStatus(true);
    })
    .catch((error) => {
      console.log(error);
      setLoginStatus(false);
    });
}