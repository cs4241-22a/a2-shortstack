// Add some Javascript code here, to run on the front end.

window.onload = function () {
  console.log("Welcome to assignment 2!");

  populateTable();

  const submit_btn = document.getElementById("submit");
  submit_btn.onclick = submit;
};

// POST submit entry
const submit = (e) => {
  // debugger
  e.preventDefault();
  
  const name = document.getElementById("name").value,
    grade = document.getElementById("grade").value,
    food = document.getElementById("food").value,
    activity = document.getElementById("activity").value;

  if (name == undefined || name === "") {
    alert("Please fill in each category");
    return;
  }

  const json = { name: name, grade: grade, activity: activity, food: food },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(async (response) => populateTable(await response.json()))
    .catch((err) => console.error(err));
  
  return false;
};

// GET appdata
const populateTable = () => {
  fetch("/data", {
    method: "GET",
  })
    .then(async (response) => updateData(await response.json()))
    .catch((err) => console.error(err));
};

// DELETE remove row
const deleteRow = (e) => {
  debugger
  e.preventDefault();
  const id = e.target.id;

  fetch("/" + id, {
    method: "DELETE",
  })
    .then(async (response) => updateData(await response.json()))
    .catch((err) => console.error(err));
};

const updateData = (json) => {
  const table = document.getElementById("dataTable");
  table.innerHTML = "";
  
  // add the headers back
  const headers = table.insertRow(0);
  headers.innerHTML = `
  <tr>
    <th>Name</th>
    <th>Grade</th>
    <th>Class of</th>
    <th>Fav Food</th>
    <th>Fun Activity</th>
    <th>Actions</th>
  </tr>
  `;

  let i = 1;
  for (let j of json) {
    const row = table.insertRow(i);
    const html = `
    <td>${j.name}</td>
    <td>${j.grade}</td>
    <td>${j.year}</td>
    <td>${j.food}</td>
    <td>${j.activity}</td>
    <td>
      <button
        class="del"
        id="remove${i}"
      >
        Remove
      </button>
    </td>
    `;
    row.innerHTML = html;
    row.id = `${i}`;
    row.onclick = deleteRow;
    i++;
  }
  
};


