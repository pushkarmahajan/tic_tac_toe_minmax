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
    turn(square.target.id , huPlayer)
}
function turn(squareId, player){
    orgboard[squareId] = player;
    document.getElementById(squareId).innerText=player;
}