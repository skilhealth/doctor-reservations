let myToken = ['AB123Z', 'GA682H', 'OP111R']

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
        // console.log(findDoctor('AB123Z',doctors))
        myToken.forEach(function (token) {
            var doctorData = findDoctor(token,doctors);
            if (doctorData) {
                let scheduleDate = doctorData.day + "," + doctorData.date
                let carddata = `
                        <div class="card">
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
                        </div>
                        `
                warp.innerHTML += carddata
            }
        })


    }
    catch (err) {
        console.log(err)
    }

}
getDoctorData()