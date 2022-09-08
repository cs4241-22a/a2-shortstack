// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function(e)
{
    // prevent default form action from being carried out
    e.preventDefault()

    /**const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )**/

    let songname = document.querySelector("#songname")
    let artist = document.querySelector("#artist")
    let duration = document.querySelector("#songduration")
    let album = document.querySelector("#album")

    let json = {
      songname: songname.value,
      artist: artist.value,
      duration: duration.value,
      album: album.value,
      playlistDur: 0
    }
    let body = JSON.stringify(json)
    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( async function ( response ) {
      let newData = await response.json()
      refreshInfo(newData)
      console.log( newData )
    })

    return false
}

function refreshInfo(newData) {
    const board = document.getElementById("results")
    board.innerHTML = "<tr><th>Song</th><th>Artist</th><th>Duration</th><th>Album</th><th>Playlist length</th></tr>"

    newData.forEach((element, index) => {
        board.innerHTML +=
          "<tr><td>" + element.songname + "</td><td>"
          + element.artist + "</td><td>"
          + element.duration + "</td><td>"
          + element.album + "</td><td>"
          + element.playlistDur + "</td></tr>"
      })
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }