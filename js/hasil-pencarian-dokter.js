const getId = sessionStorage.getItem("listdokter")
let myId = JSON.parse(getId)
let mainWrap = document.getElementById("wrapper")

async function getDoctorData() {
    try {
        let result = await fetch("https://6525187f67cfb1e59ce69680.mockapi.io/doctor")
        let doctors = await result.json()
       
        myId.map((item) => {
            doctors.map((doctor) => {
                const profileCard = document.createElement('div')
                profileCard.classList.add('card')
                if (doctor.id == item) {
                    if (doctor.status === true) {
                        var doctorStatus = "<div class='status-color' style='background-color:lightgreen;'></div>"
                        var statusName = "<span>Aktif</span>"

                    } else {
                        var doctorStatus = "<div class='status-color' style='background-color:red;'></div>"
                        var statusName = "<span>Tidak Aktif</span>"
                    }

                    let dataProfile = `
                        <img id="doctor-img" src="${doctor.images}.png" alt="profile">
                        <div class="profile-container">
                            <div class="status">${doctorStatus + statusName}</div>
                            <h3>${doctor.name}</h3>
                            <p>${doctor.specialist}</p>
                            <p>${doctor.hospital}</p>
                        </div>
                        `
                        profileCard.addEventListener('click',() => {
                            let detail  = {
                                doctorId : doctor.id,
                            }
                            sessionStorage.setItem('detail',JSON.stringify(detail))
                            window.location = "../page/set-schedule.html"
                        })
                    profileCard.innerHTML = dataProfile
                    mainWrap.appendChild(profileCard)
                    
                }
            })
        })
    }
    catch (err) {
        console.error("Failed Fetch : ", err)
    }
}
getDoctorData()