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
        body = JSON.stringify(json)

    fetch("/submit", {
        method: "POST",
        body,
    })
        .then (response => response.json())
        .then (json => {
            console.log(json);
            let count = 0;
            let table =  document.getElementById("table");
            table.innerHTML = "<table id='table'>"
                + "<tr>"
                + "<th>Activity Done</th>"
                + "<th>Date</th>"
                + "<th>Time Started</th>"
                + "<th>Time Ended</th>"
                + "<th>Description</th>"
                + "<th>Duration</th>"
                + "<th>Delete?</th>"
                + "</tr>"
                + "</table>"
            json.forEach( item => {

                table.innerHTML += "<tr id = " + count + ">"
                    + "<td>" + item.activity + "</td>"
                    + "<td>" + item.date + "</td>"
                    + "<td>" + item.time_started + "</td>"
                    + "<td>" + item.time_ended + "</td>"
                    + "<td>" + item.description + "</td>"
                    + "<td>" + item.duration + "</td>" //(time_duration("2:15", "03: 18"))
                    + "<td> <button id = 'delete' onclick = 'delete_row( " + count.toString() + ")'>Delete</button> </td>"
                    + "</tr>"
                count++;
            }

            )

        })

            return false;
        }

    window.onload = function () {
        const button = document.querySelector("button");
        button.onclick = submit;
    };




function delete_row(id) {
    document.getElementById(id).remove();
    let table = document.getElementById("table");

    for (let rows in table.rows){

    }
    const row = (JSON.parse(JSON.stringify(document.getElementById(id))));
    const json = {
        activity: row.activity,
        date: row.date,
        time_started: row.time_started,
        time_ended: row.time_ended,
        description: row.description,
        duration: row.duration
    }
    fetch("/delete", {
        method: "POST",
        json
    })

};



