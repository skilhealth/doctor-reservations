let cariValue = document.getElementById("cari")
let dayValue = document.getElementById("day")
let areaValue = document.getElementById("area")
let hospitalValue = document.getElementById("hospital")
let specialistValue = document.getElementById("specialist")
let metodeValue = document.getElementById("metode")
let form = document.getElementById("form")

function findElementsWithCount(array, targetCount) {
    const frequencyCounter = array.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const elementsWithTargetCount = Object.keys(frequencyCounter).filter(element => frequencyCounter[element] === targetCount);

    return elementsWithTargetCount;
}

function cariDokter(doctors, name, day, hospital, specialist, metode) {
    name = name || '';
    day = day || '';
    hospital = hospital || '';
    specialist = specialist || '';
    metode = metode || '';

    let doktorid = []
    let found1 = 0, found2 = 0, found3 = 0, found4 = 0, found5 = 0
    doctors.forEach((element) => {
        if (specialist === element.specialist) {
            doktorid.push(element.id)
            found1 = 1;
        }
        if (hospital === element.hospital) {
            doktorid.push(element.id)
            found2 = 1;
        }
        if (element.schedule.some(schedule => schedule.day === day)) {
            doktorid.push(element.id)
            found3 = 1;
        }
        if (element.schedule.some(schedule => schedule.work === metode)) {
            doktorid.push(element.id)
            found4 = 1;
        }
    })
    let found = found1 + found2 + found3 + found4 + found5
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

getData().then(result => {
    isioptionRS(result)
    isioptionSpecial(result)

})
form.addEventListener('submit', (event) => {
    event.preventDefault()
    getData().then(result => {
        let data = cariDokter(result, cariValue.value, dayValue.value, hospitalValue.value, specialistValue.value, metodeValue.value)
        let hasil = findElementsWithCount(data.doktorid, data.get)
        sessionStorage.setItem(listdokter,JSON.stringify(hasil))

    })
})
