let cardStatus = document.getElementById("card")
let profile = document.getElementById("profile")
let infoDoctor = document.getElementsByClassName("info-doctor")
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
        let daydate
        doctor.schedule.map((item,index) =>{
            if(item.day==day){
                daydate = item.day + ", " + item.date
                schedulework = item.work
            }
        })
        let badge;
        let btnLink;
        if (schedulework == "Regular") {
            badge = `<div class="work" style="background-color: #0FF033;color: #FFFFFF;">Regular</div>`
            btnLink = '<a href="check-in-queue.html"><button class="btn-in">Masuk</button></a>'
        } else if (schedulework == "Daring") {
            badge = `<div class="work" style="background-color: #ECF00F;color: #000000;">Daring</div>`
            btnLink = '<a href="wait-call.html"><button class="btn-in">Masuk</button></a>'
        } else {
            badge = `<div class="work" style="background-color: #740A0A;color: #FFFFFF;">${schedulework}</div>`
            btnLink = '<a href="homecare-status.html"><button class="btn-in">Masuk</button></a>'
        }
        let carddata = `
        <div class="info-schedule">
            ${badge}
            <div>${daydate}</div>
            <div>${doctor.hospital}</div>
        </div>
        <hr>
        `
        cardStatus.innerHTML = carddata+btnLink
    }
    catch (err) {
        console.log(err)
    }

}
getDataDoctor(parsedetail.doctorId,parsedetail.day)