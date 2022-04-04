'use strict'
var packmen = '😷';
var gCountForWin=0;
var gPacman;
var gDeletedGhosts = [];


function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = packmen
}

function turnGhostToBlue() {
    var colors = []
    for (var i = 0; i < gGhosts.length; i++) {
        var currcolor = gGhosts[i].color
        colors.push(currcolor);
        // console.log(currcolor)
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    setTimeout(function () {
        for (var j = 0; j < gDeletedGhosts.length; j++) {
            gGhosts.push(gDeletedGhosts[j])
        }
        for (var i = 0; i < gGhosts.length; i++) {
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
        }
        gPacman.isSuper = false;
    }, 5000)
}

// function deleteGhost(){
//     var deletedGhosts = [];
//     for (var i = 0; i < gGhosts.length; i++) {
//         var currGhost = gGhosts[i]
//         console.log(currGhost)
//         if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
//             gDeletedGhosts.push(currGhost)
//             gGhosts.splice(i, 1);
//             console.log(gGhosts)
//         }
//     }
//     console.log(gDeletedGhosts)
// }

function superPacmen() {
    gPacman.isSuper = true;
    turnGhostToBlue();
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev);
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)

    // return if cannot move
    if (nextCell === WALL) return

    // hitting a ghost?  call gameOver

    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver();
        return
    } else {
        for (var i = 0; i < gGhosts.length; i++) {
            var currGhost = gGhosts[i]
            // console.log(currGhost)
            if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
                // deletedGhosts.push(currGhost)
                gDeletedGhosts.push(currGhost)
                // console.log(gDeletedGhosts)
                gGhosts.splice(i, 1);
                // console.log(gGhosts)
            }
        }

    }



    if (nextCell === FOOD) {
        updateScore(1);
        gCountForWin++
    }

    if(gPacman.isSuper && nextCell ===SUPERFOOD){
        return
    } 
    if (nextCell === SUPERFOOD) {
        superPacmen();
    }
    if(nextCell === CHERRY){
        updateScore(10)
    };

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY);

    // Move the pacman to new location
    // update the model
    gPacman.location.i = nextLocation.i;
    gPacman.location.j = nextLocation.j;
    gBoard[gPacman.location.i][gPacman.location.j] = packmen
    // update the DOM
    renderCell(gPacman.location, packmen)
    if (checkIfWon(gBoard)) gameOver();
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}
