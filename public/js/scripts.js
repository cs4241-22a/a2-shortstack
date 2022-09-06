const getRowData = function () {
  const playerNameInput = document.querySelector("#playerName");
  const playerScoreInput = document.querySelector("#playerScore");
  const winResultInput = document.querySelector("#winResult");

  return {
    playerName: playerNameInput.value,
    playerScore: parseInt(playerScoreInput.value),
    winResult: winResultInput.checked,
  };
};

const addEntry = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const rowData = getRowData();
  const body = JSON.stringify({ rowData });

  fetch("/", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      $("#resultsTable").find("tr:gt(0)").remove();
      updateTableWithData(data);
    });

  return false;
};

const deleteEntry = function (rowIndex) {
  const body = JSON.stringify({ rowIndex });

  fetch("/", {
    method: "DELETE",
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      $("#resultsTable").find("tr:gt(0)").remove();
      updateTableWithData(data);
    });

  return false;
};

const modifyEntry = function (rowIndex) {
  const rowData = getRowData();
  const body = JSON.stringify({ rowData, rowIndex });

  fetch("/", {
    method: "PUT",
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      $("#resultsTable").find("tr:gt(0)").remove();
      updateTableWithData(data);
    });

  return false;
};

const updateTableWithData = function (currentData) {
  const table = document.querySelector("#resultsTable");
  console.log(currentData);
  currentData.forEach((element, index) => {
    const row = table.insertRow();
    for (const value of Object.values(element)) {
      const cell = row.insertCell();
      cell.innerHTML = value;
    }
    const modifyCell = row.insertCell();
    const deleteCell = row.insertCell();
    modifyCell.setAttribute("class", "modifyCell");
    deleteCell.setAttribute("class", "deleteCell");
    modifyCell.setAttribute("onclick", `modifyEntry(${index})`);
    deleteCell.setAttribute("onclick", `deleteEntry(${index})`);
  });
};

window.onload = function () {
  const button = document.querySelector("#addEntry");
  button.onclick = addEntry;
};
