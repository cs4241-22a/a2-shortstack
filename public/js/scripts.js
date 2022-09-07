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
    let estComplete = getEstCompletion(points);

    const json = { task: task, points: points, date: date, estComplete: estComplete},
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
      method:'GET',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return true;
    })

    return false
  }

  const completeTask = function() {
    fetch( '/completeTask', {
      method:'GET',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return true;
    })

    return false
  }

  const deleteTask = function() {
    fetch( '/deleteTask', {
      method:'GET',
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
    button2.onclick = makeVisible
    const button3 = document.getElementById( "refresh" )

    // Create table
    let list = document.getElementById("table-header")
    let list2 = document.getElementById("completed-table-header")
    let body = document.getElementById("completed-table-body")
    let outerTable = document.getElementById("completed-to-do-list")

    let row = list.insertRow(-1)
    row.insertCell(0).innerHTML = "Task"
    row.insertCell(1).innerHTML = 'Points'
    row.insertCell(2).innerHTML = 'Due Date'
    row.insertCell(3).innerHTML = 'Estimated Completion'

    outerTable.style.display = "none"
    document.getElementById("completed-task-header").style.display = "none"

    let row2 = list2.insertRow(-1)
    row2.insertCell(0).innerHTML = "Task"
    row2.insertCell(1).innerHTML = 'Points'
    row2.insertCell(2).innerHTML = 'Due Date'
    row2.insertCell(3).innerHTML = 'Estimated Completion'

  }

  // Prints the to do list to the index.html file
  const createTable = function (data) {
    let table = document.getElementById('table-body')
    let row = table.insertRow(-1)
    row.insertCell(0).innerHTML = taskArray[taskArray.length-1].task
    row.insertCell(1).innerHTML = taskArray[taskArray.length-1].points
    row.insertCell(2).innerHTML = taskArray[taskArray.length-1].date
    row.insertCell(3).innerHTML = taskArray[taskArray.length-1].estComplete
    row.insertCell(4).innerHTML = '<button id = "Edit' + (taskArray.length - 1).toString() + '">Edit</button>'
    row.insertCell(5).innerHTML = '<button id = "Delete'  + (taskArray.length - 1).toString() + '">Delete</button>'
    row.insertCell(6).innerHTML = '<button id = "Complete'  + (taskArray.length - 1).toString() + '">Complete</button>'
  }

  const createCompletedTable = function(data) {
    let table = document.getElementById('completed-table-body')
    let row = table.insertRow(-1)
    row.insertCell(0).innerHTML = data[data.length-1].task
    row.insertCell(1).innerHTML = data[data.length-1].points
    row.insertCell(2).innerHTML = data[data.length-1].date
    row.insertCell(3).innerHTML = data[data.length-1].estComplete
  }

  const makeVisible = function( e ) {
    let list2 = document.getElementById("completed-table-header")
    let outerTable = document.getElementById("completed-to-do-list")
    const button3 = document.getElementById( "refresh" )
    document.getElementById("completed-task-header").style.display = "block"
    outerTable.style.display = "block"
    
    if (completedTaskArray.length > 0)
    {
      createCompletedTable(completedTaskArray);
    }
  }

  // Get the estimate date of completion based on amount of points given to task
  const getEstCompletion = function(points) {
    let dateVar = new Date();
    let estCompletion;
    let newDay = dateVar.setDate(dateVar.getDate() + parseInt(points))
    let newMonth = parseInt(dateVar.getMonth()) + parseInt(1)
    let newDay2 = dateVar.getDate();

    // Comparisons to make sure the date is printed in YYYY-MM-DD format
    if (newMonth < 10 && newDay2 < 10)
    {
      estCompletion = dateVar.getFullYear() + "-0" + newMonth + "-0" + dateVar.getDate()
    }
    else if (newMonth < 10)
    {
      estCompletion = dateVar.getFullYear() + "-0" + newMonth + "-" + dateVar.getDate()
    }
    else if (newDay2 < 10)
    {
      estCompletion = dateVar.getFullYear() + "-" + newMonth + "-0" + dateVar.getDate()
    }
    else 
    {
      estCompletion = dateVar.getFullYear() + "-" + newMonth + "-" + dateVar.getDate()
    }

    return estCompletion;
  }
