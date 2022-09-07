// Add some Javascript code here, to run on the front end.

const addSong = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  console.clear()

  const song = document.querySelector( '#song' )
  const artist = document.querySelector('#artist')
  const album = document.querySelector('#album'),
        json = { song: song.value, artist: artist.value, album: album.value},
        body = JSON.stringify( json )

  fetch( '/addSong', {
    method:'POST',
    body 
  })
  .then( response => response.json())
  .then( json => {
    console.log ( json )
  })
  return false
}

const removeSong = function ( e ) {
  e.preventDefault()

  const song = document.querySelector( '#removeSong' )
  const artist = document.querySelector('#removeArtist'),
        json = { song: song.value, artist: artist.value},
        body = JSON.stringify( json )
  
  fetch('/removeSong', {
    method:'POST',
    body
  })
  .then( response => response.json())
  return false
}

const showPlaylist = function ( e ) {
  e.preventDefault()

  let playlist = document.getElementById("playlist");
  body = JSON.stringify ( playlist );
  console.log(body);

  fetch( "/showPlaylist", {
    method: 'POST',
    body
    })
  .then( response => response.json())
  .then( json => {
    console.log( json )
    let playlist = document.getElementById("playlist");
    playlist.innerHTML = "<thead><tr><th>Song</th><th>Artist</th><th>Album</th><tr></thead>";
    json.forEach( item => {
      playlist.innerHTML = playlist.innerHTML + `<tr><td>${item.song}</td><td>${item.artist}</td><td>${item.album}</td></tr>`
    })
  })
}

window.onload = function() {
  const add = document.getElementById( "add" )
  add.onclick = addSong
  const playlist = document.getElementById( "showPlaylist" )
  playlist.onclick = showPlaylist
  const remove = document.getElementById( "remove" )
  remove.onclick = removeSong
}
