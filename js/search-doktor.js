const cariValue = document.getElementById("cari")
const dayValue = document.getElementById("day")
const areaValue = document.getElementById("area")
const hospitalValue = document.getElementById("hospital")
const specialistValue = document.getElementById("specialist")
const metodeValue = document.getElementById("metode")
const form = document.getElementById("form")

function cariDokter(doctors, name, day, hospital, specialist, metode) {
    name = name.toLowerCase() || '';
    day = day || '';
    hospital = hospital || '';
    specialist = specialist || '';
    metode = metode || '';

    let doktorid = []
    let found = 0
    doctors.forEach((element) => {
        let count = 0;
        let fullName = element.name.toLowerCase()
        if (fullName.includes(name)) {
            count++;
        }
        if (specialist === element.specialist) {
            count++;
        }
        if (hospital === element.hospital) {
            count++;
        }
        if (element.schedule.some(schedule => schedule.day === day)) {
            count++;
        }
        if (element.schedule.some(schedule => schedule.work === metode)) {
            count++;
        }
        if (count === [name, specialist, hospital, day, metode].filter(Boolean).length) {
            found++;
            doktorid.push(element.id)
        }

    });

    return {
        doktorid: doktorid,
        get: found
    }

}

async function getData() {
    try {
        let result = await fetch('https://6525187f67cfb1e59ce69680.mockapi.io/doctor')
        let doctors = await result.json()
        return doctors
    }
    catch (err) {
        console.error("Error Fetching" + err)
    }
}

function hospitalOptions(doctors) {
    const hospitallist = [...new Set(doctors.map(doctorz => doctorz.hospital))]
    hospitallist.forEach(element => {
        let optionRS = `
            <option value="${element}">${element}</option>
            `
        hospitalValue.innerHTML += optionRS

    });
}

function specialistOptions(doctors) {
    const specialists = [...new Set(doctors.map(doctorz => doctorz.specialist))]
    specialists.forEach(element => {
        let optionRS = `
            <option value="${element}">${element}</option>
            `
        specialistValue.innerHTML += optionRS

    });
}

getData().then(result => {
    hospitalOptions(result)
    specialistOptions(result)
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    getData().then(result => {
        let data = cariDokter(result, cariValue.value, dayValue.value, hospitalValue.value, specialistValue.value, metodeValue.value)
        sessionStorage.setItem('listdokter', JSON.stringify(data))
    })
})
