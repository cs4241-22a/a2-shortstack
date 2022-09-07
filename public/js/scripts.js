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

  const form = document.getElementById("input-form");
  const data = new FormData(form),
    json = Object.fromEntries(data.entries()),
    body = JSON.stringify(json);

  if (Object.keys(json).length !== 5) {
    return;
  } else {
    toggleModal("hidden");

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
    form.reset();
  }

  return false;
};

const toggleModal = function (visibility) {
  document.getElementById("modal-container").style.visibility = visibility;

  if (visibility === "none") {
    const form = document.getElementById("input-form");
    form.reset();
  }
};

window.onload = function () {
  const button = document.getElementsByClassName("btn submit")[0];
  button.onclick = submit;
};
