const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {Name: "", 
  Pronouns: "", 
  Age: "", 
  Email: "", 
  Phone: "", 
  Hometown: "",
  Education: "", 
  Job: "",
  Like: "",
  Primary: "",
  Secondary: ""},
];

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
    console.log( JSON.parse( dataString ) )
    let newEntry = JSON.parse( dataString );
    newEntry.Age = ageCalculator(newEntry.Birthday);
    newEntry.Hometown += "From " + newEntry.Hometown;
    newEntry.Job = "Works as a " + newEntry.Job;
    newEntry.Like += "Likes " + newEntry.Like;
    newEntry.Primary = primaryColorizer(newEntry.Primary);
    newEntry.Secondary = secondaryColorizer(newEntry.Secondary);
    if(request.url === "/preview") {
      appdata.splice(0, 1, newEntry);
    } else {
      let newEmail = true;
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].Email === newEntry.Email) {
          appdata.splice(i, 1, newEntry);
          newEmail = false;
          break;
        }
      }
      if (newEmail) {
        appdata.push(newEntry);
      }
    }
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write( JSON.stringify( appdata ) )
    console.log(appdata)
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

server.listen( process.env.PORT || port )

function ageCalculator(bday) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  let bdayDD = bday.substring(8,10);
  let bdayMM = bday.substring(5,7);
  let bdayYYYY = bday.substring(0,4);

  let age = yyyy - bdayYYYY;
  if(bdayMM > mm || (bdayMM == mm && bdayDD > dd)) {
    age--;
  }

  if(age < 0) {
    return "Born sometime in the future?";
  }

  age = age + " years old";

  return age;
}

function primaryColorizer(prim) {
  let color = "";
  if (prim.toLowerCase() === "red") {
    color = "#6E0C0C";
  } else if (prim.toLowerCase() === "orange") {
    color = "#6E300C";  //22
  } else if (prim.toLowerCase() === "yellow") {
    color = "#6E570C";  //46
  } else if (prim.toLowerCase() === "green") { 
    color = "#0C6E0C";  //120
  } else if (prim.toLowerCase() === "cyan") {
    color = "#0C6E6E";  //180
  } else if (prim.toLowerCase() === "blue") {
    color = "#0C376E";  //214
  } else if (prim.toLowerCase() === "purple") {
    color = "#330C6E";  //264
  } else if (prim.toLowerCase() === "black") {
    color = "#000000";
  } else {
    color = "#2B2B2B";
  }
  return color;
}

function secondaryColorizer(sec) {
  let color = "";
  if (prim.toLowerCase() === "red") {
    color = "#E0BFBF";
  } else if (prim.toLowerCase() === "orange") {
    color = "#E0CBBF";
  } else if (prim.toLowerCase() === "yellow") {
    color = "#E0D9BF";
  } else if (prim.toLowerCase() === "green") { 
    color = "#BFE0BF";
  } else if (prim.toLowerCase() === "cyan") {
    color = "#BFE0E0";
  } else if (prim.toLowerCase() === "blue") {
    color = "#BFCDE0";
  } else if (prim.toLowerCase() === "purple") {
    color = "#CCBFE0";
  } else if (prim.toLowerCase() === "white") {
    color = "#FFFFFF";
  } else {
    color = "#CCCCCC";
  }
  return color;
}
