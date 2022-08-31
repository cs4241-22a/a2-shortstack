import { fetchGames, modifyGame } from "./requests.js";
import { generateRow, parseRowToGameObject, toggleVisibility } from "./util.js";

/**
 * 
 */
export const updateTable = async () => {
    const gamesData = await fetchGames();
    gamesData.forEach(game => {
        addGameToTable(game)
    });
}

/**
 * 
 * @param {GameObject} gameObj 
 */
export const addGameToTable = (gameObj) => {
    const table = document.querySelector('tbody');
    table.innerHTML += generateRow(gameObj);

    const tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        tableRows.item(i).addEventListener("click", sendGameToModify)
    }
}

export const switchForm = () => {
    const submitSection = document.querySelector("#submissionForm")
    const modifySection = document.querySelector("#modifyForm")

    toggleVisibility(submitSection)
    toggleVisibility(modifySection)
}

/**
 * 
 * @param {Event} event 
 */
const sendGameToModify = (event) => {
    const selectedGame = parseRowToGameObject(event.target.parentElement)
    const modifySection = document.querySelector("#modifyForm")

    switchForm();

    const modifyIdField = modifySection.querySelector("#idField")
    const modifyDatePicker = modifySection.querySelector("#modifyDatePicker")
    const modifyHitsField = modifySection.querySelector("#modifyHitsField")
    const modifyAtBatsField = modifySection.querySelector("#modifyAtBatsField")

    modifyIdField.value = selectedGame.id;
    modifyDatePicker.value = selectedGame.date;
    modifyHitsField.value = selectedGame.hits;
    modifyAtBatsField.value = selectedGame.atBats;
}

const getRowsInTable = () => {
    const table = document.querySelector("tbody");
    return table.children;
}

/**
 * 
 * @param {GameObject} gameObject 
 */
export const updateGameInTable = (gameObject) => {
    const tableRows = getRowsInTable();
    
    for(let i = 0; i<tableRows.length; i++){
        const row = tableRows.item(i);
        const rowGameID = row.children.item(0);
        if(rowGameID.innerHTML == gameObject.id) {
            row.outerHTML = generateRow(gameObject);
            document.querySelector(`#game_${gameObject.id}`).addEventListener("click", sendGameToModify);
        }
    }
}