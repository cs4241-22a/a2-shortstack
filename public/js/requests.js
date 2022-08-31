import { addGameToTable, switchForm, updateGameInTable } from "./table.js";
import { getFormValues } from "./util.js";

/**
 * 
 * @returns 
 */
export const fetchGames = async () => {
    const gamesRequest = await fetch("/games");
    const gamesData = await gamesRequest.json();

    return gamesData
}

/**
 * 
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
        console.error("AHHHHHHHHH")
    }
}



/**
 * 
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