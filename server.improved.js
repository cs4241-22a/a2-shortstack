const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'game': 'League of Legends', 'char': 'Morgana', 'kills': '5', 'assists': '10', 'deaths': '3', 'kda': '5'},
  { 'game': 'CS:GO', 'char': 'Orange', 'kills': '2', 'assists': '1', 'deaths': '7', 'kda': '0.43'},
  { 'game': 'Valorant', 'char': 'Killjoy', 'kills': '4', 'assists': '3', 'deaths': '4', 'kda': '1.75'}]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){
    handleDelete( request, response ) 
  }else if( request.method === 'PATCH' ){
    handlePatch( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/list') {
    sendListData(response)
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let newStat = JSON.parse( dataString )

    newStat.kda = calcKDA(newStat.kills, newStat.assists, newStat.deaths)
    appdata[appdata.length] = newStat

    sendListData(response)
  })
}

const handleDelete = function(request, response) {
  appdata.splice(parseInt(request.url.substring(1)),1)

  sendListData(response)
}

const handlePatch = function(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on( 'end', function() {
    appdata[request.url.substring(1)].game = JSON.parse(dataString).game
    appdata[request.url.substring(1)].char = JSON.parse(dataString).char
    appdata[request.url.substring(1)].kills = JSON.parse(dataString).kills
    appdata[request.url.substring(1)].assists = JSON.parse(dataString).assists
    appdata[request.url.substring(1)].deaths = JSON.parse(dataString).deaths
    appdata[request.url.substring(1)].kda = calcKDA(JSON.parse(dataString).kills, JSON.parse(dataString).assists, JSON.parse(dataString).deaths)

    sendListData(response)
  })
}

const calcKDA = function (kills, assists, deaths) {
  return ((parseInt(kills) + parseInt(assists)) / parseInt(deaths)).toPrecision(4).toString()
}

const sendListData = function (response) {
  response.writeHeader(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(appdata))
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

server.listen(process.env.PORT || port)
