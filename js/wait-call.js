let card = document.getElementsByClassName("card")
const getDetail = sessionStorage.getItem('detail')
const parsedetail = JSON.parse(getDetail)

async function getCalldata(index,day){
    try{
        let result = await fetch(`https://6525187f67cfb1e59ce69680.mockapi.io/doctor/${index}`)
        let doctor = await result.json()
        let daydate
        doctor.schedule.map((item,index) =>{
            if(item.day==day){
                daydate = item.day + ", " + item.date
            }
        })
        let cardData = `
            <p>${daydate}</p>
            <hr>
            <h3>${doctor.name}</h3>
            <small>${doctor.specialist}</small>
            <div class="btn-wrap">
                <small>Dokter sudah berada Dipanggilan</small>
                <a target="_blank" href="https://wa.me/0881024656367"><Button>Masuk Panggilan</Button></a>
            </div>
        `
        card[0].innerHTML = cardData
    }
    catch(err){
        console.log(err)
    }
}
getCalldata(parsedetail.doctorId,parsedetail.day)