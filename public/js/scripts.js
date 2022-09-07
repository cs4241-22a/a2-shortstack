const search = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

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

const showSearchResults = function(results) {
    // Remove existing results
    const currentResults = document.getElementById('titles');
    if (currentResults) {
        currentResults.parentNode.removeChild(currentResults);
    }

    // Create new query response element
    const resultsElement = document.createElement('div');
    resultsElement.id = "titles";

    results.forEach( e => {
        console.log(e['Title']);
        const newElement = document.createTextNode(e['Title']);
        resultsElement.appendChild(newElement);
    });

    console.log(resultsElement);
    const parentDiv = document.getElementById('search-results')
    parentDiv.appendChild(resultsElement);

    // Resize bounding box
    const newEntry = document.getElementById('new-entry');
    newEntry.style.maxHeight = content.scrollHeight + "px";

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