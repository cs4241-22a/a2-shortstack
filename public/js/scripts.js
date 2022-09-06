// Add some Javascript code here, to run on the front end.

const submitForm = function(e)  {
  // prevent default form action from being carried out
  e.preventDefault()

  const itemName = document.getElementById( 'itemName' ),
        itemQuantity = document.getElementById( 'itemQuantity' ),
        itemPrice = document.getElementById( 'itemPrice' ),
        json = {name: itemName.value,
                quantity: parseInt(itemQuantity.value),
                price: parseFloat(itemPrice.value)},
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( response => response.json())
  .then(json => {
    createTable(json)
  })

  return false
}

const getData = function() {
  fetch( '/data', {
    method:'GET',
  }).then( response => response.json())
  .then(json => {
    createTable(json)
  })
}

const deleteEntry = function(itemName){

  //e.preventDefault();
  const json = {name: itemName},
  body = JSON.stringify( json )

  fetch( '/submit', {
    method:'DELETE',
    body
  })
  .then( response => response.json())
  .then(json => {
    createTable(json)
  })

  return false;
}

const createTable = function(jsonData) {

  const table = document.getElementById("dataTable")
  table.innerHTML = "<tr> <th>Item Name</th> <th>Price</th> <th>Quantity</th> <th>Total Price</th></tr>"
  
  jsonData.forEach(entry => {
    table.innerHTML += `<tr> <th>${entry.name}</th> <th>${entry.price}</th> <th>${entry.quantity}</th> <th>${entry.total}</th> <th><button onclick="deleteEntry(\'${entry.name}\')">delete</button><th></tr>`
  })
}


window.onload = function() {
  const button = document.getElementById('formSubmit')
  button.onclick = submitForm
  getData()
}

