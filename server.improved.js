const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'eventname': 'Lunch', 'location': 'Subway', 'day': "mtwrfsu", 'time': 12, 'timeend': 14, 'duration': 2, 'color': "#FFA500", 'deatils': "yummy"}//,
  //{ 'eventname': '', 'location': '', 'day': , 'time': 2004, 'timeend': 30, 'duration': , 'deatils': },
  //{ 'eventname': '', 'location': '', 'day': , 'time': 1987, 'timeend': 14, 'duration': , 'deatils': } 
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
  }
  else if( request.url === '/style.css' ) {
    sendFile( response, 'public/css/style.css' )
  }else if( request.url === '/scripts.js' ) {
    sendFile( response, 'public/js/scripts.js' )
  }else if( request.url === '/getsch' ) {
    sendData( response, appdata )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
	//console.log(request +  response  )
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
	  
	//no data for clr request
	if( request.url === '/clr' )
		appdata = []
	else{
		  
		const data = ( JSON.parse( dataString ) )
		// ... do something with the data here!!!

		if( request.url === '/new' )
			appdata.push(data)
		if( request.url === '/del' )
		{
			//console.log(data)
			let appdata2=[]
			for(let i = 0; i < appdata.length; i++){
				let datastring = data.name.toLowerCase().trim()
				let appastring = Object.values(appdata[i])[0].trim().toLowerCase()
				//console.log("datastring" + "/" + appastring)
				if(datastring !== appastring){
					appdata2.push(appdata[i])
					//console.log("delete")
				}
			}
			appdata = appdata2
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

const sendData = function (response, data){
	response.end(JSON.stringify(data))
}

server.listen( process.env.PORT || port )
