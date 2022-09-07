let rowsAdded = 0 //keeps track of how many rows of data our table has (useful for clearing the table)

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = {
        name: document.querySelector( '#trailname' ),
        length: document.querySelector( '#traillength' ),
        elevation: document.querySelector( '#trailelevation' )
    }
    const json = {
        name: input.name.value,
        length: input.length.value,
        elevation: input.elevation.value
    }
    const body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( response => response.json() )
        .then( json => {
            const table = document.getElementById("datatable")
            const dataLength = json.length

            //if no trail name specified, we cleared the server so we need to clear the table
            if(dataLength === 0) {
                for(let i = 0; i < rowsAdded; i++) {
                    table.deleteRow(-1) //will remove the last row always
                }
                rowsAdded = 0
            } else {
                //insert row for new data
                const row = table.insertRow()
                rowsAdded++
                //insert cells for this row
                let cell = row.insertCell()
                cell.innerHTML = json[dataLength-1].name
                cell = row.insertCell()
                cell.innerHTML = json[dataLength-1].length
                cell = row.insertCell()
                cell.innerHTML = json[dataLength-1].elevation
            }
        })
    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}