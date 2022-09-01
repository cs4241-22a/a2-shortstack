const submit = function (e) {
    e.preventDefault()
    const inputs = e.target.elements
    const json = {
        timeSleep: inputs['sleep-time'].value,
        timeWakeUp: inputs['wake-time'].value,
        sleepRating: inputs['sleep-rating'].value, // Out of 5
        hadDream: inputs['did-dream'].checked,
        dreamDescription: inputs['dream-description'].value,
    }
    console.log(json)
    const body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST', body
    })
        .then(function (response) {
            // do something with the reponse
            console.log(response)
        })

    return false
}

window.onload = function () {
    // const button = document.querySelector('button')
    const form = document.getElementById('sleep-form')
    form.onsubmit = submit
    // button.onclick = submit
}
