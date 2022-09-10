
// submit button
const submit = function( e ) {
    // prevent default from trying to go to another page
    e.preventDefault()

// references first with attribute inside parenthesis ( ~ to getElementById but more general )
    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#ToDoType')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
    const Year = document.querySelector("#Year"),
    // creating json object from our input     
          json  = { Task: input.value, ToDoType: field1.value, Difficulty: field2.value, Year: field3.value},
            //json is used since it makes data easy to manipulate
// stringify will convert this object into a string
          body = JSON.stringify( json )
          
    // fetch will do an ansynchronous network request ( ones used in server) - returns a promise?
    fetch( '/submit', { // fetch is where you specify the url/ resouce that you want to see
      method:'POST',
      body // send body to server
    })
    // javascript promise: value that is unknown now, it is called when it is received by the server?

    // then is a callback function
    
    .then(  // when the rewsponse to the server comes, do this
      function(  response ) { // this is the response from the server
      // do something with the reponse 
      // try putting the TABLE HERE
      //  console.log( response )
        // return response.json() // extracts json and returns it
   
        return response.json() // converts ReadableStream to JSON array for appdata
      }
    )
    .then( json => { // the 
      json.forEach( item =>{
      //////////MAKE initial elements in a div clear before adding new data
      const p = document.createElement('p')
      p.innerText = JSON.stringify(item)
      document.body.appendChild(p)
    })
  })

// //json was returned from the previous ".then"
    /* .then( function(json){ // promise
 // why doe this happen in Chrome Dev Tools instead of the Terminal?
    ////////////// displays when  using 'response.end(JSON.stringify(dataJson)) in server'
         // testing to see if you can show data to console
         console.log(json) // console logs to teh CHrome DevTools
         console.log(JSON.stringify(json))
         console.log("do you see me in Chrome Dev Tools?" )
         const testThen  = document.querySelector("#testThen")
         testThenP = document.createElement("p")
         testThenP.innerText = JSON.stringify(json)
          testThen.appendChild(testThenP)
    //////////////
    })*/
    ///////////////
    return false // stops default submission behavior
  }
 // makes sure what's inside function does not run until everything on the page has loaded
  window.onload = function() {
    // const button = document.querySelector( 'button' )
    const button = document.querySelector( '#submitButton' )
    button.onclick = submit

    const button1 = document.querySelector( '#taskNewButton' )
    button1.onclick = plus
    
    const button2 = document.querySelector('#deleteButton')
    button2.onclick = deleteTask


  }

  const deleteTask = function( e ) {
    
    e.preventDefault()
    

     const TaskBase = document.querySelector("#TaskBase") 
    

    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#ToDoType')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
    const Year = document.querySelector("#Year"),
 
          json  = { Task: input.value, ToDoType: field1.value, Difficulty: field2.value, Year: field3.value},
          body = JSON.stringify( json )
    fetch( '/delete', { 
      method:'POST',
      body 
    })
    .then(response=> response.json())
    .then( json => { 
      json.forEach( item =>{
      // const p = document.createElement('p')
      var p = document.createElement('p')
      p.innerText = JSON.stringify(item)
      
      // jsonToDelete  = { Task: input.value, ToDoType: field1.value, Difficulty: field2.value, Year: field3.value}
      // if(JSON.stringify(item) == JSON.stringify(jsonToDelete) ){
      // p.innerText == JSON.stringify(item);
      // }
      //  document.body.appendChild(p)
      TaskBase.appendChild(p)
      ////////////////// not needd below
      // json1  = { Task: input.value, ToDoType: field1.value, Difficulty: field2.value, Year: field3.value},
      // jsonString = JSON.stringify( json )
      // TaskBase.forEach(para){
      //   if(para ==jsonString ){
      //     TaskBase.removeChild(para)
      //   }
      // }
      /////////////////
    })
    
  })
}

  const plus = function(e){
    e.preventDefault()

    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#ToDoType')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
    const Year = document.querySelector("#Year")

    // table

    const Test = document.querySelector("#test")
    let TaskTable = document.createElement('table')
    
        // TaskTable.innerText =  input.value + " " + field1.value + " " + field2.value + " " + field3.value + " " + Year.value + " " 
        //TaskTable.innerHTML = `<h1> ${input.value} </h1>` + "new"
        TaskTable.innerHTML = 
        `<tr>
        <td> ${input.value} </td>
        <td> ${field1.value} </td>
        <td> ${field2.value} </td>
        <td> ${field3.value}</td>
        <td> ${Year.value}</td>
        <td> ${field2.value} / ${Year.value} </td>
      </tr>`
      // add a button in inner.HTML for delete?
        
        Test.appendChild(TaskTable)   

  }
    /*
   - get rid of old appdata when you hit submit again 
    */

  /** Delete
   * get the response from the server
   * show all data except what is being deleted]
   */

  /** Results/ Update?
   * shows all data as is

   */

  /** submit/add
   * adds data 

  */
 /*
 *ViewStoredTasks
   * gets data form server and puts it on page
 /*/
