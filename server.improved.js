const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []

//important to note that the way this array works (or at least is supposed to work)
//is that the key's are equal to the ranking they are at, and their values are the bookID.
//So readOrder[0] is supposed to equal the book that should be read the soonest
//aka the book that was aquired the longest ago and hasn't been read yet
let readOrder = []

let bookCount = 0

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } else if ( request.method === 'DELETE' ){
    handleDelete( request, response )
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
  let dataString = ""
  
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    let newSubmission = JSON.parse( dataString )
    console.log("newSubmission.readYet: " + newSubmission.readYet)
    
    //make a new book submission to the library data
    newSubmission.bookID = bookCount
    bookCount++
    const bookID = newSubmission.bookID
    
    //Below is supposed to sort and update readOrder and appdata
    //It mostly works
    
    newSubmission.readNextPos = bookID
    appdata.push( newSubmission )
    readOrder.push(bookID)
    console.log( newSubmission )
    
    readOrder = sort(readOrder, appdata)
    
    //puts the changed readNextPos into the appdata
    readOrder.forEach((element, index) => {
      let oldElement = appdata[element]
      oldElement.readNextPos = index
      oldElement.bookID = element
      appdata[element] = oldElement
    })

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write( JSON.stringify( appdata ))
    console.log(appdata)
    response.end()
  })
}

const handleDelete = function ( request, response ) {
  let dataString = ""
  
  request.on( "data", function( data ) {
    dataString += data
  })
  
  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    let deleteRequest = JSON.parse( dataString )
    const deletedBookID = deleteRequest.bookID - 1
    deleteRequest.bookID = deletedBookID
    const readOrderIndex = deleteRequest.readNextPos
    if (!(bookCount == 0)) {
      bookCount--
    }
    
    let newAppData = []
    let newReadOrder = []
    
    //This is supposed to delete the element from appdata
    //The first forEach loop adds all the elements smaller than the ID to newAppData
    appdata.forEach((element, index) => {
      console.log(element)
      if (index < deletedBookID) {
        newAppData.push(element)
      } 
      //if the index is greater than the BookID being removed, the bookID is supposed
      //to be lowered by one
      else if (index > deletedBookID) {
        let intRep = parseInt(element.bookID)
        intRep--
        intRep.toString()
        console.log(intRep)
        element.bookID = intRep
        newAppData.push(element)
      }
    })
    
    //same thing as above but for readOrder
    readOrder.forEach((element, index) => { 
      if (element < deletedBookID) {
        newReadOrder.push(element)
      }
      else if (element > deletedBookID) {
        element--
        newReadOrder.push(element)
      }
    })
    
    //just some code to put the new arrays back into the old ones
    appdata = []
    readOrder = []
    
    newAppData.forEach((element, index) => {
      appdata.push(element)
    })
    
    newReadOrder.forEach((element, index) => {
      readOrder.push(element)
    })
    
    readOrder = sort(readOrder, appdata)
    
    //puts the changed readNextPos into the appdata
    readOrder.forEach((element, index) => {
      let oldElement = appdata[element]
      oldElement.readNextPos = index
      appdata[element] = oldElement
    })
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write( JSON.stringify( appdata ))
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

//sort function 
const sort = function(arr, arr2) {
  for(let i = 1; i < arr2.length; i++) {
    for(let j = i-1; j > -1; j--) {
      let jPlus = j+1
      let returned = compareElems(jPlus, j, arr2)
      console.log("Returned: " + returned + ", j+1: " + jPlus)
      if (returned === j+1) {
        [arr[j+1],arr[j]] = [arr[j],arr[j+1]]  
      }
    }
  }
  return arr
}

//helping sort function to compare whether ReadYet? is true and then calls compareDates
const compareElems = function( first, second, arr ) {
  let firstEl = arr[first]
  let firstRY = firstEl.readYet
  let firstAD = firstEl.acquiredDate
  let correctAD = firstAD
  
  let secondEl = arr[second]
  let secondRY = secondEl.readYet
  let secondAD = secondEl.acquiredDate
  
  if (firstRY === "No") {
    if (secondRY === "No") {
      console.log("Both No")
      correctAD = compareDates(firstAD, secondAD)
    }
    else if (secondRY === "Yes") {
      console.log("First No")
      return first
    }
  }
  else if (firstRY === "Yes") {
    if (secondRY === "No") {
      console.log("Second No")
      return second
    }
    else if (secondRY === "Yes") {
      console.log("Both Yes")
      correctAD = compareDates(firstAD, secondAD)
    }
  }
  console.log("CorrectAD: " + correctAD)
  if (correctAD === firstAD) {
    return first
  }
  else if (correctAD === secondAD) {
    return second
  }
}

//compares the Dates
const compareDates = function( first, second ) { //yyyy-mm-dd
  const firstYear = first.substring(0,4)
  const firstY = parseInt(firstYear)
  const firstMonth = first.substring(5,7)
  const firstM = parseInt(firstMonth)
  const firstDay = first.substring(8,10)
  const firstD = parseInt(firstDay)

  const secondYear = second.substring(0,4)
  const secondY = parseInt(secondYear)
  const secondMonth = second.substring(5,7)
  const secondM = parseInt(secondMonth)
  const secondDay = second.substring(8,10)
  const secondD = parseInt(secondDay)
  
  if (firstY < secondY) {
    console.log("FirstY: " + firstY)
    return first
  } 
  else if (secondY < firstY) {
    console.log("SecondY: " + secondY)
    return second  
  }
  else if (firstY === secondY) {
    if (firstM < secondM) {
      console.log("FirstM: " + firstM)
      return first
    }
    else if (secondM < firstM) {
      console.log("SecondM: " + secondM)
      return second
    }
    else if (firstM === secondM) {
      if (firstD < secondD) {
        console.log("FirstD: " + firstD)
        return first
      }
      else if (secondD < firstD) {
        console.log("SecondD: " + secondD)
        return second
      }
      else if (firstD === secondD) {
        console.log("FirstD: " + firstD + "by default")
        return first
      }
    }
  }
}

server.listen( process.env.PORT || port )
