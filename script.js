var orgboard;
var huPlayer = "O";
var aiPlayer = "X";
var winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8], 
]

var blocks = document.querySelectorAll(".blocks");
startGame();

function startGame(){
    document.querySelector(".endgame").style.display = "none";
    orgboard = Array.from(Array(9).keys()) // just a way to make array from 0 to 8
    for( let i =0; i<blocks.length; i++){
        blocks[i].innerText = "";
        blocks[i].style.removeProperty("background-color");
        blocks[i].addEventListener('click',turnClick,false);
    }
}
function turnClick(square){
    if(typeof orgboard[square.target.id] == "number"){
        turn(square.target.id , huPlayer)
        if (!checkWin(orgboard, huPlayer) && !checkTie()) turn(bestSpot(),aiPlayer);
    }

}
function turn(squareId, player){
    orgboard[squareId] = player;
    document.getElementById(squareId).innerText=player;
    let gameWon = checkWin(orgboard, player)
    if (gameWon)gameOver(gameWon)
};
function checkWin(board,player){
        let plays = board.reduce(( a, e, i) => (e===player) ? a.concat(i) : a,[]);
        let gameWon = null;
        for(let [index,win] of winCombination.entries()){
            if(win.every(elem => plays.indexOf(elem) > -1)){
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
}
function gameOver(gameWon){
    for (let index of winCombination[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        gameWon.player== huPlayer ? "blue" :  "red";
    }
    for(var i=0; i<blocks.length; i++){
        blocks[i].removeEventListener('click',turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "You Win": "You Lose")
}

function emptySquares(){
    return orgboard.filter(s => typeof s =="number");
}

function bestSpot(){
    return minimax(orgboard, aiPlayer).index;
}

function checkTie(){
    if (emptySquares().length == 0){
        for(var i= 0; i< blocks.length; i++){
            blocks[i].style.backgroundColor = "green";
            blocks[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game! ");
        return true;
    }
    return false;
}

function declareWinner(who){
    document.querySelector('.endgame').style.display = "block";
    document.querySelector('.endgame .text').innerText = who; 
}

function minimax(newboard, player){
    var availSpots = emptySquares(newboard);

    if (checkWin(newboard, player)){
        return {score: -10};
    } else if(checkWin(newboard, aiPlayer)){
        return {score: 10}
    }else if(availSpots.length === 0){
        return {score: 0}
    }
    var moves = []
    for (var i=0; i<availSpots.length; i++){
        var move = {};
        move.index = newboard[availSpots[i]];
        newboard[availSpots[i]] = player;
        if(player == aiPlayer){
            var result = minimax(newboard,huPlayer);
            move.score = result.score;
        } else{
            var result = minimax(newboard, aiPlayer);
            move.score = result.score;
        }
        newboard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
    if(player === aiPlayer){
        var bestScore = -9000;
        for(var i = 0; i<moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{var bestScore = 9000;
        for(var i = 0; i<moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
        
    }
    return moves[bestMove]
}
