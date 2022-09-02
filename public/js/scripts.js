// Add some Javascript code here, to run on the front end.

const getRows = () => {
    fetch('/api/deletereminder', {
        method: 'GET'
    }).then(data => {
        console.log("Getting data back from server!")
        console.log(data)
    })
}

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    //const input = document.querySelector('#yourname'),
          //body = JSON.stringify( json )

    let myForm = document.getElementById('mainform')

    const json_sender = {}

    for (let i = 0; i < myForm.elements.length; i++) {
        let element = myForm.elements[i]
        //console.log(element)
        if (element.nodeName === 'INPUT') {
            /*if (element.value.length === 0) {
                alert('Empty input on', element.id)
                return
            }*/
            json_sender[element.id] = element.value
        }
    }

    const output = JSON.stringify(json_sender)

    fetch('/api/newreminder', {
        method: 'POST',
        body: output
    }).then((response) => {
        if (response.status === 200) {
            // empty fields

            // update lists
            fetch('/api/deletereminder', {
                method:'GET'
            })
            .then(response => response.json())
            .then(data => {
                /*for (let info of data) {
                    console.log(info)
                }*/

                addRow(data)
                // this is where we get the request back from the server

                console.log("adding row")
            })
        } else {
            alert('')
        }
        //console.log(response)
    })

    /*fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })*/

    return false
}

window.onload = () => {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}

const addRow = (data) => {  
    const table = document.getElementById("dataTable")
    table.innerHTML = "<tr><th>Delete</th><th>Title</th><th>Notes</th><th>URL</th><th>Date</th><th>Time</th><th>Location</th></tr>"
    for (let information of data) {
        let rowCount = table.rows.length
        let row = table.insertRow(rowCount)

        //row.setAttribute("id", (rowCount + 1).stringify())

        console.log("Row Count", rowCount)

        let btnName = "button" + (rowCount + 1)
        let deleteCell = row.insertCell(0)
        let deleteButton = document.createElement("input")

        deleteButton.type = "button"
        deleteButton.id = (rowCount + 1)
        deleteButton.className = btnName
        deleteButton.setAttribute('value', btnName)
        //deleteButton.setAttribute('onClick', removeRow(this))
        /*deleteButton.onclick = () => {
            //let savedName = btnName
            //removeRow(savedName)
            console.log(this.id)
        }*/
        // delete row
        deleteButton.addEventListener('click', (event) => {
            removeRow(event)
        })
        //deleteButton.setAttribute('onclick', 'removeRow(this)')

        deleteCell.appendChild(deleteButton)

        for (let i = 0; i < Object.keys(information).length; i++) {
            let cell = row.insertCell(i+1)
            cell.innerHTML = information[Object.keys(information)[i]]
        }
    }
}

const removeRow = (event) => {
    console.log("Target Id: ", parseInt(event.target.id))
    let table = document.getElementById('dataTable')

    let left = 0
    let right = table.rows.length-1

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let cells = table.rows[mid].cells
        let pos = cells[0].children[0].id
        let pos_num = parseInt(pos)

        console.log(pos)

        if (pos === event.target.id) {
            console.log('made it!: ', pos)
            break
        } else if (pos_num < parseInt(event.target.id)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    console.log("out of loop")

    /*for (let i = 1; i < table.rows.length; i++) {
        let cells = table.rows[i].cells
        if (cells[0].children[0].id === event.target.id) {
            console.log('made it!: ', deleteButton)
            for (let j = 1; j < cells.length; j++) {
                console.log(cells[j].innerHTML)
            }
        }
    }*/
}
