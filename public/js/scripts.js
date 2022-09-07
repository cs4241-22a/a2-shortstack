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
    const mainPage = document.getElementById('main-page');
    mainPage.classList.remove("hidden");
    console.log("Setting up main page...");
}