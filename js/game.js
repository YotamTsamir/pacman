'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '*';
const CHERRY = 'C'

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gGameOver = {
    isWon: false,
}
var gIntervalCherry;

function init() {
    // console.log('hello')
    gCountForWin=0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gIntervalCherry = setInterval(placeRandomCherry,5000);
    gGame.score = 0;
    gDeletedGhosts = [];
    gGame.isOn = true;
    gGameOver.isWon = false;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === SIZE - 2 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === 1 && j === 1) {
                board[i][j] = SUPERFOOD;
            } else board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    checkIfWon(gBoard);
    if (gGameOver.isWon) {
        renderWinCod();
    }
    renderButton();
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);

}

function restart(elBtn) {
    elBtn.style.display = 'none';
    if (gameOver.isWon) {
        var winnerH1 = document.querySelector('.winner-h1')
        winnerH1.style.display = 'none';
    }
    init();
}

function renderButton() {
    var strHTML = '';
    strHTML += `<button class="end-button" onclick="restart(this)">Restart Game!</button>`;
    var btnContainer = document.querySelector('.button-container');
    btnContainer.innerHTML += strHTML;
}

function checkIfWon(){
    if(gCountForWin===56) return true
}

// function checkIfWon(board) {
//     var wonArr = []
//     for (var i = 0; i < board.length - 1; i++) {
//         for (var j = 0; j < board.length - 1; j++) {
//             if (board[i][j] === EMPTY) {
//                 wonArr.push(board[i][j])
//                 // console.log(wonArr)
//             }
//         }
//     }
//     if (wonArr.length === 60) {
//         gGameOver.isWon = true;
//         return true
//     } else return false;
// }

// function checkIfWon(){
//     if(gGame.score===3) {
//         gGameOver.isWon=true;
//         return true
//     }
// }
function renderWinCod() {
    var strHTML = '';
    strHTML += `<h1 class="winner-h1">you are the winner!</h1>`;
    var btnContainer = document.querySelector('.button-container');
    btnContainer.innerHTML += strHTML;
}

function checkEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length - 1; i++) {
        for (var j = 0; j < board.length - 1; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j })
                // console.log(wonArr)
            }
        }
    } return emptyCells;
}

function placeRandomCherry() {
    var emptyCells = checkEmptyCells(gBoard);
    var randomCellPosition = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
    gBoard[randomCellPosition.i][randomCellPosition.j] = CHERRY
    renderCell(randomCellPosition,CHERRY);
    // console.log(gBoard);
}