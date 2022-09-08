// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let   name = document.querySelector( '#yourname' ),
          genre = document.querySelector('#yourgenre'),
          song = document.querySelector('#yoursong'),
          del = document.querySelector('#yournameDelete'),
          json = { yourname: name.value,
                   yourgenre: genre.value,
                   yoursong: song.value,
                   count: ""
                 }
          body = JSON.stringify( json )  //convert to a string to send to the get request

    //check if an item is being deleted
    if(del.value !== "") {
        console.log("DELETE")
        body = JSON.stringify( {delete: del.value })
        fetch( '/DELETE', { //gives URL that we want to send it to 
            method:'DELETE',
            body
          })
          .then( async function( response ) {
            let newData = await response.json()
            refreshTable(newData)
          })  
    } else {
        console.log("SUBMIT")
        fetch( '/submit', { //gives URL that we want to send it to 
            method:'POST',
            body 
          })
          .then( async function( response ) {
            let newData = await response.json()
            refreshTable(newData)
          })

              
    }

    return false
  }

  function refreshTable(newData) {
    const board = document.getElementById("formData")
    board.innerHTML = ""

    newData.forEach((element, index) => {
        if( board.innerHTML === "") {
            board.innerHTML +=
            "<tr><th> Name </th><th>Genre</th><th>Song</th><th>Song Count</th></tr>"
            + "<tr><td>" + element.yourname + "</td><td>"
            + element.yourgenre + "</td><td>"
            + element.yoursong + "</td><td>"
            + element.count +"</td></tr>"
        } else {
            board.innerHTML +=
            "<tr><td>" + element.yourname + "</td><td>"
            + element.yourgenre + "</td><td>"
            + element.yoursong + "</td><td>"
            + element.count +"</td></tr>"
        }
    })
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }