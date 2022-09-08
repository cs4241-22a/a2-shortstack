
const submit = function(e)
{
    e.preventDefault()

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
      addToPlaylist(newData)
      console.log( newData )
    })
    return false
}

function addToPlaylist(newData) 
{
    const table = document.getElementById("results")
    table.innerHTML = "<tr id='firstRow'><th>Song</th><th>Artist</th><th>Duration</th><th>Album</th><th>Playlist length</th></tr>"

    newData.forEach((element, index) => {

        // if(element.songname === undefined)
        // {
        //     ;
        // }
        // else
        // {
        table.innerHTML +=
          "<tr><td>" + element.songname + "</td><td>"
          + element.artist + "</td><td>"
          + element.duration + "</td><td>"
          + element.album + "</td><td class='tally'>"
          + element.playlistDur + "</td></tr>"
        //}
      })
  }


//   const reset = function(e)
//   {
//       e.preventDefault()
//       body = JSON.stringify("")

//       fetch( '/reset', {
//         method:'POST',
//         body
//       })
//       .then(async function(response)
//       {
//         let emptyData = await response.json()
//         emptyPlaylist(emptyData)
//         console.log(emptyData)
//       })
//       return false
      
//   }

  function emptyPlaylist(newData)
  {
    const table = document.getElementById("results")
    table.innerHTML = "<tr id='firstRow'><th>Song</th><th>Artist</th><th>Duration</th><th>Album</th><th>Playlist length</th></tr>"
  }


  window.onload = function() 
  {
    const submitButton = document.getElementById( 'submitButton' )
    submitButton.onclick = submit

    const resetButton = document.getElementById( 'resetButton' )
    resetButton.onclick = reset
  }

