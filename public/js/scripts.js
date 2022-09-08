/*// STARTER CODE submit function
const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    //console.log( response )
  })

  return false
}*/

// tells the server to add a todo item to the list
const add_item = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input_item = document.querySelector( '#item' ),
        input_date = document.querySelector( '#date' ),
        new_item = { item: input_item.value, date: input_date.value},
        body = JSON.stringify( new_item )

  fetch( '/add', {
    method:'POST',
    body 
  })
  .then( response => response.json())
  .then( item1 => {
      
      const table = document.getElementById("todo-list")
      
      const row = elementFromHtml(`
        <tr>
          <td>`+ item1.item +`</td>
          <td>`+ item1.date +`</td>
          <td>
            <button>
              delete
            </button>
          </td>
        </tr>
      `)
      // console.log(row)
      // console.log(row.children[2].children[0])
      row.children[2].children[0].onclick = delete_item
      
      table.appendChild(row)
    })

  return false
}

// deletes the row from the table and the item from the server list
const delete_item = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  console.log("DELETEEEEEEEEEEE")
  
  // const table = document.getElementById('todo-list');
  // const rowIndex = self.parentNode.parentNode.rowIndex;
  // console.log(rowIndex)
  // table.deleteRow(rowIndex);

//   const input_item = document.querySelector( '#item' ),
//         input_date = document.querySelector( '#date' ),
//         new_item = { item: input_item.value, date: input_date.value},
//         body = JSON.stringify( new_item )

//   fetch( '/delete', {
//     method:'POST',
//     body 
//   })
//   .then( response => response.json())
//   .then( json => {
//     json.forEach( item => {
//       const p = document.createElement('p');
//       p.innerText = JSON.stringify(item);
//       document.body.appendChild(p);
//     })
//   })

  return false
}

// create html elements from strings
const elementFromHtml = function(html) {
  const template = document.createElement("template");
  
  template.innerHTML = html.trim();
  
  return template.content.firstElementChild;
}

// on window load
window.onload = function() {
  const addbutton = document.querySelector( 'button' )
  addbutton.onclick = add_item
  
  // ik this probably isn't smart lol
  fetch( '/list_items', {
    method:'POST',
    body:''
  })
  .then( response => response.json())
  .then( json => {
    json.forEach( item => {
      
      const table = document.getElementById("todo-list")
      
      const row = elementFromHtml(`
        <tr>
          <td>`+ item.item +`</td>
          <td>`+ item.date +`</td>
          <td>
            <button>
              delete
            </button>
          </td>
        </tr>
      `)
      // console.log(row)
      // console.log(row.children[2].children[0])
      row.children[2].children[0].onclick = delete_item
      
      table.appendChild(row)
    })
  })
}
