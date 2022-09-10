// EVERYTHING here is for reference ONLY. NO code here directly is used in the project

// // Add some Javascript code here, to run on the front end.
// // console.log("Welcome to assignment 2!")
// // alert("this script is running")
// // getElementbyID: gets element from our HTML based on it's ID
// let addToDoButton = document.getElementById("taskNewButton");
// let toDoList = document.getElementById("toDoList");
// let newTask = document.getElementById("newTask");
// console.log(" test")
// //addEventListener: waits for an event to occur 
// //when a click occurs, this function occurs
// addToDoButton.addEventListener('click', function(){ // NOT WORKING
    
//     var paragraph = document.createElement('p');
//     // put our newTask value into our newly made paragraph
//     paragraph.innerText = newTask.value;
//     // add this paragraph to our toDoList 
//     toDoList.appendChild(paragraph);
    

//     // this clears our newTask input field so that we can add a new task
//     // newTask.value = "";

//     // crosses out item if you click
//     paragraph.addEventListener('click',function(){
//         paragraph.style.textDecoration = "line-through";
//     })

//     // removes item if you double click
//     paragraph.addEventListener('dblclick',function(){
//         toDoList.removeChild(paragraph);
//     })
// })





// const plus = function(e){
//     e.preventDefault()

//     const input = document.querySelector( '#newTask' ) 
//     const field1 = document.querySelector( '#ToDoType')
//     const field2 = document.querySelector('#Difficulty')
//     const field3= document.querySelector("#Semester")
//     const Year = document.querySelector("#Year")

//     // table

//     const Test = document.querySelector("#test")
//     let TaskTable = document.createElement('table')
    
//         // TaskTable.innerText =  input.value + " " + field1.value + " " + field2.value + " " + field3.value + " " + Year.value + " " 
//         //TaskTable.innerHTML = `<h1> ${input.value} </h1>` + "new"
//         TaskTable.innerHTML = 
//         `<tr>
//         <td> ${input.value} </td>
//         <td> ${field1.value} </td>
//         <td> ${field2.value} </td>
//         <td> ${field3.value}</td>
//         <td> ${Year.value}</td>
//         <td> ${field2.value} / ${Year.value} </td>
//       </tr>`
//       // add a button in inner.HTML for delete?
        
//         Test.appendChild(TaskTable)   

//   }