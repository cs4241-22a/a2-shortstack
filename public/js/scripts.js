const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  let title = document.querySelector("#title")
  let author = document.querySelector("#author")
  let acquiredDate = document.querySelector("#acquiredDate")
  let readYet = document.querySelector("#readYet")
  let readYetString = ""
  
  if ((readYet.value === "Yes") || (readYet.value === "yes")) {
    readYetString = "Yes"
  } else if ((readYet.value === "No") || (readYet.value === "no")) {
    readYetString = "No"
  }

  let json = {
    "bookID": "",
    "title": title.value,
    "author": author.value,
    "acquiredDate": acquiredDate.value,
    "readYet": readYetString,
    "readNextPos": ""
  }
  let body = JSON.stringify(json)
  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( async function( response ) {
    let library = await response.json()
    refreshLibrary(library)
    console.log( library )
  })
  return false
}

function refreshLibrary(library) {
  const bookshelf = document.getElementById("currentData")
  bookshelf.innerHTML = "<tr class=\"bookEntry\"><th class=\"bookEntry\">Book ID</th><th class=\"bookEntry\">Title</th><th class=\"bookEntry\">Author</th><th class=\"bookEntry\">Acquired Date</th><th class=\"bookEntry\">Read Yet?</th><th class=\"bookEntry\">Read Next Number</th></tr>"

  library.forEach((element, index) => {
    bookshelf.innerHTML +=
      "<tr class=\"bookEntry\"><td class=\"bookEntry\">" 
      + element.bookID + "</td><td class=\"bookEntry\">"
      + element.title +"</td><td class=\"bookEntry\">"
      + element.author + "</td><td class=\"bookEntry\">"
      + element.acquiredDate + "</td><td class=\"bookEntry\">"
      + element.readYet + "</td><td class=\"bookEntry\">"
      + element.readNextPos + "</td></tr>\n"
  })
}

const deleteButton = function( e ) {
  e.preventDefault()
  
  let bookID = document.querySelector("#deleteBookID")

  let json = {
    "bookID": bookID.value
  }

  let body = JSON.stringify(json)
  fetch( '/deleteButton', {
    method:'DELETE',
    body 
  })
  .then( async function( response ) {
    let library = await response.json()
    refreshLibrary(library)
    console.log( library )
  })
  return false
}

window.onload = function() {
  const button = document.getElementById( "submitButton" )
  button.onclick = submit
  const deleteB = document.getElementById( "deleteButton" )
  deleteB.onclick = deleteButton
}
