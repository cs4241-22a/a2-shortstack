import {useEffect, useState} from 'react'

import { MainPageHeader, MainPageForm, MainPageTable } from "./MainPageComponents";

export default function MainPage({active}) {

    const [formTitle, setFormTitle] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [tableVisible, setTableVisible] = useState(true);

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

    function handleAddIncomeClick() {
        setFormVisible(true);
        setFormTitle("ADD INCOME");
        setTableVisible(false);
    }
    
    function handleAddExpenseClick() {
        setFormVisible(true);
        setFormTitle("ADD EXPENSE");
        setTableVisible(false);
    }

    function handleViewTableClick() {
        setTableVisible(true);
        setFormVisible(false);
    }

  return (
    <div id="main-page" className={"main-page " + (active ? "" : "hidden")}>
        <MainPageHeader />
        <section className="middle">
            <MainPageForm title={formTitle} updateMainPageDisplay={updateMainPageDisplay} setVisible={setFormVisible} visible={formVisible} setTableVisible={setTableVisible}/>
            <MainPageTable visible={tableVisible} updateMainPageDisplay={updateMainPageDisplay}/>
        </section>
        <section className="bottom">
          <button id="add-income-button" className="large light" onClick={() => handleAddIncomeClick()}>add income</button>
          <button id="add-expense-button" className="large light" onClick={() => handleAddExpenseClick()}>add expense</button>
          <button id="view-table-button" className="large light" onClick={() => handleViewTableClick()}>view table</button>
        </section>
    </div>
  )
}
