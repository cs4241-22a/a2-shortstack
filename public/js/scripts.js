console.log("Welcome to assignment 2!"); // Add some Javascript code here, to run on the front end.

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;

  if (task.trim() === "") {
    //if empty
    alert("Please enter task Name");
    return false;
  }

  //TODO send alert if the date already past

  const jsonData = {
    task: task,
    status: "",
    date: date,
    dateTile: "",
  };

  let body = JSON.stringify(jsonData);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    update();
    clear();
  });
  return true;
};

function update() {
  console.log(1);
  let table = document.getElementById("table");
  table.innerHTML =
    "<tr><th>Task Name</th><th>Status</th><th>Date</th><th>Dates Till</th><th>Delete</th></tr>";
  
  fetch("/getResponses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {
        let row = table.insertRow(-1);
        console.log(index);

        let task = row.insertCell(0);
        let status = row.insertCell(1);
        let date = row.insertCell(2);
        let dateTill = row.insertCell(3);
        let del = row.insertCell(4);
        
        row.cells[0].innerHTML = response.task;
        row.cells[1].innerHTML = response.status;
        row.cells[2].innerHTML = response.date;
        row.cells[3].innerHTML = response.dateTill;
        row.cells[4].innerHTML = `<button class='deleteButton' onclick=deleteRow(${index})>Delete</button>`;
        index++;
      }
    });
}

function clear() {
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
}


function deleteRow(index){
  const json = {
      deletingResponse: index,
    };

    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(function () {
      update();
    });
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  update();
};
