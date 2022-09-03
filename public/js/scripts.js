let current_row = 0

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const
        get_game = document.getElementById('game'),
        get_char = document.getElementById('char'),
        get_kills = document.getElementById('kills'),
        get_assists = document.getElementById('assists'),
        get_deaths = document.getElementById('deaths'),
        json = {game: get_game.value, char: get_char.value, kills: get_kills.value, assists: get_assists.value, deaths: get_deaths.value},
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    }).then(async response => {
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    get_game.value = ''
    get_char.value = ''
    get_kills.value = ''
    get_assists.value = ''
    get_deaths.value = ''
    document.getElementById('submitB').disabled = true

    return false
}

const cancel = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    document.getElementById('game').value = ''
    document.getElementById('char').value = ''
    document.getElementById('kills').value = ''
    document.getElementById('assists').value = ''
    document.getElementById('deaths').value = ''
    document.getElementById('description').textContent = 'Add Game Stats'
    document.getElementById('submitB').onclick = submit

    return false
}

const editTask = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let id = parseInt(e.target.id.substring(4))
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        let json = await response.json()
        let data = json[id]
        document.getElementById('game').value = data.game
        document.getElementById('char').value = data.character
        document.getElementById('kills').value = data.kills
        document.getElementById('assists').value = data.assists
        document.getElementById('deaths').value = data.deaths
        document.getElementById('description').textContent = 'Modify Game Stats'
        document.getElementById('submitB').onclick = updateTask
        current_row = id
    }).catch((reason) => {
        console.log(reason)
    })
}

const updateTask = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const
        get_game = document.getElementById('game'),
        get_char = document.getElementById('char'),
        get_kills = document.getElementById('kills'),
        get_assists = document.getElementById('assists'),
        get_deaths = document.getElementById('deaths'),
        json = {game: get_game.value, char: get_char.value, kills: get_kills.value, assists: get_assists.value, deaths: get_deaths.value},
        body = JSON.stringify(json)
    fetch('/' + current_row, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        document.getElementById('game').value = ''
        document.getElementById('char').value = ''
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

const deleteTask = function (e) {
    cancel(e)
    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        displayStats(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

const displayStats = function (json) {
    let html =
        '<table>\n' +
        '        <tr>\n' +
        '            <th><strong>Game</strong></th>\n' +
        '            <th><strong>Character</strong></th>\n' +
        '            <th><strong>Kills</strong></th>\n' +
        '            <th><strong>Assists</strong></th>\n' +
        '            <th><strong>Deaths</strong></th>\n' +
        '            <th><strong>KDA</strong></th>\n' +
        '            <th><strong>Edit</strong></th>\n' +
        '            <th><strong>Delete</strong></th>\n' +
        '        </tr>\n'
    let idx = 0
    for (let stat of json) {
        html += `<tr class="tableRow" id="${idx}">`
        html += '<th>' + stat.game + '</th>'
        html += '<th>' + stat.character + '</th>'
        html += '<th>' + stat.kills + '</th>'
        html += '<th>' + stat.assists + '</th>'
        html += '<th>' + stat.deaths + '</th>'
        if (Number(stat.kda) <= Number(1.8))
            html += '<th style="background-color: red; color: white">' + stat.kda + '</th>'
        if (Number(stat.kda) >= Number(2.5))
            html += '<th style="background-color: orange; color: white">' + stat.kda + '</th>'
        else
            html += '<th style="background-color: green; color: white">' + stat.kda + '</th>'
        html += '<th><button id="editB">Edit</button></th>'
        html += '<th><button id="deleteB">Delete</button></th>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    document.getElementById('table').innerHTML = html

    const editButtons = document.getElementById('editB')
    idx = 0
    for (let button of editButtons) {
        button.onclick = editTask
        button.id = 'edit' + idx
        idx++
    }

    const deleteButtons = document.getElementById('deleteB')
    idx = 0
    for (let button of deleteButtons) {
        button.onclick = deleteTask
        button.id = 'delete' + idx
        idx++
    }
}

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
                                                      document.getElementById('char').value.trim() === '' ||
                                                      document.getElementById('kills').value.trim() === '' ||
                                                      document.getElementById('assists').value.trim() === '' ||
                                                      document.getElementById('deaths').value.trim() === ''
    }
}
