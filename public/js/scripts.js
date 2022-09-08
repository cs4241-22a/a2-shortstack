// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const month = document.querySelector("#month")
  const day = document.querySelector("#day")
  const year = document.querySelector("#year")
  const json = { 
    month: month.value,
    day: day.value,
    year: year.value,
    yearsPast: ""
  }
  const body = JSON.stringify(json);
  fetch("/submit", {
    method: "POST",
    body,
  })
  .then(async function (response) {
    let newData = await response.json();
    refreshInfo(newData);
    console.log(newData);
  });
  return false;
};

const remove = function (e) {
  
  e.preventDefault();
  
  const id = "aaa"
  const json = { 
     id: id
  }  
  const body = JSON.stringify(json);
  fetch("/remove", {
    method: "POST",
    body,
  })
  
  
  return false;
}

function refreshInfo(newData) {
  const board = document.getElementById("heldData");
  board.innerHTML = ""
  
  newData.forEach((element, index) => {
    board.innerHTML +=
      "<tr><td>" + element.month + "</td><td>"
      + element.day + "</td><td>"
      + element.year + "</td><td>"
      + " was " + element.yearsPast + " years ago" + "</td><td>"
      + "<button type='button'>remove</button> </td></tr>"
  })
  
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
