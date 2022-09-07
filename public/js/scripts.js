const submit = function (e) {
      // prevent default form action from being carried out
      e.preventDefault();

  const activity = document.querySelector("#activity");
  const date = document.querySelector("#date");
  const time_started = document.querySelector("#time_started");
  const time_ended = document.querySelector("#time_ended");
  const description = document.querySelector("#description");
  // const duration = time_ended.value - time_started.value;
  const json = {
          activity: activity.value,
          date: date.value,
          time_started: time_started.value,
          time_ended: time_ended.value,
          description: description.value
      // duration: duration
        },
        body = JSON.stringify(json);

      fetch("/submit", {
        method: "POST",
        body,
      })
      .then (response => console.log(response.json()))
      .then (function ( response ){
          table(response)
    })
      // .then ( json => function (){
      //     console.log(body);
      //     for (const i in json){
      //      let table = document.getElementById("table");
      //      let row = document.createElement("tr");
      //      let col = document.createElement("td");
      //
      //      for (const n in i){
      //          let data = document.createTextNode(n);
      //          col.appendChild(data);
      //          row.appendChild(col);
      //      }
      //      table.appendChild(row);
      //     }
      // })

      return false;
    };

    window.onload = function () {
      const button = document.querySelector("button");
      button.onclick = submit;
    };

function table(JSON) {
    for (const i in JSON){
        console.log(i);
    }
}