const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#assignment','#course','#date', '#time_until' ),
          json = { assignment: input.value, course: course.value, date: date.value, time_until:""},
          body = JSON.stringify( json )
    
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( json => {
      fetch( '/getrequest', {
      method:'GET'
    })

    .then(response => response.json())
    .then(json => {
      let index = 1
      json.forEach(item=>{
        
        if(index >= table.rows.length-1){
          const table = document.getElementById('table')
          var row = table.insertRow(table.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = item.assignment;
          cell2.innerHTML = item.course;
          cell3.innerHTML = item.date;
          cell4.innerHTML = item.time_until;

        }
        index = index+1;
        
      })
    })
    })
    return false
  }



  const remove = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()


    const input = document.querySelector( '#remove_assignment'),
          json = { remove_assignment: input.value},
          body = JSON.stringify( json )

    fetch( '/delete', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( json => {
      fetch( '/getdelete', {
      method:'GET'
    })

    .then(response => response.json())
    .then(json => {
      let index = 1
      json.forEach(item=>{
        if(index >= table.rows.length-1){
          const table = document.getElementById('table')
          var row = table.insertRow(table.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = item.assignment;
          cell2.innerHTML = item.course;
          cell3.innerHTML = item.date;
          cell4.innerHTML = item.time_until;
        }
        index = index+1;
        
      })
    })
    })
    location.reload()
    return false
  }




  window.onload = function() {
    fetch( '/getrequest', {
      method:'GET'
    })
    .then(response => response.json())
    .then(json => {
      json.forEach(item=>{
        const table = document.getElementById('table')
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = item.assignment;
        cell2.innerHTML = item.course;
        cell3.innerHTML = item.date;
        cell4.innerHTML = item.time_until;
      })
    })

    fetch( '/getdelete', {
      method:'GET'
    })
    .then(response => response.json())
    .then(json => {
      let index = 1
      json.forEach(item=>{
        if(index >= table.rows.length-1){
          const table = document.getElementById('table')
          var row = table.insertRow(table.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = item.assignment;
          cell2.innerHTML = item.course;
          cell3.innerHTML = item.date;
          cell4.innerHTML = item.time_until;
        }
        index = index+1;
      })
    })

    //const button = document.querySelector( 'button' )
    const add_button = document.getElementById('add_button')
    const remove_button = document.getElementById('remove_button')
    add_button.onclick = submit
    remove_button.onclick = remove
  }