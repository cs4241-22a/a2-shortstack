// app data is {"task":"Task Name","dueDate":"When the task is due", "taskType":"Work or personal"}
// self generated: {"taskCreationDate": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}



const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()
  const task = document.querySelector('#task-input'),
    date = document.querySelector('#date-time-input'),
    json = { task: task.value, dueDate: date.value },
    body = JSON.stringify(json);

  // reset the inputs  
  task.value = ""; date.value = "";

  fetch('/submit', {method: 'POST',body})
    .then(function (response) {
      if (response.ok){
          updateTaskListDisplay();
      }})
  return false;
}


     
const getTasksLocal = function(){
  JSON.parse(localStorage.getItem("storedTasks-doit"));
}

const saveTasksLocal = function(tasks){
  localStorage.setItem("storedTasks-doit", JSON.stringify(tasks));
}

const getTasksServer = function(){
  return fetch("/tasks", { method: 'GET', })
    .then(response => {
      if (response.ok) {
        return response.json().then(response => ({ response }));
      }
      // TODO: add else
    });
}


const updateTaskListDisplay = function() {
  fetch("/tasks", { method: 'GET', })
    .then(response => {
      if (response.ok) {
        return response.json().then(tasksData => displayTaskList(tasksData));
      }
      // TODO: add else
    });

  // add html and stuff to display tasks
  
}

const displayTaskList = function(tasksData){
  const taskDiv = document.getElementById("task-list");
  taskDiv.innerHTML = "";
  for (let aTask in tasksData){
    let taskJson = tasksData[aTask];
    console.log(taskJson.task);
    console.log(taskJson.dueDate);
    let childNode = document.createTextNode(JSON.stringify(tasksData[aTask]))
    taskDiv.appendChild(childNode);
  } 
}

window.onload = function () {
  const button = document.getElementById('submit-button');
  button.onclick = submit;
  particlesJS.load('particles-js', '../../node_modules/particles.js/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });
  flatpickr("#date-time-input", { enableTime: true, dateFormat: "Y-m-d H:i", });

  // try to get tasks from saved storage
  //var tasks = getTasksLocal();
  //displayTaskList(tasks);
}
