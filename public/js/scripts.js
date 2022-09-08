// Add some Javascript code here, to run on the front end.

// Functionality for add button
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const task = document.querySelector("#task"),
          category = document.querySelector("#category"),
          priority = document.querySelector("#priority"),
          json = {
            task: task.value,
            category: category.value,
            priority: priority.value,
            deadline: ""
           },
          body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body 
    })
    .then( response => response.json() )
    .then( json => {
        let appdata = json
        // Create table with row added
        createTable(appdata)

        // Clear input fields
        task.value = ""
        category.value = ""
        priority.selectedIndex = 0
    })

    return false
}

// Functionality for remove button
const remove = function( e, rowId ) {
    e.preventDefault()
    
    const body = rowId

    fetch( '/delete', {
        method:'POST',
        body
    })
    .then( response => response.json() )
    .then( json => {
        let appdata = json
        // Create table with row removed
        createTable(appdata)
    })
    
    return false
}

// Create table from the appdata
function createTable( appdata ) {
    let index = 0
    document.querySelector("#todo-table").innerHTML = ""

    if (appdata.length > 0) {
        const headerRow = document.createElement("tr")

        // Create and add headers to table
        const taskHeader = document.createElement("th")
        taskHeader.innerText = "Task"
        const categoryHeader = document.createElement("th")
        categoryHeader.innerText = "Category"
        const priorityHeader = document.createElement("th")
        priorityHeader.innerText = "Priority"
        const deadlineHeader = document.createElement("th")
        deadlineHeader.innerText = "Deadline"
        const actionsHeader = document.createElement("th")
        actionsHeader.innerText = "Actions"

        headerRow.appendChild(taskHeader)
        headerRow.appendChild(categoryHeader)
        headerRow.appendChild(priorityHeader)
        headerRow.appendChild(deadlineHeader)
        headerRow.appendChild(actionsHeader)

        document.querySelector("#todo-table").appendChild(headerRow)
    }

    // Create table rows
    appdata.forEach( item => {
        const dataRow = document.createElement("tr")
        dataRow.id = index
        index++

        const taskData = document.createElement("td")
        taskData.innerText = item.task
        const categoryData = document.createElement("td")
        categoryData.innerText = item.category
        const priorityData = document.createElement("td")
        priorityData.innerText = item.priority
        const deadlineData = document.createElement("td")
        deadlineData.innerText = item.deadline

        dataRow.appendChild(taskData)
        dataRow.appendChild(categoryData)
        dataRow.appendChild(priorityData)
        dataRow.appendChild(deadlineData)

        // Create remove button
        const buttonData = document.createElement("td")
        const removeButton = document.createElement("button")
        removeButton.innerText = "Remove"
        removeButton.className = "action"
        removeButton.onclick = (e) => {remove(e, dataRow.id)}

        buttonData.appendChild(removeButton)
        dataRow.appendChild(buttonData)

        document.querySelector("#todo-table").appendChild(dataRow)
    })
}

window.onload = function() {
    const addButton = document.getElementById("add-button")
    addButton.onclick = submit
}
