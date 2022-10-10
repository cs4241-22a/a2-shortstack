// Add some Javascript code here, to run on the front end.

refreshPreview();
const preview = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const name = document.querySelector( '#name' ),
    pronouns = document.querySelector( '#pronouns' ),
    birthday = document.querySelector( '#birthday' ),
    email = document.querySelector( '#email' ),
    phone = document.querySelector( '#phone' ),
    hometown = document.querySelector( '#hometown' ),
    education = document.querySelector( '#education' ),
    job = document.querySelector( '#job' ),
    likes = document.querySelector( '#likes' ),
    primary = document.querySelector( '#primary' ),
    secondary = document.querySelector( '#secondary' );
  let json = { 
    Name: name.value,
    Pronouns: pronouns.value,
    Birthday: birthday.value,
    Age: 0,
    Email: email.value,
    Phone: phone.value,
    Hometown: hometown.value,
    Education: education.value,
    Job: job.value,
    Likes: likes.value,
    Primary: primary.value,
    Secondary: secondary.value,
    },
    body = JSON.stringify(json);

  if (
    name.value == "" ||
    pronouns.value == "" ||
    email.value == "" ||
    phone.value == "" ||
    hometown.value == "" ||
    education.value == "" ||
    job.value == "" ||
    likes.value == "" ||
    primary.value == "" ||
    secondary.value == ""
  ) {
    alert("Please fill out all fields");
    fetch( '/preview', {
      method:'POST',
      body, 
    })
    .then( async function ( response ) {
      let newPreview = await response.json()
      refreshPreview(newPreview)
      console.log( response )
    });
  }

  return false
};

// const submit = function(e) {
//   // prevent default form action from being carried out
//   e.preventDefault()

//   const name = document.querySelector( '#name' ),
//     pronouns = document.querySelector( '#pronouns' ),
//     birthday = document.querySelector( '#birthday' ),
//     email = document.querySelector( '#email' ),
//     phone = document.querySelector( '#phone' ),
//     hometown = document.querySelector( '#hometown' ),
//     education = document.querySelector( '#education' ),
//     job = document.querySelector( '#job' ),
//     likes = document.querySelector( '#likes' ),
//     primary = document.querySelector( '#primary' ),
//     secondary = document.querySelector( '#secondary' );
//   let json = { 
//     Name: name.value,
//     Pronouns: pronouns.value,
//     Birthday: birthday.value,
//     Email: email.value,
//     Phone: phone.value,
//     Hometown: hometown.value,
//     Education: education.value,
//     Job: job.value,
//     Likes: likes.value,
//     Primary: primary.value,
//     Secondary: secondary.value,
//     Age: 0,
//     },
//     body = JSON.stringify(json);

//   if (
//     name.value == "" ||
//     pronouns.value == "" ||
//     email.value == "" ||
//     phone.value == "" ||
//     hometown.value == "" ||
//     education.value == "" ||
//     job.value == "" ||
//     likes.value == "" ||
//     primary.value == "" ||
//     secondary.value == ""
//   ) {
//     alert("Please fill out all fields");
//     fetch( '/submit', {
//       method:'POST',
//       body, 
//     })
//     .then(function(response ) {
//       // DO something with the reponse 
//       console.log( response )
//     });
//   }

//   return false
// };

window.onload = function() {
  const pButton = document.querySelector("previewButton")
  const sButton = document.querySelector("submitButton")
  const cButton = document.querySelector("clearButton")
  pbutton.onclick = preview;
  //sbutton.onclick = submit;
  //cbutton.onclick = clear;
}

function refreshPreview(newPreview) {
    const preview = document.getElementsByClassName("prev");
    preview.innerHTML = '<div class="icon"><div class="head"></div><div class="body"></div></div><div class="basicInfo">';

    newPreview.forEach((element, index) => {
        preview.innerHTML += '<p class="topText">' + element.Name +
        '</p><p>' + element.Pronouns +
        '</p><p>' + element.Age + 
        '</p><p class="topText">Contact:</p><p>' +
        element.Phone + '</p><p>' + element.Email + 
        '</p></div><div class="aboutInfo"><p class="topText">About:</p><p>' + 
        element.Hometown + 
        '</p><p>' + element.Education + 
        '</p><p>' + element.Job +
        '</p><p>' + element.Likes + '</p>';
    })
    preview.innerHTML += '</div></div>';
}