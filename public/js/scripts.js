let name = undefined;
const runReactionTest = (function () {
  let first_press = true;
  let time_initated = undefined;
  const elem = document.querySelector(".reaction_test");
  async function turnButtonGreen(elem) {
    setTimeout(() => {
      if (!first_press) {
        elem.style.backgroundColor = "green";
        elem.innerHTML = "Go!";
        time_initated = new Date();
      }
    }, 2000 + 5000 * Math.random());
  }
  return function () {
    if (name === undefined) {
      alert("Enter your name for the scoreboard:");
    }else{
      let time_finished = new Date();
      if (first_press) {
        elem.style.backgroundColor = "red";
        elem.innerHTML = "Get Ready.";
        first_press = false;
        turnButtonGreen(elem);
      } else {
        first_press = true;
        if (time_initated != undefined) {
          let time_taken = time_finished - time_initated;
          elem.innerHTML = `Reaction Speed: ${time_taken} ms.`;
          time_initated = undefined;
          sendScore(name, time_taken, time_finished);
        } else {
          elem.innerHTML = "Too Early :(";
        }
      }
    }
  };
})();

function sendScore(name, time_taken, time_finished) {
  const json = {
      name: name,
      speed: time_taken,
      date: `${
        time_finished.getMonth() + 1
      }/${time_finished.getDate()}/${time_finished.getFullYear()}`,
      rank: undefined,
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => drawScoreBoard(json));

  return false;
}

function updateScores() {
  fetch("/scores", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => drawScoreBoard(json));
}
function drawScoreBoard(json) {
  const elem = document.getElementById("scoreboard");
  let updatedHTML = "<ol>\n";
  for (let i = 0; i < json.length; i++) {
    let curr = undefined;
    for (let j = 0; j < json.length; j++) {
      if (json[j].rank === i + 1) {
        curr = json[j];
        break;
      }
    }
    updatedHTML += `<li><button id="rankings"> ${curr.speed} ms by ${curr.name} on ${curr.date} </button></li>\n`;
  }
  updatedHTML += "</ol>";

  elem.innerHTML = updatedHTML;
  const buttons = document.querySelectorAll("#rankings");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
      e.preventDefault()
      deleteScore(i + 1);
    };
  }
}
function deleteScore(ranking) {
  const json = {
      rank: ranking,
    },
    body = JSON.stringify(json);

  fetch("/delete", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => drawScoreBoard(json));

  return false;
}
function setName(e){
  e.preventDefault();
  let input = document.querySelector( '#name' );
  name = input.value;
  input.disabled = true;
  let button = document.querySelector("#nameEntry");
  button.disabled = true;
}

window.onload = function () {
  const button1 = document.querySelector(".reaction_test");
  button1.onclick = runReactionTest;
  const button2 = document.querySelector("#nameEntry");
  button2.onclick = setName;
  updateScores();
  setInterval(updateScores, 5000);
};
