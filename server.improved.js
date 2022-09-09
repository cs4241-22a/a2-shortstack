const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = {
  headers: ["Math","English","Science","History"],
  events: [
    {
      title: "Event",
      description: "An event",
      date: Date.parse('08 Sept 2022 00:00:00 EST'),
      subject: "Math",
      color: "#FFAAAA"
    },
    {
      title: "Event2 ",
      description: "An event... 2!",
      date: Date.parse('10 Sept 2022 00:00:00 EST'),
      subject: "English",
      color: "#AAFFAA"
    }
  ]
};

const server = http.createServer( function( request,response ) {
  console.log(request.url);
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if( request.url === '/getdata' ) {
    response.end(JSON.stringify(appdata));
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    processPostData(JSON.parse(dataString));
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
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

function processPostData(data){
  //Compute field based on another field's value
  data.color = getColor(data.subject);
  console.log(data);
  appdata.events.push(data);
};

function getColor(sub){
  switch(sub){
    case "Math":
      return "#FFAAAA"
    case "English":
      return "#AAFFAA"
    case "Science":
      return "#AAAAFF"
    case "History":
      return "#FFFFAA"
    default:
      return "#FFFFFF";
  }
}