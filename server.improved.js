const http = require('http'),
      fs   = require('fs'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require('mime'),
      dir  = 'public/',
      port = 3000

const appdata = [
  {"title": "item 1"}
]

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
  else {
    sendFile(res, dir + req.url);
  }
}

const handlePost = function(req, res) {
  console.log("post");
  req.on("data", function(data) {
    appdata.push(JSON.parse(data));
  })

  req.on("end", function() {
    res.writeHeader(200, "OK", { "Content-Type": "application/json" });
    res.write(JSON.stringify({ currentlist: appdata }));
    res.end();
  })
}

const sendFile = function(res, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      res.writeHeader(200, { "Content-Type": type })
      res.end(content)
    }
    
    else {
      res.writeHeader(404)
      res.end("404 Error: File Not Found")
    }
  })
}

server.listen(process.env.PORT || port)
