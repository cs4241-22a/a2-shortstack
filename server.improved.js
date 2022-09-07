const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'listItem': 'Laundry', 'dueDate': 0907, 'priority': 'low', 'urgent': 0 },
  { 'listItem': 'Clean', 'dueDate': 0907, 'priority': 'medium', 'urgent': 0 },
  { 'listItem': 'Webware assignment', 'dueDate': 0908, 'priority': 'high', 'urgent': 0 } 
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
     /*const html = 
     `<html>
         <body>
             <form action="">
                <input type="text" id="yourname" value="your name here">
                <button>submit</button>
             </form>
             <ul id = "list">
                debugger
                <!--ol>${appdata.map(item => JSON.stringify(item))[0]}</ol-->
                <ol>${JSON.stringify(appdata[0])}</ol>
                <ol>${JSON.stringify(appdata[1])}</ol>
                <ol>${JSON.stringify(appdata[2])}</ol>
             </ul>
         </body>
     <html>`*/
    
    //response.end(html)
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      //no data ?
      console.log(data)
      dataString += data 
  })

  request.on( 'end', function() {
    
    //problem here
    console.log("datastring")
    console.log( JSON.parse( dataString ) )
    let newItem = JSON.parse( dataString )
    if(!newItem.listItem || !newItem.dueDate || !newItem.priority){
        //newItem.feedback = "Field cannot be empty"
    }
    else if(newItem.del === true){
        remove(appdata)
    }
    else{
        //console.log("is greater than 0")
        appdata.push(newItem)
        if(getMin(appdata) === parseInt(newItem.dueDate) && newItem.priority === "high"){
            newItem.urgent = 1
        }
    }

    console.log( newItem )
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(appdata))
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

const getMin = function(array){
    date = 1000;
    for(let i = 0; i < array.length; i++){
        curDate = parseInt(array[i].dueDate)
        if(curDate < date){
            date = curDate
        }
    }
    console.log("minDate:")
    console.log(date)
    return date
}

const remove = function(array){
    const index = 0
    if(index > -1){
        array.splice(index, 1)
    }
    console.log(array)
}

server.listen( process.env.PORT || port )
