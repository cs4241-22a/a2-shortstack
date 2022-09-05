const submit = function (e) {
	// prevent default form action from being carried out
	e.preventDefault();

	let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"]; //Element IDs for each input field
	let formLabels = [];
	let formInputs = [];

	for (let index = 0; index < inputIDs.length; index++) {
		let ID = inputIDs[index];
		let input = document.querySelector(ID);
		let fieldName = ID.slice(1); //JSON object key
		formLabels.push(fieldName);
		formInputs.push(input.value);
	}
	function convertToObj(a, b) {
		if (a.length != b.length || a.length == 0 || b.length == 0) {
			return null;
		}
		let obj = {};
		json = a.forEach((k, i) => {
			obj[k] = b[i];
		});
		return obj;
	}

	json = convertToObj(formLabels, formInputs);
	body = JSON.stringify(json);

	fetch("/submit", {
		method: "POST",
		body,
	})
		.then((response) => response.json())
		.then((json) => console.log(json));

	renderTable();

	return false;
};

window.onload = function () {
	const button = document.querySelector("button");
	button.onclick = submit;
	renderTable();
};

function renderTable() {
	fetch("/birthdays", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((appdata) => {
			console.log(JSON.stringify(appdata));
			//Do not render table if no birthdays have been added to the server yet, otherwise render the results table content
			if (JSON.stringify(appdata) === "[]") {
				console.log("No data to display :(");
				let resultsTable = document.querySelector("table.results");
				resultsTable.innerHTML = " ";
				let message = document.createElement("p");
				message.innerHTML =
					"There are no saved birthdays. Add a new birthday using the form above!";
				document.querySelector("main").appendChild(message);
			} else {
				//Remove no birthdays message if it exists
				if (document.querySelector("p") != null) {
					let message = document.querySelector("p");
					document.querySelector("main").removeChild(message);
				}
				let resultsTable = document.querySelector("table.results");
				resultsTable.innerHTML = " ";
				let hRow = document.createElement("tr");
				hRow.className = "results";
				resultsTable.appendChild(hRow);
				hRow.innerHTML =
					`<th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Days Until Next Birthday</th>
                    <th>Gift Idea</th>
                    <th style="background-color: black;"></th>`;

				for (let entries in appdata) {
					let row = document.createElement("tr");
					row.className = "results";
					resultsTable.appendChild(row);
					let cell1 = row.insertCell(0);
					let cell2 = row.insertCell(1);
					let cell3 = row.insertCell(2);
					let cell4 = row.insertCell(3);
					let cell5 = row.insertCell(4);
					let cell6 = row.insertCell(5);
					let btn = cell6.appendChild(document.createElement("button"));

					cell1.innerHTML = `${appdata[entries].firstName}`;
					cell2.innerHTML = `${appdata[entries].lastName}`;
					cell3.innerHTML = `${appdata[entries].birthday}`;
					cell4.innerHTML = `${appdata[entries].daysUntil}`;
					cell5.innerHTML = `${appdata[entries].giftIdea}`;
					btn.className = `${appdata[entries].submitTime}`;
					btn.innerHTML = "Delete";
					btn.onclick = function () {
						remove(btn.className);
					};
				}
			}
		});
}

function remove(UID) {
	console.log(UID);
	let body = UID;
	fetch("/remove", {
		method: "POST",
		body,
	})
		.then((response) => response.json())
		.then((json) => console.log(json));

	renderTable();
}
