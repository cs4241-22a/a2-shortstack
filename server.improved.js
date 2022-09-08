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
    
    //make a new book submission to the library data
    newSubmission.bookID = bookCount
    bookCount++
    const newDate = new Date(newSubmission.acquiredDate)
    const bookID = newSubmission.bookID
    
    //Below is supposed to sort and update readOrder and appdata
    
    // newSubmission.readNextPos = bookID
    // appdata.push( newSubmission )
    readOrder.push(bookID)
    console.log( newSubmission )
    
    let lastEl = -1
      if(appdata.length > 0) {
        let newRY = newSubmission.readYet
        let newAD = newSubmission.acquiredDate
        for(let y = 0; y < appdata.length; y++) {
          let ROElem = readOrder[y]
          console.log("Read Order El: " + ROElem)
          let oldElement = appdata[ROElem]
          let oldElRY = oldElement.readYet
          let oldElAD = oldElement.acquiredDate
          if (oldElRY === "No") {
            if (newRY === "No") {
              if ((oldElAD - newAD) > 0) {
                let newEl = newSubmission.bookID
                for (let x = y; x < readOrder.length; x++) {
                  let oldEl = readOrder[x]
                  readOrder[x] = newEl
                  let temp = oldEl
                  oldEl = newEl
                  lastEl = temp
                }
              }
            }
          } 
          else {
            if (newRY === "No") {
              let newEl = newSubmission.bookID
              for (let x = y; x < readOrder.length; x++) {
                let oldEl = readOrder[x]
                readOrder[x] = newEl
                let temp = oldEl
                oldEl = newEl
                lastEl = temp
              }
            }
            else {
              if ((oldElAD - newAD) > 0) {
                let newEl = newSubmission.bookID
                for (let x = y; x < readOrder.length; x++) {
                  let oldEl = readOrder[x]
                  readOrder[x] = newEl
                  let temp = oldEl
                  oldEl = newEl
                  lastEl = temp
                }
              }
            }
          }
        }
      } 
    else {
      lastEl = bookID
    }
    let lastElIndex = readOrder.length - 1
    readOrder[lastElIndex] = lastEl
    console.log("Last El: " + lastEl)
    //readOrder.push(lastEl)
    console.log("ReadORDER[lastel]: " + readOrder[lastEl])
    //newSubmission.readNextPos = readOrder[lastEl]
    appdata.push( newSubmission )
    
    //puts the changed readNextPos into the appdata
    readOrder.forEach((element, index) => {
      let oldElement = appdata[element]
      oldElement.readNextPos = index
      oldElement.bookID = element
      appdata[element] = oldElement
    })
    
    
    //this is supposed to sort the books based on their readOrder
    //I know it's horrendous and I'm not proud of it, but I didn't have time to perfect it
    //It's also not fully correct and the updating of Book IDs goes poorly at some points
//     if (bookCount > 3) {
//       let min = 0
//       let index = 0
//       let temp = 0
//       for (let i = 0; i < readOrder.length; i++) {
//         for (let j=i+1; j < readOrder.length; j++) {
//           let element0 = appdata[i]
//           let element1 = appdata[j]
//           let smallest = 0
//           let largest = 1
      
//           if (element0.readYet === "No") {
//             if (element1.readYet === "No") {
//               if ( (element0.acquiredDate - element1.acquiredDate) < 0 ) {
//                 smallest = element0
//                 largest = element1
//               }
//               else {
//                 smallest = element1
//                 largest = element0
//               }  
//             }
//             else {
//               smallest = element0
//               largest = element1
//             }
//           } else if (element1.readYet === "No") {
//             smallest = element1
//             largest = element0
//           }
//           else {
//             if ((element0.acquiredDate - element1.acquiredDate) < 0) {
//               smallest = element0
//               largest = element1
//             }  
//             else {
//               smallest = element1
//               largest = element0
//             }
//           }
//           readOrder[i] = smallest.bookID
//           readOrder[j] = largest.bookID
//         }
//       }
//     }
//     else if (bookCount === 3) {
//       let smallest = 0
//       let middle = 1
//       let largest = 2
      
//       let element0 = appdata[0]
//       let element1 = appdata[1]
//       let element2 = appdata[2]
      
