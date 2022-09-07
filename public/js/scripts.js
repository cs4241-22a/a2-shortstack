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
        display(json);
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

const display = function (json) {
  const results = document.querySelector("#results");
  results.innerHTML = "";

  json.forEach((item) => {
    const row = document.createElement("tr");

    config.forEach((key) => {
      const td = document.createElement("td");

      td.innerHTML =
        key == "creation_time" || key == "deadline"
          ? item[key].substr(0, 10)
          : item[key];

      row.appendChild(td);
    });

    const btnWrapper = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerHTML = "delete";
    btn.classList.add("btn");
    btn.addEventListener("click", function () {
      remove(item.primary);
    });

    btnWrapper.appendChild(btn);
    row.appendChild(btnWrapper);

    results.appendChild(row);
  });
};

const remove = function (id) {
  fetch("/delete", {
    method: "POST",
    body: id,
  })
    .then((response) => response.json())
    .then((json) => {
      display(json);
    });
};

window.onload = function () {
  const button = document.getElementsByClassName("btn submit")[0];
  button.onclick = submit;
};
