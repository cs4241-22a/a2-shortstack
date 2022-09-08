const submitter = function( e ) {
    e.preventDefault();
    const title = document.getElementById( 'title' ), genre = document.getElementById( 'genre' ), year  = document.getElementById( 'year'  ),
          json  = { title: title.value, genre: genre.value, year: year.value }, body  = JSON.stringify( json );
    fetch( '/submit', { method:'POST', body } ).then( response => response.json() ).then( json => { builder( json ); } );
    return false; };
const init = function() { fetch( '/init', { method:'GET', } ).then( response => response.json() ).then( json => { builder( json ); } ); };
const builder = function( json ) {
    const datatable = document.getElementById( 'datatable' );
    datatable.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th><th>directed by Todd Phillips?</th><th>delete?</th></tr>';
    var index = 1;
    json.forEach(entry => {
        var newrow = datatable.insertRow( index ),
            col1 = newrow.insertCell( 0 ),
            col2 = newrow.insertCell( 1 ),
            col3 = newrow.insertCell( 2 ),
            col4 = newrow.insertCell( 3 ),
            col5 = newrow.insertCell( 4 );
        col1.innerHTML = entry.title.toString().toUpperCase();
        col2.innerHTML = entry.genre.toString().toUpperCase();
        col3.innerHTML = entry.year;
        col4.innerHTML = toddcheck( entry.title, entry.year );
        col5.innerHTML = '<button id="'+entry.title+'" onclick="deleter(this);" style="width:18px;height:18px;"></button>'
        index++; } ); };
const deleter = function (x) {
  const json = { title: x.id.toString() }, body = JSON.stringify( json );
  fetch( '/submit', { method:'DELETE', body } ).then( response => response.json() ).then( json => { builder( json ); } );
  return false; }
const toddcheck = function( title, year ) {
    const years = [ 2000, 2003, 2004, 2006, 2009, 2010, 2011, 2013, 2016, 2019 ];
    const titles = [ 'ROAD TRIP', 'OLD SCHOOL', 'STARSKY & HUTCH', 'SCHOOL FOR SCOUNDRELS', 'THE HANGOVER',
                     'DUE DATE', 'THE HANGOVER PART II', 'THE HANGOVER III', 'WAR DOGS', 'JOKER' ];
    const numFilms = 10;
    title = title.toString().toUpperCase();
    for ( let i = 0 ;  i < numFilms ; i++ ) { if( year == years[ i ] && title == titles[ i ] ) { return 'YES!'; } }
    return 'NO!'; };
window.onload = function() {
    const submit = document.getElementById( 'submit' );
    submit.onclick = submitter;
    init(); };
