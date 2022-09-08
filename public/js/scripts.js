console.log("Welcome to assignment 2!");
  var priorityLevel =""
const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const nameInput = document.getElementById("yourname").value,
    dateInput = document.getElementById("currDate").value,
    duedateInput = document.getElementById("dueDate").value,
    subjectInput = document.getElementById( 'subjectList' ).value,
    assignmentInput = document.getElementById("assignment").value;
  
  updatePriority(duedateInput, dateInput);
  
      
  let json = {
      yourname: nameInput,
      currDate: dateInput,
      dueDate: duedateInput,
      subjectList: subjectInput,
      assignment: assignmentInput,
      priority: priorityLevel
    },
    body = JSON.stringify(json);
  console.log(body);

  
  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    response.text().then(function(){
    console.log("Body: ", body);
    const table = document.getElementById("dataTable");

    let row = table.insertRow(-1);

    let name = row.insertCell(0);
    let date = row.insertCell(1);
    let subject = row.insertCell(2);
    let assignment = row.insertCell(3);
    let duedate = row.insertCell(4);
    let priority = row.insertCell(5);

    name.innerHTML = json.yourname;
    date.innerHTML = json.currDate;
    subject.innerHTML = json.subjectList;
    assignment.innerHTML = json.assignment;
    duedate.innerHTML  = json.dueDate;
    priority.innerHTML = json.priority;
    
  });
});
  return false;
};

function updatePriority(dueDate,currDate){
    var dueDate = new Date(dueDate);
    var currDate = new Date(currDate);
  
  var Difference_In_Time = dueDate.getTime() - currDate.getTime();
  
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
  console.log(Difference_In_Days) 
  
  if(Difference_In_Days >= 5){
    priorityLevel = "Low"
  } else {
    priorityLevel = "High"
  }

}
          
window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};