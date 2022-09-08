console.log("Welcome to assignment 2!")

    const submit = function( e ) {
      // prevent default form action from being carried out
      e.preventDefault()
    debugger
    const nameInput = document.findElementByID( 'yourname' ).value,
       dateInput = document.findElementByID( 'date' ).value,
       //subjectInput = document.findElementByID( 'subjectList' ),
       assignmentInput = document.findElementByID( 'assignment' ).value

          let json = { yourname: nameInput,
                     date: dateInput,
                     //subjectList: subjectInput.value,
                     assignment: assignmentInput
                   },
            body = JSON.stringify( json )

      nameInput = ''
      dateInput = ''
      //subjectInput.value = ''
      assignmentInput = ''
      
      console.log(body)
      fetch( '/submit', {
        method:'POST',
        body
      })
      .then( response => response.json() )
      .then( json => {
        json.forEach( item => {
        const p = document.createElement('p')
        p.innerText = JSON.stringify( item )
        document.body.appendChild( p )
      })
    })
      return false
    }

    window.onload = function() {
      const button = document.querySelector( 'button' )
      button.onclick = submit
    }
  