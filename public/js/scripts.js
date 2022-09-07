const submitbuy = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("buy button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    console.log(response);
  });

  return false;
};

const submitsell = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("sell button clicked");

  const input = document.querySelector("#stockinput"),
    json = { stockinput: input.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    // do something with the reponse
    console.log(response);
  });

  return false;
};

window.onload = async function () {
  const buybutton = document.querySelector("#buybutton");
  buybutton.onclick = submitbuy;
  const sellbutton = document.querySelector("#sellbutton");
  sellbutton.onclick = submitsell;

  //get data from server
  let response = await fetch("/stocks", {
    method: "GET",
  });
  let data = await response.json();
  console.log(data);

  //use the data from the server to populate the div stock-list with stocks
  //copy the template from the html
  const template = document.querySelector("#stock-template");
  //get the div to put the stocks in
  const stockList = document.querySelector("#stock-list");

  const stocks = [];
  //loop through the data
  for (let i = 0; i < data.length; i++) {
    //add the clone to the div
    //create a stock object and call init
    const stock = new Stock(data[i].symbol);
    stock.init(template);
    stock.startUpdating();
    stocks.push(stock);

    stockList.appendChild(stock.html);
  }
};

//create a stock object
function Stock(symbol) {
  this.symbol = symbol;
  this.price = 0;
  this.html = null;

  this.init = async function (template) {
    //create the html for the stock from the template
    //create a clone of the template
    this.html = template.cloneNode(true);
    const fetchedData = await getCompanyData(this.symbol);

    const symbol = this.html.querySelector(".symbol");
    symbol.innerHTML = this.symbol.toUpperCase();

    //set the id of the clone to empty
    this.html.id = "";

    this.updateData();

    return this.html;
  };

  this.setHTMLFromData = function (data) {
    this.html.querySelector(".last-update").innerHTML = new Date();
    this.html.querySelector(".price").innerHTML = data.meta.regularMarketPrice;
    this.html.querySelector(".full-name").innerHTML = data.meta.name;
  };

  this.startUpdating = function () {
    //start updating the price
    this.updateData();
    //update the price every 5 seconds
    setInterval(this.updateData.bind(this), 10000);
  };

  this.updateData = async function () {
    console.log(symbol + " Data Refreshing");
    const fetchedData = await getCompanyData(this.symbol);
    const parsedData = await fetchedData.json();
    this.setHTMLFromData(parsedData);
    return parsedData;
  };
}

async function getCompanyData(ticker) {
  const url = "/stock?ticker=" + ticker;

  //fetch from server
  const response = fetch(url);
  // const data = await response.json();
  return response;
}

var barCount = 100;
var initialDateStr = "01 Apr 2017 00:00 Z";

var ctx = document.getElementById("chart").getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 250;

var barData = getRandomData(initialDateStr, barCount);
function lineData() {
  return barData.map((d) => {
    return { x: d.x, y: d.c };
  });
}

var chart = new Chart(ctx, {
  type: "candlestick",
  data: {
    datasets: [
      {
        label: "Test Label",
        data: barData,
      },
    ],
  },
});

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
  var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  var high = +randomNumber(
    Math.max(open, close),
    Math.max(open, close) * 1.1
  ).toFixed(2);
  var low = +randomNumber(
    Math.min(open, close) * 0.9,
    Math.min(open, close)
  ).toFixed(2);
  return {
    x: date.valueOf(),
    o: open,
    h: high,
    l: low,
    c: close,
  };
}

function getRandomData(dateStr, count) {
  var date = luxon.DateTime.fromRFC2822(dateStr);
  var data = [randomBar(date, 30)];
  while (data.length < count) {
    date = date.plus({ days: 1 });
    if (date.weekday <= 5) {
      data.push(randomBar(date, data[data.length - 1].c));
    }
  }
  return data;
}

var update = function () {
  chart.update();
};
