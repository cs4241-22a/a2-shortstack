// Add some Javascript code here, to run on the front end.
const submit = function (e) {
let d1 = document.getElementById("data1").value;
let d2 = document.getElementById("data2").value;
let d3 = document.getElementById("data3").value;
 let json = {
      data: d1,
      data2: d2,
      data3: d3,
      init:"",
      
    }
 let body = JSON.stringify(json)
    fetch( '/submit', {
      method:'POST',
      body
    })
   .then( async function ( response ) {
      let tData = await response.json()
       makeTable(tData)
      console.log( tData )
    })
  return false
}
  function makeTable(tData){
    const table = document.getElementById("table")
   table.innerHTML = "<form>"
  table.innerHTML = "<form><tr><th>first</th><th>middle</th><th>last</th><th>initials</th>"
    
    tData.forEach((element, i)=>{
      table.innerHTML +=
        
                  "<tr id=entry "+ i + "><td> " + element.data + "</td><td>"
          + element.data2 + "</td><td>"
          + element.data3 + "</td><td>"
          + element.init + "</td><td>"
          + "<button onclick=deleteRow(" + i + ")>Delete</button></td></tr>"
     
      
    })
    table.innerHTML+= "</form>"
    return false
  }
  function deleteRow( ind) {
 
    console.log(ind)
  let json = {
    index: ind
  }
  let body = JSON.stringify(json)
  fetch( '/delete', {
      method:'POST',
      body
    })
    .then( async function ( response ) {
      let dData = await response.json()
      makeTable(dData)
      console.log( dData )
    })
  

}


 window.onload = function () {
      const button = document.getElementById("submitButton");
      button.onclick = submit
    };
console.log("Welcome to assignment 2!")



