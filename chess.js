//

let tileStyle = "";

function generateChessBoard() {
  for (var i = 0; i < 7; i++) {
    $('#chessBoard').append(`<div id="r${i}"></div>`);
    for (var j = 0; j < 7; j++) {
      $(`#r${i}`).append(`<div id="r${i}c${j}"></div>`);
    }
  }
}

function generateChessBoardStyle() {
  for (var i = 0; i < 7; i++) {
    $(`#r${i}`).
    for(var j = 0; j < 7; j++) {
      $(`#r${i}c${j}`).
    }
  }
}

generateChessBoard();