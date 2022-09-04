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

window.onload = function () {
  const buybutton = document.querySelector("#buybutton");
  buybutton.onclick = submitbuy;
  const sellbutton = document.querySelector("#sellbutton");
  sellbutton.onclick = submitsell;
};

var barCount = 60;
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
        label: "CHRT - Chart.js Corporation",
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
  var dataset = chart.config.data.datasets[0];

  // candlestick vs ohlc
  var type = document.getElementById("type").value;
  dataset.type = type;

  // linear vs log
  var scaleType = document.getElementById("scale-type").value;
  chart.config.options.scales.y.type = scaleType;

  // color
  var colorScheme = "neon";
  if (colorScheme === "neon") {
    dataset.color = {
      up: "#01ff01",
      down: "#fe0000",
      unchanged: "#999",
    };
  } else {
    delete dataset.color;
  }

  // border
  var border = "false";
  var defaultOpts = Chart.defaults.elements[type];
  if (border === "true") {
    dataset.borderColor = defaultOpts.borderColor;
  } else {
    dataset.borderColor = {
      up: defaultOpts.color.up,
      down: defaultOpts.color.down,
      unchanged: defaultOpts.color.up,
    };
  }

  // mixed charts
  var mixed = "false";
  if (mixed === "true") {
    chart.config.data.datasets = [
      {
        label: "CHRT - Chart.js Corporation",
        data: barData,
      },
      {
        label: "Close price",
        type: "line",
        data: lineData(),
      },
    ];
  } else {
    chart.config.data.datasets = [
      {
        label: "CHRT - Chart.js Corporation",
        data: barData,
      },
    ];
  }

  chart.update();
};
