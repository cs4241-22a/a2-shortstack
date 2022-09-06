// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const addToList = function (entry, ts) {
  // const list = document.getElementById("entryList")
  // const li = document.createElement("li")
  // li.appendChild(document.createTextNode(entry))
  // list.appendChild(li)
  
  const table = document.getElementById("entryTable")
  let row = table.insertRow(1)
  let col1 = row.insertCell(0)
  col1.appendChild(document.createTextNode(entry))
  let col2 = row.insertCell(1)
  col2.appendChild(document.createTextNode(ts))
}
