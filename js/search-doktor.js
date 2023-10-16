let cariValue = document.getElementById("cari")
let dayValue = document.getElementById("day")
let areaValue = document.getElementById("area")
let hospitalValue = document.getElementById("hospital")
let specialistValue = document.getElementById("specialist")
let metodeValue = document.getElementById("metode")
let form = document.getElementById("form")

function cariDokter(doctors, name, day, hospital, specialist, metode) {
    name = name || '';
    day = day || '';
    hospital = hospital || '';
    specialist = specialist || '';
    metode = metode || '';
    let kondisi
    return doctors.filter(doctor => {
        kondisi = (
            (name === '' || name === doctor.name) &&
            (day === '' || doctor.schedule.some(schedule => schedule.day === day)) &&
            (specialist === '' || doctor.specialist === specialist) &&
            (hospital ==='' || doctor.hospital === hospital) &&
            (metode ==='' || doctor.schedule.some(schedule => schedule.work === metode))
        )
    })
    console.log(kondisi)



}


async function getData() {
    try {
        let result = await fetch('https://6525187f67cfb1e59ce69680.mockapi.io/doctor')
        let doctors = await result.json()
        return doctors
    }
    catch (err) {
        console("Error Fetching" + err)
    }
}

function isioptionRS(doctors) {
    const hospitallist = [...new Set(doctors.map(doctorz => doctorz.hospital))]
    hospitallist.forEach(element => {
        let optionRS = `
            <option value="${element}">${element}</option>
            `
        hospitalValue.innerHTML += optionRS

    });
}

function isioptionSpecial(doctors) {
    const specialists = [...new Set(doctors.map(doctorz => doctorz.specialist))]
    specialists.forEach(element => {
        let optionRS = `
            <option value="${element}">${element}</option>
            `
        specialistValue.innerHTML += optionRS

    });
}






// const found = cariDokter(doctors,cariValue.value,dayValue.value,hospitalValue.value,specialistValue.value,metodeValue.value)
// console.log(found)
getData().then(result => {
    isioptionRS(result)
    isioptionSpecial(result)

})
form.addEventListener('submit', (event) => {
    event.preventDefault()
    getData().then(result => {
        cariDokter(result, cariValue.value, dayValue.value, hospitalValue.value, specialistValue.value, metodeValue.value)
    })

})


// form.addEventListener('submit', )