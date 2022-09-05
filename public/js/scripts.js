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

    tableHeadTR.innerHTML = '<th>Title</th><th>Description</th><th>Location</th><th>Delete</th> '
    tableElement.appendChild(tableHeadTR)

    dataJSON.map((val, index) => {
        const tableRowElement = document.createElement("tr")
        tableRowElement.innerHTML = ` <th>${val.title}</th>
                                    <th>${val.description}</th>
                                    <th>${val.location}<th>
                                    <button class='btn-delete' onClick='deleteRow(${index})'>delete</button>`
        tableRowElement.dataset.ind = index
        tableElement.appendChild(tableRowElement)
    })

    document.body.appendChild(tableElement)
}

const deleteRow = async (i) => {
    body = JSON.stringify({ index: i })
    const response = await fetch('/delete', {
        method: 'POST',
        body
    })
    const newData = await response.json()
    generateTable(newData)
}

window.onload = function () {
    const btnAddElement = document.querySelector('.btn-add')
    btnAddElement.onclick = submit
    if (!(document.querySelector(".btn-delete") === null)) {
        const btnDeleteElement = document.querySelector('.btn-delete')
        btnDeleteElement.onclick = deleteRow
    }

    getData()
}