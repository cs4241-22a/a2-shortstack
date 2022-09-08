window.onload = () => {
    // Do opening animation...
    const titlePage = document.getElementById('title-page');
    const getStartedButton = document.getElementById("get-started-button");
    titlePage.classList.remove("hidden");
    setTimeout(() => {
        getStartedButton.classList.remove("hidden");
    }, 1000);

    // Add get-started button functionality
    getStartedButton.onclick = () => {
        titlePage.classList.add("hidden");
        setUpMainPage();
    }
}

function setUpMainPage() {
    const form = document.getElementById("form");
    const formTitle = document.getElementById("form-title");
    const table = document.getElementById("table");
    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const timeUnitInput = document.getElementById("time-unit");

    function collectFormData() {
        let validFlag = true;

        function testInputAndReturnValue(input, numeric) {
            if (input.value === "" || (numeric && isNaN(input.value))) {
                validFlag = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
                return input.value;
            }
        }

        function getTimeUnitById(id) {
            console.log(id)
            switch (id) {
                case "1":
                    return "day";
                case "2":
                    return "week";
                case "3":
                    return "month";
                case "4":
                    return "year";
                default:
                    return "Error!";
            }
        }

        let newTitle = testInputAndReturnValue(titleInput, false);
        let newAmount = testInputAndReturnValue(amountInput, true);
        let newTimeUnit = testInputAndReturnValue(timeUnitInput, false);

        return {
            isValid: validFlag,
            title: newTitle,
            amount: newAmount,
            timeUnit: newTimeUnit,
        }
    }

    function setFormTitle(title) {    
        formTitle.innerHTML = title;
    }

    function clearForm() {
        titleInput.value = "";
        amountInput.value = "";
        timeUnitInput.value = "";
        titleInput.classList.remove("error");
        amountInput.classList.remove("error");
        timeUnitInput.classList.remove("error");
    }

    function showForm() {
        clearForm();
        form.classList.remove("invisible");
    }

    function hideForm() {
        form.classList.add("invisible");
    }

    function hideTable() {
        table.classList.add("invisible");
    }

    function showTable() {
        updateTableFromDB();
        table.classList.remove("invisible");
    }

    const mainPage = document.getElementById('main-page');
    mainPage.classList.remove("hidden");
    console.log("Setting up main page...");
    
    const addIncomeButton = document.getElementById("add-income-button");
    const addExpenseButton = document.getElementById("add-expense-button");
    const viewTableButton = document.getElementById("view-table-button");
    const submitButton = document.getElementById("submit-button");
    
    // Add button functionality
    addIncomeButton.onclick = () => {
        hideTable();
        setFormTitle("Add Income:");
        showForm();
        submitButton.onclick = () => {
            sendNewIncome(collectFormData());
        }
    }
    addExpenseButton.onclick = () => {
        hideTable();
        setFormTitle("Add Expense:");
        showForm();
        submitButton.onclick = () => {
            sendNewExpense(collectFormData());
        }
    }
    viewTableButton.onclick = () => {
        hideForm();
        updateTableFromDB();
        showTable();
    }

    function sendNewIncome(data) {
        if (!data.isValid) {
            return;
        }
        clearForm();
        hideForm();
        console.log("Sending new income to server...");
        const body = JSON.stringify(data);
        fetch( '/submit', {
            method:'POST',
            body 
        }).then((res) => {
            // do something with the reponse 
            res.json().then((newData) => {
                updateMainPageDisplay(newData.newDelta);
                showTable();
            })
        })
    }
    
    function sendNewExpense(data) {
        if (!data.isValid) {
            return;
        }
        clearForm();
        hideForm();
        console.log("Sending new expense to server...");
        data.amount = data.amount * -1;
        const body = JSON.stringify(data);
        fetch( '/submit', {
            method:'POST',
            body 
        }).then((res) => {
            // do something with the reponse 
            res.json().then((newData) => {
                updateMainPageDisplay(newData.newDelta);
                showTable();
            })
        })
    }

    fetch('/delta', {
        method:"GET"
    }).then((res) => {
        res.json().then((newData) => {
            updateMainPageDisplay(newData.delta);
        })
    })
    updateTableFromDB();
}

