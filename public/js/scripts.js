const config = [
  "priority",
  "type",
  "title",
  "description",
  "creation_time",
  "deadline",
];

const submit = function (e) {
  /* Prevent default form action from being carried out */
  e.preventDefault();

  const data = new FormData(document.getElementById("input-form")),
    json = Object.fromEntries(data.entries()),
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => {
      const results = document.querySelector("#results");
      results.innerHTML = "";

      json.forEach((item) => {
        const row = document.createElement("tr");

        config.forEach((key) => {
          const p = document.createElement("td");
          p.innerHTML = item[key];
          row.appendChild(p);
        });

        results.appendChild(row);
      });
    });

  return false;
};

const show = function () {
  document.getElementById("modal-container").style.display = "flex";
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
