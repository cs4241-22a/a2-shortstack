const submit = function (e) {
      // prevent default form action from being carried out
      e.preventDefault();

  const activity = document.querySelector("#activity");
  const date = document.querySelector("#date");
  const time_started = document.querySelector("#time_started");
  const time_ended = document.querySelector("#time_ended");
  const description = document.querySelector("#description");
  const json = {
          activity: activity.value,
          date: date.value,
          time_started: time_started.value,
          time_ended: time_ended.value,
          description: description.value,
        },
        body = JSON.stringify(json);

      fetch("/submit", {
        method: "POST",
        body,
      })
      .then (response => response.json()) 
      .then ( json => console.log( json ))

      return false;
    };

    window.onload = function () {
      const button = document.querySelector("button");
      button.onclick = submit;
    };