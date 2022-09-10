const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'classname': 'Calculus 1', 'classnumber': 1999, 'classlevel': 1 },
  { 'classname': 'Databases 1', 'classnumber': 2004, 'classlevel': 2 },
  { 'classname': 'Intro to Art History', 'classnumber': 1987, 'classlevel': 1} 
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
    //console.log( JSON.parse( dataString ) )
    dataString = JSON.parse( dataString )

    // ... do something with the data here!!!
    const classname = dataString.classname
    const classnumber = dataString.classnumber
    const classlevel = parseInt(dataString.classnumber/1000)
    
    // if classnumber already exists, change name
    let doesExist = false
    for (const elt of appdata) {
      if (elt.classnumber == classnumber) { 
        elt.classname = classname
        doesExist = true
      }
    }
    // else, appdata.push
    if (!doesExist) {
      appdata.push({ 'classname': classname, 'classnumber': classnumber, 'classlevel': classlevel})
    }
    //appdata.push({ 'classname': classname, 'classnumber': classnumber, 'classlevel': classlevel})
    
    // testing
    //console.log(appdata)
    
    //console.log(classlevel + " " + classnumber + " " + classname)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    
    response.end( JSON.stringify(appdata))
    /*
    response.end( JSON.stringify({ classlevel: classlevel,
                                  classname: classname, 
                                  classnumber: classnumber })) // sends back this?
    */
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
