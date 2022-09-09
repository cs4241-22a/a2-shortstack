const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const starters = [
  { 'pokémon': 'bulbasaur', 'type': "Grass",},
  { 'pokémon': 'squirtle', 'type': "Water"},
  { 'pokémon': 'charmander', 'type': "Fire"},
  { 'pokémon': 'pikachu', 'type': "Electric"},
  { 'pokémon': 'chikorita', 'type': "Grass",},
  { 'pokémon': 'totodile', 'type': "Water"},
  { 'pokémon': 'cyndaquil', 'type': "Fire"},
  { 'pokémon': 'treeko', 'type': "Grass",},
  { 'pokémon': 'mudkip', 'type': "Water"},
  { 'pokémon': 'torchic', 'type': "Fire"},
  { 'pokémon': 'turtwig', 'type': "Grass",},
  { 'pokémon': 'piplup', 'type': "Water"},
  { 'pokémon': 'chimchar', 'type': "Fire"},
  { 'pokémon': 'snivy', 'type': "Grass",},
  { 'pokémon': 'oshawott', 'type': "Water"},
  { 'pokémon': 'tepig', 'type': "Fire"},
  { 'pokémon': 'chespin', 'type': "Grass",},
  { 'pokémon': 'froakie', 'type': "Water"},
  { 'pokémon': 'fennekin', 'type': "Fire"},
  { 'pokémon': 'rowlet', 'type': "Grass",},
  { 'pokémon': 'popplio', 'type': "Water"},
  { 'pokémon': 'litten', 'type': "Fire"},
  { 'pokémon': 'grookey', 'type': "Grass",},
  { 'pokémon': 'sobble', 'type': "Water"},
  { 'pokémon': 'scorbunny', 'type': "Fire"}
]

const appdata = [
  
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
    let data = JSON.parse( dataString )
    
    switch ( data.type.toLowerCase()){
      case "normal":
        data.str = "None"
        data.wk  = "Fighting"
        break
      case "fire":
        data.str = "Grass, Ice, Bug, Steel"
        data.wk  = "Water, Ground, Rock"
        break
        case "water":
        data.str = "Fire, Ground, Rock"
        data.wk  = "Electric, Grass"
        break
      case "electric":
        data.str = "Water, Flying"
        data.wk  = "Ground"
        break
      case "grass":
        data.str = "Water, Ground, Rock"
        data.wk  = "Fire, Ice, Poison, Flying, Bug"
        break
      case "ice":
        data.str = "Grass, Ground, Flying, Dragon"
        data.wk  = "Fire, Fighting, Rock, Steel"
        break
      case "fighting":
        data.str = "Normal, Ice, Rock, Dark, Steel"
        data.wk  = "Flying, Psychic, Fairy"
        break
      case "poison":
        data.str = "Grass, Fairy"
        data.wk  = "Ground, Psychic"
        break
      case "ground":
        data.str = "Fire, Electric, Poison, Rock, Steel"
        data.wk  = "Water, Grass, Ice"
        break
      case "flying":
        data.str = "Grass, Fighting, Bug"
        data.wk  = "Electric, Ice, Rock"
        break
      case "psychic":
        data.str = "Fighting, Poison"
        data.wk  = "Bug, Ghost, Dark"
        break
      case "bug":
        data.str = "Grass, Psychic, Dark"
        data.wk  = "Fire, Flying, Rock"
        break
      case "rock":
        data.str = "Fire, Ice, Flying, Bug"
        data.wk  = "Water, Grass, Fighting, Ground, Steel"
        break
      case "ghost":
        data.str = "Psychic, Ghost"
        data.wk  = "Ghost, Dark"
        break
      case "dragon":
        data.str = "Dragon"
        data.wk  = "Ice, Dragon, Fairy"
        break
      case "dark":
        data.str = "Psychic, Ghost"
        data.wk  = "Fighting, Bug, Fairy"
        break
      case "steel":
        data.str = "Ice, Rock, Fairy"
        data.wk  = "Fire, Fighting, Ground"
        break
      case "fairy":
        data.str = "Fighting, Dragon, Dark"
        data.wk  = "Poison, Steel"
        break
      default:
        data.type = "???"
        data.str  = "???"
        data.wk   = "???"
        break
    }

    appdata.push(JSON.stringify( data ))
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify( data ) )
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
