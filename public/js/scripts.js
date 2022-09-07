let count = 0;
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const activity = document.querySelector("#activity");
    const date = document.querySelector("#date");
    const time_started = document.querySelector("#time_started");
    const time_ended = document.querySelector("#time_ended");
    const description = document.querySelector("#description");

    // const duration = time_ended.value - time_started.value;
    // duration: duration
    const json = {
            activity: activity.value,
            date: date.value,
            time_started: time_started.value,
            time_ended: time_ended.value,
            description: description.value

        },
        body = JSON.stringify(json)

    fetch("/submit", {
        method: "POST",
        body,
    })
        .then (response => response.json())
        .then (json => {
            console.log(json);
            json.forEach( item => {

                let table =  document.getElementById("table");

                table.innerHTML += "<tr id = " + count + ">"
                    + "<td>" + item.activity + "</td>"
                    + "<td>" + item.date + "</td>"
                    + "<td>" + item.time_started + "</td>"
                    + "<td>" + item.time_ended + "</td>"
                    + "<td>" + item.description + "</td>"
                    // + "<td>" + time_duration(time_started, time_ended) + "</td>" //(time_duration("2:15", "03: 18"))
                    // + "<td> <button id = 'delete' onclick = 'delete_row( " + count.toString() + ")'>Delete</button> </td>"
                    + "</tr>"
            }
            )
            count++;
        })


        // .then(async function (response) {
        //     let json = await response.json()
        //     json.forEach(item => {
        //         const newLog = JSON.parse(item)
        //
        //         const activity = newLog.activity;
        //         const date = newLog.date;
        //         const time_started = newLog.time_started;
        //         const time_ended = newLog.time_ended;
        //         const description = newLog.description;
        //
        //
        //         // Function to take in two string and subtract time
        //
        //         let table =  document.getElementById("table");
        //
        //         table.innerHTML += "<tr id = " + count + ">"
        //             + "<td>" + activity + "</td>"
        //             + "<td>" + date + "</td>"
        //             + "<td>" + time_started + "</td>"
        //             + "<td>" + time_ended + "</td>"
        //             + "<td>" + description + "</td>"
        //             + "<td>" + time_duration(time_started, time_ended) + "</td>" //(time_duration("2:15", "03: 18"))
        //             + "<td> <button id = 'delete' onclick = 'delete_row( " + count.toString() + ")'>Delete</button> </td>"
        //             + "</tr>"
        //         }
        //         )//" + count + "
        //         count++;
        //     })
        // })

            return false;
        }

    window.onload = function () {
        const button = document.querySelector("button");
        button.onclick = submit;
    };

function time_duration(start, end) {

    let start_hour = parseInt(start.split(":")[0]);
    let start_min = parseInt(start.split(":")[1]);

    let end_hour = parseInt(end.split(":")[0]);
    let end_min = parseInt(end.split(":")[1]);

    let dur_hour;
    let dur_min;

    if (end_hour > start_hour) {

        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = end_hour - start_hour;
        } else {
            dur_hour = end_hour - start_hour - 1;
            dur_min = (end_min + 60) - start_min;
        }
    }
    if (end_hour == start_hour) {

        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = 0;
        } else {
            dur_hour = 23;
            dur_min = (end_min + 60) - start_min;
        }
    } else {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = (end_hour + 24) - start_hour;
        } else {
            dur_hour = (end_hour + 24) - start_hour - 1;
            dur_min = (end_min + 60) - start_min;
        }
    }
    return ((dur_hour.toString() + " Hours  " + dur_min.toString() + " Minutes")).toString();

}


// function delete_row(id) {
//     document.getElementById(id).remove();
// };

