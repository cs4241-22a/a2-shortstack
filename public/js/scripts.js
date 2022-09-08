// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector( '#name' ),
        grade = document.querySelector( '#grade' ),
        height = document.querySelector( '#height' ),
        difficulty = grade.value * height.value,
        json = { name: name.value, grade: grade.value, height: height.value, difficulty: difficulty },
        body = JSON.stringify( json )

    name.value = ''
    grade.value = ''
    height.value = ''

    fetch( '/submit', {
        method:'POST',
        body
    })
    .then( function( response ) {
        console.log( response )
    }).then(showData)

    return false
}


const remove = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector( '#removeName' ),
        json = { nameToRemove: name.value },
        body = JSON.stringify( json )

    name.value = ''

    fetch( '/remove', {
        method:'DELETE',
        body
    })
        .then( function( response ) {
            console.log( response )
        })
        .then(showData)

    return false
}

const showData = function() {
    fetch( '/show', {
        method:'GET'
    })
        .then( response => response.json())
        .then( json => initTable(json))

    return false

}

const initTable = function (json) {
    console.log("Initializing table")

    // Find a <table> element with id="myTable":
    var table = document.getElementById("dataTable");

    var rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    json.forEach(function(x) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);


// Add some text to the new cells:
        cell1.innerHTML = x.name;
        cell2.innerHTML = x.grade;
        cell3.innerHTML = x.height;
        cell4.innerHTML = x.difficulty;
    })

}

window.onload = function() {
    const submitButton = document.querySelector('#submitButton')
    submitButton.onclick = submit
    const removeButton = document.querySelector('#removeButton')
    removeButton.onclick = remove

    showData()
}