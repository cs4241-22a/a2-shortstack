// Add some Javascript code here, to run on the front end.



//intended to act as the POST request
const submit = function (e) {
  e.preventDefault();
  
  const task = document.getElementById('task'),
        date_created = document.getElementById('date_created'),
        task_type = document.getElementById('task_type'),
        date = new Date(),
        json = {task:task.value, date_created: date, task_type: task_type.value},
        body = JSON.stringify(json);
  
  fetch('/submit', {
    method: 'POST',
    body
  }).then(async response => {
    renderTable(await response,json())
  }).catch((reason) => {
    console.log(reason)
  })
  
  task.value = ''
  date
        
}

//I would need to do something to get the table to pop-up
//something with adding the HTML and getting it to pop-up with each input
