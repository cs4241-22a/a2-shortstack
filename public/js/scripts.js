// Global Variables
var score = 0

var totalRock = 0,
    totalPaper = 0,
    totalScissors = 0

var win = false
var gameover = false

// 0 = Rock, 1 = Paper, 2 = Scissors
const rps_game = function(choice) {

  // Checks to see if a user has already lost the game, preventing them from continuing
  if(gameover) {
    return
  }
  
  // Resets the value of win if continuing
  win = false
  
  // Set computer choice based on a random number
  const computerChoice = getRandomInt(0, 3)
  
  const result = getWinner()
  
  const update = updateGame()
  

  // Check winner
  function getWinner() {
    switch (choice) {
      // Player chose Rock
      case 0:
        // Player loses
        if(computerChoice === 1) {
          gameover = true
        }
        // Player wins
        else if (computerChoice === 2) {
          win = true
          score++
        }
        totalRock++
        break
      // Player chose Paper
      case 1:
        // Player loses
        if(computerChoice === 2) {
          gameover = true
        }
        // Player wins
        else if (computerChoice === 0) {
          win = true
          score++
        }
        totalPaper++
        break
      // Player chose Scissors
      case 2:
        // Player loses
        if(computerChoice === 0) {
          gameover = true
        }
        // Player wins
        else if (computerChoice === 1) {
          win = true
          score++
        }
        totalScissors++
        break
    }
  }
  
  
  // Update game data
  function updateGame() {
    const playerScore = document.getElementById("score")    
    const playerChose = document.getElementById("player")
    const computerChose = document.getElementById("computer")
    const statusMsg = document.getElementById("status")
    
    playerScore.textContent = "Score: " + score
    
    let playerText = ""
    switch (choice) {
      case 0:
        playerText = "Rock"
      break
      case 1:
        playerText = "Paper"
        break
      case 2:
        playerText = "Scissors"
        break
    }
    playerChose.textContent = "Player Chose: " + playerText
    
    let compText = ""
    switch (computerChoice) {
      case 0:
        compText = "Rock"
      break
      case 1:
        compText = "Paper"
        break
      case 2:
        compText = "Scissors"
        break
    }
    computerChose.textContent = "Computer Chose: " + compText
    
    if(win) {
      statusMsg.textContent = "You Won this Round! Keep Going!"
    }
    else if(gameover) {
      statusMsg.textContent = "Game Over! Submit Your Score"
      document.getElementById("scoreSubmit").style.visibility = "visible"
      /*
      document.getElementById("score").value = score
      document.getElementById("rock").value = totalRock
      document.getElementById("paper").value = totalPaper
      document.getElementById("scissors").value = totalScissors
      */
    }
    else {
      statusMsg.textContent = "It's a Tie! Keep Going!"
    }
  }
  
}

// Generate random number
function getRandomInt(low, high) {
  low = Math.ceil(low)
  high = Math.floor(high)
  return Math.floor(Math.random() * (high - low) + low)
}

/*
const updateScores = function ( e ) {
  // prevent default form action from being carried out
    e.preventDefault()

    let name = document.querySelector( "#yourname" )
    
    let json = {
      name: name.value,
      score: score,
      rock: totalRock,
      paper: totalPaper,
      scissors: totalScissors,
    }
    let body = JSON.stringify(json)

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( async function ( response ) {
      let data = await response.json()
      refresh(data)
      console.log(data)
    })
	  
  return false
}
*/

/*
const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  let name = document.querySelector( "#yourname" ) 
   
  let json = {
    name: name.value,
    score: score,
    rock: totalRock,
    paper: totalPaper,
    scissors: totalScissors,
  }
  let body = JSON.stringify(json)

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( async function ( response ) {
    let data = await response.json()
    //refresh(data)
    console.log(data)
  })
	 
  return false
}
    
window.onload = function() {
  const button = document.querySelector( '#scoreSubmit' )
  button.onclick = submit
}

function refresh(data) {
  
}
*/

// Set all invisible game elements to be visible
function showGame() {
    document.getElementById("choices").style.visibility = "visible"
    document.getElementById("score").style.visibility = "visible"
    document.getElementById("computer").style.visibility = "visible"
    document.getElementById("player").style.visibility = "visible"
    document.getElementById("status").style.visibility = "visible"
}