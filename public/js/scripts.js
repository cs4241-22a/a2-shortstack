// Add some Javascript code here, to run on the front end.






  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let nameInput = document.querySelector( '#todo' ),
          descInput = document.querySelector( '#desc' ),
          dueDateInput = document.querySelector( '#dueDate' ),
          json = { 
            todo: nameInput.value, 
            desc: descInput.value,
            dueDate: dueDateInput.value, 
            daysLeft: "" 
            },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then(async  function( response ) {
        let newData = await response.json()
        refreshTable(newData) //call our refresh function
        console.log( "Response received: " )
        console.log( newData )
    })

    return false
  }

  window.onload = function() {
    const addBTN = document.querySelector( '#addBTN' )
    const clearBTN = document.querySelector( '#clearBTN' )
    addBTN.onclick = submit
    clearBTN.onclick = clear
  }

  const clear = function( e ) {
    e.preventDefault()
    body = JSON.stringify( "" )
    fetch( '/clear', {
        method:'POST',
        body
      })
      .then(async  function( response ) {
          let newData = await response.json()
          refreshTable(newData) //call our refresh function
          console.log( "Response received: " )
          console.log( newData )
      })
  
      return false
}

  
const refreshTable = function(newData ) {
    
   
    const _table = document.getElementById("resultTable")
    _table.innerHTML = ""

    _table.innerHTML =  "<tr> <th> Item </th> <th> Description </th> <th> Due Date </th>  <th> Days left </th> </tr>"
    newData.forEach((element, index) => {
        _table.innerHTML +=
          "<tr><td>" + element.todo + "</td><td>"
          + element.desc + "</td><td>"
          + element.dueDate + "</td><td>"
          + element.daysLeft + "</td></tr>"
                                                      //add row for remove button?
      })
  }
