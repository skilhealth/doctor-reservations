let cariValue = document.getElementById("cari")
let dayValue = document.getElementById("day")
let areaValue = document.getElementById("area")
let hospitalValue = document.getElementById("hospital")
let specialistValue = document.getElementById("specialist")
let metodeValue = document.getElementById("metode")
let form = document.getElementById("form")

// let doktor = {
//     day: dayValue.value,
//     metode: metodeValue.value
// }

// function findElementsWithCount(array, targetCount) {
//     return Object.keys(
//         array.reduce((acc, curr) => {
//             acc[curr] = (acc[curr] || 0) + 1;
//             return acc;
//         }, {})
//     ).filter(element => frequencyCounter[element] === targetCount);
// }

// // Contoh penggunaan
// let myArray = [1, 2, 3, 4, 2, 2, 3, 1, 4, 4, 5];
// let targetCount = 3;

// let result = findElementsWithCount(myArray, targetCount);
// console.log(`Elemen dengan jumlah kemunculan ${targetCount} adalah: ${result.join(', ')}`);

function cariDokter(doctors, name, day, hospital, specialist, metode) {
    name = name || '';
    day = day || '';
    hospital = hospital || '';
    specialist = specialist || '';
    metode = metode || '';
    console.log(day)
    console.log(specialist)
    let doktorid = []
    let found1 = 0,found2= 0,found3,found4,found5
    doctors.forEach((element) => {
        if (specialist == element.specialist) {
            doktorid.push(element.id)
            found1 = 1;
        }
        if (hospital == element.hospital) {
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
    console.log(found)
    return {
        doktorid : doktorid,
        get : found
    }
    // console.log(doktorid)
    // let data = doctors.filter(doctor =>{
    //     let kondisi = (
    //         (name === '' || name === doctor.name) &&
    //         (day === '' || doctor.schedule.some(schedule => schedule.day === day)) &&
    //         (specialist === '' || doctor.specialist === specialist) &&
    //         (hospital ==='' || doctor.hospital === hospital) &&
    //         (metode ==='' || doctor.schedule.some(schedule => schedule.work === metode))
    //     );
    // });  
    // console.log(data)
}

// function cariDokter(doctors, criteria) {
//     criteria = criteria || {};

//     return doctors.filter(doctor => {
//         return Object.entries(criteria).every(([key, value]) => {
//             if (value == null) {
//                 return true; // Melewati properti yang null atau undefined
//             }
//             if (key === 'day' || key === 'metode') {
//                 return doctor.schedule.some(schedule => schedule[key] === value);
//             }
//             return doctor[key] === value;
//         });
//     });
// }



// function cariDokter(doctors, name, day, hospital, specialist, metode){
//     let id = []
//     doctors.forEach((element)=>{
//         if(element.name === name){
//             id.unshift(element.id)
//         }
//     })
// }


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
        let data = cariDokter(result, cariValue.value, dayValue.value, hospitalValue.value, specialistValue.value, metodeValue.value)
        console.log(data)
        // cariDokter(result, doktor)
    })
})


// form.addEventListener('submit', )