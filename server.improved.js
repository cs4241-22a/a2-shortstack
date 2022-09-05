const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

//Function to calculate the number of days until next birthday
function daysUntilCalc(string) {
  let currentDay = new Date();
  let birthArray = string.split("-");
  let birthday = new Date(birthArray[0], birthArray[1]-1, birthArray[2]); //Month is subtracted by 1 since JS counts months 0-11
  //Set current year or the next year if you already had birthday this year
  birthday.setFullYear(currentDay.getFullYear());
  if (currentDay > birthday) {
  birthday.setFullYear(currentDay.getFullYear() + 1);
  }
  //Calculate difference between days
  let daysUntil = Math.floor((birthday - currentDay) / (1000*60*60*24))
  return daysUntil
};

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  
  }
  else if (request.url === '/birthdays') {
    response.writeHeader(200, {'Content-Type': 'text/plain'})
    response.end(JSON.stringify(appdata))
  }
  else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) );

    //Convert data string back to object to add calculated field
    var submission = JSON.parse(dataString);

    //Calculated field 
    var calcField = {
      daysUntil: `${daysUntilCalc(submission.birthday)}`
    }

    var newEntry = Object.assign(submission, calcField);

    appdata.push(newEntry);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(JSON.stringify(appdata));
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

server.listen( process.env.PORT || port )
