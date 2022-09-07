const submitter = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    const title = document.getElementById( 'title' ),
          genre = document.getElementById( 'genre' ),
          year  = document.getElementById( 'year'  );
          json = { title: title.value,
                   genre: genre.value,
                   year:   year.value },
          body = JSON.stringify( json );
    fetch( '/submit', { method:'POST', body })
    .then( response => response.json() )
    .then( json => { builder( json ); });
    return false; };

const getter = function() {
    fetch( '/get', { method:'GET', }).then( response => response.json() )
    .then(json => { builder( json ); }); };

const builder = function( json ) {
    json.forEach(movie=> {
        const datatable = document.getElementById('datatable');
        var newrow = datatable.insertRow(datatable.rows.length);
        var col1 = newrow.insertCell(0);
        var col2 = newrow.insertCell(1);
        var col3 = newrow.insertCell(2);
        var col4 = newrow.insertCell(3);
        col1.innerHTML = movie.title;
        col2.innerHTML = movie.genre;
        col3.innerHTML = movie.year;
        col4.innerHTML = toddcheck(movie.title, movie.year);
}); };

const toddcheck = function( title, year ) {
    const years = [ 2000, 2003, 2004, 2006, 2009, 2010, 2011, 2013, 2016, 2019 ];
    const titles = [ 'road trip', 'old school', 'starsky & hutch',
                     'school for scoundrels', 'the hangover',
                     'due date', 'the hangover part ii',
                     'the hangover part iii', 'war dogs', 'joker' ];
    const numFilms = 10;
    let i;
    for (i = 0 ;  i < numFilms ; i++ ) { if( year = years[i] && title.toString().toLowerCase().equals(titles[i]) ) { return true; } }
    return false; };

    //const data = document.getElementById('datatable');
    //data.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th></tr>';
    //json.forEach( entry => { table.innerHTML += '<tr><th>${entry.name}</th><th>${entry.genre}</th><th>${entry.year}</th></tr>'; }); };

window.onload = function() {
    const button = document.getElementById( 'submit' );
    button.onclick = submitter;
    getter(); };
