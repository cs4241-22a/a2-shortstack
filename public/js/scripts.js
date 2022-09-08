let action = "add"


//add a player to the team
const addPlayer = function( e ) {

  e.preventDefault()

  action = "add"

  const numberInput = document.querySelector( '#number' ),
        playerNameInput = document.querySelector( '#playerName' ),
        nickNameInput = document.querySelector( '#nickName' ),
        heightInput = document.querySelector( '#height' ),
        positionInput = document.querySelector( '#position' ),
        starterInput = document.querySelector( '#starter' ),
        
        json = { playerAction: action, number: numberInput.value, playerName: playerNameInput.value, nickName: nickNameInput.value, height: heightInput.value, position: positionInput.value, starter: starterInput.value },
        body = JSON.stringify( json );
  
fetch( '/addPlayer', {
    method:'POST',
    body 
  })
  .then( async function ( response ) {
    let txt = await response.json()
    console.log(txt)
    addRoster( txt[txt.length-1] ) 
  })

  return false
}

  /*
  fetch( '/addPlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt){
      console.log(txt)
      addRoster( txt[0] ) 
  })
*/



//delete the player
const deletePlayer = function( e ) {


  action = "delete"

  const numberInput = document.querySelector( '#number' ),
        playerNameInput = document.querySelector( '#playerName' ),
        nickNameInput = document.querySelector( '#nickName' ),
        heightInput = document.querySelector( '#height' ),
        positionInput = document.querySelector( '#position' ),
        starterInput = document.querySelector( '#starter' ),
        
        json = { 'playerAction': action, 'number': numberInput.value, 'playerName': playerNameInput.value, 'nickName': nickNameInput.value, 'height': heightInput.value, 'position': positionInput.value, 'starter': starterInput.value },
        body = JSON.stringify( json );

  fetch( '/deletePlayer', {
    method:'POST',
    body 
  })
  .then( function ( response ) {
    return response.json()
  })
  .then(function(txt) {
    console.log(txt)
    deleteRoster()
  })

  return false
}
  
  
  
  
  
  /*
  fetch( '/deletePlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt){
      console.log(txt)
      deleteRoster()
  })

  return false
}
*/

/*
const editPlayer = function( e ) {


  action = "edit"

  const numberInput = document.querySelector( '#number' ),
        playerNameInput = document.querySelector( '#playerName' ),
        heightInput = document.querySelector( '#height' ),
        positionInput = document.querySelector( '#position' ),
        starterInput = document.querySelector( '#starter' ),
        
        json = { 'playerAction': action, 'number': numberInput.value, 'playerName': playerNameInput.value, 'height': heightInput.value, 'position': positionInput.value, 'starter': starterInput.value },
        body = JSON.stringify( json );

  fetch( '/editPlayer', {
    method:'POST',
    body 
  })
  .then(function ( response ) {
   return response.json()
  })
   .then( function(txt) {
      console.log(txt)
      editRoster(txt)
  })

  return false
}
*/
  
  /*
  fetch( '/editPlayer', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    return response.json()
  })
  .then( function(txt) {
      console.log(txt)
      editRoster(txt)
  })

  return false
}
*/
  
  
let numRows = 1

function addRoster(data){
    var table = document.getElementById("resultTable")
    var newRow = table.insertRow(-1);
    var numberCell = newRow.insertCell(0);
    var playerNameCell = newRow.insertCell(1);
    var nickNameCell = newRow.insertCell(2);
    var heightCell = newRow.insertCell(3);
    var positionCell = newRow.insertCell(4);
    var starterCell = newRow.insertCell(5);

    numberCell.innerHTML = data.number;
    playerNameCell.innerHTML = data.playerName;
    nickNameCell.innerHTML = data.nickName;
    heightCell.innerHTML = data.height;
    positionCell.innerHTML = data.position;
    starterCell.innerHTML = data.starter;
    numRows++
}

function deleteRoster(){
  console.log("Deleting last player")
  if(numRows > 1){
    document.getElementById( "resultTable" ).deleteRow(-1);
    numRows--
  }
  return false
}

function editRoster(array){
  for(var r = 0; r < array.length; r++){
    var table = document.getElementById( "resultTable" )
    table.rows[r+1].cells[0].innerHTML = array[r].number
    table.rows[r+1].cells[1].innerHTML = array[r].playerName
    table.rows[r+1].cells[2].innerHTML = array[r].nickName
    table.rows[r+1].cells[3].innerHTML = array[r].height
    table.rows[r+1].cells[4].innerHTML = array[r].positon
    table.rows[r+1].cells[5].innerHTML = array[r].starter
  }
  return false
}

window.onload = function() {
  const addButton = document.querySelector( '#add' )
  addButton.onclick = addPlayer

  const deleteButton = document.querySelector( '#delete' )
  deleteButton.onclick = deletePlayer
/*
  const editButton = document.querySelector( '#edit' )
  editButton.onclick = editPlayer
*/
  window.localStorage.clear()

}