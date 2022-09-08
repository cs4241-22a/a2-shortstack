const submit = function (e){
    //prevents default form action
    e.preventDefault();

    // instantiate constants based on values from the HTML file
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const activity = document.getElementById("activity").value;

    if (age.trim() === "" || weight.trim() === "" || height.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    } else {

        //defining constants in json with same names
        const userjsonData = {
            gender: gender,
            age: age,
            weight: weight,
            height: height,
            activity: activity,
        };
        let body = JSON.stringify(userjsonData)

        //using request reference "submit" to post user data to server and also retrieve updates and page refresh
        fetch("/submit", {
            method: "POST",
            body,
        }).then(function (response){
            resetForm();
            refresh()
            }
        );

        return true;
    }
};

//function resets the user form after user has filled in the first set of information
function resetForm(){
    document.getElementById("age").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
}
// Function processes deletion of a specified row with a popup confirmation window
// HTML has a built-in deleteRow function which in theory works in cooperation with a server but due to limited
// time availability I decided to make a separate JS function instead.
function deleteInput(indexNum){
    let deleteBtn = confirm("Please confirm the deletion of this input.");
    if(deleteBtn){
        const jsonMsg = {
            delResponse:indexNum,
        };
        //sending deletion confirmation to server
        let body = JSON.stringify(jsonMsg);
        fetch("/delete", {
            method: "POST",
            body,
        }).then(function(){
            refresh();
        });
    }
}

//function refreshes data in server table for display on the webpage
function refresh(){
    let table = document.getElementById("previoussubms");
    // This innerHTMl was so difficult to get right. I had to go through about 6 different stackoverflow answers before
    // I found the right syntax to embed HTML in JS.
    table.innerHTML = "<tr><th>Gender</th><th>Age</th><th>Weight</th><th>Height</th><th>Activity</th><th>Total Daily Energy Expenditure</th><th>Delete Person</th></tr>";
    fetch("/fetchData", {
        method: "GET",
    })
        .then((response) => response.json())
        .then(function (json) {

            let i = 0;
            // for the number of entries in json appdata
            for (let response of json) {
                response.responseNum = i;
                let row = table.insertRow(-1);
                let gender = row.insertCell(0);
                let age = row.insertCell(1);
                let weight = row.insertCell(2);
                let height = row.insertCell(3);
                let activity = row.insertCell(4);
                let tdee = row.insertCell(5);
                let dlt = row.insertCell(6);

                row.cells[0].innerHTML = response.gender;
                row.cells[1].innerHTML = response.age;
                row.cells[2].innerHTML = response.weight;
                row.cells[3].innerHTML = response.height;
                row.cells[4].innerHTML = response.activity;
                row.cells[5].innerHTML = response.tdee;
                row.cells[6].innerHTML = `<button class='deleteBtn' onclick=deleteInput(${i})>Delete</button>`;
                i++;

            }
        });
}
//window onload function that finds CSS selector button and refreshes upon button click
window.onload = function() {
    const button = document.querySelector("button");
    button.onclick = submit;
    refresh();
};
