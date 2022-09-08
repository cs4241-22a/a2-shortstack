const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  /*
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
  */
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
  //  console.log( JSON.parse( dataString ) )

     // ... do something with the data here!!!
    if(dataString.slice(0,4) === "EDIT")
    {
      let rowNum = parseInt(dataString.slice(4,5))
      dataString = dataString.slice(5)
      appdata[rowNum-1] = JSON.parse( dataString )
    } 
    else if(dataString.slice(0,6) === "DELETE")
    {
      let rowNum = parseInt(dataString.slice(6,7))
      appdata.splice(rowNum - 1, 1)
    } 
    else if (dataString === "GETDATA"){
    } 
    else 
    {
      appdata.push(JSON.parse( dataString ))
    }
    appdata.forEach( element => appointmentDate(element))

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify( appdata ))
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

const appointmentDate = function(data){
  let current = new Date()
          currentYear = current.getFullYear()
          currentMonth = current.getMonth() + 1
          currentDate = current.getDate()
          currentHour = current.getHours()
          currentMinute = current.getMinutes()
          visitYear = parseInt(data.appointment.slice(0, 4))
          visitMonth = parseInt(data.appointment.slice(5, 7))
          visitDay = parseInt(data.appointment.slice(8, 10))
          visitHour = parseInt(data.appointment.slice(11, 13))
          visitMinute = parseInt(data.appointment.slice(14, 16))

//find the difference between the current __ and present __
  let timeDifference = (((((visitYear - currentYear) * 12 +  visitMonth - currentMonth) * 30 + visitDay - currentDate) * 24 + visitHour - currentHour) * 60 + visitMinute - currentMinute)
  
  if(timeDifference < 0){
    data.visitTimeLeft = "Visit is over"
  } else {

      let minutesLeft = timeDifference % 60
      //rounds down and returns the largest integer less than or equal to a given number.
          hoursLeft = Math.floor(timeDifference / 60) % 24
          daysLeft = Math.floor(timeDifference / 60 / 24) % 30
          monthsLeft = Math.floor(timeDifference / 60 / 24 / 30) % 12
          yearsLeft =  Math.floor(timeDifference / 60 / 24 / 30 / 12)
          display = "Time Remaining: "

      display += yearsLeft > 0 ? yearsLeft + " years " : ""
      display += monthsLeft > 0 ? monthsLeft + " months " : ""
      display += daysLeft > 0 ? daysLeft + " days " : ""
      display += hoursLeft > 0 ? hoursLeft + " hours " : ""
      display += minutesLeft > 0 ? minutesLeft + " minutes" : ""

      
    data.visitTimeLeft = display
  }
  
}

server.listen( process.env.PORT || port )