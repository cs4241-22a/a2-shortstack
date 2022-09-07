// Add some Javascript code here, to run on the front end.

<script>
  
  console.log("Welcome to assignment 2!")

    const submit = function( e ) {
      // prevent default form action from being carried out
      e.preventDefault()

    let   nameInput = document.querySelector( '#yourname' )
    let   dateInput = document.querySelector( '#date' )
    let   subjectInput = document.querySelector( '#subjectList' )
    let   assignmentInput = document.querySelector( '#assignment')

          let json = { yourname: nameInput.value,
                     date: dateInput.value,
                     subjectList: subjectInput.value,
                     assignment: assignmentInput.value
                   },
            body = JSON.stringify( json )

      nameInput.value = ''
      dateInput.value = ''
      subjectInput.value = ''
      assignmentInput.value = ''

      fetch( '/submit', {
        method:'POST',
        body
      })
      .then( async function (response) {
          let data = await response.json()
          collectNewInfo(data)
          console.log(data)
      })
          return false
    }

    function collectNewInfo(data) {
      const newInfo = document.getElementById('dataTable')
      newInfo.innerHTML = ""
      data.forEach((item, index)) => {
        newInfo.innerText +=
          "<tr><td>" + item.nameInput +
          "</td><td>" + item.dateInput +
          "</td><td>" + item.subjectInput +
          "</td><td>" + item.assignmentInput +
          "</td></tr>"
      })
    }

    window.onload = function() {
      const button = document.querySelector( 'button' )
      button.onclick = submit
    }
  </script>