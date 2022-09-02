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
        deleteButton.name = btnName
        deleteButton.setAttribute('value', btnName)
        //deleteButton.setAttribute('onClick', removeRow(this))
        /*deleteButton.onclick = () => {
            let savedName = btnName
            removeRow(savedName)
        }*/
        deleteButton.setAttribute('onclick', 'removeRow(this)')

        deleteCell.appendChild(deleteButton)

        for (let i = 0; i < Object.keys(information).length; i++) {
            let cell = row.insertCell(i+1)
            cell.innerHTML = information[Object.keys(information)[i]]
        }
    }
}

const removeRow = (button) => {
    //console.log(button)
    //let table = document.getElementById('dataTable')

    console.log(button)

    let myTab = document.getElementById('dataTable');

    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        let cells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (let j = 0; j < cells.length; j++) {
            console.log(cells.item(j).innerHTML)
            //console.log(objCells.item(j).innerHTML)
            //info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
        }
        //info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
    }


    /*for (let i = 0; i < table.rows.length; i++) {
        //console.log(table.rows[i])
        let firstCell = table.rows.item(i).cells
        console.log(firstCell)

        //console.log(firstCell[0].name)
    }*/
    //console.log(table)

    //table.deleteRow(button.parentNode.parentNode.rowIndex)

    // don't delete the row. send data back to the server on which one to delete

    //console.log(button.parentNode.parentNode.stringify())
}
