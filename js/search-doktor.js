const cariValue = document.getElementById("cari")
const dayValue = document.getElementById("day")
const areaValue = document.getElementById("area")
const hospitalValue = document.getElementById("hospital")
const specialistValue = document.getElementById("specialist")
const metodeValue = document.getElementById("metode")
const form = document.getElementById("form")
const alert = document.getElementById("alert")

function cariDokter(doctors, name, day, hospital, specialist, metode) {
    name = name || null
    day = day || null;
    hospital = hospital || null;
    specialist = specialist || null;
    metode = metode || null;
    let doktorid = []
    let found = 0
    let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0
    doctors.forEach((element) => {
        let fullName = element.name.toLowerCase()
        if (name) {
            count1 = 1;
            if (fullName.includes(name)) {
                doktorid.push(element.id)
            }
        }
        if (specialist === element.specialist) {
            doktorid.push(element.id)
            count2 = 1;
        }
        if (hospital === element.hospital) {
            doktorid.push(element.id)
            count3 = 1;
        }
        if (element.schedule.some(schedule => schedule.day === day)) {
            if (!metode) {
                doktorid.push(element.id)
                count4 = 1;
            }
            element.schedule.map((item) => {
                if (item.day === day && item.work === metode) {
                    doktorid.push(element.id)
                    doktorid.push(element.id)
                    count5 = 2;
                }
            })
        }
        if (element.schedule.some(schedule => schedule.work === metode) && !day) {
            doktorid.push(element.id)
            count5 = 1;
        }
    });
    found = count1 + count2 + count3 + count4 + count5
    return {
        doktorid: doktorid,
        get: found
    }

}
function findElementsWithCount(array, targetCount) {
    const frequencyCounter = array.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const elementsWithTargetCount = Object.keys(frequencyCounter).filter(element => frequencyCounter[element] === targetCount);
    return elementsWithTargetCount;
}
function cekLogin() {
    if (sessionStorage.getItem("loginState") == 1) {
        window.location.href = "hasil-pencarian-dokter.html"
    } else {
        window.location.href = "login.html"
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
        let hasil = findElementsWithCount(data.doktorid, data.get)
        if (hasil.length === 0) {
            alert.innerHTML = "Data Tidak Ditemukan"
        } else {
            sessionStorage.setItem("listdokter", JSON.stringify(hasil))
            cekLogin()
        }
    })
        .catch(err => console.err("failed fetch : ", err))
})
