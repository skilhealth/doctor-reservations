let cariValue = document.getElementById("cari")
let dayValue = document.getElementById("day")
let areaValue = document.getElementById("area")
let hospitalValue = document.getElementById("hospital")
let specialistValue = document.getElementById("specialist")
let metodeValue = document.getElementById("metode")
let form = document.getElementById("form")

async function getData() {
    try {
        const result = await fetch('https://6525187f67cfb1e59ce69680.mockapi.io/doctor')
        const doctors = await result.json()
        return doctors
    }
    catch (err) {
        console("Error Fetching" + err)
    }
}
let getdoctor = getData()
getdoctor.map((item, index) => {
    console.log(item.name)
})


// form.addEventListener('submit', )