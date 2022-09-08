
// Establish types for the message board
type HEX = `#${string}`;
interface Message {
	timeCreated: Date;
	color: HEX;
	message: string;
}
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

const submit = function (e: Event) {
	// prevent default form action from being carried out
	e.preventDefault();

	const message = <HTMLInputElement>document.querySelector('#message'),
		color = <HTMLInputElement>document.getElementById('color'),
		json: Message = {message: message.value, color: <HEX>color.value, timeCreated: new Date()},
		body = JSON.stringify(json);

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
}

const button = <HTMLButtonElement>document.querySelector('#submit');
button.onclick = submit;