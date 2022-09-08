const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    let newItem = JSON.parse( dataString )
    if (newItem.action == "add") {
      if (newItem.item == "Eggs" || newItem.item == "eggs" || newItem.item == "Ice cream") {
        newItem.units = "Carton"
      } else if (newItem.item == "Chicken" || newItem.item == "Pork" || newItem.item == "Beef") {
        newItem.units = "Lb"
      } else if (newItem.item == "Peanut butter" || newItem.item == "Jam" || newItem.item == "Jelly") {
        newItem.units = "Jar"
      } else {
        newItem.units = "Ct"
      }
  
      if (newItem.qty != "1" && newItem.units != "Ct") {
        newItem.units += "s"
      }
  
      // brand is optional, so to make sure any brands still display on the correct line we add a nbsp
      if (newItem.brand == "") { newItem.brand = "&nbsp;"}
  
      console.log( newItem )
      appdata.push( newItem )
    } else if (newItem.action == "delete") {
      // for every thing in appdata, if it has the same item name then don't add to the new list
      // have to edit the array w/o actually replacing it... 
      const filterEntries = function( entry ) {
        if (entry.item == newItem.item) {
          entry.action = ""
          entry.item = ""
          entry.qty = ""
          entry.units = ""
          entry.brand = ""
        }
      }
      appdata.forEach(filterEntries);
      newItem.item = ""

    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write( JSON.stringify( appdata ))
    console.log( appdata )
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
