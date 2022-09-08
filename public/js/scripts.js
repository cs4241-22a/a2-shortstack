const submit = function (e) {
	// prevent default form action from being carried out
	e.preventDefault();
	let form = document.querySelector("form");
	if (checkFrmValid()) {
		let submission = getForm();
		form.reset();
		let body = JSON.stringify(submission);

		fetch("/submit", {
			method: "POST",
			body,
		})
			.then((response) => response.json())
			.then((json) => console.log(json));

		renderTable();
		document.querySelector("table").scrollIntoView();
	} else {
		alert(
			"All fields are required. Please fill out all fields before clicking submit."
		);
	}

	return false;
};

window.onload = function () {
	const button = document.querySelector("#submit");
	button.onclick = submit;
	renderTable();
};

//I'm sure this could be implemented in a much more elegant way but I don't have enough programming experience
function renderTable() {
	fetch("/birthdays", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((appdata) => {
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
				hRow.innerHTML = `<th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Days Until Next Birthday</th>
                    <th>Gift Idea</th>
                    <th style="background-color: black;"></th>
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
					let cell7 = row.insertCell(6);


					cell1.innerHTML = `${appdata[entries].firstName}`;
					cell2.innerHTML = `${appdata[entries].lastName}`;
					cell3.innerHTML = `${appdata[entries].birthday}`;
					cell4.innerHTML = `${appdata[entries].daysUntil}`;
					cell5.innerHTML = `${appdata[entries].giftIdea}`;

					let delBtn = cell6.appendChild(document.createElement("button"));
					let modBtn = cell7.appendChild(document.createElement("button"));

					delBtn.className = `${appdata[entries].submitTime}`;
					delBtn.innerHTML = "Delete";
					delBtn.onclick = function () {
						remove(delBtn.className);
					};

					modBtn.className = `${appdata[entries].submitTime}`;
					modBtn.innerHTML = "Modify";
					modBtn.onclick = function () {
						modify(modBtn.className);
					};
				}
			}
		});
}

function remove(UID) {
	let body = UID;
	fetch("/remove", {
		method: "POST",
		body,
	})
		.then((response) => response.json())
		.then((json) => console.log(json));

	renderTable();
}

function modify(UID) {
	let form = document.querySelector("form");
	if (checkFrmValid()) {
		let modification = getForm();
		form.reset();
		let oldUID = { oldUID: `${UID}` };
		let bodyObjects = [oldUID, modification];
		let body = JSON.stringify(bodyObjects);
		fetch("/modify", {
			method: "POST",
			body,
		})
			.then((response) => response.json())
			.then((json) => console.log(json));

		renderTable();
	} else {
		alert(
			"All fields are required. Please fill out all fields before clicking submit."
		);
	}
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

function getForm() {
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
	let table = document.querySelector("table");
	table.focus();
	json = convertToObj(formLabels, formInputs);
	return json;
}

function checkFrmValid() {
	let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"]; //Element IDs for each input field
	let valid = [];
	for (let index = 0; index < inputIDs.length; index++) {
		let ID = inputIDs[index];
		input = document.querySelector(ID);
		if (input.value === "") {
			valid.push(false);
		} else {
			valid.push(true);
		}
	}
	if (valid.every((value) => value === true)) {
		return true;
	} else {
		return false;
	}
}
