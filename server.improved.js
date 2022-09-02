const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      port = 3000

const appdata = []
// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationDate": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = request.url.slice( 1 ) 
  console.log("GET REQUEST FOR: " + filename);
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/tasks' ){
    sendTasks(response)
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const incomingData = JSON.parse(dataString);
    console.log(incomingData.dueDate);
    // TODO: need to convert dueDate to epoch time
    var dataRow = incomingData;
    dataRow.taskCreationDate = Date.now();
    //dataRow.taskUrgency = getTaskUrgency(dataRow.dueDate, dataRow.taskCreationDate);
    // need some sort of check before adding it
    appdata.push(incomingData);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}


const sendTasks = function(response) {
  response.writeHeader( 200, { 'Content-Type': 'application/json' })
  response.end( JSON.stringify(appdata) )
}

const sendFile = function(response, filename) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
