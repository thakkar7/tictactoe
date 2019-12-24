import * as utils from './functions.js'

var maxPlayer = 'x';
var minPlayer = 'o';

function copyBoard(board) {
  //This returns a new copy of the Board and ensures that you're only
  //manipulating the copies and not the primary board.
  return board.slice(0);
}

//Determine if a move is valid and return the new board state
function validMove(move, player, board){
  var newBoard = copyBoard(board);
  if(newBoard[move] === null){
    newBoard[move] = player;
    return newBoard;
  } else
    return null;
}

//This is the main AI function which selects the first position that
//provides a winning result (or tie if no win possible)

export function findAiMove(board) {
  var bestMoveScore = 100;
  let move = null;

  //Test Every Possible Move if the game is not already over.
  if(utils.findWinner(board) || utils.areAllBoxesClicked(board)) {
    return null;
  }

  // console.log("came inside function")
  for(var i = 0; i < board.length; i++){
    let newBoard = validMove(i, minPlayer, board);
    //If validMove returned a valid game board
    if(newBoard) {
      // console.log("trying position ",i)
      var moveScore = maxScore(newBoard);
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = i;
      }
    }
  }
  return move;
}

function minScore(board) {
  if (utils.findWinner(board)===1) {
    return 10;
  } else if (utils.findWinner(board)===2) {
    return -10;
  } else if (utils.areAllBoxesClicked(board)) {
    return 0;
  } else {
    var bestMoveValue = 100;
    let move = 0;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, minPlayer, board);
      if (newBoard) {
        var predictedMoveValue = maxScore(newBoard);
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    //console.log("Best Move Value(minScore):", bestMoveValue);
    return bestMoveValue;
  }
}

function maxScore(board) {
   if(utils.findWinner(board)===1) {
    return 10;
  } else if(utils.findWinner(board)===2) {
    return -10;
  } else if(utils.areAllBoxesClicked(board)) {
    return 0;
  } else {
    var bestMoveValue = -100;
    let move = 0;
    for (var i = 0; i < board.length; i++) {
      var newBoard = validMove(i, maxPlayer, board);
      if (newBoard) {
        var predictedMoveValue = minScore(newBoard);
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    return bestMoveValue;
  }
}
