let current_row = 0

// POST request
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        current_date = new Date(),
        json = {task: input_task.value, creation_date: current_date, due_date: input_date.value},
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    }).then(async response => {
        renderTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    // Reset fields when submitted
    input_task.value = ''
    input_date.value = ''
    document.getElementById('todoSubmit').disabled = true

    return false
}

const cancel = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    document.getElementById('task').value = ''
    document.getElementById('due-date').value = ''
    document.getElementById('legend').textContent = 'Add a TODO'
    document.getElementById('todoSubmit').onclick = submit

    return false
}

const editTask = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let id = parseInt(e.target.id.substring(4))
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        let json = await response.json()
        let data = json[id]
        document.getElementById('task').value = data.task
        document.getElementById('due-date').value = data.due_date
        document.getElementById('legend').textContent = 'Modify a TODO'
        document.getElementById('todoSubmit').onclick = updateTask
        current_row = id
    }).catch((reason) => {
        console.log(reason)
    })
}

// PATCH request
const updateTask = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        json = {task: input_task.value, due_date: input_date.value},
        body = JSON.stringify(json)
    fetch('/' + current_row, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        document.getElementById('task').value = ''
        document.getElementById('due-date').value = ''
        document.getElementById('legend').textContent = 'Add a TODO'
        document.getElementById('todoSubmit').onclick = submit
        renderTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    return false
}

// DELETE request
const deleteTask = function (e) {
    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        renderTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

// Yes, this is very cursed
const renderTable = function (json) {
    let html =
        '<table>\n' +
        '        <tr>\n' +
        '            <th><strong>Task</strong></th>\n' +
        '            <th><strong>Creation Date</strong></th>\n' +
        '            <th><strong>Due Date</strong></th>\n' +
        '            <th><strong>Priority</strong></th>\n' +
        '            <th><strong>Edit</strong></th>\n' +
        '            <th><strong>Delete</strong></th>\n' +
        '        </tr>\n'
    let idx = 0
    for (let todo of json) {
        html += `<tr class="tableRow" id="${idx}">`
        html += '<th>' + todo.task + '</th>'
        html += '<th>' + new Date(todo.creation_date).toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + '</th>'
        html += '<th>' + new Date(todo.due_date).toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + '</th>'
        if (todo.priority === 'Late')
            html += '<th style="background-color: red; color: white">' + todo.priority + '</th>'
        else
            html += '<th>' + todo.priority + '</th>'
        html += '<th><button class="editTask">Edit</button></th>'
        html += '<th><button class="deleteTask">X</button></th>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    document.getElementById('todolist').innerHTML = html

    // Add edit button handlers
    const editButtons = document.getElementsByClassName('editTask')
    idx = 0
    for (let button of editButtons) {
        button.onclick = editTask
        button.id = 'edit' + idx
        idx++
    }

    // Add delete button handlers
    const deleteButtons = document.getElementsByClassName('deleteTask')
    idx = 0
    for (let button of deleteButtons) {
        button.onclick = deleteTask
        button.id = 'delete' + idx
        idx++
    }
}

// GET request
const showTable = function () {
    // After getting a response, ask for HTML of tasks to add
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        renderTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

window.onload = function () {
    // Show table immediately
    showTable()

    // Add submit functionality
    const todoSubmit = document.getElementById('todoSubmit')
    todoSubmit.onclick = submit

    const cancelButton = document.getElementById('cancel')
    cancelButton.onclick = cancel

    // Only enable submit button if fields are filled out
    const addTask = document.getElementById('addTask')[0]
    addTask.oninput = () => {
        document.getElementById('todoSubmit').disabled = document.getElementById('task').value.trim() === '' || document.getElementById('due-date').value.trim() === ''
    }
}