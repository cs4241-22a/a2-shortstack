const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  {
    book_title: "Throne of Glass",
    author_name: "Sarah J. Maas",
    date_started: "09-01-20",
    date_comp: "09-04-20",
    time_took: "3 days",
  },
  {
    book_title: "Throne of Glass",
    author_name: "Sarah J. Maas",
    date_started: "09-01-20",
    date_comp: "09-04-20",
    time_took: "3 days",
  },
];

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
  } else if (request.url === "/public/js/scripts.js") {
    sendFile(response, "public/js/scripts.js");
  } else if (request.url === "/public/css/style.css") {
    sendFile(response, "public/css/style.css");
  } else if (request.url === "/submit") {
    //getting data from appdata
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
    console.log(JSON.parse(dataString));
    let jsonData = JSON.parse(dataString);
    console.log(jsonData + "1");
    // ... do something with the data here!!!
    if (request.url === "/submit") {
      console.log(jsonData); //debug
      appdata.push(jsonData); //pushing/adding data to appdata
    }
   
      
    let index = 0;
    let toBeRemoved = [];
    let needToDelete = false;
    // REMOVES BOOK FROM LIB
    appdata.forEach((entry) => {
      if (jsonData.book_title == entry.book_title && jsonData.author_name == entry.author_name) {
        needToDelete = true;
        toBeRemoved.push(index);
        console.log("toBeRemoved: ", toBeRemoved);
      } 
      
      else {
        index++;
      }
    })
    if (toBeRemoved) {
      toBeRemoved.forEach((entryToRemove) => {
        appdata.splice(entryToRemove, 1);
        console.log(jsonData.book_title + "BOOK");
        console.log(jsonData + "2");
      });
    }
    

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
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
