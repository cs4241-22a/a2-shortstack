// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.getElementById( 'shoppingitem' ),
        input2 = document.getElementById('quantity'),
        input3 = document.getElementById('price'),
        json = { shoppingitem: input.value, quantity: input2.value, price: input3.value},
        body = JSON.stringify( json )
        
  fetch( '/submit', {
    method:'POST',
    body
  })
  .then ( response => response.json() )
  .then( json => { 
    //if (json.status === 200) {
      let table = (document.getElementById('tableShop'))
      getDataPost(table.rows.length - 1)
    //}
  })

  return false
}

function deleteData(deleteID) {
  // prevent default form action from being carried out
  //e.preventDefault()
  const input = deleteID,
        json = { shoppingitem: input},
        body = JSON.stringify( json )
        
  fetch( '/deleteData', {
    method:'POST',
    body
  })
  .then ( response => response.json() )
  .then( json => { 
    //if (json.status === 200) {
      let table = (document.getElementById('tableShop'))
      getDataDel()
    //}
  })

  return false
}



window.onload = function() {
  // const buttonDel = document.getElementById('deleteButton')
  // buttonDel.onclick = deleteData
  const button = document.getElementById( 'submitButton' )
  button.onclick = submit
  getData()
  
}


getData = function() {
  fetch( '/getShoppingData', {
   method:'GET'
  })
  .then(response => response.json())
  .then(json => {
    totalPrice = 0
    let shoppingList = json
    shoppingList.forEach( item => {
      skip = false
      let shoppingTable = document.getElementById("insertInfo")
      let shoppingRow = shoppingTable.insertRow(0)
      let shoppingCell0 = shoppingRow.insertCell(0)
      let shoppingCell1 = shoppingRow.insertCell(1)
      let shoppingCell2 = shoppingRow.insertCell(2)
      let shoppingCell3 = shoppingRow.insertCell(3)
      const buttonDel = document.createElement("button")
          buttonDel.innerText = "Delete"
          buttonDel.id = "deleteButton"
          buttonDel.addEventListener('click', () => {
            deleteData(item.shoppingitem)
            skip = true
          })
        if(skip === false) {
          shoppingCell0.appendChild(buttonDel)
          shoppingCell1.innerHTML = item.shoppingitem
          shoppingCell2.innerHTML = item.quantity
          shoppingCell3.innerHTML = item.price
          totalPrice = totalPrice + (parseFloat(item.price) * parseFloat(item.quantity))
        }
    })
    let insertPrice = document.getElementById("totalInsert")
    insertPrice.innerHTML = "$" + Math.round(totalPrice * 100)/100
    if (shoppingList.length === 0) {
      let shoppingTable = document.getElementById("insertInfo")
      shoppingTable.innerHTML = ""
      insertPrice.innerHTML = "$0"
    }
  })
}

function getDataPost(integer){
  fetch( '/getShoppingData', {
   method:'GET'
  })
  .then(response => response.json())
  .then(json => {
    let shoppingList = json
    let index = 0
    shoppingList.forEach( item => {
      skip = false
      if (integer <= index) {
        let shoppingTable = document.getElementById("insertInfo")
        let shoppingRow = shoppingTable.insertRow(0)
        let shoppingCell0 = shoppingRow.insertCell(0)
        let shoppingCell1 = shoppingRow.insertCell(1)
        let shoppingCell2 = shoppingRow.insertCell(2)
        let shoppingCell3 = shoppingRow.insertCell(3)
        const buttonDel = document.createElement("button")
          buttonDel.innerText = "Delete"
          buttonDel.id = "deleteButton"
          buttonDel.addEventListener('click', () => {
            deleteData(item.shoppingitem)
            skip = true
          })
        if(skip === false) {
          shoppingCell0.appendChild(buttonDel)
          shoppingCell1.innerHTML = item.shoppingitem
          shoppingCell2.innerHTML = item.quantity
          shoppingCell3.innerHTML = item.price
          let insertPrice = document.getElementById("totalInsert")
          totalPrice = (parseFloat(item.price) * parseFloat(item.quantity)) + totalPrice
          insertPrice.innerHTML = "$" + Math.round(totalPrice * 100)/100
        }
      }
      index = index + 1
    })
  })
}

function getDataDel(integer){
  fetch( '/getShoppingData', {
   method:'GET'
  })
  .then(response => response.json())
  .then(json => {

    let shoppingList = json
    shoppingList.forEach( item => {
        let shoppingTable = document.getElementById("insertInfo")
        shoppingTable.innerHTML = ""
    })
    getData()

  })
}
