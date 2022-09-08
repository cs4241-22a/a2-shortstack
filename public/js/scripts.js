// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// Complete logic of game
const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;


    // Function to
    const playGame = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        const playerOptions = [rockBtn, paperBtn, scissorBtn];
        const computerOptions = ['rock', 'paper', 'scissors']

        // Function to start playing game
        playerOptions.forEach(option => {
            option.addEventListener('click', function () {

                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Moves Left: ${5 - moves}`;


                const choiceNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[choiceNumber];

                // Function to check who wins
                winner(this.innerText, computerChoice)

                // Calling gameOver function after 5 moves
                if (moves == 5) {
                    gameOver(playerOptions, movesLeft);
                }
            })
        })

    }

    // Function to decide winner
    const winner = (player, computer) => {
        const result = document.querySelector('.result');
        const playerScoreBoard = document.querySelector('.p-count');
        const computerScoreBoard = document.querySelector('.c-count');
        player = player.toLowerCase();
        computer = computer.toLowerCase();
        if (player === computer) {
            result.textContent = 'Tie'
            // increment both scores when a tie occurs
            computerScore++;
            computerScoreBoard.textContent = computerScore;
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
        else if (player == 'rock') {
            if (computer == 'paper') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;

            } else {
                result.textContent = 'Player Won'
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player == 'scissors') {
            if (computer == 'rock') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player == 'paper') {
            if (computer == 'scissors') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
    }

    // Function to run when game is over
    const gameOver = (playerOptions, movesLeft) => {

        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.result');
        const reloadBtn = document.querySelector('.reload');
        var gameStatus = 2;

        playerOptions.forEach(option => {
            option.style.display = 'none';
        })


        chooseMove.innerText = 'Game Over!!'
        movesLeft.style.display = 'none';

        if (playerScore > computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You Won The Game'
            result.style.color = '#308D46';
            gameStatus = 1;
           
        }
        else if (playerScore < computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You Lost The Game';
            result.style.color = 'red';
            gameStatus = 0;
           
        }
        else {
            result.style.fontSize = '2rem';
            result.innerText = 'Tie';
            result.style.color = 'grey'
        }
        reloadBtn.innerText = 'Restart';
        reloadBtn.style.display = 'flex';
        if (gameStatus === 0) {
            reloadBtn.onclick = handleGameLose
        }
        if (gameStatus === 1) {
            reloadBtn.onclick = handleGameWin
        }
        reloadBtn.addEventListener('click', () => {
            window.location.reload();
        })
    }


    // Calling playGame function inside game
    playGame();

}

// Calling the game function
game();

const handleGameWin = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const newUser = document.querySelector('#currentUsername'),
        json = { currentuser: "_WinCondition_", newusername: newUser.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            const currentUser = document.querySelector('#currentUsername')
            if (currentUser.value !== null) {
                const pos = findDataIndex(data, newUser.value)
                makeCurrentTable(data,pos)
                makeTable(data);
            }
            else{alert("Please choose a user!")}
        })
    return false
}
const handleGameLose = function (e) {
     // prevent default form action from being carried out
     e.preventDefault()

     const newUser = document.querySelector('#currentUsername'),
         json = { currentuser: "_LossCondition_", newusername: newUser.value },
         body = JSON.stringify(json)
 
     fetch('/submit', {
         method: 'POST',
         body
     })
         .then(async function (response) {
             let data = await response.json()
             if (currentUser.value !== null) {
                const pos = findDataIndex(data, newUser.value)
                makeCurrentTable(data,pos)
                makeTable(data);
            }
            else{alert("Please choose a user!")}
         })
     return false
 }

const updateName = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector('#newUsername'),
        currentUser = document.querySelector('#currentUsername'),
        json = { currentuser: "__" + currentUser.value, newusername: input.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            const currentUser = document.querySelector('#username');
            const win = document.querySelector('#win');
            const loss = document.querySelector('#loss');
            const winrate = document.querySelector('#winrate');
            const currentUser_1 = document.querySelector('#currentUsername');
            makeTable(data)
            // find the data
            const pos = findDataIndex(data, input.value)
            if (input.value !== '') {
                currentUser.textContent = data[pos].playerName
                win.textContent = data[pos].win
                loss.textContent = data[pos].loss
                if (data[pos].win !== 0 || data[pos].loss !== 0) {
                    winrate.textContent = ((data[pos].win / (data[pos].win + data[pos].loss)) * 100).toFixed(2)
                }
                winrate.textContent = data[pos].winrate
                currentUser_1.value = data[pos].playerName
                input.value = ''
            }
            else { alert("Field must be valid and not empty!") }

        })
    return false
}

const displayData = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()


    const json = '',
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            const currentUser_1 = document.querySelector('#currentUsername');
            makeTable(data);
            if (data.length !== 0) {
                makeCurrentTable(data, 0)
                currentUser_1.value = data[0].playerName
            }
        })
    return false
}

const addUser = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const newUser = document.querySelector('#newUsername_2'),
        json = { currentuser: "_yessir_", newusername: newUser.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            if (newUser.value === '') {
                alert("Field must be valid and not empty!")
            }
            makeTable(data);
            newUser.value = ''
        })
    return false
}

const deleteUser = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const newUser = document.querySelector('#unwanted'),
        json = { currentuser: "_Delete_", newusername: newUser.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            if (newUser.value === '') {
                alert("Field must be valid and not empty!")
            }
            if (data[0].playerName === newUser.value) {
                alert("This game requires at least one player!")
            }
            //TODO:handle current player status
            const currentUser = document.querySelector('#currentUsername')
            const pos = findDataIndex(data, currentUser.value)
            if (pos !== null) {
                const table = document.getElementById('currentTable')
                table.innerHTML = "";
                currentUser.value = null;
            }
            makeTable(data);
            newUser.value = ''
        })
    return false
}

function makeTable(data) {
    const table = document.getElementById('myTable')
    table.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const row = `<tr>
                        <td>${data[index].playerName}</td>
                        <td>${data[index].win}</td>
                        <td>${data[index].loss}</td>
                        <td>${data[index].winrate}</td>
                    </tr>`
        table.innerHTML += row

    }
}

function makeCurrentTable(data, pos) {
    const table = document.getElementById('currentTable')
    table.innerHTML = "";

    const row = `<tr>
                        <td id="username">${data[pos].playerName}</td>
                        <td id="win">${data[pos].win}</td>
                        <td id="loss">${data[pos].loss}</td>
                        <td id="winrate">${data[pos].winrate}</td>
                    </tr>`
    table.innerHTML = row
}

function findDataIndex(data, input) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].playerName === input) {
            return i;
        }
    }
}

function checkValidity(data, newName) {
    let x = true;
    for (let index = 0; index < data.length; index++) {
        if (data[index].playerName === newName) {
            x = false
        }
    }
    return x;
}

window.onload = function () {
    const update_btn = document.querySelector('#updateUsername')
    update_btn.onclick = updateName
    const display_btn = document.querySelector('#display')
    display_btn.onclick = displayData
    const add_btn = document.querySelector('#add')
    add_btn.onclick = addUser
    const delete_btn = document.querySelector('#delete')
    delete_btn.onclick = deleteUser
}