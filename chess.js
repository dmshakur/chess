//
function generateChessBoard() {
  for (var i = 0; i < 8; i++) {
    $('#chessBoard').append(`<div class="column" id="c${i}"></div>`);
    for (var j = 0; j < 8; j++) {
      if (((j % 2 == 0) && (i % 2 == 0)) || ((i % 2 == 1) && (j % 2 == 1))) {
        $(`#c${i}`).append(`<div class="tile" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-image", 'url("images/blueTile.jpg")');
      } else {
        $(`#c${i}`).append(`<div class="tile" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-image", 'url("images/whiteTile.jpg")');
      }
    }
  }
}

generateChessBoard();