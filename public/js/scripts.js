const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#item' ),
          json = { item: item.value }

    const input2 = document.querySelector( '#date' ),
          json2 = { date: date.value }

    const input3 = document.querySelector( '#priority' ),
          json3 = { priority: priority.checked }

    body = JSON.stringify( [json, json2, json3] )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      document.getElementById( 'view_button' ).hidden = false
      
      console.log( response )
    })

    return false
  }

  const view_table = function( e ) {
    e.preventDefault
    update_table
    document.getElementById('list_table').hidden = false
  }

  const update_table = function ( e ) {
    e.preventDefault

    fetch( '/', {
      method:'GET', 
    })
    .then( function( response ) {
        let arr = response.data.array

        tbl = document.getElementById( 'list_table' )
      
      console.log( response )
    })

  }

  window.onload = function() {
    const submit_button = document.getElementById( 'submit_button' )
    const view_button = document.getElementById('view_button')
    submit_button.onclick = submit
    view_button.onclick = view_table
  }