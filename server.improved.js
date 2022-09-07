const http = require("http"),
	fs = require("fs"),
	// IMPORTANT: you must run `npm install` in the directory for this assignment
	// to install the mime library used in the following line of code
	mime = require("mime"),
	dir = "public/",
	port = 3000;

let appdata = [];

const server = http.createServer(function (request, response) {
	if (request.method === "GET") {
		handleGet(request, response);
	} else if (request.method === "POST") {
		handlePost(request, response);
	}
});

const handleGet = function (request, response) {
	const filename = dir + request.url.slice(1);

	if (request.url === "/") {
		sendFile(response, "public/index.html");
	} else if (request.url === "/birthdays") {
		updateDaysUntil(appdata);
		response.writeHeader(200, { "Content-Type": "text/plain" });
		response.end(JSON.stringify(appdata));
	} else {
		sendFile(response, filename);
	}
};

const handlePost = function (request, response) {
	let dataString = "";

	request.on("data", function (data) {
		dataString += data;
	});
	request.on("end", function () {
		if (request.url === "/submit") {
			let submission = JSON.parse(dataString);
			let newEntry = calcField(submission);
			appdata.push(newEntry);
			response.writeHead(200, "OK", { "Content-Type": "text/plain" });
			response.end(JSON.stringify(appdata));
		} else if (request.url === "/remove") {
			let UID = dataString;
			let index = appdata.findIndex((element) => {
				if (element.submitTime === UID) {
					return true;
				}
			});
			appdata.splice(index, 1);
			response.writeHead(200, "OK", { "Content-Type": "text/plain" });
			response.end(JSON.stringify(appdata));
		} else if (request.url === "/modify") {
			let modEntry = JSON.parse(dataString);
			//Get index of entry to be modified
			let oldUID = modEntry[0];
			let index = appdata.findIndex((element) => {
				if (element.submitTime === oldUID.oldUID) {
					return true;
				}
			});
			//Create new entry to replace deleted one
			let submission = modEntry[1];
			let newEntry = calcField(submission);
			appdata.splice(index, 1, newEntry);
			response.writeHead(200, "OK", { "Content-Type": "text/plain" });
			response.end(JSON.stringify(appdata));
		}
	});
};

const sendFile = function (response, filename) {
	const type = mime.getType(filename);

	fs.readFile(filename, function (err, content) {
		// if the error = null, then we've loaded the file successfully
		if (err === null) {
			// status code: https://httpstatuses.com
			response.writeHeader(200, { "Content-Type": type });
			response.end(content);
		} else {
			// file not found, error code 404
			response.writeHeader(404);
			response.end("404 Error: File Not Found");
		}
	});
};

server.listen(process.env.PORT || port);

//Function to calculate the number of days until next birthday
function daysUntilCalc(string) {
	let currentDay = new Date();
	let birthArray = string.split("-");
	let birthday = new Date(birthArray[0], birthArray[1] - 1, birthArray[2]); //Month is subtracted by 1 since JS counts months 0-11
	//Set current year or the next year if you already had birthday this year
	birthday.setFullYear(currentDay.getFullYear());
	if (currentDay > birthday) {
		birthday.setFullYear(currentDay.getFullYear() + 1);
	}
	//Calculate difference between days
	let daysUntil = Math.floor((birthday - currentDay) / (1000 * 60 * 60 * 24));
	return daysUntil;
}

//Function to take raw submission and convert it into newEntry (with calculated field) to be pushed into appdata
function calcField(submission) {
	let calcField = {
		daysUntil: `${daysUntilCalc(submission.birthday)}`,
		submitTime: `${Date.now()}`,
	};
	let newEntry = Object.assign(submission, calcField);
	return newEntry;
}

//Ensure the days until birthday number is accuarate on any day, not just day of submission
//Runs in GET request from renderTable function on client side (request.url === "/birthdays")
function updateDaysUntil(appdata) {
	for (let entries in appdata) {
		let today = new Date(Date.now());
		let subDate = new Date(Date.parse(appdata[entries].submitTime));

		if (isSameDay(today, subDate)) {
			continue;
		} else {
			appdata[entries].daysUntil = daysUntilCalc(appdata[entries].birthday);
		}
	}
}

//Check if two dates have mathing year, month, and day of the month
function isSameDay(date1, date2) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}
