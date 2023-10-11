let card = document.getElementsByClassName("card")
async function getCalldata(index,day){
    try{
        let result = await fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`)
        let doctor = await result.json()
        console.log(doctor)
        const date = doctor.schedule[day].day + ", " + doctor.schedule[day].date;
        console.log(date)
        let cardData = `
            <p>${date}</p>
            <hr>
            <h3>${doctor.name}</h3>
            <small>${doctor.specialist}</small>
            <div class="btn-wrap">
                <small>Dokter sudah berada Dipanggilan</small>
                <a href=""><Button>Masuk Panggilan</Button></a>
            </div>
        `
        card[0].innerHTML = cardData
    }
    catch(err){
        console.log(err)
    }
}
getCalldata(0,2)