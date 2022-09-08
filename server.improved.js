const http = require('http'),
      fs   = require('fs'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require('mime'),
      dir  = 'public/',
      port = 3000

const appdata = [];

const server = http.createServer(function(req, res) {
  if (req.method === "GET") {
    handleGet(req, res);
  }

  else if (req.method === "POST") {
    handlePost(req, res);
  }
})

const handleGet = function(req, res) {
  if (req.url === "/") {
    sendFile(res, dir + "/index.html");
  }
  
  else if (req.url === "/appdata") {
    res.writeHeader(200, "OK", { "Content-Type": "application/json" });
    res.end(JSON.stringify(appdata));
  }

  else {
    sendFile(res, dir + req.url);
  }
}

const handlePost = function(req, res) {
  let data_string = "";
  req.on("data", function(data) {
    data_string += data;
    data_string = generate_priority(data_string);
  })
  
  req.on("end", function() {
    if (req.url === "/submit") {
      appdata.push(data_string);
    }
    else if (req.url === "/delete") {
      let index = parseInt(data_string);
      appdata.splice(index, 1);
    }

    res.writeHeader(200, "OK", { "Content-Type": "application/json" });
    res.end(JSON.stringify(appdata));
  })
}

const sendFile = function(res, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      res.writeHeader(200, { "Content-Type": type });
      res.end(content);
    }
    
    else {
      res.writeHeader(404)
      res.end("404 Error: File Not Found")
    }
  })
}

/*
 * generates priority (num between 1-3, higher num = higher urgency) based on how many days it's been
 * since assignment and how close deadline is
 * if no deadline, priority = 1
 * if no assignment, calculate as if it was assigned week before deadline
 * 
 * absolutely gives wrong priority if assignment date > due date so don't do that please
 */
const generate_priority = function(data_string) {
  let todo_item = JSON.parse(data_string);
  let priority = "1";
  
  let assigned = todo_item.assigned_date;
  let due = todo_item.due_date;
  let date = new Date();
  if (due) { // if no due date, priority remains 1
    let due_date = new Date(due);
    let assigned_date = new Date(due);

    if (!assigned) {
      // if assigned not set, make it a week before deadline
      assigned_date.setDate(assigned_date.getDate() - 7); 
    }
    else {
      assigned_date = new Date(assigned);
    }

    const assigned_due_difference = calculate_days_between(assigned_date, due_date);
    const assigned_date_difference = calculate_days_between(assigned_date, date);

    const percent_progressed = assigned_date_difference / assigned_due_difference;
    if (percent_progressed > 0.33 && percent_progressed <= 0.66) { priority = "2"; }
    else if (percent_progressed > 0.66) { priority = "3" }
  }

  todo_item.priority = priority;
  return JSON.stringify(todo_item);
}

// date2 - date1 (in days)
const calculate_days_between = function(date1, date2) {
  return (new Date(date2).getTime() - new Date(date1).getTime()) / (1000 * 3600 * 24);
}

server.listen(process.env.PORT || port)
console.log("server up");