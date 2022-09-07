// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

const submit = function (e) { 
    e.preventDefault()


let socialSecurity = document.querySelector("#socialSecurity")
let accountName = document.querySelector("#accountName")
let password = document.querySelector("#password")
let json = {
    socialSecurity: socialSecurity.value,
    accountName: accountName.value,
    password: password.value,
    popUpMessage: ""}
    let body = JSON.stringify(json)
    fetch( '/submit', { 
        method: 'POST',
        body
    })
    .then (async function (response ) { 
        let newData = await response.json()
        refreshInfo(newData)
        console.log(newData)
    }) 
    return false 
} 

function refreshInfo(newData) { 
    const board = document.getElementById("savedData")
    board.innerHTML = ""

    newData.forEach((element, index) => {
    board.innerHTML += 
        "<tr><td>" + element.socialSecurity + "</td><td>"
        + element.accountName + "</td><td>"
        + element.password + "</td><td>"
        + element.popUpMessage + "</td><td>"
      })
}

window.onload = function() { 
    const button = document.querySelector(' button')
    button.onclick = submit
}
