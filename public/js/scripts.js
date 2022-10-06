// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  let countryName = document.getElementById("countryName").value,
    cityName = document.getElementById("cityName").value,
    date = document.getElementById("date").value,
    daysSpent = document.getElementById("timeSpent").value;
    
  let json = {
      country_name: countryName,
      city_name: cityName,
      date: date,
      time_spent: daysSpent + ' days',
    };

  let body = JSON.stringify(json);
  const jsonParsed = JSON.parse(body);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    response.text().then(function (json) {
      console.log("Body: ", body);
      let table = document.getElementById("travelList"),
        newRow = table.insertRow(-1),
        newCountry = newRow.insertCell(0),
        newCity = newRow.insertCell(1),
        newDate = newRow.insertCell(2),
        newDaysSpent = newRow.insertCell(3);

      newCountry.innerHTML = jsonParsed.country_name;
      newCity.innerHTML = jsonParsed.city_name;
      newDate.innerHTML = jsonParsed.date;
      newDaysSpent.innerHTML = jsonParsed.time_spent;
      console.log("table:", table);

      console.log(json);
    });
  });

  return false;
};

const removeEntry = function (e) {
  e.preventDefault();

  const book = document.querySelector("booknameToDelete");
  const author = document.querySelector("authornameToDelete"),
    json = { book_title: book.value, author_name: author.value },
    body = JSON.stringify(json);

  fetch("/removeEntry", {
    method: "POST",
    body,
  }).then((response) => response.json());

  return false;
};

const updateList = function (e) {
  e.preventDefault();

  let travelList = document.getElementById("travelList");
  let body = JSON.stringify(travelList);
  console.log(body);

  fetch("/updateList", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let travelList = 
      travelList.innerHTML =
        "<thead><tr><th>Country</th><th>City</th><th>Date Arrived</th><th>Days Spent</th><th>Time Spent </th></tr></thead>";

      json.forEach((entry) => {
        travelList.innerHTML =
          travelList.innerHTML +
          `<tr><td>${entry.countryName}</td><td>${entry.cityName}</td><td>${entry.date}</td><td>${entry.daysSpent}</td></tr>`;
      });
    });
};

window.onload = function () {
  const add = document.getElementById("submit");
  add.onclick = submit;
};
