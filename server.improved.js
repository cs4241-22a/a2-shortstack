const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const appdata = [
  { 'title': 'Halloween',
    'genre': 'horror',
    'year': 1978
  },
  { 'title': 'Final Destination 2',
    'genre': 'horror',
    'year': 2003
  },
  { 'title': 'A Nightmare On Elm Street 3: Dream Warriors',
    'genre': 'horror',
    'year': 1987
  },
  { 'title': 'Alvin and the Chipmunks: The Road Chip',
    'genre': 'family',
    'year': 2015
  },
  { 'title': 'Fast Five',
    'genre': 'action',
    'year': 2011
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response )
{
  const filename = dir + request.url.slice( 1 );
  if ( request.url === '/' ) { sendFile( response, 'public/index.html' ); }
  else { sendFile( response, filename ); }
};

const handlePost = function( request, response )
{
  let dataString = '';
  request.on( 'data', function( data ) { dataString += data; });
  request.on( 'end', function()
  {
    console.log( JSON.parse( dataString ) );
    movie = JSON.parse( dataString );
    let toddCheck = checkIfToddPhillips( movie.title, movie.year );
    movie.toddPhillips = toddCheck;
    // ... do something with the data here!!!
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end();
  });
};

const checkIfToddPhillips = function( title, year )
{
  const years = [ 2000, 2003, 2004, 2006, 2009, 2010, 2011, 2013, 2016, 2019 ];
  const titles = [ 'road trip', 'old school', 'starsky & hutch',
                   'school for scoundrels', 'the hangover',
                   'due date', 'the hangover part ii',
                   'the hangover part iii', 'war dogs', 'joker' ];
  const numFilms = 10;
  let i;
  for (i = 0 ;  i < numFilms ; i++ ) { if( year = years[i] && title.toLowerCase().equals(titles[i]) ) { return true; } }
  return false;
;}

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
