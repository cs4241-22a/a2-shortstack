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
    
    // Update text to show most recent player choice
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
    
    // Update text to show most recent player choice
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
    
    // Update text and continue game
    if(win) {
      statusMsg.textContent = "You Won this Round! Keep Going!"
    }
    // Update text and set final game values for updating server data
    else if(gameover) {
      statusMsg.textContent = "Game Over! Submit Your Score"
      document.getElementById("submission").style.visibility = "visible"
      
      document.getElementById("rock").value = totalRock
      document.getElementById("paper").value = totalPaper
      document.getElementById("scissors").value = totalScissors
      
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