const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//first line is hacky and should be done client-side, but it works.
const appdata = [ {'taskname' : 'Task name', 
'date' : 'Due date',
'timeleft' : 'Days left'}
]

const tasks = [
  
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
    // ... do something with the data here!!!

    dataJson = JSON.parse(dataString)

    //differentiate between add and remove
    if( request.url === '/add')
    {
      addData(dataJson)
    }
    else if
    ( request.url === '/remove')
    {
      removeData(dataJson)
    }
    else if
    ( request.url === '/getData')
    {
    }

    //console.log(dataJson)

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

const addData = function( toAdd )
{
  let index;
  if(toAdd.taskname !== 'Task name')
  {
    index = appdata.push(toAdd)
    calculateTimeLeft(index)
  }
  //console.log(appdata)
}

const removeData = function( toRemove )
{
  //iterate through the data to find what to remove
  let i=0
  while (i < appdata.length)
  {
    if((appdata[i].taskname === toRemove.taskname)
      && (appdata[i].date === toRemove.date)
      && (appdata[i].taskname !== 'Task name'))
    {
      appdata.splice(i, 1);
    }
    else
    {
      i++;
    }
  }
  //console.log(appdata)
}


//calculates the time left on a task and stores it in appdata
const calculateTimeLeft = function(index)
{
  let taskDate = Date.parse(appdata[index-1].date)
  let today = new Date()
  let time = ((taskDate - today) / 86400000).toPrecision(3)
  if(time <= 0)
  {
    time = 0
  }
  appdata[index-1].timeleft = time
}

server.listen( process.env.PORT || port )
