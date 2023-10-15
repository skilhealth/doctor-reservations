const form = document.getElementById("form");
const nama = document.getElementById("Nama");
const telepon = document.getElementById("telepon");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const pass2 = document.getElementById("konfirmasi password");

   form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
   });

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const namaValue = nama.value.trim();
    const emailValue = email.value.trim();
    const teleponValue = telepon.value.trim();
    const passValue = password.value.trim();
    const pass2Value = konfirmasipassword.value.trim();
    
    if(namaValue === '') {
        setError(nama, 'nama is required');
    } else {
        setSuccess(nama);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(teleponValue === '') {
        setError(telepon, 'telepon is required');
    } else if (!isValidtelepon(teleponValue)) {
        setError(telepon, 'Set telepon number');
    } else {
        setSuccess(telepon);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(konfirmasipassword === '') {
        setError(konfirmasipassword, 'Please confirm your password');
    } else if (konfirmasipasswordValue !== passwordValue) {
        setError(konfirmasipassword, "Passwords doesn't match");
    } else {
        setSuccess(konfirmasipassword);
    }


 };