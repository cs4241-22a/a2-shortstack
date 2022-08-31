// Add some Javascript code here, to run on the front end.
//console.log("Welcome to assignment 2!")

// Adds a task to the list
const addTask = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // Define variables
    var task = document.getElementById("task").value;
    var points = document.getElementById("points").value;
    var date = document.getElementById("dueDate").value;

    const input = document.querySelector( '#add' ),
          json = { task: task, points: points, date: date },
          body = JSON.stringify( json )

    fetch( '/addTask', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      return true;
    })

    return false
  }

  const editTask = function() {
    fetch( '/editTask', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return true;
    })

    return false
  }

  // Generates the list of tasks and their data
  const createList = function () {
    fetch( '/getTasks', {
        method:'GET'
      })
      .then( function( response ) {
        return true;
      })
  }

  window.onload = function() {
    const button = document.querySelector( 'addTask' )
    button.onclick = addTask
  }

  // Prints the list to the index.html file
  const printList = function (list) {

  }

  const updateLists = function(response) {
    response.json().then(function(data) {

    });
  }