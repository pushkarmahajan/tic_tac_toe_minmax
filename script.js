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
        if (!checkTie()) turn(bestSpot(),aiPlayer);
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
    return emptySquares()[0];
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
