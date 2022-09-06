let items = []
let rowIndex = 0
let i = 0
let originalHTML = ''

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#item' ),
          json = { item: item.value }

    const input2 = document.querySelector( '#date' ),
          json2 = { date: date.value }
          json.date = date.value

    const input3 = document.querySelector( '#priority' ),
          checked = priority.checked
    
    //let json3 = ''
    if (checked) {
        json.priority = 'Yes'
    } else {
        json.priority = 'No'
    }

    body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
        // document.getElementById( 'view_button' ).hidden = false
        return response.json()
    })
    .then ( function ( json ) {
      items.push(json)
      renderTable(json)
      document.getElementById('list_table').hidden = false
    })

    // .then (function ( response ) {
    //   document.getElementById( 'view_button' ).hidden = false

    //   items.push(JSON.parse())
    //   renderList()
    //   console.log( response )
    // })


    return false
  }

  // const view_table = function( e ) {
  //   e.preventDefault
  //   update_table
  //   document.getElementById('list_table').hidden = false
  // }

  const update_table = function ( e ) {
    e.preventDefault

    // fetch( '/', {
    //   method:'GET', 
    // })
    // .then( function( response ) {
    //     items = JSON.parse(response.data)

    //     renderList()
      
    //   console.log( response )
    // })

  }

  function deleteRow ( element ) {
    body = JSON.stringify(element)
    fetch( '/delete', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then ( function ( json ) {
      const index = items.indexOf(JSON.parse(json))
      items.splice(index, 1)
      items.pop(json)
      renderTable()
    })
  }

  function renderTable() {
    //console.log(json)
    tbl = document.getElementById( 'list_table' )

    if (i == 0) {
      originalHTML = tbl.innerHTML
      i++
    } else {
      tbl.innerHTML = originalHTML
    }

    console.log(tbl.innerHTML)

    items.forEach( json => {
      const newRow = document.createElement('tr')

      const item = document.createElement('td')
      item.innerText = json.item
  
      const completionDate = document.createElement('td')
      completionDate.innerText = json.date
      
      const priority = document.createElement('td')
      priority.innerText = json.priority
  
      const dueDate = document.createElement('td')
      dueDate.innerText = json.dueDate
  
      const actions = document.createElement('td')
      const editButton = document.createElement('button')
      editButton.innerText = 'Edit'
      const deleteButton = document.createElement('button')
      //deleteButton.onclick = deleteRow
      deleteButton.innerText = 'Delete'
  
      actions.appendChild(editButton)
      actions.appendChild(deleteButton)
  
      newRow.appendChild(item)
      newRow.appendChild(completionDate)
      newRow.appendChild(priority)
      newRow.appendChild(dueDate)
      newRow.appendChild(actions)
  
      tbl.appendChild(newRow)
    })    
  }

  window.onload = function() {
    const submit_button = document.getElementById( 'submit_button' )
    const view_button = document.getElementById('view_button')
    submit_button.onclick = submit
    //view_button.onclick = view_table
  }