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

        for (const key in item) {
          const p = document.createElement("th");
          p.innerHTML = item[key];
          p.setAttribute("class", "");
          row.appendChild(p);
        }
        results.appendChild(row);
      });
    });

  return false;
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
