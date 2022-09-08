// Submit button
const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  // Get the variables from the form
  const activity = document.querySelector("#activity");
  const date = document.querySelector("#date");
  const time_started = document.querySelector("#time_started");
  const time_ended = document.querySelector("#time_ended");
  const description = document.querySelector("#description");

  // Get the values into a json
  const json = {
      activity: activity.value,
      date: date.value,
      time_started: time_started.value,
      time_ended: time_ended.value,
      description: description.value,
    },
    body = JSON.stringify(json); // Stringify

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let count = 0; // Count variable for id of each row

      // Reset the table since I am getting back the entirety of appdata array
      let table = document.getElementById("table");
      table.innerHTML =
        "<table id='table'>" +
        "<tr>" +
        "<th>Activity Done</th>" +
        "<th>Date</th>" +
        "<th>Time Started</th>" +
        "<th>Time Ended</th>" +
        "<th>Description</th>" +
        "<th>Duration</th>" +
        "<th>Delete?</th>" +
        "</tr>" +
        "</table>";

      // For each of the items in the array
      json.forEach((item) => {
        // Add the log to the table
        table.innerHTML +=
          "<tr id = " +
          count +
          ">" +
          "<td>" +
          item.activity +
          "</td>" +
          "<td>" +
          item.date +
          "</td>" +
          "<td>" +
          item.time_started +
          "</td>" +
          "<td>" +
          item.time_ended +
          "</td>" +
          "<td>" +
          item.description +
          "</td>" +
          "<td>" +
          item.duration +
          "</td>" + //(time_duration("2:15", "03: 18"))
          "<td> <button id = 'delete' onclick = 'delete_row( " +
          count.toString() +
          ")'>Delete</button> </td>" +
          "</tr>";
        count++; // Increment the count
      });
    });

  return false;
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};

// Function to delete the row
function delete_row(id) {
  document.getElementById(id).remove(); // Remove from html table based on the id of the row

  // Create a new json array to send back to the server
  let table = document.getElementById("table");
  let newTable = [];

  for (let row = 1; row < table.rows[row].length; row++) {
    let curRow = [];
    for (let col = 0; col < row.cells.length - 1; col++) {
      curRow.push(table.rows[row].cells[col].innerHTML);
    }
    newTable.push(curRow);
  }

  const json = JSON.stringify(newTable); // Stringify
  fetch("/delete", {
    method: "POST",
    json,
  })
    // Recreate the table
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let count = 0;
      let table = document.getElementById("table");
      table.innerHTML =
        "<table id='table'>" +
        "<tr>" +
        "<th>Activity Done</th>" +
        "<th>Date</th>" +
        "<th>Time Started</th>" +
        "<th>Time Ended</th>" +
        "<th>Description</th>" +
        "<th>Duration</th>" +
        "<th>Delete?</th>" +
        "</tr>" +
        "</table>";
      json.forEach((item) => {
        table.innerHTML +=
          "<tr id = " +
          count +
          ">" +
          "<td>" +
          item.activity +
          "</td>" +
          "<td>" +
          item.date +
          "</td>" +
          "<td>" +
          item.time_started +
          "</td>" +
          "<td>" +
          item.time_ended +
          "</td>" +
          "<td>" +
          item.description +
          "</td>" +
          "<td>" +
          item.duration +
          "</td>" + //(time_duration("2:15", "03: 18"))
          "<td> <button id = 'delete' onclick = 'delete_row( " +
          count.toString() +
          ")'>Delete</button> </td>" +
          "</tr>";
        count++;
      });
    });

  return false;
}
