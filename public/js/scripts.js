    const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    /*const input = document.querySelector( '#name' ),
          json = { name: input.value },
          body = JSON.stringify( json ) */

    let username = document.querySelector("#username")
    let useremail = document.querySelector("#useremail")
    let bookTitle = document.querySelector("#bookTitle")
    let bookAuthor = document.querySelector("#bookAuthor")
    let json = {
        username: username.value,
        useremail: useremail.value,
        bookTitle: bookTitle.value,
        bookAuthor: bookAuthor.value,
        holdConfirm: ""
    }
    let body = JSON.stringify(json)
    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( async function ( response ) {
        let formResults = await response.json()
        refreshInfo(formResults)
        console.log( formResults )
      })

      return false;  
    }

    function refreshInfo(formResults) {
        const board = document.getElementById("reserveData")
        board.innerHTML = ""

        formResults.forEach((element, index) => {
            board.innerHTML +=
            "<tr><td>" + element.username + " has placed a hold on " 
            + element.bookTitle + " by " 
            + element.bookAuthor + ". A confirmation will be sent to " 
            + element.useremail + "." + "</td></tr>"
        })
    }

/*     const remove = function( d ) {
        let index, table = document.getElementById("reserveData")
        table.deleteRow(index)
    } */

    window.onload = function() {
        const button = document.querySelector( 'button' )
        button.onclick = submit
    }