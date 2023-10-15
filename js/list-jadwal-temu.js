const getToken = sessionStorage.getItem("token")
let myToken = JSON.parse(getToken)

function getbadge(work) {
    if (work == "Regular") {
        return `<div class="badge" style="background-color: #0FF033;color: #FFFFFF;">Regular</div>`
    } else if (work == "Daring") {
        return `<div class="badge" style="background-color: #ECF00F;color: #000000;">Daring</div>`
    } else {
        return `<div class="badge" style="background-color: #740A0A;color: #FFFFFF;">${work}</div>`
    }
}
let warp = document.getElementById("wrap")

function findDoctor(token, doctors) {
    for (let doctor of doctors) {
        for (let schedule of doctor.schedule) {
            for (let queue of schedule.queue) {
                if (queue.token === token) {
                    return {
                        id : doctor.id,
                        name: doctor.name,
                        images: doctor.images,
                        work: schedule.work,
                        date: schedule.date,
                        day: schedule.day,
                        specialist: doctor.specialist,
                        hospital: doctor.hospital
                    }
                }
            }
        }
    }
    return null;
}

async function getDoctorData() {
    try {
        let result = await fetch("https://6525187f67cfb1e59ce69680.mockapi.io/doctor")
        let doctors = await result.json()
        myToken.forEach(function (token) {
            var doctorData = findDoctor(token, doctors);
            if (doctorData) {
                let scheduleDate = doctorData.day + "," + doctorData.date
                const profileCard = document.createElement('div')
                profileCard.classList.add('card')
                    let carddata = `
                            <img id="doctor-img" src="${doctorData.images}.png" alt="profile">
                            <div class="profile-container">
                                <div class="status">
                                    ${getbadge(doctorData.work)}
                                    <small> ${scheduleDate}</small>
                                </div>
                                <h3>${doctorData.name}</h3>
                                <p>${doctorData.specialist}</p>
                                <p>${doctorData.hospital}</p>
                            </div>
                        `
                    
                profileCard.addEventListener('click',() => {
                    let detail  = {
                        doctorId : doctorData.id,
                        token : token,
                        day : doctorData.day
                    }
                    sessionStorage.setItem('detail',JSON.stringify(detail))
                    window.location = "../page/schecule-info-after-booking.html"
                })
                profileCard.innerHTML = carddata
                warp.appendChild(profileCard)
                // warp.insertAdjacentHTML('beforeend', );
            }
        })


    }
    catch (err) {
        console.log(err)
    }

}
getDoctorData()