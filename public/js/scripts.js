/**
* Send json string to server with info of movie to add
*/
const addMovie = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const inputTitle = document.getElementById('movietitletoadd'),
        inputYear = document.getElementById('movieyear'),
        inputRank = document.getElementById('movierank'),
        json = { title: inputTitle.value, year: inputYear.value, rank: inputRank.value },
        body = JSON.stringify(json)

    fetch('/addmovie', {
        method: 'POST',
        body
    })

    // refresh movies on client side
    results();

    return false
}
/**
 * Send json string to server with info of movie to add
 */
const deleteMovie = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    json = { title: document.getElementById('movietitletodelete').value };
    body = JSON.stringify(json);

    fetch('/deletemovie', {
        method: 'POST',
        body
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            document.getElementById("moviedne").innerHTML = text;
        })

    // refresh movies on client side
    results();

    return false
}

/**
 * Fetch current list of movies
 */
function results() {
    fetch('/appdata',
        {
            method: 'GET'
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            showMovies(json);
        })

    return false
}
/**
 * Enter movie information into grid cells
 */
function showMovies(jsonmovies) {
    jsonmovies.sort((movie1, movie2) => compareAlphabetical(movie1.title, movie2.title));
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = "";
    for (let movie of jsonmovies) {
        let rankColor;
        if (movie.rank === 1) {
            rankColor = "red"
        }
        else if (movie.rank === 2) {
            rankColor = "orange"
        }
        else if (movie.rank === 3) {
            rankColor = "#ffe100"
        }
        else if (movie.rank === 4) {
            rankColor = "blue"
        }
        else if (movie.rank === 5) {
            rankColor = "green"
        }
        resultsSection.innerHTML += `<div class="resultscell" style="border-color: ${rankColor};"><p id="movietitledisplay">${movie.title}</p><p>${movie.year}</p><br><p>Rank: ${movie.rank}</p><p>Date Watched: ${movie.date_watched}</p><p>Release vs Watch date: ${movie.years_between} years</p></div>`;
    }
}
/**
 * Compare method to sort strings alphabetically 
 */
function compareAlphabetical(str1, str2) {
    return str1.toLowerCase() > str2.toLowerCase() ? 1 : -1;
}

window.onload = function () {
    //preload movie data from server
    results();

    const additionbutton = document.getElementById('additionbutton')
    additionbutton.onclick = addMovie
    const deletionbutton = document.getElementById('deletionbutton');
    deletionbutton.onclick = deleteMovie;
}