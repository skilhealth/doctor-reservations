let card = document.getElementsByClassName("card")

async function getDoctorData(index){
    try{
        let result = await fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`)
        let doctor = await result.json()
        let carddata = `
            <img id="doctor-img" src="${doctor.images}.png" alt="profile">
            <div class="profile-container">
                <small>Sedang Menuju Lokasi anda</small>
                <h3>${doctor.name}</h3>
                <p>${doctor.specialist}</p>
                <p>${doctor.hospital}</p>
            </div>
        `
        card[0].innerHTML = carddata

    }
    catch(err){
        console.log(err)
    }
}
getDoctorData(0)