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

    updateSummaries(updatedSummary);
    updateData(json);

    return false;
}

const updateSummaries = function (summary) {
    const averageHours = document.getElementById('average-hours-stat');
    const dreamPercentage = document.getElementById('dream-percentage-stat');
    const averageRating = document.getElementById('average-rating-stat');
    averageHours.innerText = summary['averageTimeAsleep'];
    dreamPercentage.innerText = `${summary['dreamPercentage'].toFixed(2) * 100}%`;
    averageRating.innerText = `${Math.round(summary['averageSleepRating'] * 100) / 100}/5`;
}

const updateData = function (data) {
    const table = document.getElementById('sleep-data');

    if(!Array.isArray(data)) {
        data = [data];
    }

    data.forEach(datum => {
        const row = table.insertRow(-1);
        const timeAsleepCell = row.insertCell(0);
        const timeAwakeCell = row.insertCell(1);
        const ratingCell = row.insertCell(2);
        const didDreamCell = row.insertCell(3);
        const dreamSummaryCell = row.insertCell(4);
        console.log(datum['hadDream'])
        row.classList.add('history-entry')
        timeAsleepCell.innerText = new Date(datum['timeSleep']).toLocaleString();
        timeAwakeCell.innerText = new Date(datum['timeWakeUp']).toLocaleString();
        ratingCell.innerText = datum['sleepRating'];
        didDreamCell.innerText = datum['hadDream'] ? '✓' : '✗';
        dreamSummaryCell.innerText = datum['hadDream'] ? datum['dreamDescription'] : 'N/A';
    })
}

window.onload = function () {
    const form = document.getElementById('sleep-form');
    form.onsubmit = submit;
    fetch('/getData')
        .then(res => res.json())
        .then(json => {
            updateSummaries(json['summary']);
            updateData(json['sleepData'])
        })
}
