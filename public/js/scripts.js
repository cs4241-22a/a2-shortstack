// Add some Javascript code here, to run on the front end.
const handleSubmit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const form = e.target
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
        var input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }

    var date = new Date();
    date.setDate(date.getDate() + data.days)
    data.duedate = date.toLocaleString()

    const body = JSON.stringify(data)
    console.log(body)

    fetch( '/submit/', {
        method:'POST',
        body
    })
        .then(async function( response ) {
            var data = await response.json()
            console.log( data )
            console.log("response ^")
            form.reset()
            updateTable(data)
        })

    return false
}
const deleteData = (id) => {

    // var form = document.createElement('form');
    // form.setAttribute('method', 'post');
    // form.setAttribute('action', `/delete&id=${id}`);
    // form.style.display = 'hidden';
    // document.body.appendChild(form)
    // form.submit()
    fetch(`/delete?id=${id}`, {method: "POST"})
        .then(async function( response ) {
            var data = await response.json()
            console.log( data )
            console.log("response ^")
            updateTable(data)
        });
}

const priorities = {"Highest": 1, "High": 0.75, "Medium": 0.5,"Low": 0.25,"Lowest":0}

const updateTable = (dataJ) => {
    const table = document.querySelector('tbody')
    table.innerHTML = ""

    dataJ.sort(function (a, b) {
        return (priorities[b.priority]-(b.days*.01))-(priorities[a.priority]-(a.days*.01))
    })
    dataJ.map((value, index) => {
        const row = document.createElement("tr");
        row.innerHTML = ` <td>${value.task}</td>
                        <td>${value.days}</td>
                        <td>${value.duedate}</td>
                        <td>${value.priority}</td>
                        <td><button type="button" onclick="deleteData(${index});">DONE!</button></td>`;
        row.dataset.ind = index;
        table.appendChild(row);
    });
}

window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);


}