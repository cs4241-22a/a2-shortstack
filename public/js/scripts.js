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

        function testInputAndReturnValue(input) {
            if (input.value === "") {
                validFlag = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
                return input.value;
            }
        }

        let newTitle = testInputAndReturnValue(titleInput);
        let newAmount = testInputAndReturnValue(amountInput);
        let newTimeUnit = testInputAndReturnValue(timeUnitInput);

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
        table.classList.remove("invisible");
    }

    function populateTable() {
        console.log("Populating table...");
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
        populateTable();
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
        })
          .then((res) => {
            // do something with the reponse 
            console.log(res)
        })
    }
    
    function sendNewExpense(data) {
        if (!data.isValid) {
            return;
        }
        clearForm();
        hideForm();
        console.log("Sending new expense to server...");
    }

    updateMainPageDisplay(null);
}

function updateMainPageDisplay(delta) {

    const earningLosingMessage = document.getElementById("earning-losing-message");
    const amountMessage = document.getElementById("amount-message");
    const everySecondMessage = document.getElementById("every-second-message");

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    if (!delta) {
        earningLosingMessage.innerHTML = "Add an"
        amountMessage.innerHTML = "INCOME or EXPENSE";
        everySecondMessage.innerHTML = "to see what you're making / losing!";
    } else {
        earningLosingMessage.innerHTML = "You're " + (delta >= 0 ? "making" : "losing");
        amountMessage.innerHTML = formatter.format(0);
        everySecondMessage.innerHTML = "every second.";
    }
}