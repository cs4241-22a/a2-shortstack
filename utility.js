const playerWinScoreMap = function (currentData) {
  const res = {};
  currentData.forEach((element) => {
    if (element["winResult"]) {
      const playerName = element["playerName"];
      res[playerName] =
        (res[playerName] === undefined ? 0 : res[playerName]) +
        element["playerScore"];
    }
  });
  return res;
};

const addDerivedField = function (currentData, rowData) {
  const scoreMap = playerWinScoreMap(currentData);
  const currentRowWinScore =
    rowData["winResult"] === true ? rowData["playerScore"] : 0;
  const currentPlayerScoreInWins =
    scoreMap[rowData["playerName"]] === undefined
      ? 0
      : scoreMap[rowData["playerName"]];
  rowData["playerTotalScoreInWins"] =
    currentPlayerScoreInWins + currentRowWinScore;
  return rowData;
};

module.exports = { playerWinScoreMap, addDerivedField };
