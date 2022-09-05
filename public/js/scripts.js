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
        username,
        useremail,
        bookTitle,
        bookAuthor,
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
        const board = document.getElementById("form")
        board.innerHTML = " "

        formResults.forEach((element, index) => {
            board.innerHTML +=
            username + "has placed a hold on " + bookTitle + "by " + bookAuthor + ". A confirmation will be sent to " + useremail + "."
        })
    }

    window.onload = function() {
        const button = document.querySelector( 'button' )
        button.onclick = submit
    }