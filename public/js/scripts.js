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

    var myForm = document.getElementById('mainform')

    const json_sender = {}

    for (var i = 0; i < myForm.elements.length; i++) {
        var element = myForm.elements[i]
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
            //getRows()
            /*getRequest('/api/deletereminder', {}, (data) => {
                console.log("Incoming data from server!")
                for (let info of data) {
                    console.log(info)
                }
            })*/
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

                console.log("right here mate")
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
        var rowCount = table.rows.length
        var row = table.insertRow(rowCount)
        console.log("Row Count", rowCount)
        //Column 1
        var btnName = "button" + (rowCount + 1)
        var deleteCell = row.insertCell(0)
        var deleteButton = document.createElement("input")
        deleteButton.type = "button"
        deleteButton.name = btnName
        deleteButton.setAttribute('value', btnName)
        //deleteButton.setAttribute('onClick', removeRow(this))
        /*deleteButton.onclick = () => {
            var savedName = btnName
            removeRow(savedName)
        }*/
        deleteButton.setAttribute('onclick', 'removeRow(this)');

        deleteCell.appendChild(deleteButton)

        for (var i = 1; i < Object.keys(information).length; i++) {
            var cell = row.insertCell(i)
            cell.innerHTML = information[Object.keys(information)[i]]
        }
    }
}

const removeRow = (oButton) => {
    //console.log(btnName)
    let empTab = document.getElementById('dataTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);
}
