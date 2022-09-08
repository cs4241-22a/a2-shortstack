// Add some Javascript code here, to run on the front end.

let task 
let date 
let priority 
function main(){
task = document.getElementById('to_do')
date = document.querySelector('#date')
priority = document.querySelector('#priority')
const add = document.querySelector('#add')
    add.onclick = buttonClick
}
function buttonClick(){
    isEmpty()
    submit()
    task.value = ""
    date.value = ""
    priority.value = "High"
}
function isEmpty(){
    if (task.value === "" || date.value === ""){
        alert("Please fill out all fields") 
        return false
    }
    return true
}


  const submit = function( e ) {
    // prevent default form action from being carried out
    // e.preventDefault()
    let appdata = []
    let task2=[{Date:date.value}]
    let task1= [{Task:task.value}]
    let task3=[{Priority:priority.value}]
    const json = task1,
          body= JSON.stringify( json )
    
     const json1 = task2,
          body1= JSON.stringify( json1 )
     
     const json2 = task3,
        body2= JSON.stringify( json2 )
        


    fetch( '/', {
      method:'POST',
      body,
      body1,
      body2
      })
   
   
    
    
     .then( response => response.json())
     .then( json => {
     let t = body.split(":")[1].replace(/[^a-zA-Z0-9 ]/g,'')
     let d = body1.split(":")[1].replace(/[^a-zA-Z0-9- ]/g,'')
     let p = body2.split(":")[1].replace(/[^a-zA-Z0-9]/g,'')
     appdata +=[{Task:t,Date:d,Priority:p}]
      	let results = document.getElementById("results");
 				//results.innerHTML = " ";
        let heading_row = document.createElement("tr");
        results.appendChild(heading_row)
        // heading_row.innerHTML+= '<th>Tasks</th>' 
        // heading_row.innerHTML+='<th>Date</th>'
        // heading_row.innerHTML+='<th>Priority</th>'
      
   
      let input = document.createElement("tr");
					results.appendChild(input);
        
          let task1 = input.insertCell(0)
          task1.innerHTML=t
          //task1.innerHTML = body.split(":")[1].replace(/[^a-zA-Z0-9 ]/g,'')
      
          let task2 = input.insertCell(1)
          task2.innerHTML=d
          //task2.innerHTML = body1.split(":")[1].replace(/[^a-zA-Z0-9- ]/g,'')
      
          let task3 = input.insertCell(2)
          task3.innerHTML=p
          //task3.innerHTML = body2.split(":")[1].replace(/[^a-zA-Z0-9]/g,''
					
      
      console.log(JSON.toString().appdata)
      
      
    })

    return false
  }

 function populate_table(){
   
 }


