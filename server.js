const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.listen(process.env.PORT || 3001, () => {
    console.log('Now listening on port ' + process.env.PORT || 3001);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/build"));
app.use(cors());

app.use(bodyParser.json());

let appData = [
  {
    positive: true,
    title: "Bartending on Weekends",
    amount: 600,
    timeUnit: "week",
    id: 1,
  },
  {
    positive: true,
    title: "Investments",
    amount: 300,
    timeUnit: "year",
    id: 2,
  },
  {
    positive: true,
    title: "Birthday Money",
    amount: 500,
    timeUnit: "year",
    id: 3,
  },
  {
    positive: false,
    title: "Spotify Subscription",
    amount: 5.99,
    timeUnit: "month",
    id: 4,
  },
  {
    positive: false,
    title: "Netflix Subscription",
    amount: 14.99,
    timeUnit: "month",
    id: 5,
  },
  {
    positive: false,
    title: "Child Support",
    amount: 295,
    timeUnit: "week",
    id: 6,
  },
  {
    positive: false,
    title: "Magazine Subscription",
    amount: 35,
    timeUnit: "month",
    id: 7,
  }
];

function getDelta () {

  console.log("Getting delta")

  function getMoneyPerSecond(d) {
    let unitsPerYear = null;
    switch (d.timeUnit) {
      case "day":
        unitsPerYear = 356;
        break;
      case "week":
        unitsPerYear = 40;
        break;
      case "month":
        unitsPerYear = 12;
        break;
      case "year":
        unitsPerYear = 1;
        break;
      default:
        unitsPerYear = -1;
        break;
    }
    const moneyPerYear = d.amount * unitsPerYear;
    const moneyPerDay = moneyPerYear / 365.25;
    const moneyPerHour = moneyPerDay / 24;
    return (moneyPerHour / 3600);
  }

  // Add up all money from data
  let totalDelta = 0;
  for (const dataPoint of appData) {
    totalDelta += getMoneyPerSecond(dataPoint);
  }
  return totalDelta;
}

app.get("/table", (req, resp) => {
    resp.json(JSON.stringify({ appData: appData }));
    resp.end();
})

app.get("/delta", (req, resp) => {
    resp.json(JSON.stringify({delta: getDelta()}));
    resp.end();
})

app.post("/submit", (req, resp) => {

    const data = req.body;

    const newAppData = {
      positive: data.amount >= 0 ? true : false,
      title: data.title,
      amount: data.amount,
      timeUnit: data.timeUnit,
      id: Date.now(),
    }
    appData.push(newAppData);

    const body = {
      newDelta: getDelta(),
    }
    resp.json(JSON.stringify(body));
    resp.end();
})

app.post("/delete", (req, resp) => {
    const data = req.body;
    const idToDelete = data.id;

    appData = appData.filter(a => a.id !== idToDelete);
    const body = {
      appData: appData,
    }
    resp.json(JSON.stringify(body));
    resp.end();
})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html")
});