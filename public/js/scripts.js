let current_row = 0

//Submit function that uses POST and then resets all fields in the form
const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()
    //Define variables
    const
        get_game = document.getElementById('game'),
        get_character = document.getElementById('character'),
        get_kills = document.getElementById('kills'),
        get_assists = document.getElementById('assists'),
        get_deaths = document.getElementById('deaths'),
        json = {game: get_game.value, character: get_character.value, kills: get_kills.value, assists: get_assists.value, deaths: get_deaths.value},
        body = JSON.stringify(json)
    //Process submit through POST
    fetch('/submit', {
        method: 'POST',
        body
    }).then(async response => {
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
    //Clear the fields in the form
    get_game.value = ''
    get_character.value = ''
    get_kills.value = ''
    get_assists.value = ''
    get_deaths.value = ''
    document.getElementById('submitB').disabled = true

    return false
}

//Cancel function that resets all fields in the form
const cancel = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()
    //Clear the fields in the form
    document.getElementById('game').value = ''
    document.getElementById('character').value = ''
    document.getElementById('kills').value = ''
    document.getElementById('assists').value = ''
    document.getElementById('deaths').value = ''
    document.getElementById('description').textContent = 'Add Game Stats'
    document.getElementById('submitB').onclick = submit

    return false
}

//Edit function that allows to edit data set in the form window
//Uses GET
const editStats = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let id = parseInt(e.target.id.substring(4))
    //Process list through GET
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        let json = await response.json()
        let data = json[id]
        //Change variables in the data set
        document.getElementById('game').value = data.game
        document.getElementById('character').value = data.character
        document.getElementById('kills').value = data.kills
        document.getElementById('assists').value = data.assists
        document.getElementById('deaths').value = data.deaths
        document.getElementById('description').textContent = 'Modify Game Stats'
        document.getElementById('submitB').onclick = updateStats
        current_row = id
    }).catch((reason) => {
        console.log(reason)
    })
}

//Update function that uses PATCH
const updateStats = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()
    //Define variables
    const
        get_game = document.getElementById('game'),
        get_character = document.getElementById('character'),
        get_kills = document.getElementById('kills'),
        get_assists = document.getElementById('assists'),
        get_deaths = document.getElementById('deaths'),
        json = {game: get_game.value, character: get_character.value, kills: get_kills.value, assists: get_assists.value, deaths: get_deaths.value},
        body = JSON.stringify(json)
    fetch('/' + current_row, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        document.getElementById('game').value = ''
        document.getElementById('character').value = ''
        document.getElementById('kills').value = ''
        document.getElementById('assists').value = ''
        document.getElementById('deaths').value = ''
        document.getElementById('description').textContent = 'Add Game Stats'
        document.getElementById('submitB').onclick = submit
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    return false
}

//Delete function that uses DELETE and removes data set
const deleteStats = function (e) {
    cancel(e)
    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

//Display all of the data sets in the table + edit/delete buttons
const displayStats = function (json) {
    //Create table
    let html =
        '<table>\n' +
        '        <tr>\n' +
        '            <th>Game</th>\n' +
        '            <th>Character</th>\n' +
        '            <th>Kills</th>\n' +
        '            <th>Assists</th>\n' +
        '            <th>Deaths</th>\n' +
        '            <th>KDA</th>\n' +
        '            <th></th>\n' +
        '            <th></th>\n' +
        '        </tr>\n'
    let idx = 0
    for (let stat of json) {
        html += `<tr class="tableRow" id="${idx}">`
        html += '<td>' + stat.game + '</td>'
        html += '<td>' + stat.character + '</td>'
        html += '<td>' + stat.kills + '</td>'
        html += '<td>' + stat.assists + '</td>'
        html += '<td>' + stat.deaths + '</td>'
        //Change kda background based on value
        if (Number(stat.kda) <= Number(1.5))
            html += '<td style="background-color: rgb(255, 82, 82); color: black">' + stat.kda + '</td>'
        else if (Number(stat.kda) >= Number(2.5))
            html += '<td style="background-color: rgb(91, 219, 87); color: black">' + stat.kda + '</td>'
        else
            html += '<td style="background-color: rgb(245, 178, 78); color: black">' + stat.kda + '</td>'
        html += '<td><button class="editB">Edit</button></td>'
        html += '<td><button class="deleteB">Delete</button></td>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    document.getElementById('table').innerHTML = html

    const editButtons = document.getElementsByClassName('editB')
    idx = 0
    for (let button of editButtons) {
        button.onclick = editStats
        button.id = 'edit' + idx
        idx++
    }

    const deleteButtons = document.getElementsByClassName('deleteB')
    idx = 0
    for (let button of deleteButtons) {
        button.onclick = deleteStats
        button.id = 'delete' + idx
        idx++
    }
}

//Window onload function that starts up in the beginning
window.onload = function () {
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    const submitButton = document.getElementById('submitB')
    submitButton.onclick = submit

    const resetButton = document.getElementById('resetB')
    resetButton.onclick = cancel

    const addData = document.getElementById('addData')[0]
    addData.oninput = () => {
        document.getElementById('submitB').disabled = document.getElementById('game').value.trim() === '' || 
                                                      document.getElementById('character').value.trim() === '' ||
                                                      document.getElementById('kills').value.trim() === '' ||
                                                      document.getElementById('assists').value.trim() === '' ||
                                                      document.getElementById('deaths').value.trim() === ''
    }
}
