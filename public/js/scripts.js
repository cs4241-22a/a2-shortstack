// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const newsection = document.getElementById('entry-area');
const viewsection = document.getElementById('view-area');
const editsection = document.getElementById('edit-area');
const deletesection = document.getElementById('delete-area');

const submitnew = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const nameinput = document.querySelector('#name')
  const msginput = document.querySelector('#message')
  json = { name: nameinput.value, message: msginput.value, action: "new" }
  body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('newsub').disabled = true;
      document.getElementById("newsub").textContent = "success!"
      setTimeout(function () {
        document.getElementById("name").value = ""
        document.getElementById("message").value = ""
        document.getElementById("newsub").disabled = false;
        document.getElementById("newsub").textContent = "submit"
      }, 700);
    })

  return false
}

const submitdelete = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const mid = document.querySelector('#del-mid')
  json = { action: "delete", mid: mid.value }
  body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('delcan').disabled = true;
      document.getElementById("delsub").disabled = true;
      document.getElementById("delsub").textContent = "deleting..."
      setTimeout(function () {
        showMessages();
        document.getElementById('delcan').disabled = false;
        document.getElementById("delsub").disabled = false;
        document.getElementById("delsub").textContent = "delete"
      }, 700);
    })

  return false
}

const submitedit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const nameinput = document.querySelector('#edit-name')
  const msginput = document.querySelector('#edit-message')
  const mid = document.querySelector('#edit-mid')
  json = { name: nameinput.value, message: msginput.value, action: "edit", mid: mid.value }
  body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('editcan').disabled = true;
      document.getElementById("editsub").disabled = true;
      document.getElementById("editsub").textContent = "editing..."
      setTimeout(function () {
        showMessages();
        document.getElementById('editcan').disabled = false;
        document.getElementById("editsub").disabled = false;
        document.getElementById("editsub").textContent = "submit"
      }, 700);
    })

  return false
}

const formCancel = function (e) {
  e.preventDefault();
  showMessages();
  return false;
}

function editMsg(mid, name, msg) {
  console.log("edit " + mid)
  hideAllViews();
  document.getElementById("edit-mid").value = mid;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-message").value = msg;
  editsection.style.display = "block";
}

function deleteMsg(params) {
  console.log("delete " + params)
  hideAllViews();
  document.getElementById("del-mid").value = params;
  deletesection.style.display = "block";
}

function showNew() {
  hideAllViews();
  newsection.style.display = "block";
}
function showMessages() {
  hideAllViews();
  viewsection.style.display = "block";
}

function hideAllViews() {
  viewsection.style.display = "none";
  editsection.style.display = "none";
  newsection.style.display = "none";
  deletesection.style.display = "none";
}

function updateList(params) {
  //Update list view
  const msglist = document.getElementById('msglist');
  fetch('/getmsg', {
    method: 'GET'
  }).then(response => response.json())
    .then((json) => {
      //console.log(json)
      // do something with the reponse 
      msglist.innerHTML = ""
      let wordcounter = 0
      json.forEach(element => {
        wordcounter+=element.wordcount
        msglist.innerHTML += (element.name + " said: " + element.message + "   <a href=\"#\" onclick=\"editMsg(" + element.mid + ",'" + element.name + "','" + element.message + "')\">Edit</a> <a href=\"#\" onclick=\"deleteMsg(" + element.mid + ")\">Delete</a><br/>");
      });
      document.getElementById("wordcountsp").innerHTML = "There are total of "+wordcounter+" words in my guest book and counting!"
    })
}
function timeoutfetch(url, timeout = 300) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

window.onload = function () {
  //If javascript is enabled, hide warning message
  const warningh2 = document.getElementById('jswarning-h2');
  const warningp = document.getElementById('jswarning-p');
  warningh2.hidden = true;
  warningp.hidden = true;

  newsection.style.display = "block";

  const newbutton = document.getElementById('newsub');
  newbutton.onclick = submitnew

  const editbutton = document.getElementById('editsub');
  editbutton.onclick = submitedit

  const deletebutton = document.getElementById('delsub');
  deletebutton.onclick = submitdelete

  const delcanbutton = document.getElementById('delcan');
  delcanbutton.onclick = formCancel
  const editcanbutton = document.getElementById('editcan');
  editcanbutton.onclick = formCancel

  var intervalId = setInterval(function () {
    //console.log("Pinging server...")
    const servconn = document.getElementById('serv-conn');

    timeoutfetch('/getmsg', 300) // throw after max 5 seconds timeout error
      .then((result) => {
        servconn.textContent = "✓ Server Online"
        servconn.style.fontSize = 8;
        servconn.style.color = "#22CC55"
        updateList();
      })
      .catch((e) => {
        //console.error(e)
        servconn.textContent = "✘ Server Unreachable!"
        servconn.style.color = "#ff0000"
      })
  }, 600);
}
