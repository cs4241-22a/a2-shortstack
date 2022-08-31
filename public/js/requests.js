import { addGameToTable, switchForm, updateGameInTable } from "./table.js";
import { getFormValues } from "./util.js";

/**
 * Requests all the games from the server
 * @returns {import("./scripts.js").GameObject[]} an Array of GameObjects from the server
 */
export const fetchGames = async () => {
    const gamesRequest = await fetch("/games");
    const gamesData = await gamesRequest.json();

    return gamesData
}

/**
 * Click event listener for the new game submit. Sends a POST request to the games endpoint creating a new game entry and adding to the table.
 * @param {Event} evt 
 */
export const submitNewGame = async (evt) => {
    evt.preventDefault()

    const dateValue = document.querySelector("#submitDatePicker").value
    const hitsValue = document.querySelector("#submitHitsField").value
    const atBatsValue = document.querySelector("#submitAtBatsField").value

    const dataPostResponse = await fetch("/games", {
        method: "POST",
        body: JSON.stringify({
            date: dateValue,
            hits: hitsValue,
            atBats: atBatsValue
        })
    })

    if (dataPostResponse.status === 200) {
        addGameToTable(await dataPostResponse.json())
    } else {
        console.error("Failed to add new game")
    }
}

/**
 * Click event listener for the modify game button. Sends a PUT request to the games endpoint on the server and updates the row in the table
 * @param {Event} evt 
 */
export const modifyGame = async (evt) => {
    evt.preventDefault();
    const updatedData = getFormValues("#modifyForm")

    const modifyRequestResponse = await fetch("/games", {
        method:"PUT",
        body: JSON.stringify(updatedData)
    })

    if(modifyRequestResponse.status === 200){
        updateGameInTable(await modifyRequestResponse.json())
    }

    switchForm()
}