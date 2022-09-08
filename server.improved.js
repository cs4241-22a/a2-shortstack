const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  
  {
    'task': 'Submit Webware A2', 'date_created': '2022-09-06T13:33', 'task_type': 'School', priority_lvl: 'Low'
  },
  
  {
    'task': 'Give boss work availability', 'date_created': '2022-09-01T11:16', 'task_type': 'Work', priority_lvl: 'Low'
  },
  
  {
    'task': "Schedule dentist appointment", 'date_created': '2022-09-03T11:45', 'task_type': 'Personal', priority_lvl: 'Low'
  }

]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/list'){
    sendData(response)
  } else{
    sendFile( response, filename )
  }
}

//handles adding a task
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', ( data ) => {
      dataString += data 
  })

  request.on( 'end', () => {
    let newTask = JSON.parse(dataString)
    newTask.priority_lvl = priority(newTask.date_created);
    appdata[appdata.length] = newTask
    sendData(response)

    
  })
}

const sendFile = function( response, filename ) {
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

const sendData = function (response){
  response.writeHeader( 200, { 'Content-Type': 'application/json' })
  response.end( JSON.stringify( appdata ) )
}

const priority = function ( date_created ){
  const today = Date.now();
  const elapsedTime = (today - date_created)/1000;
  
  const seconds = 86400;
  
  if(elapsedTime < seconds * 10) {
    return 'High'
  } else if (elapsedTime < seconds * 5) {
    return 'Medium'
  } else {
    return 'Low'
  }
}



server.listen( process.env.PORT || port )
