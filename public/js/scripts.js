const submit = async function (e) {
    e.preventDefault()
    const inputs = e.target.elements;
    const json = {
        timeSleep: inputs['sleep-time'].value,
        timeWakeUp: inputs['wake-time'].value,
        sleepRating: inputs['sleep-rating'].value, // Out of 5
        hadDream: inputs['did-dream'].checked,
        dreamDescription: inputs['dream-description'].value,
    }
    console.log(json);
    const body = JSON.stringify(json);

    const rawRes = await fetch('/submit', {method: 'POST', body});
    const updatedSummary = await rawRes.json();

    await updateData(updatedSummary)

    return false;
}

const updateData = async function (summary) {
    const averageHours = document.getElementById('average-hours-stat');
    const dreamPercentage = document.getElementById('dream-percentage-stat');
    const averageRating = document.getElementById('average-rating-stat');
    averageHours.innerText = summary['averageTimeAsleep'];
    dreamPercentage.innerText = `${summary['dreamPercentage'].toFixed(2)*100}%`;
    averageRating.innerText = `${Math.round(summary['averageSleepRating']*100)/100}/5`;
}

window.onload = function () {
    const form = document.getElementById('sleep-form');
    form.onsubmit = submit;
    fetch('/getData')
        .then(res => res.json())
        .then(json => updateData(json['summary']))
}
