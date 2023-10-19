let cardStatus = document.getElementById("card")
let profile = document.getElementById("profile")
let infoDoctor = document.getElementsByClassName("info-doctor")
let confirm = document.getElementById("confirm")
let formbox = document.getElementById("submit-data")
const getDetail = sessionStorage.getItem('detail')
const parsedetail = JSON.parse(getDetail)
const parseakun = JSON.parse(sessionStorage.getItem("userData"))

async function getDataDoctor(index) {
    try {
        let respons = await fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`);
        let doctor = await respons.json()
        if (doctor.status === true) {
            var doctorStatus = "<div class='status-color' style='background-color:lightgreen;'></div>"
            var statusName = "<span>Aktif</span>"

        } else {
            var doctorStatus = "<div class='status-color' style='background-color:red;'></div>"
            var statusName = "<span>Tidak Aktif</span>"
        }
        let experienceListItems = doctor.experience.map(item => `<li>${item}</li>`).join('');
        let dataProfile = `
        <img id="doctor-img" src="${doctor.images}.png" alt="profile">
        <div class="profile-container">
            <div class="status">${doctorStatus + statusName}</div>
            <h1>${doctor.name}</h1>
            <p>${doctor.specialist}</p>
            <p>${doctor.hospital}</p>
        </div>
        `
        let profilInfo = `
        <h3>Tentang Dokter</h3>
        <p>${doctor.info}</p>
        <h3>Nomor SKD</h3>
        <p id="skd">${doctor.skd}</p>
        <h3>Pengalaman Praktik</h3>
        <ul id="experience" style="margin-left:12px;">${experienceListItems}</ul>
        <h3>Pendidikan Terakhir</h3>
        <p id="education">${doctor.education}</p>
        `
        profile.innerHTML = dataProfile
        infoDoctor[0].innerHTML = profilInfo

        doctor.experience.map((item, index) => {
            let dataExp = `<li> ${item} </li>`
            let listexp = + dataExp
        })

        let scheduleList = doctor.schedule.map(item => {
            return `
                <li class="schedule">
                    <input id="schedule" type="radio" name="radio">
                    <label class="details">
                        <span id="type">${item.work}</span>
                        <span id="day">${item.day}</span>
                        <span id="date">${item.date}</span>
                    </label>
                </li>
            `
        }).join('');

        let carddata = `
            <div class="info-schedule">
                <h1>Jadwal Praktik</h1>
                <section class="available-schedule">
                    <ul class="tile-group">
                        ${scheduleList}
                    </ul>
                </section>
            </div>`

        cardStatus.innerHTML = carddata

        function handleRadioButtonChange(clickedRadioButton) {
            let dayValue = clickedRadioButton.nextElementSibling.querySelector("#day").textContent;
            let dateValue = clickedRadioButton.nextElementSibling.querySelector("#date").textContent;
            return dayValue
        }

        function generateToken(length) {
            var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var resultToken = '';

            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * charset.length);
                resultToken += charset.charAt(randomIndex);
            }
            return resultToken;
        }

        // Mengubah event listener Anda
        let dataSelect
        let radioButtons = document.querySelectorAll('input[type="radio"][name="radio"]');
        radioButtons.forEach(function (radioButton) {
            radioButton.addEventListener('change', function (event) {
                if (event.target.checked) {
                    dataSelect = handleRadioButtonChange(radioButton); 
                }
            });
        });

        let payment = `
            <label class="confirm-detail">
                    <select id="payment-method">
                        <option value="method" disabled selected>Pilih Metode Pembayaran</option>
                        <option value="qris">QRIS</option>
                    </select>
                    <br><span id="price">RP.83.500</span>
                    <span>Include Tax*</span>
            </label>
            <button type="submit">Konfirmasi</button>`
        confirm.innerHTML = payment

        formbox.addEventListener('submit', (event) => {
            event.preventDefault()

            const selectedOption = document.querySelector('input[type="radio"][name="radio"]:checked');
    
            if (!selectedOption) {
                
                alert('Pilih opsi terlebih dahulu sebelum melanjutkan');
                return; 
            }

            const dataDay = doctor.schedule.find(schedule => schedule.day === dataSelect)
            let NewQueueData = {
                queue_number: dataDay.queue.length + 1,
                token: generateToken(6),
                patient_name: parseakun[0].name
            }
            
            if (dataDay) {
                dataDay.queue.push(NewQueueData)
                fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(doctor),
                }).then((res) => {
                    console.log(res);
                    let myToken = sessionStorage.getItem('MyToken')
                    let arraykosong = JSON.parse(myToken) || []
                    arraykosong.push(NewQueueData.token)
                    sessionStorage.setItem("MyToken", JSON.stringify(arraykosong))
                    window.location.href = "pembayaran.html"
                }).catch((err) => {
                    console.error("Gagal push : ", err)
                })
            }
        })
    }
    catch (err) {
        console.log(err)
    }

}
getDataDoctor(parsedetail.doctorId)