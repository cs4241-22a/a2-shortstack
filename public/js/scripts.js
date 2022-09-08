const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let item = document.querySelector('#item')
    let category= document.querySelector('#category')
    let data = document.querySelector('#data')
    let priority = document.querySelector('#priority')

    let json = {
      item: item.value,
      category: category.value,
      data: data.value, 
      priority: priority.value,
      reaction: ""
    }

    let body = JSON.stringify(json)

    fetch( '/submit', {
      method:'POST',
      body, 
    })
    
    .then( async function ( response ) {
      // do something with the reponse
      let newData = await response.json()
        reload(newData);

      console.log(newData)
    })

    
    return false
  }

  function reload(newData) {
    const table = document.getElementById("results")
    table.innerHTML =  "<tr><th>To Do</th><th>Category</th><th>Due Date</th><th>Item Priority</th><th>Reaction</th></tr>"


    newData.forEach((element, index) => {
      table.innerHTML += "<tr><td>" 
      + element.item 
      + "</td><td>" 
      + element.category 
      + "</td><td>" 
      + element.data 
      + "</td><td>" 
      + element.priority 
      + "</td><td>" 
      + element.reaction 
      + "</td></tr>"

    })
  }
  
  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
