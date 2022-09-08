"use strict";
console.log('test');
// Get prior messages upon page load
async function loadMessages() {
    await fetch('/messages')
        .then(response => response.json())
        .then(json => {
        console.log(json);
        const newElement = document.createElement('p');
        newElement.textContent = JSON.stringify(json);
        document.getElementById("messages")?.appendChild(newElement);
    });
}
loadMessages();
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();
    const message = document.querySelector('#message'), color = document.getElementById('color'), json = { message: message.value, color: color.value, timeCreated: new Date() }, body = JSON.stringify(json);
    fetch('/submit', {
        method: 'POST',
        body
    })
        .then((response) => response.json())
        .then((json) => {
        console.log(json);
        const newElement = document.createElement('p');
        newElement.textContent = JSON.stringify(json);
        document.getElementById("messages")?.appendChild(newElement);
    });
    return false;
};
const button = document.querySelector('#submit');
button.onclick = submit;
