import { useEffect } from 'react'

export default function TitlePage({active, setMainPageActive}) {

    useEffect(() => {
        // Do opening animation...
        const getStartedButton = document.getElementById("get-started-button");
        setTimeout(() => {
            getStartedButton.classList.remove("hidden");
        }, 1000);
    })

  return (
    <div id="title-page" className={"title-page " + (active ? "" : "hidden")}>
        <h1>Budgeteer</h1>
        <h3>By: Joe Dobbelaar</h3>
        <h2>How much money are you earning (or losing) every second?</h2>
        <button id="get-started-button" className="large hidden dark" onClick={() => setMainPageActive(true)}>find out</button>
    </div>
  )
}
