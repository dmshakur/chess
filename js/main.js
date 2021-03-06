let moveArr = [];
//=============================+
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  let pieceFunk = window[ev.target.id.slice(1, -1)];
  moveArr = pieceFunk(ev.target.parentNode.id);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  let data = ev.dataTransfer.getData("text"); // This variable represents the moving piece
  for (let i = 0; i < moveArr.length; i++) {

    if ((moveArr[i] == ev.target.id) || (moveArr[i] == ev.target.parentNode.id && (ev.target.id[0] != 'c'))) {
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
  $('body').append('<div id="chessBoard"></div>');
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
    $(`#c${i}r6`).append(`<img id="wPawn${i}" ondragstart="drag(event)" draggable="true" src="svg/wPawn.svg">`);
    $(`#c${i}r1`).append(`<img id="bpawn${i}" ondragstart="drag(event)" draggable="true" src="svg/bPawn.svg">`);
  }
  for (var i = 0; i < 2; i++) {
    var r = [['b', 0], ['w', 7]];
    $(`#c0r${r[i][1]}`).append(`<img id="${[i][0]}Rook0" class="rook" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Rook.svg">`);
    $(`#c1r${r[i][1]}`).append(`<img id="${[i][0]}Knight0" class="knight" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Knight.svg">`);
    $(`#c2r${r[i][1]}`).append(`<img id="${[i][0]}Bishop0" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Bishop.svg">`);
    $(`#c3r${r[i][1]}`).append(`<img id="${[i][0]}Queen0" class="queen" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Queen.svg">`);
    $(`#c4r${r[i][1]}`).append(`<img id="${[i][0]}King0" class="king" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}King.svg">`);
    $(`#c5r${r[i][1]}`).append(`<img id="${[i][0]}Bishop1" class="bishop" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Bishop.svg">`);
    $(`#c6r${r[i][1]}`).append(`<img id="${[i][0]}Knight1" class="knight" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Knight.svg">`);
    $(`#c7r${r[i][1]}`).append(`<img id="${[i][0]}Rook1" class="rook" ondragstart="drag(event)" draggable="true" src="svg/${r[i][0]}Rook.svg">`);
  }
  // CSS is created below
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

function /*White*/Pawn(t) {
  let column = Number(t[1]);
  let row = Number(t[3]);
  // Creates an array and filters it depending on whether or not it can make a 2 space move or if there are any squares available for capture
  let arr = [`c${column}r${row-1}`, `c${column}r${row-2}`, `c${column-1}r${row-1}`, `c${column+1}r${row-1}`];
  if (($(`#c${column+1}r${row-1}`).children().length) == 0) {
    arr[3] = null;
  }
  if ($(`#c${column-1}r${row-1}`).children().length == 0) {
    arr[2] = null;
  }
  if (row != 6) {
    arr[1] = null;
  }
  if (($(`#c${column}r${row-1}`).children().length) != 0) {
    arr[0] = null;
  }
  return arr;
}

function /*Black*/pawn(t) {
  let column = Number(t[1]);
  let row = Number(t[3]);
  // Creates an array and filters it depending on whether or not it can make a 2 space move or if there are any squares available for capture
  let arr = [`c${column}r${row+1}`, `c${column}r${row+2}`, `c${column+1}r${row+1}`, `c${column-1}r${row+1}`];
  if (($(`#c${column-1}r${row+1}`).children().length) == 0) {
    arr[3] = null;
  }
  if ($(`#c${column+1}r${row+1}`).children().length == 0) {
    arr[2] = null;
  }
  if (row != 1) {
    arr[1] = null;
  }
  if (($(`#c${column}r${row+1}`).children().length) != 0) {
    arr[0] = null;
  }
  return arr;
}

function Knight(t) {
  let column = Number(t[1]);
  let row = Number(t[3]);
  // Creates an array and filters it depending on whether or not it can make a 2 space move or if there are any squares available for capture
  let arr = [`c${column-1}r${row-2}`, `c${column+1}r${row-2}`, `c${column+2}r${row-1}`, `c${column+2}r${row+1}`, `c${column+1}r${row+2}`, `c${column-1}r${row+2}`, `c${column-2}r${row+1}`, `c${column-2}r${row-1}`];
  return arr;
}

function Bishop(t) {
  let column = Number(t[1]);
  let row = Number(t[3]);
  let loopSwitch = [1, 1, 1, 1];

  let arr = []; // Will contain all possible moves after function completion

  for (let i = 0; i < 8; i++) {
    if (($(`c${column + i}r${row - i}`).children().length == 0) && (loopSwitch[0] == 1)) {
      arr.push(`c${column + i}r${row - i}`);
      // North west lane
      if (column + i > 7 && row - i < 1) {
        loopSwitch[0] = 0;
      }
    } else {
        loopSwitch[0] = 0;
    }

    if (($(`c${column + i}r${row + i}`).children().length == 0) && (loopSwitch[1] == 1)) {
      arr.push(`c${column + i}r${row + i}`);
      // South east lane
      if (column + i > 7 && row + i > 7) {
        loopSwitch[1] = 0;
      }
    } else {
      loopSwitch[1] = 0;
    }

    if (($(`c${column - i}r${row + i}`).children().length == 0) && (loopSwitch[2] == 1)) {
      arr.push(`c${column - i}r${row + i}`);
      // South west lane
      if (column - i < 1 && row + i > 7) {
        loopSwitch[2] = 0;
      }
    } else {
      loopSwitch[2] = 0;
    }

    if (($(`c${column - i}r${row - i}`).children().length == 0) && (loopSwitch[3] == 1)) {
      arr.push(`c${column - i}r${row - i}`);
      // North west lane
      if (column - i < 1 && row - i > 1) {
        loopSwitch[3] = 0;
      }
    } else {
      loopSwitch[3] = 0;
    }
  }
  console.log(arr);
  return arr;
}

function Rook(t) {

  let column = Number(t[1]);
  let row = Number(t[3]);
  let loopSwitch = [1, 1, 1, 1];

  let arr = []; // Will contain all possible moves after function completion
  for (let i = 0; i < 8 ; i++) {
    if (true) {
      arr.push(`c${column}r${row - i}`);
      // North lane
      if (row - i < 1) {
        loopSwitch[0] = 0;
      }
    } else {
      loopSwitch[0] = 0;
    }

    if (true) {
      arr.push(`c${column - i}r${row}`);
      // East lane
      if (column - i < 1) {
        loopSwitch[1] = 0;
      }
    } else {
      loopSwitch[1] = 0;
    }

    if ($(`#c${column}r${row + i}`).is(':empty') && loopSwitch == 1) {
      arr.push(`c${column}r${row + i}`);
      // South lane
      if (row + i > 7) {
        loopSwitch[2] = 0;
      }
    } else {
      loopSwitch[2] = 0;
    }

    if (true) {
      arr.push(`c${column + i}r${row}`);
      // West lane
      if (column + i > 7) {
        loopSwitch[3] = 0;
      }
    } else {
      loopSwitch[3] = 0;
    }
  }
  return arr;
}

function Queen(t) {

  let column = Number(t[1]);
  let row = Number(t[3]);
  let loopSwitch = [1, 1, 1, 1, 1, 1, 1, 1];

  let arr = []; // Will contain all possible moves after function completion

  for (let i = 0; i < 8 ; i++) {
    if (($(`c${column}r${row - i}`).children().length == 0) && (loopSwitch[0] == 1)) {
      arr.push(`c${column}r${row - i}`);
      // North lane
      if (row - i < 1) {
        loopSwitch[0] = 0;
      }
    } else {
      loopSwitch[0] = 0;
    }

    if (($(`c${column - i}r${row}`).children().length == 0) && (loopSwitch[1] == 1)) {
      arr.push(`c${column - i}r${row}`);
      // East lane
      if (column - i < 1) {
        loopSwitch[1] = 0;
      }
    } else {
      loopSwitch[1] = 0;
    }

    if (($(`c${column}r${row + i}`).children().length == 0) && (loopSwitch[2] == 1)) {
      arr.push(`c${column}r${row + i}`);
      // South lane
      if (row + i > 7) {
        loopSwitch[2] = 0;
      }
    } else {
      loopSwitch[2] = 0;
    }

    if (($(`c${column + i}r${row}`).children().length == 0) && (loopSwitch[3] == 1)) {
      arr.push(`c${column + i}r${row}`);
      // West lane
      if (column + i > 7) {
        loopSwitch[3] = 0;
      }
    } else {
      loopSwitch[3] = 0;
    }


    if (($(`c${column + i}r${row - i}`).children().length == 0) && (loopSwitch[4] == 1)) {
      arr.push(`c${column + i}r${row - i}`);
      // North west lane
      if (column + i > 7 && row - i < 1) {
        loopSwitch[4] = 0;
      }
    } else {
        loopSwitch[4] = 0;
      }

    if (($(`c${column + i}r${row + i}`).children().length == 0) && (loopSwitch[5] == 1)) {
      arr.push(`c${column + i}r${row + i}`);
      // South east lane
      if (column + i > 7 && row + i > 7) {
        loopSwitch[5] = 0;
      }
    } else {
      loopSwitch[5] = 0;
    }

    if (($(`c${column - i}r${row + i}`).children().length == 0) && (loopSwitch[6] == 1)) {
      arr.push(`c${column - i}r${row + i}`);
      // South west lane
      if (column - i < 1 && row + i > 7) {
        loopSwitch[6] = 0;
      }
    } else {
      loopSwitch[6] = 0;
    }

    if (($(`c${column - i}r${row - i}`).children().length == 0) && (loopSwitch[7] == 1)) {
      arr.push(`c${column - i}r${row - i}`);
      // North west lane
      if (column - i < 1 && row - i > 7) {
        loopSwitch[7] = 0;
      }
    } else {
      loopSwitch[7] = 0;
    }
  }
  return arr;
}

function King(t) {
  let column = Number(t[1]);
  let row = Number(t[3]);
  let arr = [`c${column - 1}r${row - 1}`, `c${column + 0}r${row - 1}`, `c${column + 1}r${row - 1}`, `c${column + 1}r${row + 0}`, `c${column + 1}r${row + 1}`, `c${column + 0}r${row + 1}`, `c${column - 1}r${row + 1}`, `c${column - 1}r${row + 0}`];
  return arr;
}

generateChessBoard();
generateChessPieces();
