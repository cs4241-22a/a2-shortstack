// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

// getElementbyID: gets element from our HTML based on it's ID
let addToDoButton = document.getElementById("taskNewButton");
let toDoList = document.getElementById("toDoList");
let newTask = document.getElementById("newTask");

//addEventListener: waits for an event to occur 
//when a click occurs, this function occurs
addToDoButton.addEventListener('click', function(){
    
    var paragraph = document.createElement('p');
    // put our newTask value into our newly made paragraph
    paragraph.innerText = newTask.value;
    // add this paragraph to our toDoList 
    toDoList.appendChild(paragraph);
    

    // this clears our newTask input field so that we can add a new task
    newTask.value = "";

    // crosses out item if you click
    paragraph.addEventListener('click',function(){
        paragraph.style.textDecoration = "line-through";
    })

    // removes item if you double click
    paragraph.addEventListener('dblclick',function(){
        toDoList.removeChild(paragraph);
    })
})

