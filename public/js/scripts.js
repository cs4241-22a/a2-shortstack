// Add some Javascript code here, to run on the front end.

console.log("SCR: Welcome to assignment 2!");

const submit = function (e) {
  e.preventDefault();

  const num = document.getElementById("num").value;

  document.getElementById("error").innerHTML = "";

  if (String(num).replace(".", "").length > 10) {
    document.getElementById("error").innerText = "Maximum # of digits is 10";
    return;
  }

  if (num == "") return;

  const json = {
    num: num,
  };

  const body = JSON.stringify(json);

  document.getElementById("num").value = "";

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    const checkPromise = () => {
      response.json().then((result) => {
        listNum(result);
      });
    };
    checkPromise();
  });
  return false;
};

const remove = function (index) {
  const json = {
    index: index,
  };

  const body = JSON.stringify(json);

  fetch("/remove", {
    method: "POST",
    body,
  }).then(function (response) {
    const checkPromise = () => {
      response.json().then((result) => {
        listNum(result);
      });
    };
    checkPromise();
  });
  return false;
};

const request = function () {
  fetch("/request", {
    method: "GET",
  }).then(function (response) {
    const checkPromise = () => {
      response.json().then((result) => {
        listNum(result);
      });
    };
    checkPromise();
  });
  return false;
};

window.onload = function () {
  const button = document.getElementById("submit");
  const numInput = document.getElementById("num");
  button.onclick = submit;
  numInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
  });

  request();
};

function listNum(response) {
  let numArr = response.data;
  let numTable = '<table class="num-table">';
  for (let i = 0; i < numArr.length; i++) {
    numTable +=
      "<tr><td onclick='remove(" + i + ")'>" + numArr[i] + "</td></tr>";
  }
  numTable += "</table>";
  document.getElementById("num-table").innerHTML = numTable;

  document.getElementById("count").innerText = response.stats.entries;
  document.getElementById("mean").innerText = response.stats.mean;
  document.getElementById("median").innerText = response.stats.median;
  document.getElementById("mode").innerText = response.stats.mode;
}
