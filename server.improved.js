const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let times = []
let addedNumbers = []
let total = 0
let allData = ["Total: " + total, addedNumbers, times]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if(request.method === 'DELETE'){
    handleRemove(request, response)
  }
})

const handleRemove = function(request, response){
  let dataString = ''
  
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    let json = JSON.parse(dataString) //json = {numToAdd: '5'}
    console.log(json.numToRemove)
    
    if(!isNaN(json.numToRemove)){
      let indexToRemove = Number(json.numToRemove)
      if(addedNumbers.length >= indexToRemove){
        let numToRemove = addedNumbers[indexToRemove]
        total -= numToRemove
        if(indexToRemove > -1){
          addedNumbers.splice(indexToRemove,1)
          times.splice(indexToRemove,1)
        }
      }
      allData = ["Total: " + total, addedNumbers, times]
    }else{
      console.log("Incorrect Format: Index not submitted")
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(allData))
  })
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  let url = "." + request.url
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile(response, url)
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    let json = JSON.parse(dataString) //json = {numToAdd: '5'}
    console.log(json.numToAdd)
    
    if(!isNaN(json.numToAdd)){
      total += Number(json.numToAdd)
      let now = new Date()
      times.push(now.toLocaleTimeString('en-US'))
      console.log(now.toLocaleTimeString('en-US'))
      allData = ["Total: " + total, addedNumbers, times]
      addedNumbers.push(Number(json.numToAdd))
    }else{
      console.log("Incorrect Format: Number not submitted")
    }
    
    console.log(addedNumbers)
    console.log(total)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(allData))
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
