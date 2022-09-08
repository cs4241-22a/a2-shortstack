const load = function () {
  fetch("/load", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      for (let index = 0; index < appdata.length; index++) {
        append(appdata, index);
      }
    });
};

const submit = function (e) {
  
  e.preventDefault();

  //get the inputs
  const bookName = document.querySelector("#bookName"),
    authorName = document.querySelector("#authorName"),
    totalPages = document.querySelector("#totalPages"),
    pagesRead = document.querySelector("#pagesRead");
  
  //checking if the inputs are valid
   if(bookName.value === "" || authorName.value === "" || totalPages.value === "" || pagesRead.value === ""){
    alert("Please enter values for all fields!");
    document.getElementById("bookForm").reset();
    return;
  }
  
  //if valid make a json to add
  const json = {
      bookName: bookName.value,
      authorName: authorName.value,
      totalPages: totalPages.value,
      pagesRead: pagesRead.value,
    },
    body = JSON.stringify(json);

  //fetch method
  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      console.log(appdata);
      append(appdata, appdata.length - 1);
    });
};

// Remove entry from server data array and update page
const remove = function (e) {
  e.preventDefault();

  const element = this.index,
    json = {
      index: element,
    },
    body = JSON.stringify(json);

  fetch("/remove", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      let tbody = document.querySelector("#bookshelf-body");
      tbody.innerHTML = "";
      for (let index = 0; index < appdata.length; index++) {
        append(appdata, index);
      }
    });
};

const append = function (data, row) {
  let tbody = document.querySelector("#bookshelf-body");
  let newRow = document.createElement("tr");
  newRow.setAttribute("class", "bookshelf-tr");
  for (let col = 0; col < 6; col++) {
    let newCol = document.createElement("td");
    if (col != 5 && col != 6) {
      newCol.setAttribute("class", "bookshelf-td");
    } else {
      newCol.setAttribute("class", "bookshelf-td-button");
    }
    let newElement;
    switch (col) {
      case 0:
        newElement = document.createTextNode(data[row].bookName);
        break;
      case 1:
        newElement = document.createTextNode(data[row].authorName);
        break;
      case 2:
        newElement = document.createTextNode(data[row].totalPages);
        break;
      case 3:
        newElement = document.createTextNode(data[row].pagesRead);
        break;
      case 4:
        newElement = document.createTextNode(data[row].pagesLeft);
        break;
      case 5:
        newElement = document.createElement("button");
        newElement.innerHTML = "X";
        newElement.setAttribute("class", "button");
        newElement.className = "deleteButton";
        newElement.setAttribute("id", "remove");
        newElement.onclick = remove;
        newElement.index = row;
        break;
    }
    newCol.appendChild(newElement);
    newRow.appendChild(newCol);
  }
  tbody.appendChild(newRow);
};

window.onload = function () {
  load();
  const button = document.querySelector("button");
  button.onclick = submit;
};