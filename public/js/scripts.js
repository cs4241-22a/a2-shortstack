const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    inputTitle = document.querySelector('#title')
    inputDesc = document.querySelector('#desc')
    inputLoc = document.querySelector('#loc')

    const json = {
        title: inputTitle.value,
        description: inputDesc.value,
        location: inputLoc.value
    },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async (response) => {
            // do something with the reponse 
            let newData = await response.json()
            generateTable(newData)
        })

    return false
}

const getData = async () => {
    body = JSON.stringify([])
    fetch('/getData')
        .then(async (response) => {
            let newData = await response.json()
            generateTable(newData)
        })
}

const generateTable = (dataJSON) => {



    const tableElement = document.getElementById("dataTable")
    tableElement.innerHTML = ""
    const tableHeadTR = document.createElement("tr")
    tableHeadTR.setAttribute("id", "tableheader")

    tableHeadTR.innerHTML = '<th>Title</th><th>Description</th><th>Location</th> '
    tableElement.appendChild(tableHeadTR)

    dataJSON.map((val) => {
        const tableRowElement = document.createElement("tr")
        tableRowElement.innerHTML = ` <th>${val.title}</th>
                                    <th>${val.description}</th>
                                    <th>${val.location}<th>`
        tableElement.appendChild(tableRowElement)
    })

    document.body.appendChild(tableElement)
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
    getData()
}