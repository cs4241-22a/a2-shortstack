"use strict";
/**
 * Renders a message to an HTML element displaying the message, when it was posted, and a delete button
 * @param message
 */
function renderMessage(message) {
    const rootDiv = document.createElement('div');
    rootDiv.className = 'message hbox';
    rootDiv.style.backgroundColor = message.color;
    rootDiv.innerHTML = `
		<p>${message.message}</p>
		<div class="hbox">
			<p>${message.timeCreated}</p>
			<button class="delete-button">
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	`;
    const deleteButton = rootDiv.getElementsByClassName('delete-button')[0];
    // deleteButton.onclick = {
    //
    // }
    return rootDiv;
}
// Get prior messages upon page load
fetch('/messages')
    .then(response => response.json())
    .then(json => {
    console.log(json);
    for (const message of json) {
        const newElement = renderMessage(message);
        document.getElementById("messages")?.appendChild(newElement);
    }
});
// Handle sending a new message
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();
    const message = document.querySelector('#message-input'), color = document.getElementById('color'), json = { timeCreated: new Date(), color: color.value, message: message.value }, body = JSON.stringify(json);
    fetch('/submit', {
        method: 'POST',
        body
    })
        .then((response) => response.json())
        .then((json) => {
        console.log(json);
        const newElement = renderMessage(json);
        document.getElementById("messages")?.appendChild(newElement);
    });
    return false;
};
const button = document.querySelector('#submit');
button.onclick = submit;
