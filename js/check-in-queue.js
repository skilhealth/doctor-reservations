// inget untuk selalu ganti tokennya atau nanti lewat cookie
let tokenCode = "CD456E" 
let card = document.getElementsByClassName("card")
let figure = document.getElementsByTagName("figure")
let section = document.getElementsByTagName("section")

function formatNumber(num) {
    return num.toString().padStart(2, '0');
}
function QueueName(data){
    if(data == "Ahli Bedah Umum"){
        return "BU"
    }else if(data == "Ahli Jantung"){
        return "JT"
    }
}
async function getCheckInCode(index, day) {
    try {
        let result = await fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`)
        let doctor = await result.json()
        let getQueue = doctor.schedule[day].queue
        let count = 0
        let name
        let queueNumber
        let doctorStatus
        let statusName
        if (doctor.status === true) {
            doctorStatus = "<div class='status-color' style='background-color:lightgreen;'></div>"
            statusName = "<span>Aktif</span>"

        } else {
            doctorStatus = "<div class='status-color' style='background-color:red;'></div>"
            statusName = "<span>Tidak Aktif</span>"
        }
        for (let i = 0; i < getQueue.length; i++) {
            if (getQueue[i].token === tokenCode) {
                name = getQueue[i].pattient_name;
                queueNumber = getQueue[i].queue_number
                break;
            }
            count++
        }
        let doctorCard = `
            <div class="doctor-img">
                <img src="${doctor.images}.png" alt="">
            </div>
            <div class="profile-container">
                <div class="status">
                ${doctorStatus + statusName}
                </div>
                <h1>${doctor.name}</h1>
                <p>${doctor.specialist}</p>
                <p>${doctor.hospital}</p>
            </div>
        `
        let queue = `
            <div class="info-code">
                <p>Nomor Token</p>
                <h1>${tokenCode}</h1>
            </div>
            <div class="info-code">
                <p>Nomor Antrian</p>
                <h1>${QueueName(doctor.specialist)+formatNumber(queueNumber)}</h1>
            </div>
            <div class="status-checkin">
                <p>Sisa Antrian Didepan</p>
                <h3>${count} Orang</h3>
            </div>
            <div class="status-checkin">
                <p>Tanggal Pemeriksaan</p>
                <h3>${doctor.schedule[day].date}</h3>
            </div>
        `
        figure[0].innerHTML = '<img src="../assets/qr-code.png" alt="">'
        card[0].innerHTML = doctorCard
        section[0].innerHTML = queue
    }
    catch (err) {
        console.log(err)
    }

}

getCheckInCode(1, 0)