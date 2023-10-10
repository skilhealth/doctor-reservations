let doctorInfo = document.getElementById("doctor-info")
let doctorSKD = document.getElementById("skd")
let doctorExp = document.getElementById("experience")
let doctorEdu = document.getElementById("education")
let cardStatus = document.querySelector("section")

let profile = document.getElementById("profile")
let infoDoctor = document.getElementsByClassName("info-doctor")

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
        const experienceListItems = doctor.experience.map(item => `<li>${item}</li>`).join('');
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
        let daydate = doctor.schedule[day].day + ", " + doctor.schedule[day].date
        let carddata = `
        <div class="info-schedule">
            <div class="work">${doctor.schedule[day].work}</div>
            <div>${daydate}</div>
            <div>${doctor.hospital}</div>
        </div>
        <hr>
        <a href="check-in-queue.html"><button class="btn-in">Masuk</button></a>
        `
        cardStatus.innerHTML = carddata
    }
    catch (err) {
        console.log(err)
    }

}
getDataDoctor(0, 0)