console.log("Welcome to assignment 2!");

function makeTable(json) {
  let table = document.getElementById("todo-table");
  document.getElementById("table-body").innerHTML = `<tr>
        <th>Status</th>
        <th>Todo</th>
        <th>Due</th>
        <th>Priority</th>
        <th>Tag</th>
      </tr>`;

  json.forEach((item) => {
    let newTodo = table.insertRow(-1);

    let deleteCell = newTodo.insertCell(0);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Done";
    deleteButton.classList.add("deleteTodo");
    deleteCell.appendChild(deleteButton);

    let todo = newTodo.insertCell(1);
    let todoText = document.createTextNode(item["todo"]);
    todo.appendChild(todoText);

    let duedate = newTodo.insertCell(2);
    let due = document.createTextNode(item["due"]);
    duedate.appendChild(due);

    let priority = newTodo.insertCell(3);
    let priorityText = document.createTextNode(item["priority"]);
    
    if (item["priority"] === "RED") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotRed");
    }
    else if (item["priority"] === "YELLOW") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotYellow");
    }
    else if (item["priority"] === "GREEN") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotGreen");
    }
    
    priority.appendChild(priorityText);

    let tag = newTodo.insertCell(4);
    let tagText = document.createTextNode(item["tag"]);
    tag.appendChild(tagText);
  });

  var el = document.getElementsByTagName("td");
  for (var i = 0; i < el.length; i++) {
    if (el[i].innerHTML == "webware") {
      el[i].className += " " + "webware";
    } else if (el[i].innerHTML === "deepLearning") {
      el[i].className += " " + "deepLearning";
    } else if (el[i].innerHTML === "work") {
      el[i].className += " " + "work";
    } else if (el[i].innerHTML === "MQP") {
      el[i].className += " " + "MQP";
    } else if (el[i].innerHTML === "businessIntelligence") {
      el[i].className += " " + "businessIntelligence";
    }
  }

  const doneBtns = document.getElementsByClassName("deleteTodo");
  let index = 0;
  for (let done of doneBtns) {
    done.onclick = deleteTodo;
    done.id = "doneBtn-" + index;
    index++;
  }
}

const getTable = function () {
  fetch("/table", {
    method: "GET",
  }).then(async (response) => {
    makeTable(await response.json());
  });
};

const createTodo = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.getElementById("todo"),
    due = document.getElementById("due"),
    tag = document.getElementById("tag"),
    json = { todo: input.value, tag: tag.value, due: due.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => {
      makeTable(json);
    });
  
  document.getElementById("todo").value = '';
  document.getElementById("due").value = '';
  document.getElementById("tag").value = '';

  return false;
};

const deleteTodo = function (e) {
  console.log(e);
  console.log(e.target.id.split("-")[1]);
  fetch("/" + e.target.id.split("-")[1], {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      makeTable(json);
    });
};

window.onload = function () {
  getTable();
  const button = document.getElementById("createTodo");
  button.onclick = createTodo;
};
