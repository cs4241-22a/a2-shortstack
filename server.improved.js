const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
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
    simplePokemon = JSON.parse(dataString)
    pokemon = addTypeChart(simplePokemon)

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

const weaknesses = {
  'normal': ['fighting'],
  'fighting': ['flying', 'psychic', 'fairy'],
  'flying': ['rock', 'electric', 'ice'],
  'poison': ['ground', 'psychic'],
  'ground': ['water', 'grass', 'ice'],
  'rock': ['fighting', 'ground', 'steel', 'water', 'grass'],
  'bug': ['flying', 'rock', 'fire'],
  'ghost': ['ghost', 'dark'],
  'steel': ['fighting', 'ground', 'fire'],
  'fire': ['ground', 'rock', 'water'],
  'water': ['grass', 'electric'],
  'grass': ['flying', 'poison', 'bug', 'fire', 'ice'],
  'electric': ['ground'],
  'psychic': ['bug', 'ghost', 'dark'],
  'ice': ['fighting', 'rock', 'steel', 'fire'],
  'dragon': ['ice', 'dragon', 'fairy'],
  'dark': ['fighting', 'bug', 'fairy'],
  'fairy': ['poison', 'steel'],
  'none': []
}

const resistances = {
  'normal': [],
  'fighting': ['rock', 'bug', 'dark'],
  'flying': ['fighting', 'bug', 'grass'],
  'poison': ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  'ground': ['poison', 'rock'],
  'rock': ['normal', 'flying', 'poison', 'fire'],
  'bug': ['fighting', 'ground', 'grass'],
  'ghost': ['poison', 'bug'],
  'steel': ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
  'fire': ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
  'water': ['steel', 'fire', 'water', 'ice'],
  'grass': ['ground', 'water', 'grass', 'electric'],
  'electric': ['flying', 'steel', 'electric'],
  'psychic': ['fighting', 'psychic'],
  'ice': ['ice'],
  'dragon': ['fire', 'water', 'grass', 'electric'],
  'dark': ['ghost', 'dark'],
  'fairy': ['fighting', 'bug', 'dark'],
  'none': []
}

const immunities = {
  'normal': ['ghost'],
  'fighting': [],
  'flying': ['ground'],
  'poison': [],
  'ground': ['electric'],
  'rock': [],
  'bug': [],
  'ghost': ['normal', 'fighting'],
  'steel': ['poison'],
  'fire': [],
  'water': [],
  'grass': [],
  'electric': [],
  'psychic': [],
  'ice': [],
  'dragon': [],
  'dark': ['psychic'],
  'fairy': ['dragon'],
  'none': []
}

const addTypeChart = function( pokemon ) {
  const type1 = pokemon.type1,
    type2 = pokemon.type2

  const weaknesses1 = weaknesses[type1],
    weaknesses2 = weaknesses[type2],
    resistances1 = resistances[type1],
    resistances2 = resistances[type2],
    immunities1 = immunities[type1],
    immunities2 = immunities[type2]

  console.log(weaknesses1)
  console.log(weaknesses2)
  console.log(resistances1)
  console.log(resistances2)
  console.log(immunities1)  
  console.log(immunities2)

  
  const finalImmunities = [],
    finalWeaknesses = [],
    finalResistances = []

  immunities1.forEach(element => {
    finalImmunities.push(element)
  });

  immunities2.forEach(element => {
    if(!finalImmunities.includes(element)) {
      finalImmunities.push(element)
    }
  })

  console.log(finalImmunities)
}

server.listen( process.env.PORT || port )