//       if (element0.readYet === "No") {
//         if (element1.readYet === "No") {
//           if (element2.readYet === "No") {
//             if ((element0.acquiredDate - element1.acquiredDate) < 0) {
//               if ((element0.acquiredDate - element2.acquiredDate) < 0) {
//                 smallest = element0
//                 if ((element1.acquiredDate - element2.acquired) < 0) {
//                   middle = element1
//                   largest = element2
//                 }
//                 else {
//                   middle = element2
//                   largest = element1
//                 }
//               }
//               else {
//                 smallest = element2
//                 middle = element0 
//                 largest = element1
//               }
//             } else if ((element1.acquiredDate - element2.acquiredDate) < 0) {
//               smallest = element1
//               if ((element2.acquiredDate - element0.acquiredDate) < 0) {
//                 middle = element2
//                 largest = element0
//               }
//               else {
//                 middle = element0
//                 largest = element2
//               }
//             }
//           }
//           largest = element2
//           if ((element0.acquiredDate - element1.acquiredDate) < 0) {
//             smallest = element0
//             middle = element1
//           }
//           else {
//             smallest = element1
//             middle = element0
//           }
//         } else if (element2.readYet === "No") {
//           largest = element1
//           if ((element0.acquiredDate - element2.acquiredDate) < 0) {
//             smallest = element0
//             middle = element2
//           }
//           else {
//             smallest = element2
//             middle = element0
//           }
//         } else {
//           smallest = element0
//           if ((element1.acquiredDate - element2.acquiredDate) < 0) {
//             middle = element1
//             largest = element2
//           }
//           else {
//             middle = element2
//             largest = element1
//           }
//         }
//       } 
//       else if (element1.readYet === "No") {
//         if (element2.readYet === "No") {
//           largest = element0
//           if ((element1.acquiredDate - element2.acquiredDate) < 0) {
//             smallest = element1
//             middle = element2
//           }
//           else {
//             smallest = element2
//             middle = element1
//           }
//         }
//         else {
//           smallest = element1
//           if ((element0.acquiredDate - element2.acquiredDate) < 0) {
//             middle = element0
//             largest = element2
//           }
//           else {
//             middle = element2
//             largest = element0
//           }
//         }
//       }
//       else if (element2.readYet === "No") {
//         smallest = element2
//         if ((element0.acquiredDate - element1.acquiredDate) < 0) {
//           middle = element0
//           largest = element2
//         }
//         else {
//           middle = element2
//           largest = element0
//         }
//       }
//       else {
//         if ((element0.acquiredDate - element1.acquired1) < 0) {
//           if ((element0.acquiredDate - element2.acquired) < 0) {
//             smallest = element0
//             if ((element1.acquiredDate - element2.acquiredDate) < 0) {
//               middle = element1
//               largest = element2
//             }
//             else {
//               middle = element2
//               largest = element1
//             }
//           }
//           else {
//             smallest = element2
//             middle = element0
//             largest = element1
//           }
//         }
//         else if ((element1.acquiredDate - element2.acquiredDate) < 0) {
//           smallest = element1
//           if ((element0.acquiredDate - element2.acquiredDate) < 0) {
//             middle = element0
//             largest = element2
//           }
//           else {
//             middle = element2
//             largest = element0
//           }
//         }
//         else {
//           smallest = element2
//           middle = element1
//           largest = element0
//         }
//       }
//       readOrder[0] = smallest.bookID
//       readOrder[1] = middle.bookID
//       readOrder[2] = largest.bookID
//     }
//     else if (bookCount === 2) {
//       let smallest = 0
//       let largest = 1
      
//       let element0 = appdata[0]
//       let element1 = appdata[1]
      
//       if (element0.readYet === "No") {
//         if (element1.readYet === "No") {
//           if ( (element0.acquiredDate - element1.acquiredDate) < 0 ) {
//             smallest = element0
//             largest = element1
//           }
//           else {
//             smallest = element1
//             largest = element0
//           }  
//         }
//         else {
//           smallest = element0
//           largest = element1
//         }
//       } else if (element1.readYet === "No") {
//         smallest = element1
//         largest = element0
//       }
//       else {
//         if ((element0.acquiredDate - element1.acquiredDate) < 0) {
//           smallest = element0
//           largest = element1
//         }
//         else {
//           smallest = element1
//           largest = element0
//         }
//       }
//       readOrder[0] = smallest.bookID
//       readOrder[1] = largest.bookID
//     } 
//     else if (bookCount === 1) {
//         let element0 = appdata[0]
//         readOrder[0] = element0.bookID
//     }
//     //I told you it was horrendous
    
//     //puts the changed readNextPos into the appdata
//     readOrder.forEach((element, index) => {
//       let oldElement = appdata[element]
//       oldElement.readNextPos = index
//       oldElement.bookID = element
//       appdata[element] = oldElement
//     })

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
    const deletedBookID = deleteRequest.bookID
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

server.listen( process.env.PORT || port )
