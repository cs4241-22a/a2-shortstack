let searchState = {};
let localList = {};

const search = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // Show loading
    const currentResults = document.getElementById('titles');
    if (currentResults) {
        currentResults.innerText = "Loading...";
    }

    const input = document.querySelector( '#search-bar' ),
            json = { type: "search", 
                     title: input.value },
            body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data['type'] === 'queryResp') {
            showSearchResults(data['data']['Search']);
        }
    }); 

    return false
}

const collapse = function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;

    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    } 
};

const addMovie = function(e) {
    e.preventDefault();

    let idx = e['target'].id.substring(3);
    console.log(searchState[idx]);
}

const showSearchResults = function(results) {
    const currentResults = document.getElementById('titles');
    const content = document.getElementById('new-entry');
    searchState = results;

    // Check for no results
    if (results === undefined) {
        if (currentResults) {
            currentResults.innerText = "No movies found :(";
            content.style.maxHeight = content.scrollHeight + "px";
            return;
        }
    }

    // Remove existing results
    if (currentResults) {
        currentResults.parentNode.removeChild(currentResults);
    }

    let i = 0;
    // Create new query response element
    const resultsEl = document.createElement('div');
    resultsEl.id = "titles";

    results.forEach( e => {
        const dEl = document.createElement('div');
        dEl.className = "title";

        const pEl = document.createElement('p');
        const movieTitle = document.createTextNode(`${e['Title']} (${e['Year']})`);
        pEl.className = 'title';
        pEl.appendChild(movieTitle);

        const addBtn = document.createElement('button');
        const addTxt = document.createTextNode("Add");
        addBtn.type = 'button';
        addBtn.className = 'btn';
        addBtn.id = `add${i}`;
        addBtn.addEventListener('click', addMovie);
        addBtn.appendChild(addTxt);

        dEl.appendChild(pEl);
        dEl.appendChild(addBtn);

        resultsEl.appendChild(dEl);

        i++;
    });

    console.log(resultsEl);
    const parentDiv = document.getElementById('search-results');
    parentDiv.appendChild(resultsEl);

    // Resize bounding box
    content.style.maxHeight = content.scrollHeight + "px";
}

window.onload = function() {    
    const add_btn = document.querySelector('#new-movie');
    const search_button = document.querySelector('#search');
    const search_input = document.querySelector('#search-bar'); 

    add_btn.addEventListener('click', collapse);
    search_button.onclick = search;

    search_input.addEventListener("keyup", function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementById("search").click();
        }
    });
}