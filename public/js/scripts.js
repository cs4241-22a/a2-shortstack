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
    let currentDate = document.querySelector("#currentDate")
    let holdID = Math.floor(Math.random() * 11)
    //let holdID = Array.indexOf(rowid, 0)
    let json = {
        username: username.value,
        useremail: useremail.value,
        bookTitle: bookTitle.value,
        bookAuthor: bookAuthor.value,
        currentDate: currentDate.value,
        holdID: holdID,
        holdConfirm: "",
        del: false
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
            let row = board.insertRow(0)
            row.id = "row" + element.holdID
            row.addEventListener("click", function(){ select(row.id); })
            let cell = row.insertCell(0)
            cell.innerHTML =
            element.username + " has placed a hold on " 
            + element.bookTitle + " by " 
            + element.bookAuthor + " on " 
            + element.currentDate + ". A confirmation will be sent to " 
            + element.useremail + ". You are position "
            + element.holdID + " in the hold queue."
        })
    }

    let selectedRow = ""

    const select = function ( rowid ) {
        selectedRow = rowid
        console.log(selectedRow)
    }

    const remove = function( d ) {
        d.preventDefault()
        let row = document.getElementById(selectedRow)
        console.log(row)
            //row.parentNode.removeChild(row)
        document.getElementById("reserveData").deleteRow(row)
    }

    const removeData = function( holdID ) {
    let json = {
        holdID: holdID,
        del: true
    }
    let body = JSON.stringify(json)
    fetch( '/remove', {
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

    window.onload = function() {
        const submitbutton = document.getElementById( 'submitButton' )
        submitbutton.onclick = submit

        const removebutton = document.getElementById( 'removeButton' )
        removebutton.onclick = remove
    }