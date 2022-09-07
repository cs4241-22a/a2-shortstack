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
    const data = document.getElementById('datatable');
    data.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th></tr>';
    json.forEach( entry => { table.innerHTML += '<tr><th>${entry.name}</th><th>${entry.genre}</th><th>${entry.year}</th></tr>'; }); };

window.onload = function() {
    const button = document.getElementById( 'submit' );
    button.onclick = submitter;
    getter(); };
