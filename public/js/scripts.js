// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

function calculateDate (date1, date2) {
  console.log(date1);
  date1 = new Date(date1);
  date2 = new Date(date2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + " days";
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");
}


function clearEntry() {
  document.getElementById("bookname").value = "";
  document.getElementById("authorname").value = "";
  document.getElementById("dateStarted").value = "";
  document.getElementById("dateCompleted").value = "";
  document.getElementById("booknameToDelete").value = "";
  document.getElementById("authornameToDelete").value = "";
}



const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

  let bookTitle = document.getElementById("bookname").value,
    authorName = document.getElementById("authorname").value,
    dateStart = document.getElementById("dateStarted").value,
    dateComp = document.getElementById("dateCompleted").value;
    
  let timeTook = calculateDate(dateStart, dateComp),
      
  json = { 
    book_title: bookTitle, 
    author_name: authorName, 
    date_started: dateStart, 
    date_comp: dateComp, 
    time_took: timeTook
  };

  let body = JSON.stringify(json);
  const jsonParsed = JSON.parse(body);

    fetch("/submit", {
      method: "POST",
      body,
    }).then(function (response) {
      response.text().then(function (json) {
        console.log("Body: ", body);
        let table = document.getElementById("lib"),
          newRow = table.insertRow(-1),
          newBook = newRow.insertCell(0),
          newAuthor = newRow.insertCell(1),
          newDateStart = newRow.insertCell(2),
          newDateComp = newRow.insertCell(3),
          newTimeTook = newRow.insertCell(4);

          newBook.innerHTML = jsonParsed.book_title;
          newAuthor.innerHTML = jsonParsed.author_name;
          newDateStart.innerHTML = jsonParsed.date_started;
          newDateComp.innerHTML = jsonParsed.date_comp;
          newTimeTook.innerHTML = jsonParsed.time_took;
        console.log("table:",table);
            
        console.log(json);
      });
    });
  
  return false;
  
  };

const removeEntry = function ( e ) {
  e.preventDefault()

  const book = document.querySelector( 'booknameToDelete' )
  const author = document.querySelector('authornameToDelete'),
        json = { book_title: book.value, author_name: author.value},
        body = JSON.stringify( json )
  
  fetch('/removeEntry', {
    method:'POST',
    body
  })
  .then( response => response.json())
  
  return false
}



const updateList = function(e) {
  e.preventDefault()
  
  let libList = document.getElementById("lib");
  let body = JSON.stringify(libList);
  console.log(body);
  
  fetch("/updateList", {
    method: 'POST',
    body
  })
  .then( response => response.json())
  .then( json => {
    console.log( json )
    let libList = document.getElementById("lib");
    libList.innerHTML = "<thead><tr><th>Book</th><th>Author</th><th>Date Started</th><th>Date Completed</th><th>Time Spent Reading</th><th>Remove?</th><tr></thead>";
    
    json.forEach( thing => {
      libList.innerHTML = libList.innerHTML + `<tr><td>${thing.bookTitle}</td><td>${thing.authorName}</td><td>${thing.dateStart}</td><td>${thing.dateComp}</td><td>${thing.timeTook}</td></tr>`
    })
  })
}



  
window.onload = function () {
  
  
  const add = document.getElementById("submit");
  add.onclick = submit;
  
  const remove = document.getElementById("remove");
  remove.onclick = removeEntry;
  
  

};

