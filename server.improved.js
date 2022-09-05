const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []

const server = http.createServer( function( request,response ) {      //deals with handle GET or handle POST requests
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
  else if(request.url === '/getrequest'){
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify (appdata))//APP DATA
  }
  else if(request.url === '/getdelete'){
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify (appdata))//APP DATA
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
    if(request.url === '/submit'){
       //date submitted
       let date_submitted = JSON.parse(dataString).date
       //current date
       var date = new Date();
       var current_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()

      //  console.log("date NOW")
      //  console.log(current_date)
      //  console.log("DUE DATE")
      //  console.log(date_submitted)
      //  console.log("date stringified:")
       var date1 = new Date(JSON.stringify(current_date))
       var date2 = new Date(JSON.stringify(date_submitted))
       var Difference_In_Time = date2.getTime() - date1.getTime();
       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
       let newString = JSON.parse(dataString)
      //  console.log(newString)
      //  console.log(newString.time_until + "hi")
       newString.time_until = Difference_In_Days

       appdata.push(newString)
    }
    else if(request.url === '/delete'){
      //modify our appdata by removing the assignment
      //removeThis gets you the name of the assignment to remove
      let removeThis = JSON.parse(dataString).remove_assignment
      //remove the assignment by it's name here?
      appdata.forEach((item, index, arr) =>{
        if(item.assignment===removeThis){
          arr.splice(index,1);
        }
      })
    }
   
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify (appdata))//APP DATA
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