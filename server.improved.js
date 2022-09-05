const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000
const crc32 = require("crc32")
let appdata = [
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  switch (request.url) {
    case "/":
      sendFile( response, 'public/index.html' )
      break;
    case "/getmsg":
      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end(JSON.stringify(appdata))
    default:
      sendFile( response, filename )
      break;
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if (request.url == "/submit") {
      console.log( JSON.parse( dataString ) )
      console.log("New submission recieved!");
      let dataobj = JSON.parse( dataString );
      switch (dataobj.action) {
        case "new":
          const tempdata = {}
          console.log("Submission type: Add")
          tempdata.name = dataobj.name;
          tempdata.message = dataobj.message;
          //Additional field: a date value
          tempdata.date = formatDate();
          //Derived field: a message id is derived from the content of the message and the sender's name.
          //It also uses date and a random number.
          tempdata.mid = parseInt(crc32(dataobj.name+dataobj.message+formatDate()+(Math.random()*1000)),16);
          appdata.push(tempdata);
          break;
        case "edit":
          console.log("Submission type: Modify")
          appdata = appdata.map(obj => {
            if (obj.mid == dataobj.mid) {
              return {...obj, name: dataobj.name,message:dataobj.message};
            }
            return obj;
          });
          break;
        case "delete":
          console.log("Submission type: Delete")
          appdata = appdata.filter(function( obj ) {
            return obj.mid != dataobj.mid;
          });
          break;
        default:
          console.warn("unknown action")
          break;
      }
    }

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

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('');
}

server.listen( process.env.PORT || port )
