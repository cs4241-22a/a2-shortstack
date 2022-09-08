// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const do_submit = function(e) {
  console.log("submit");

  const input = document.querySelector('#new_todo_item'),
          json = { "title": input.value },
          data = JSON.stringify(json)

  fetch("http://localhost:3000", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  })

  .then (response => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.json();
  })

  .then((data) => {
    const todo_item = document.createElement('li')
    todo_item.innerText = JSON.stringify(data)
    document.getElementById("todo_list").appendChild(todo_item);
  })

  return false;
}