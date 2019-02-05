// I need to create a function that moves an image element from one place to another

function generateChessBoard() {
  /*Loops through each column then through each row in that column, then repeats
  Until the board is filled up with tiles and divs
  with specific ids determining the row and column with a c & r followed by a number for each*/
  for (var i = 0; i < 8; i++) {
    $('#chessBoard').append(`<div class="column" id="c${i}"></div>`);
    for (var j = 0; j < 8; j++) {
      if (((j % 2 == 0) && (i % 2 == 0)) || ((i % 2 == 1) && (j % 2 == 1))) {
        $(`#c${i}`).append(`<div class="tile" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-color", '#C0C0C0');
      } else {
        $(`#c${i}`).append(`<div class="tile" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-color", '#404040');
      }
    }
  }
}

function generateChessPieces() {
  //Loops through the pawn row (row 6) and adds images to each tile
  for (var i = 0; i < 8; i++) {
    $(`#c${i}r6`).append('<img src="svg/wPawn.svg">');
    $(`#c${i}r1`).append('<img src="svg/bPawn.svg">');
  }
  $('#c0r7, #c7r7').append('<img src="svg/wRook.svg">');
  $('#c1r7, #c6r7').append('<img src="svg/wKnight.svg">');
  $('#c2r7, #c5r7').append('<img src="svg/wBishop.svg">');
  $('#c3r7').append('<img src="svg/wQueen.svg">');
  $('#c4r7').append('<img src="svg/wKing.svg">');
  $('#c0r0, #c7r0').append('<img src="svg/bRook.svg">');
  $('#c1r0, #c6r0').append('<img src="svg/bKnight.svg">');
  $('#c2r0, #c5r0').append('<img src="svg/bBishop.svg">');
  $('#c3r0').append('<img src="svg/bQueen.svg">');
  $('#c4r0').append('<img src="svg/bKing.svg">');
}
//Below functions are empty
function movementRestriction() {
  function pawn() {
    /*
    I need to calulate the squares relative to  the position of the pawn and determine which are allowable moving positions
    A pawn can be on starting square as a white piece c1r7 (The second from the left) and would only be
    able to move to c1r6, c1r5 or if there is a piece available for capture then two squares being c0r6 and c2r6
            c1r5
             I
      c0r6  c1r6 c2r6
          \  I  /
            c1r7
    I need to calulate the c position based on whether or not there are enemies in adjacent squares, if so then
    the c position will be the current position minus or plus 1.
    The r position will need to be calculated in determinance of whether or not there are any friendly units in the frontal
    square, or the second square up if it is located in the starting position.
    Row or r will be calulated to be '- 1', unless it is moving up two spaces from the stating position the r will be '- 2'.
    Column or c will be calculated as being the same unless there are either one or two captureable pieces at the frontal, diagnal
    locations, where column or c, will be calculated as either '-1', or '+ 1'.
    All positive and negative positions will be calculated in reverse for the opposition.
    */
  }

  function knight() {
    /*
      Made a diagram for this particular piece since it would be less accurateley interpretable.
      But I will lay out the calculations for the possible movements.
      Going clockwise around starting with the upper left possible move position.
      Assuming you're looking at the board from the white side and that up is towards row 0.
        ----c--r
        0. -1 -2
        1. +1 -2
        2. +2 -1
        3. +2 +1
        4. +1 +2
        5. -1 +2
        6. -2 +2
        7. -2 -1
        --------
        Calculations will work for both black and white, negating possible positions with allied pieces and negative or 8 plus positions.
    */
  }

  function bishop() {
    /*

    */
  }

  function rook() {
    /*
    A bit simpler than the rest. It will have a r position that will not change but the c position will
    be any c position on the board, barring blocking pieces. The exact reverse will function just as well.
    */
  }

  function queen() {
    /*
    Combine rook and bishop position calculation.
    */
  }

  function king() {
    /*
    ----c--r
    0. -1 -1
    1. +0 -1
    2. -1 -1
    3. +1 +0
    4. +1 +1
    5. +0 +1
    6. -1 +1
    7. -1 +0
    --------
    */
  }
}

function updateGame() {

}

generateChessBoard();
generateChessPieces();