console.log("Welcome to assignment 2!")

const do_submit = function(e) {
  const title = document.querySelector('#todo_item'),
        assigned_date = document.querySelector("#todo_item_assigndate"),
        due_date = document.querySelector("#todo_item_duedate")
        json = { 
          "title": title.value, 
          "assigned_date": assigned_date.value, 
          "due_date": due_date.value},
        data = JSON.stringify(json)

  fetch("/submit", {
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

  .then(data => update_page(data))

  return false;
}
const update_page = function(data) {
  document.getElementById("todo_list").innerHTML = ""; // removes everything in list
  let counter = 0; // every todo item gets assigned an id based on their position in the list (0 at top)
  data.forEach(item => {
    const todo_item = document.createElement("li");
    const item_array = JSON.parse(item);
    set_item_elements(todo_item, item_array);
    
    todo_item.appendChild(make_delete_button());
    todo_item.setAttribute("id", counter);
    todo_item.setAttribute("class", "priority" + item_array.priority);
    document.getElementById("todo_list").appendChild(todo_item);
    counter++;
  })
}

const make_delete_button = function() {
  const button_delete = document.createElement("button");
  button_delete.setAttribute("class", "delete");
  button_delete.setAttribute("onclick", "delete_element(this)");
  button_delete.innerText = "X";
  return button_delete;
}

// sets items in array as <p> child elements to the todo_item <li> element
const set_item_elements = function(todo_item, item_array) {
  for (let key in item_array) {
    if (key != "priority") {
      const todo_element = document.createElement("p");
      todo_element.innerText = item_array[key];
      todo_item.appendChild(todo_element);
    }
  }
}

const delete_element = function(e) {
  fetch("/delete", {
    method: "POST",
    body: e.parentNode.getAttribute("id"),
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

  .then(data => update_page(data));
}

window.onload = function() {
  fetch("/appdata", {
    method: "GET"
  })
  .then (response => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.json();
  })
  .then(data => update_page(data));
}