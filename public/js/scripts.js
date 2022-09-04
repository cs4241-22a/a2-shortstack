const submitbuy = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("buy button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    console.log(response);
  });

  return false;
};

const submitsell = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("sell button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    console.log(response);
  });

  return false;
};

window.onload = function () {
  const buybutton = document.querySelector("#buybutton");
  buybutton.onclick = submitbuy;
  const sellbutton = document.querySelector("#sellbutton");
  sellbutton.onclick = submitsell;
};
