let cardStatus = document.getElementById("card")
let profile = document.getElementById("profile")
let infoDoctor = document.getElementsByClassName("info-doctor")
let confirm = document.getElementById("confirm")
const getDetail = sessionStorage.getItem('detail')
const parsedetail = JSON.parse(getDetail)


async function getDataDoctor(index, day) {
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
            let daydate = item.day + "<br>" + item.date;
            let schedulework = item.work;
            
            return `
                <li class="schedule">
                    <input id="schedule" type="radio" name="radio">
                    <label class="details">
                        <span id="type">${schedulework}</span>
                        <span id="day">${daydate}</span>
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

        let payment = `
            <label class="confirm-detail">
                    <select id="payment-method">
                        <option value="method" disabled selected>Pilih Metode Pembayaran</option>
                        <option value="qris">QRIS</option>
                    </select>
                    <br><span id="price">RP.83.500</span>
                    <span>Include Tax*</span>
            </label>
            <button type="button"><a href="#">Konfirmasi</a></button>`
        
        confirm.innerHTML = payment
        
    }
    catch (err) {
        console.log(err)
    }

}
getDataDoctor(0,"Minggu")