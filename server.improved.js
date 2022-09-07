

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []

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
  }else if(request.url = '/style.css'){
    sendFile( response, 'public/css/style.css' )
  }else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {

  
  
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( typeof  dataString  )
    
    
  if(request.url === "/submit"){
    add(dataString)
  } else if (request.url == "/delete"){
    remove(dataString)
  }


    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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
let i = 0;

const add = function (dataString){
  const obj = JSON.parse(dataString)
    const time = (Math.round((obj.dist/obj.avr) * 100) / 100).toString(10) + " hours"
    
    
    obj.ind = i
    i++
    obj.derive = time
    dataString = JSON.stringify(obj)
    appdata.push(JSON.parse(dataString))
}



const remove = function (dataString){
  console.log(Number(dataString))
  
  let obj = appdata.find(o => o.ind === Number(dataString));
  console.log(obj)
  //const obj = JSON.parse(dataString)
    //const time = (Math.round((obj.dist/obj.avr) * 100) / 100).toString(10) + " hours"
    appdata = appdata.filter(data => data.ind != Number(dataString));

    
    //obj.derive = time
    //dataString = JSON.stringify(obj)
    //appdata.push(JSON.parse(dataString))
}
