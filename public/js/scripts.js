const submit = function (e) {
  e.preventDefault();

  const name = document.querySelector("#yourname"); ////was comma is that bad?
  //gonna replicate for more fields
  const age = document.querySelector("#age");
  const favLet = document.querySelector("#favoriteletter"); //is it going away????

  function isOld(int) {
    // turn string into number
    var pointNum = parseFloat(int);
    if (pointNum < 39) {
      return " not old.";
      
    }else if (pointNum > 39){
    return " old."
    } else return " not a proper age.";
  }
  
  const json = {
      yourname: name.value,
      age: age.value,
      favoriteLetter: favLet.value,
      old: isOld(age.value),
    }, 
  body = JSON.stringify(json);
  const myObj = JSON.parse(body); 

      
  fetch("/submit", {
    method: "POST",
    body,
  }).then(function(response){
    return response.json()
  }).then(function(json){
    


    


   let p = document.createElement('li');
   let str = "Hello " + json.yourname + ", " + "your favorite letter is " +
       json.favoriteLetter + ". You are " + json.age + ". Therefore you are" +
       json.old;

   p.innerHTML = str;
   document.getElementById("results").appendChild(p);
})

  


  return false; //keep is important
};///important for function to end here

window.onload = function () {
  const button = document.querySelector("#submit");
  button.onclick = submit;
};


console.log("Welcome to assignment 2!");
