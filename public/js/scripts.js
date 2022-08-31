import { updateTable } from "./table.js";
import {modifyGame, submitNewGame} from "./requests.js";


window.onload = async function () {
    await updateTable();

    const submitButton = document.querySelector('#submitBtnSubmit');
    const modifyButton = document.querySelector("#modifyBtnSubmit");
    const deleteButton = document.querySelector("#modifyBtnDelete");

    submitButton.addEventListener("click", submitNewGame);
    modifyButton.addEventListener("click", modifyGame);
}


/**
 * @typedef {Object} GameObject
 * @property {Number} id
 * @property {String} date
 * @property {Number} hits
 * @property {Number} atBats
 * @property {Number} avg
 */