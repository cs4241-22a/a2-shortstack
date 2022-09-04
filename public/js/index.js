const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const task = document.querySelector('#task'),
        due = document.querySelector('#due'),
        json = { taskname: task.value, dueDate: due.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(response => response.json())
        .then(tasks => {
            if(tasks.message){
                alert(tasks.message)
            }
            else{
                updateData(tasks)
            }
        })
    let form = document.querySelector('form')
    form.reset()
    return false
}

const markCompleted = function (taskname) {
    body = JSON.stringify(taskname)
    fetch("/remove", {
        method: 'POST',
        body
    })
        .then(response => response.json())
        .then(tasks => updateData(tasks))
    return false
}

const updateData = function(tasks) {
    Array.from(document.body.getElementsByClassName(`container`)).forEach(e => e.innerHTML = '')
    Array.from(tasks).forEach(task => {
        let container = document.body.getElementsByClassName(`container ${task.priority}`)
        let child = createElementFromHTML(task.html)
        container[0].appendChild(child)
        // container[0].innerHTML += '\n' + task.html
        let imgs = container[0].getElementsByClassName('check')
        let img = imgs[imgs.length - 1]
        img.onclick = () => markCompleted(task.taskname)
        let pencils = container[0].getElementsByClassName('pencil')
        let pencil = pencils[pencils.length - 1]
        pencil.onclick = () => edit(task.taskname)//this is passed dynamically, causing the edit bug
    })
}

const edit = function(id) {
    let taskHTML = document.getElementById(id)
    let taskblock = taskHTML.getElementsByClassName('task-block')[0]
    let h2 = taskHTML.getElementsByTagName('h2')[0]
    let p = taskHTML.getElementsByTagName('p')[0]
    let taskname = h2.innerText
    let duedate = p.innerText
    taskblock.innerHTML = ''
    let text = document.createElement('input')
    text.type = 'text'
    text.id = 'task'
    text.value = taskname
    let date = document.createElement('input')
    date.type = 'date'
    date.id = 'due'
    date.value = duedate.slice(5)
    taskHTML.prepend(createElementFromHTML(`
    <div class="edit-imgs">
    <img src="cancel.png" alt="cancel button"/>
    <img src="check.png" alt="confirm button"/>
    </div>
    `))
    taskHTML.prepend(date)
    taskHTML.prepend(text)
    let imgs = taskHTML.getElementsByClassName('edit-imgs')[0].children
    let confirm = imgs[1]
    let cancel = imgs[0]
    confirm.onclick = () => update(taskHTML, taskname)
    cancel.onclick = () => {
        fetch('/gettasks').then(response => response.json()).then(tasks => updateData(tasks))
    }
}

const update = function(taskhtml, old) {
    const task = taskhtml.querySelector('#task'),
        due = taskhtml.querySelector('#due'),
        json = { oldtaskname: old, taskname: task.value, dueDate: due.value },
        body = JSON.stringify(json)

    fetch('/update', {
        method: 'POST',
        body
    })
        .then(response => response.json())
        .then(tasks => updateData(tasks))
        .catch(error => console.log('bad input'))
}

//https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
//this is necessary because of https://stackoverflow.com/questions/595808/is-it-possible-to-append-to-innerhtml-without-destroying-descendants-event-list
//kinda dumb tho ngl
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

const open = function (priority) {
    let dropdown = document.getElementsByClassName(`dropdown ${priority}`)
    if (dropdown[0].className.includes("closed")) {
        dropdown[0].className = `dropdown ${priority} open`
        let container = document.getElementsByClassName(`container ${priority}`)
        container[0].className = `container ${priority} open`
    } else {
        dropdown[0].className = `dropdown ${priority} closed`
        let container = document.getElementsByClassName(`container ${priority}`)
        container[0].className = `container ${priority} closed`
    }
}

window.onload = function () {
    const button = document.querySelector('button')
    const summaries = document.getElementsByTagName('summary')
    button.onclick = submit
    Array.from(summaries).forEach(summary => {
        summary.onclick = () => {
            open(summary.className)
        }
        let div = document.createElement('div')
        div.className = `priority ${summary.className}`
        summary.appendChild(div)
    })
    fetch('/gettasks').then(response => response.json()).then(tasks => updateData(tasks))
}
