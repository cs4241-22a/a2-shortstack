// Add some Javascript code here, to run on the front end.

const getRows = () => {
    fetch('/api/deletereminder', {
        method: 'GET'
    }).then(data => {
        console.log("Getting data back from server!")
        console.log(data)
    })
}

const getRequest = function(endpoint, data, callback) {
    fetch( endpoint, {
      method:'GET',
      data 
    })
    .then( response => response.json())
    .then( response => callback(response) )
    return false
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
            getRequest('/api/deletereminder', {}, (data) => {
                console.log("Incoming data from server!")
                for (let info of data) {
                    console.log(info)
                } 
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
