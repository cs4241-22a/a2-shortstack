// Add some Javascript code here, to run on the front end.

let task 
let date 
let priority 
function main(){
task = document.getElementById('to do')
date = document.querySelector('#date')
priority = document.querySelector('priority')
const add = document.querySelector('#add')
    add.onclick = buttonClick
}
function buttonClick(){
    isEmpty()
    // submit()
    task.value = ""
    date.value = ""
    priority.value = ""
}
function isEmpty(){
    if (task.value === "" || date.value === ""){
        alert("Please fill out all fields") 
        return false
    }
    return true
}
const submit = function( e ) {
          json = { Task: task.value },
          body = JSON.stringify( json )

        //   json = { Date: date.value },
        //   body = JSON.stringify( json )

        //   json = { Priority: priority.value },
        //   body = JSON.stringify( json )

    fetch( 'http://localhost:3000', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    return false
  }

