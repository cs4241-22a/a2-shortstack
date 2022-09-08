// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
var body;

const text_constructor = function( e ) {
    e.preventDefault()

    const newMsg = {
        From: document.getElementById( 'from' ).value,
        To: document.getElementById( 'to' ).value,
        Content: document.getElementById( 'content' ).value,
    }

    if ( isValid( newMsg ) )  {
        body = JSON.stringify( newMsg )

        fetch( "/send", {
            method:"POST",
            body
        })
            .then( function( response ) {
                document.getElementById( 'msg_sent' ).style.display = "flex"
                document.getElementById( 'msg_sent' ).innerHTML += `<div id="Outbox">
          <div id="notification">
          <h1 id="notification2">Congrats, ${newMsg.from}, your message is sucessfully sent!</h1>
          </div> `
                document.getElementById( 'Outbox' ).style.display = "none"
                document.getElementById( 'notification' ).style.display = "none"
                console.log( response )
            })
    }
    return false
}

const isValid = function( newMsg ) {
    if ( newMsg.From =='' || newMsg.From.length > 16 ) {
        alert( "Please Enter a Name within 16 characters!" )
        return false
    }
    else if ( isNaN( newMsg.To ) || newMsg.To == ''){
        alert( "Please enter a valid receiver!" )
        return false
    }
    else if ( isNaN( newMsg.To ) || newMsg.Content =='') {
        alert( "Message cannot be empty" )
        return false
    }
    else
        return true
}

const deleteMsg = function( number ){
    const charNum = { charNum : number }
    const body = JSON.stringify( charNum )

    fetch('/delete', {
        method: 'POST',
        body
    })

    viewMsg()

    return false
}


const viewMsg = function() {

    document.getElementById( 'text_table' ).style.display = "block"
    document.getElementById( 'Outbox' ).style.display = "none"
    document.getElementById( 'notification' ).style.display = "none"
    document.getElementById( 'Editor' ).style.display = "none"
    document.getElementById( 'text_sent' ).style.display = "none"
    document.getElementById( 'text_table' ).innerHTML = "<div id='table-content'><tr>"
        + "<th>From</th>"
        + "<th>To</th>"
        + "<th>Content</th>"
        + "<th></th>"
        + "</tr>"

    const character =  fetch('/Inbox', {
        method: 'GET'
    }).then(resp => resp.json()).then(
        data => { console.log(data)
            //for (let i = 0; i < data.length; i ++){
            let num = 0
            data.forEach(function(char){

                let row = "<tr>"
                    + "<td>" + char.From + "</td>"
                    + "<td>" + char.To + "</td>"
                    + "<td>" + char.Content + "</td>"
                    + `<td> <button class="delBtn" id='delete-character' onclick='deleteMsg( ${num} )'>Delete</button>`
                    + `<button class="editBtn" id='Editor-button' onclick='displayEdits( ${num} )'>Edit</button> </td>`
                    + "</tr> </div>"

                document.getElementById( 'text_table' ).innerHTML += row
                num ++
            })
        })

    return false
}


const displayEdits = function( charNum ) {

    const character =  fetch('/Inbox', {
        method: 'GET'
    }).then(resp => resp.json()).then(
        data => { console.log(data)
            let char = data[charNum]
            document.getElementById( 'text_table' ).style.display = "none"
            document.getElementById( 'Outbox' ).style.display = "none"
            document.getElementById( 'text_sent' ).style.display = "none"
            document.getElementById( 'Editor' ).style.display = "block"
            document.getElementById( 'Editor' ).innerHTML = `<div id='editing-character'>
        <div id="notification">
      <h1 id="notification3">
        Typing...
      </h1>
      </div>`+`
        <form action="" method="post">
            <div id="form-inner2">
            <div class="sender"><span>From</span> </div>
            <div>
              <label for="From">Name:</label>
              <input type="text" id="senderName" name="sender_name" value=${char.From}>
            </div>
            <div>
              <label for="To">Age:</label>
              <input type="text" id="receiverName" name="receiver_name" value=${char.To}>
            </div>
            <div>
              <label for="Content">Message:</label>
              <input type="text" id="msgContent" name="message_content" value=${char.Content}>
              <button class="action-button" id="Editor-button" onclick="editMsg( ${charNum} )">Edit Messages</button> </div>
        </form> </div>`
        })
    return false
}

const editMsg = function( number ){
    const newMsg = {
        From: document.getElementById( 'from' ).value,
        To: document.getElementById( 'to' ).value,
        Content: document.getElementById( 'content' ).value
        /*From: '1',
        To: '2,
        Content: 'test'
        */
    }

    if ( isValid(newMsg) ) {
        debugger
        const char = { charNum : number, charEdit: newMsg}
        const body = JSON.stringify( char )

        fetch('/edit', {
            method: 'POST',
            body
        })
    }
    location.reload()
    viewMsg()
    return false
}

const mainScreen = function() {

    document.getElementById( 'text_table' ).style.display = "none"
    document.getElementById( 'Outbox' ).style.display = "flex"
    document.getElementById( 'text_sent' ).style.display = "none"
    document.getElementById( 'Editor' ).style.display = "none"
    location.reload()
    return false
}

window.onload = function() {
    const sendButton = document.getElementById( 'send' )
    sendButton.onclick = text_constructor

    const outButton = document.getElementById( 'to-character-form' )
    outButton.onclick = mainScreen

    const inButton = document.getElementById( 'Inbox' )
    inButton.onclick = viewMsg

    document.getElementById( 'text_table' ).style.display = "none"
    document.getElementById( 'Outbox' ).style.display = "flex"
    document.getElementById( 'text_sent' ).style.display = "none"
    document.getElementById( 'Editor' ).style.display = "none"

}