function updateMainPageDisplay(delta) {

    const earningLosingMessage = document.getElementById("earning-losing-message");
    const amountMessage = document.getElementById("amount-message");
    const everySecondMessage = document.getElementById("every-second-message");

    if (delta === 0) {
        earningLosingMessage.innerHTML = "You're making";
        amountMessage.innerHTML = "$0";
        everySecondMessage.innerHTML = "every second.";
    } else if (!delta) {
        earningLosingMessage.innerHTML = "Add an"
        amountMessage.innerHTML = "INCOME or EXPENSE";
        everySecondMessage.innerHTML = "to see what you're making / losing!";
    } else {
        earningLosingMessage.innerHTML = "You're " + (delta >= 0 ? "<span class='positive'>making</span>" : "<span class='negative'>losing</span>");
        amountMessage.innerHTML = "$" + Math.abs(delta);
        everySecondMessage.innerHTML = "every second.";
    }
}


function populateTable(data) {
    const tableContents = document.getElementById("table-contents");

    // Remove all children...
    while (tableContents.firstChild) {
        tableContents.removeChild(tableContents.firstChild);
    }

    if (!data.appData) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("centered");
        const messageLine1 = document.createElement("p");
        const messageLine2 = document.createElement("p");
        messageLine1.innerHTML = "Server does not have any data to display!"
        messageLine2.innerHTML = "Add an income or expense to get started."
        messageContainer.appendChild(messageLine1);
        messageContainer.appendChild(messageLine2);
        tableContents.appendChild(messageContainer);
    } else {
    
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    
        if (data.appData.length > 0) {
            // Create rows for each dataPoint!
            for (const dataPoint of data.appData) {
                const rowContainer = document.createElement("div");
                rowContainer.classList.add("table-row");
                const list = document.createElement("ul");
                const deleteItem = document.createElement("li");
                deleteItem.classList.add("data");
                deleteItem.classList.add("clickable");
                deleteItem.onclick = () => {
                    handleDelete(dataPoint);
                }
                deleteItem.innerHTML = "Click to Delete";
                const titleItem = document.createElement("li");
                titleItem.classList.add("data");
                titleItem.innerHTML = dataPoint.title[0].toUpperCase() + dataPoint.title.substring(1);
                const amountItem = document.createElement("li");
                amountItem.classList.add("data");
                amountItem.innerHTML = (dataPoint.positive ? "<span class='positive'>" : "<span class='negative'>-") + formatter.format(dataPoint.amount) + "</span>";
                const timeItem = document.createElement("li");
                timeItem.classList.add("data");
                timeItem.innerHTML = parseDataPointTimeUnit(dataPoint.timeUnit);
                list.appendChild(deleteItem);
                list.appendChild(titleItem);
                list.appendChild(amountItem);
                list.appendChild(timeItem);
                rowContainer.appendChild(list);
                tableContents.appendChild(rowContainer);
            }
        } else {
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("centered");
            const messageLine1 = document.createElement("p");
            const messageLine2 = document.createElement("p");
            messageLine1.innerHTML = "Server does not have any data to display!"
            messageLine2.innerHTML = "Add an income or expense to get started."
            messageContainer.appendChild(messageLine1);
            messageContainer.appendChild(messageLine2);
            tableContents.appendChild(messageContainer);
        }
    }

    

    function parseDataPointTimeUnit(timeUnit) {
        switch (timeUnit) {
            case "day":
                return "Daily";
            case "week":
                return "Weekly";
            case "month":
                return "Monthly";
            case "year":
                return "Yearly";
            default:
                return "Error!";
        }
    }
}

function updateTableFromDB() {

    console.log("Fetchind table data...");
    fetch( '/table', {
        method:'GET',
    }).then((res) => {
        // do something with the reponse 
        res.json().then((appData) => {
            populateTable(appData);
        })
    })
}

function handleDelete(dataPoint) {
    console.log("Deleting: " + dataPoint.id);
    const body = JSON.stringify(dataPoint);
    fetch( '/delete', {
        method:'POST',
        body
    }).then((res) => {
        // do something with the response
        res.json().then((appData) => {
            populateTable(appData);
        })
    })
    fetch('/delta', {
        method:"GET"
    }).then((res) => {
        res.json().then((newData) => {
            updateMainPageDisplay(newData.delta);
        })
    })
}