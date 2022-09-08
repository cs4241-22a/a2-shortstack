let appdata = [
  { ownername: 'Sylar Zhang', email: 'sylarrr@someemail.com', petname: 'Chanel', type: 'cat', 
    petbreed: 'Domestic shorthair', date: '2022-9-26', time: '12:00', servicetype: 'bath' }
] 

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const ownername = document.querySelector( '#ownername' ).value,
        email = document.querySelector('#email').value,
        petname = document.querySelector('#petname').value,
        petbreed = document.querySelector('#petbreed').value,
        type = document.getElementsByName("radio"),
        date = document.querySelector('#date').value,
        time = document.querySelector('#time').value,
        servicetype = document.getElementsByName("checkbox"),
        curdate = new Date(getDate());

  let typeVal = null, servicetypeVal = null, d = new Date(date)

  // check pet type
  for (const tval of type) {
    if (tval.checked) {
      typeVal = tval.value;
      break
    }
  }

  // check service type
  for (const val of servicetype) {
    if (val.checked) {
      servicetypeVal = val.value;
      break
    }
  }

  // send alert if user submit invalid inputs
  if (!ownername || !email || !petname || !type || !petbreed || !date || !time || !servicetype) {
    alert("Fail to submit: Please fill out any blank inputs")
  } else if (d <= curdate) {
    alert("Fail to submit: Only accept appointments starting on the next day")
  } 
  // valid inputs
  else {
    const json = { ownername: ownername, email: email, petname: petname, type: typeVal, 
                    petbreed: petbreed, date: date, time: time, servicetype: servicetypeVal },
          body = JSON.stringify(json);
    fetch( '/submit', {
      method:'POST',
      body 
    }).then( function( response ) {
      return response.text();
    }).then(function(e) {
      appdata.push(JSON.parse(e));
      updateTable();
      console.log( appdata )
    });
  }
  

  document.querySelector('#ownername').value = "";
  document.querySelector('#email').value = "";
  document.querySelector('#petname').value = "";
  document.querySelector('#cat').checked = false;
  document.querySelector('#dog').checked = false;
  document.querySelector('#other').checked = false;
  document.querySelector('#petbreed').value = "";
  document.querySelector('#date').value = "";
  document.querySelector('#time').value = "";
  document.querySelector('#bath').checked = false;
  document.querySelector('#hairtrim').checked = false;
  document.querySelector('#nailtrim').checked = false;
  document.querySelector('#brushing').checked = false;

  return false
}

window.onload = function() {

  const button = document.querySelector( '#submitt' )
  button.onclick = submit
  updateTable()
}

const deletee = function(e) {

  e.preventDefault();
  appdata.splice(Number(e.target.id.substring(1)),1);
  updateTable();
}

const modify = function(e) {

  e.preventDefault();
  console.log('Modify');

  let modtarget = appdata[Number(e.target.id.substring(1))];
  document.querySelector('#ownername').value = modtarget.ownername;
  document.querySelector('#email').value = modtarget.email;
  document.querySelector('#petname').value = modtarget.petname;
  document.querySelector('#cat').checked = false;
  document.querySelector('#dog').checked = false;
  document.querySelector('#other').checked = false;
  document.querySelector('#petbreed').value = modtarget.petbreed;
  document.querySelector('#date').value = modtarget.date;
  document.querySelector('#time').value = modtarget.time;
  document.querySelector('#bath').checked = false;
  document.querySelector('#hairtrim').checked = false;
  document.querySelector('#nailtrim').checked = false;
  document.querySelector('#brushing').checked = false;

  document.querySelector('#' + modtarget.type).checked = true;
  document.querySelector('#' + modtarget.servicetype).checked = true;

  appdata.splice(Number(e.target.id.substring(1)), 1);
  updateTable();
}

function getDate() {

  let date = new Date(),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  
  let strdate = year + '-' + month + '-' + day;

  return strdate;
}

function updateTable() {

  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < appdata.length; i++) {
    let newrow = document.createElement("tr");

    for (let j = 0; j < 10; j++) {
      let td = document.createElement("td");
      let content;

      console.log(appdata[i])

      switch (j) {
        case 0: content = document.createTextNode(appdata[i].ownername); break;
        case 1: content = document.createTextNode(appdata[i].email); break;
        case 2: content = document.createTextNode(appdata[i].petname); break;
        case 3: content = document.createTextNode(appdata[i].type); break;
        case 4: content = document.createTextNode(appdata[i].petbreed); break;
        case 5: content = document.createTextNode(appdata[i].date); break;
        case 6: content = document.createTextNode(appdata[i].time); break;
        case 7: content = document.createTextNode(appdata[i].servicetype); break;
        case 8: content = document.createElement("Button"); break;
        case 9: content = document.createElement("Button"); break;
      
      }

      if (j === 8) {
        content.innerHTML = "Modify";
        content.id = 'M' + i.toString();
        content.onclick = modify;
       }

      if (j === 9) {
        content.innerHTML = "Delete";
        content.id = 'D' + i.toString();
        content.onclick = deletee;
      }

      td.appendChild(content);
      newrow.appendChild(td);
    }

    tbody.appendChild(newrow);
  }
}
