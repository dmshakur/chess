let moveArr = [];
//=============================+
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  moveArr = wPawn(ev.target.parentNode.id);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  let data = ev.dataTransfer.getData("text"); // This variable represents the moving piece
  for (let i = 0; i < moveArr.length; i++) {

    if ((moveArr[i] == ev.target.id) || (moveArr[i] == ev.target.parentNode.id && (ev.target.id[0] == 'b'))) {
      //=============
      if (ev.target.id[0] == data[0]) { //This if statement is the IFF
        moveArr = [];
        return;

      } else if (ev.target.id[0] != 'c') { //This else if statement removes the opposing piece while checking the first letter in the id, if it is c then it is an empty tile
        ev.preventDefault();
        ev.target.parentNode.replaceChild(document.getElementById(data), ev.target);

      } else { //Below code moves the piece to an empty square
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(data));
      }
      //============
    }
  }
  moveArr = [];
}
//+=============================+//
function generateChessBoard() {
  /*Loops through each column then through each row in that column, then repeats
  Until the board is filled up with tiles and divs
  with specific ids determining the row and column with a c & r followed by a number for each*/
  $('body').append('<div id="chessBoard"></div>')
  for (var i = 0; i < 8; i++) {
    $('#chessBoard').append(`<div class="column" id="c${i}"></div>`);
    for (var j = 0; j < 8; j++) {
      if (((j % 2 == 0) && (i % 2 == 0)) || ((i % 2 == 1) && (j % 2 == 1))) {
        $(`#c${i}`).append(`<div class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-color", '#C0C0C0');
      } else {
        $(`#c${i}`).append(`<div class="tile" ondrop="drop(event)" ondragover="allowDrop(event)" id="c${i}r${j}"></div>`);
        $(`#c${i}r${j}`).css("background-color", '#404040');
      }
    }
  }
}

function generateChessPieces() {

  //Loops through the pawn row (row 6 for white 1 for black) and adds images to each tile

  for (var i = 0; i < 8; i++) {
    $(`#c${i}r6`).append(`<img id="wPawn${i}" class="white" ondragstart="drag(event)" draggable="true" src="svg/wPawn.svg">`);
    $(`#c${i}r1`).append(`<img id="bPawn${i}" class="black" ondragstart="drag(event)" draggable="true" src="svg/bPawn.svg">`);
  }
  //Generate black pieces below
  $('#c0r7').append('<img id="wRook0" class="rook" ondragstart="drag(event)" draggable="true" src="svg/wRook.svg">');
  $('#c1r7').append('<img id="wKnight0" class="knight" ondragstart="drag(event)" draggable="true" src="svg/wKnight.svg">');
  $('#c2r7').append('<img id="wBishop0" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/wBishop.svg">');
  $('#c3r7').append('<img id="wQueen" class="queen" ondragstart="drag(event)" draggable="true" src="svg/wQueen.svg">');
  $('#c4r7').append('<img id="wKing" class="king" ondragstart="drag(event)" draggable="true" src="svg/wKing.svg">');
  $('#c5r7').append('<img id="wBishop1" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/wBishop.svg">');
  $('#c6r7').append('<img id="wKnight1" class="knight" ondragstart="drag(event)" draggable="true" src="svg/wKnight.svg">');
  $('#c7r7').append('<img id="wRook1" class="rook" ondragstart="drag(event)" draggable="true" src="svg/wRook.svg">');
  //Generate white pieces below
  $('#c0r0').append('<img id="bRook0" class="rook" ondragstart="drag(event)" draggable="true" src="svg/bRook.svg">');
  $('#c1r0').append('<img id="bKnight0" class="knight" ondragstart="drag(event)" draggable="true" src="svg/bKnight.svg">');
  $('#c2r0').append('<img id="bBishop0" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/bBishop.svg">');
  $('#c3r0').append('<img id="bQueen" class="queen" ondragstart="drag(event)" draggable="true" src="svg/bQueen.svg">');
  $('#c4r0').append('<img id="bKing" class="king" ondragstart="drag(event)" draggable="true" src="svg/bKing.svg">');
  $('#c5r0').append('<img id="bBishop1" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/bBishop.svg">');
  $('#c6r0').append('<img id="bKnight1" class="knight" ondragstart="drag(event)" draggable="true" src="svg/bKnight.svg">');
  $('#c7r0').append('<img id="bRook1" class="rook" ondragstart="drag(event)" draggable="true" src="svg/bRook.svg">');
  $('#chessBoard').css({
    "width": "800px",
    "height": "800px",
    "border": "20px solid #232323",
    "display": "flex"
  });
  $('#chessBoard * *').css({
    "width": "100px",
    "height": "100px"
  });
}

function wPawn(t) {
  let one = Number(t[1]);
  let three = Number(t[3]);
  // Creates an array and filters it depending on whether or not it can make a 2 space move or if there are any squares available for capture
  let arr = [`c${one}r${three-1}`, `c${one}r${three-2}`, `c${one-1}r${three-1}`, `c${one+1}r${three-1}`];
  if (($(`#c${one+1}r${three-1}`).children().length) == 0) {
    arr[3] = null;
  }
  if ($(`#c${one-1}r${three-1}`).children().length == 0) {
    arr[2] = null;
  }
  if (three != 6) {
    arr[1] = null;
  }
  if (($(`#c${one}r${three-1}`).children().length) != 0) {
    arr[0] = null;
  }
  console.log(arr);
  return arr;
}

function bPawn(t) {
  let one = Number(t[1]);
  let three = Number(t[3]);
  // Creates an array and filters it depending on whether or not it can make a 2 space move or if there are any squares available for capture
  let arr = [`c${one}r${three+1}`, `c${one}r${three+2}`, `c${one+1}r${three+1}`, `c${one-1}r${three+1}`];
  if (($(`#c${one-1}r${three+1}`).children().length) == 0) {
    arr[3] = null;
  }
  if ($(`#c${one+1}r${three+1}`).children().length == 0) {
    arr[2] = null;
  }
  if (three != 6) {
    arr[1] = null;
  }
  if (($(`#c${one}r${three+1}`).children().length) != 0) {
    arr[0] = null;
  }
  return arr;
}

function knight(t) {
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

function bishop(t) {
  /*

  */
}

function rook(t) {
  /*
  A bit simpler than the rest. It will have a r position that will not change but the c position will
  be any c position on the board, barring blocking pieces. The exact reverse will function just as well.
  */
}

function queen(t) {
  /*
  Combine rook and bishop position calculation.
  */
}

function king(t) {
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

function checkmate() {

}

generateChessBoard();
generateChessPieces();
/******** PAWN NOTES***************************************************************************************************
I need to calulate the squares relative to  the position of the pawn and determine which are allowable moving positions
A pawn can be on starting square as a white piece c1r7 (The second from the left) and would only be
able to move to c1r6, c1r5 or if there is a piece available for capture then two squares being c0r6 and c2r6
       c1r5
        I
  c0r6 c1r6 c2r6
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

let t = parentElement.id;
1. always accept this as a possible move point, then if its block no move.
`c${t.charAt(1)+0}r${t.charAt(0)-1}`
2. if (t.charAt == 6) move here  `c${t.charAt(1)+0}r${t.charAt(0)-2}`
3. if (equated contains a child) `c${t.charAt(1)-1}r${t.charAt(0)-1}`
4. if (equated contains a child) `c${t.charAt(1)+1}r${t.charAt(0)-1}`
*/