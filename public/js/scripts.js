const fetchGames = async () =>{
    const gamesRequest = await fetch("/games");
    const gamesData = await gamesRequest.json();

    return gamesData
}

const updateTable = async () => {
    const gamesData = await fetchGames();
    gamesData.forEach(game => {
        addGameToTable(game)
    });
}

const addGameToTable = (gameObj) => {
    const table = document.querySelector('tbody');
    table.innerHTML+=generateRow(gameObj);
}

window.onload = async function () {
    await updateTable();

    const button = document.querySelector('#btnSubmit')
    button.addEventListener("click", async (evt) => {
        evt.preventDefault()

        const dateValue = document.querySelector("#datePicker").value
        const hitsValue = document.querySelector("#hitsField").value
        const atBatsValue = document.querySelector("#atBatsField").value

        console.log(dateValue, hitsValue, atBatsValue)

        const dataPostResponse = await fetch("/games", {
            method:"POST",
            body: JSON.stringify({
                dateValue,
                hitsValue,
                atBatsValue
            })
        })

        if(dataPostResponse.status === 200){
            addGameToTable(await dataPostResponse.json())
        }else{
            console.error("AHHHHHHHHH")
        }

    })
}
/**
 * Helper function that generates the html for a single row in the table given a single game's data
 * @param {Object} statsData data object of a single game
 * 
 * @returns html for a single game to be added to the table
 */
const generateRow = (statsData) => {
    return `<tr>
        <td>${statsData.id}</td>
        <td>${statsData.date}</td>
        <td>${statsData.hits}</td>
        <td>${statsData.atBats}</td>
        <td>${statsData.avg.toFixed(3)}</td>
    </tr>`
}

console.log("Welcome to assignment 2!")