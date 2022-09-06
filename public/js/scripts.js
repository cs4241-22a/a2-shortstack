const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )

    fetch( './server.js', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      document.body.style.backgroundColor = "red";

      console.log( response )
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }