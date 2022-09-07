var taskArray = []
var completedTaskArray = []

// Adds a task to the list
const addTask = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    // Define variables
    let task = document.getElementById("task").value;
    let points = document.getElementById("points").value;
    let date = document.getElementById('dueDate').value;
    let finish = document.getElementById('dueDate').value - points;

    const json = { task: task, points: points, date: date, finish: finish},
          body = JSON.stringify( json )
    taskArray.push(json)
    fetch( '/addTask', {
      method:'POST',
      body 
    })
    
    .then( response => response.json() )
    .then( data => createTable(data)
      )
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

  window.onload = function() {
    const button = document.querySelector( "#addTask" )
    button.onclick = addTask
    const button2 = document.getElementById( "completedTasks" )
    button2.onclick = console.log("hello world")

    // Create table
    let list = document.getElementById("table-header")
    let list2 = document.getElementById("completed-table-header")

    let row = list.insertRow(-1)
    row.insertCell(0).innerHTML = "Task"
    row.insertCell(1).innerHTML = 'Points'
    row.insertCell(2).innerHTML = 'Due Date'
    row.insertCell(3).innerHTML = 'Estimated Completion'

    let row2 = list2.insertRow(-1)
    row2.insertCell(0).innerHTML = "Task"
    row2.insertCell(1).innerHTML = 'Points'
    row2.insertCell(2).innerHTML = 'Due Date'
    row2.insertCell(3).innerHTML = 'Estimated Completion'
    list2.style.display = "none"
  }

  // Prints the list to the index.html file
  const createTable = function (data) {
    let table = document.getElementById('table-body')
    let row = table.insertRow(-1)
    row.insertCell(0).innerHTML = taskArray[taskArray.length-1].task
    row.insertCell(1).innerHTML = taskArray[taskArray.length-1].points
    row.insertCell(2).innerHTML = taskArray[taskArray.length-1].date
    row.insertCell(3).innerHTML = taskArray[taskArray.length-1].finish
    row.insertCell(4).innerHTML = '<button id = "Edit">Edit</button>'
    row.insertCell(5).innerHTML = '<button id = "Delete">Delete</button>'
    row.insertCell(6).innerHTML = '<button id = "Complete">Complete</button>'
  }
