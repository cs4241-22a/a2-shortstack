// Add some Javascript code here, to run on the front end.
let numResponse = 1;
const submit = function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const gameName = document.getElementById("gameName").value;
  const score = document.getElementById("score").value;
  const comment = document.getElementById("comment").value;


  if (name.trim() === "" || gameName.trim() === "" || score.trim() === ""|| comment.trim() === "") {
    alert("Please answer all questions.");
    return false;
  } else {
    numResponse++;

    const jsonData = {
      responseNum: numResponse,
      name: name,
      gameName: gameName,
      score: score,
      comment: comment,
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
  }
};

function update() {
  let table = document.getElementById("responses");
  table.innerHTML =
    "<tr><th>Response #</th><th>Name</th><th>Game Name</th><th>Score</th><th>Comment</th><th>Recommendation</th><th>Delete Response</th></tr>";
  fetch("/getResponses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {

        response.responseNum = index;
        let row = table.insertRow(-1);
        console.log(index);
        let responseNum = row.insertCell(0);
        let name = row.insertCell(1);
        let gameName = row.insertCell(2);
        let score = row.insertCell(3);
        let comment = row.insertCell(4);
        let degree = row.insertCell(5);
        let modify = row.insertCell(6);

        response.responseNum = index + 1;

        row.cells[0].innerHTML = response.responseNum;
        row.cells[1].innerHTML = response.name;
        row.cells[2].innerHTML = response.gameName;
        row.cells[3].innerHTML = response.score;
        row.cells[4].innerHTML = response.comment;    
        
        row.cells[5].innerHTML = response.degree;    
        row.cells[6].innerHTML =
          `<button class='deleteButton' onclick=deleteRow(${index})>Delete</button>`;
        index++;

      }
    });
}
function clear() {
  document.getElementById("name").value = "";
  document.getElementById("gameName").value = "";
  document.getElementById("score").value = "";
  document.getElementById("comment").value = "";
}
function deleteRow(rowIndex) {
  let confirmDelete = confirm(
    "Are you sure you want to delete this response?"
  );
  if (confirmDelete) {
    const json = {
      deletingResponse: rowIndex,
    };

    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(function () {
      update();
    });
  }
}
window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  update();
};