const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
    // Perform form validation here
    if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});

function validateForm() {
    const nama = document.getElementById('Nama').value;
    const tanggal = document.getElementById('tanggal').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const telepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const konfirmasiPassword = document.getElementById('konfirmasiPassword').value;

            if (nama === '') {
                alert('Nama harus diisi.');
                return false;
            }

            if (tanggal === '') {
                alert('Tanggal lahir harus diisi.');
                return false;
            }

            if (jenisKelamin === '') {
                alert('Jenis kelamin harus dipilih.');
                return false;
            }

            if (telepon === '') {
                alert('No.Telepon harus diisi.');
                return false;
            }

            if (email === '') {
                alert('Email harus diisi.');
                return false;
            }

            // Add more validation rules for password and konfirmasiPassword here

            if (password !== konfirmasiPassword) {
                alert('Password dan Konfirmasi Password harus cocok.');
                return false;
            }

            return true; // If all validations pass
        }