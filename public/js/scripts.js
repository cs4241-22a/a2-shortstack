// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let people = new Map();

async function submit(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value,
          lastName = document.getElementById('lastName').value,
          id = Math.random().toString().replace("0.", ""),
          json = { id, firstName, lastName },
          body = JSON.stringify( json )

    people.set(id, await (await fetch( '/people', {method:'POST', body})).json());
    render();
    return false;
}

async function deletePerson(id) {
    return fetch(`/people/${id}`, {'method': 'DELETE'});
}

function onClick(id) {
    return async () => {
        await deletePerson(id);
        people.delete(id);
        render();
    }
}

async function update() {
    const response = await fetch ('/people', {method:'GET'});
    return await response.json();
}

function render() {
    list = document.getElementById('people');
    list.replaceChildren(
        ...Array.from(people.entries()).map(([id, {fullName}]) => {
            i = document.createElement('li');
            i.id = id;
            i.onclick = onClick(id);
            i.appendChild(document.createTextNode(fullName))
            return i;
        })
    )
}

window.onload = async () => {
    document.getElementById('submit').onclick = submit;
    (await update()).forEach(({id, ...data}) => people.set(id, data));
    render();
}
