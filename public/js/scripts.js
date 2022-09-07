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
      console.log( response )
    })

    fetch( './server.js' )
    .then( function( response ) {
        var table = document.getElementById("nonTextSection");
        var row = table.insertRow(0);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(3);

        cell1.innerHTML = response[0];
        cell2.innerHTML = response[1];
        cell3.innerHTML = response[2];
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }