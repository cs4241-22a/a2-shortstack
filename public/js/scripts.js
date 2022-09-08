console.log("Welcome to assignment 2!"); // Add some Javascript code here, to run on the front end.

var dayTil = 0;

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  //get the input from html form
  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;

  if (task.trim() === "") {
    //if the task name is empty -> give warning and don't allow to submit
    alert("Please enter the Task name");
    return false;
  }

  if (date.trim() === "") {
    //if the date is empty and not set -> also give warning and don't allow to submit
    alert("Please enter the Date");
    return false;
  } else {
    dayTil = dateCalculated(date); //calculate date, if return -1 -> mean date is not a future date -> give warning
    if (dayTil == -1) {
      return false;
    }
  }

  const jsonData = {
    //saving data to json
    task: task,
    date: date,
    dateTil: dayTil,
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
  let table = document.getElementById("table"); //constructing new table
  table.innerHTML =
    "<tr><th>Task Name</th><th>Date</th><th>Dates Till</th><th>Delete</th></tr>";

  fetch("/getTable", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {
        //runnign through each entry from the json file
        let row = table.insertRow(-1);

        let task = row.insertCell(0);
        let date = row.insertCell(1);
        let dateTill = row.insertCell(2);
        let del = row.insertCell(3);

        //adding column to the html, entry by entry
        row.cells[0].innerHTML = response.task;
        row.cells[1].innerHTML = response.date;
        row.cells[2].innerHTML = response.dateTil;
        row.cells[3].innerHTML = `<button class='deleteButton' onclick=deleteRow(${index})>Delete</button>`;
        index++;
      }
    });
}

//basically clearing the input entry
function clear() {
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
}

//helper functing to delete row at certain index
function deleteRow(index) {
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

//checking and calculating date left from current date to due date
function dateCalculated(date) {
  var current = new Date();
  var curDate = current.getDate();
  var curMonth = current.getMonth() + 1; //month count from 0
  var curYear = current.getYear() % 100; //EX return 122 for 2022 -> only take 22

  //date is in format for yyyy-dd-mm
  var dateArray = date.toString().split("-");
  var dyear = parseFloat(dateArray[0].substring(2)); //only calculate with last 2 digit
  var dmonth = parseFloat(dateArray[1]);
  var ddate = parseFloat(dateArray[2]);

  var dueDate = new Date(date);
  if (dueDate > current) {
    return (
      (dyear - curYear) * 365 + (dmonth - curMonth) * 30 + (ddate - curDate)
    );
  }
  alert("You can only set due date to future date!");
  return -1;
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  update();
};
