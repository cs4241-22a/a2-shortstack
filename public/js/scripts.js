console.log("Welcome to assignment 2!")

let editFlag = -1

const submit = function( e ) {
    e.preventDefault()

    const input1 = document.querySelector( '#studentID' ),
          input2 = document.querySelector( '#name' ),
          input3 = document.querySelector( '#appointment' ),
          json = { studentID: input1.value, name: input2.value, appointment: input3.value },
          body = editFlag != -1 ? "EDIT" + editFlag + JSON.stringify( json ) : JSON.stringify( json )


    editFlag = -1

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#taskTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].studentID
          element.rows[i].cells[1].innerHTML = json[i-1].name
          element.rows[i].cells[2].innerHTML = json[i-1].appointment
          element.rows[i].cells[3].innerHTML = json[i-1].visitTimeLeft
        } else {
          let newRow = element.insertRow(i)

          newRow.insertCell(0)
          newRow.insertCell(1)
          newRow.insertCell(2)
          newRow.insertCell(3)

          newRow.cells[0].innerHTML = json[i-1].studentID
          newRow.cells[1].innerHTML = json[i-1].name
          newRow.cells[2].innerHTML = json[i-1].appointment
          newRow.cells[3].innerHTML = json[i-1].visitTimeLeft

          let modifyButton = document.createElement("button")
          modifyButton.classList.add("tableBtn")
          modifyButton.classList.add("edit")
          modifyButton.innerHTML = "Edit"
          modifyButton.onclick = function () {
            input1.value = newRow.cells[0].innerHTML
            input2.value = newRow.cells[1].innerHTML
            input3.value = newRow.cells[2].innerHTML
            editFlag = i;
          }
          let deleteButton = document.createElement("button")
          deleteButton.classList.add("tableBtn")
          deleteButton.classList.add("delete")
          deleteButton.innerHTML = "Delete"
          deleteButton.onclick = function () {
            let body = "DELETE" + i
            fetch( '/submit', {
              method:'POST',
              body 
            })
            element.deleteRow(i)
          }
          newRow.appendChild(modifyButton)
          newRow.appendChild(deleteButton)
        }
      }
    })
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    if(button !== null)
      button.onclick = submit

    let body = "GETDATA"
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#taskTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].studentID
          element.rows[i].cells[1].innerHTML = json[i-1].name
          element.rows[i].cells[2].innerHTML = json[i-1].appointment
          element.rows[i].cells[3].innerHTML = json[i-1].visitTimeLeft
        } else {
          let newRow = element.insertRow(i)

          newRow.insertCell(0)
          newRow.insertCell(1)
          newRow.insertCell(2)
          newRow.insertCell(3)

          newRow.cells[0].innerHTML = json[i-1].studentID
          newRow.cells[1].innerHTML = json[i-1].name
          newRow.cells[2].innerHTML = json[i-1].appointment
          newRow.cells[3].innerHTML = json[i-1].visitTimeLeft

          if(document.title === "CS4241 Assignment 2"){
            let modifyButton = document.createElement("button")
            modifyButton.classList.add("tableBtn")
            modifyButton.classList.add("edit")
            modifyButton.innerHTML = "Edit"
            modifyButton.onclick = function () {
              input1.value = newRow.cells[0].innerHTML
              input2.value = newRow.cells[1].innerHTML
              input3.value = newRow.cells[2].innerHTML
              editFlag = i;
            }
            let deleteButton = document.createElement("button")
            deleteButton.classList.add("tableBtn")
            deleteButton.classList.add("delete")
            deleteButton.innerHTML = "Delete"
            deleteButton.onclick = function () {
              let body = "DELETE" + i
              fetch( '/submit', {
                method:'POST',
                body 
              })
              element.deleteRow(i)
            }
            newRow.appendChild(modifyButton)
            newRow.appendChild(deleteButton)
          }
        }
      }

    })
  }