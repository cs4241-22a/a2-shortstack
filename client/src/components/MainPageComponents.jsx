import { useState, useEffect } from 'react';

export function MainPageHeader() {
  return (
    <section className="top">
        <h2 id="earning-losing-message">EARNING/LOSING</h2>
        <h1 id="amount-message">AMOUNT</h1>
        <h2 id="every-second-message">EVERY SECOND</h2>
    </section>
  )
}

export function MainPageTable({visible, updateMainPageDisplay}) {

    const [tableData, setTableData] = useState(null)


    function updateTableFromDB() {

        console.log("Fetching table data...");
        fetch( '/table', {
            method:'GET',
        }).then((res) => {
            // do something with the reponse 
            res.json().then((appData) => {
                setTableData(JSON.parse(appData));
            })
        })
    }


    useEffect(() => {

        fetch('/delta', {
            method:"GET"
        }).then((res) => {
            res.json().then((newData) => {
                updateMainPageDisplay(JSON.parse(newData).delta);
            })
        })
        updateTableFromDB();
    }, [updateMainPageDisplay])

    function handleDelete(dataPoint) {
        console.log("Deleting: " + dataPoint.id);
        fetch( '/delete', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataPoint)
        }).then((res) => {
            // do something with the response
            res.json().then((appData) => {
                populateTable(JSON.parse(appData));
            })
        })
        fetch('/delta', {
            method:"GET"
        }).then((res) => {
            res.json().then((newData) => {
                updateMainPageDisplay(JSON.parse(newData).delta);
                updateTableFromDB();
            })
        })
    }

    function populateTable(data) {
        if (!data) {
            return (<div></div>)
        }
        if (!data.appData) {
            return (
                <div className="centered">
                    <p>Server does not have any data to display!</p>
                    <p>Add an income or expense to get started.</p>
                </div>
            );
        } else {
            if (data.appData.length > 0) {
                // Create rows for each dataPoint!
                return data.appData.map((dataPoint) => {
                    if (!dataPoint) {
                        return <div></div>
                    }
                    return (
                        <div className="table-row">
                            <ul>
                                <li className="data clickable" onClick={() => handleDelete(dataPoint)}>Click to Delete</li>
                                <li className="data">
                                    {dataPoint.title ? dataPoint.title[0].toUpperCase() + dataPoint.title.substring(1) : ""}
                                </li>
                                <li className="data">
                                    { makeSpan(dataPoint.positive, dataPoint.amount) }
                                </li>
                                <li className="data">
                                    {parseDataPointTimeUnit(dataPoint.timeUnit)}
                                </li>
                            </ul>
                        </div>
                    )
                })
            } else {
                return(
                    <div className="centered">
                        <p>Server does not have any data to display!</p>
                        <p>Add an income or expense to get started.</p>
                    </div>
                )
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

    return (
        <div id="table" className={"table-container " + (!visible ? "invisible" : "")}>
            <div className="table-row">
              <ul>
                <li>Action</li>
                <li>Title</li>
                <li>Amount</li>
                <li>Time Unit</li>
              </ul>
            </div>
            <div id="table-contents" className="table-contents">
                {populateTable(tableData)}
            </div>
        </div>
    )
}

export function MainPageForm({title, setVisible, visible, updateMainPageDisplay, setTableVisible}) {
    
    const [formData, setFormData] = useState(null);


    // Send data to DB when form data changes
    useEffect(() => {
        if (title === "ADD INCOME") {
            sendNewIncome(formData);
        } else {
            sendNewExpense(formData);
        }
    }, [formData]);

    useEffect(() => {
        clearForm();
    }, [visible]);

    const [newTitle, setNewTitle] = useState(null);
    const [newAmount, setNewAmount] = useState(null);
    const [newTimeUnit, setNewTimeUnit] = useState("day");

    const [titleError, setTitleError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [timeUnitError, setTimeUnitError] = useState(false);

    function clearForm() {
        const titleInput = document.getElementById("title");
        const amountInput = document.getElementById("amount");
        const timeUnitInput = document.getElementById("time-unit");
        titleInput.value = "";
        amountInput.value = "";
        timeUnitInput.value = "";
        titleInput.classList.remove("error");
        amountInput.classList.remove("error");
        timeUnitInput.classList.remove("error");
    }

    function sendNewIncome(data) {
        if (!data) {
            return;
        }
        if (!data.isValid) {
            return;
        }
        clearForm();
        setVisible(false);
        console.log("Sending new income to server...");
        fetch( '/submit', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => {
            // do something with the reponse 
            res.json().then((newData) => {
                updateMainPageDisplay(JSON.parse(newData).newDelta);
                setTableVisible(true);
            })
        })
    }

    function sendNewExpense(data) {
        if (!data) {
            return;
        }
        if (!data.isValid) {
            return;
        }
        clearForm();
        setVisible(false);
        console.log("Sending new expense to server...");
        data.amount = data.amount * -1;
        fetch( '/submit', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => {
            // do something with the reponse 
            res.json().then((newData) => {
                updateMainPageDisplay(JSON.parse(newData).newDelta);
                setTableVisible(true);
            })
        })
    }

    function handleFormSubmit() {
        let validFlag = true;
    
        function testInputAndReturnValue(input, numeric, inputType) {
            if (input === "" || (numeric && isNaN(input))) {
                validFlag = false;
                switch(inputType) {
                    case "title":
                        setTitleError(true);
                        break;
                    case "amount":
                        setAmountError(true);
                        break;
                    case "timeUnit":
                        setTimeUnitError(true);
                        break;
                    default:
                        break;
                }
            } else {
                switch(inputType) {
                    case "title":
                        setTitleError(false);
                        break;
                    case "amount":
                        setAmountError(false);
                        break;
                    case "timeUnit":
                        setTimeUnitError(false);
                        break;
                    default:
                        break;
                }
                return input;
            }
        }

        let newValidatedTitle = testInputAndReturnValue(newTitle, false);
        let newValidatedAmount = testInputAndReturnValue(newAmount, true);
        let newValidatedTimeUnit = testInputAndReturnValue(newTimeUnit, false);

        setFormData ({
            isValid: validFlag,
            title: newValidatedTitle,
            amount: newValidatedAmount,
            timeUnit: newValidatedTimeUnit,
        });
    }

    return(
        <div id="form" className={"form-container " + (!visible ? "invisible" : "")}>
            <h2 id="form-title">{title}</h2>
            <form>
              <label htmlFor="title">Title:</label><br />
              <input className={(titleError ? "error" : "")} type="text" name="title" id="title" onChange={(e) => setNewTitle(e.target.value)}/><br />
              <label htmlFor="amount">Amount:</label><br />
              <input className={(amountError ? "error" : "")} type="text" name="amount" id="amount" onChange={(e) => setNewAmount(e.target.value)} /><br />
              <label htmlFor="time-unit">Time Unit:</label><br />
              <select className={(timeUnitError ? "error" : "")} name="time-unit" id="time-unit" onChange={(e) => setNewTimeUnit(e.target.value)}>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select><br />
            </form>
            <button id="submit-button" className="small dark" onClick={() => handleFormSubmit()}>submit</button>
        </div>
    )
}

function makeSpan(positive, amt) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const amtstring = formatter.format(amt);
    return (
        <span className={positive ? "positive" : "negative"}>{amtstring}</span>
    )
}