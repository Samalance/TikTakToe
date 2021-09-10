//Tiktackto the videogame
//by Samuel Chang
//Practice for the real world
//Started 9/6/2021

const { RSA_X931_PADDING } = require('constants');
/*const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
*/
const ps = require("prompt-sync");
//const { arrayBuffer } = require('stream/consumers'); 
const prompt = ps();

//later after getting it to work in the console change it to work in the chrome browser

/*
GAMEPLAN:
Going to have 2 players setup with the ability to send a link to someone and play tik tak toe with someone you share the link to.
Once connected the link will still be availiable but only as a spectator. Player 1 gets dibs on X or O.
*/
let winner = 0;
//create the tik tak toe board. Holds X's O's or Blanks. Can only enter blanks
var board =
    [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

//function to reset the board to a beginning state
function resetBoard()
{
     board =
        [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

    gameEnd = 0;
}

//need to create a enter function to place an x or o in the board
//Also need to make sure that there's a fucntion call at the end of a move to check for if there is a win
//Think it would be cool to make it so that it can calculate if there's no possible way for either player to win (TieCheck)
/*
    x x x
    x x x
    x x x
*/
function populateBoard(params)
{
    var x = 0;
    var y = 0;
    var row = 0;
    var temp = ['first', 'second', 'third'];

    for (x; x < params.length; ++x) 
    {
        for (y; y < params.length; ++y) {

            if (params[x][y] == null)
                params[x][y] = " ";
            //else
                //temp[y] = params[x][y];
        }
    }
}

function displayBoard(params)
{
    var x = 0;
    var y = 0;
    var row = 0;
    var col = 0;
    var temp = "";
    
    for (x = 0; x < params.length; ++x)
    {
        col = 0;
        for (y = 0; y < params.length; ++y)
        {
            if (params[x][y] == null) {
                temp += " ";
            }
            else
                temp += params[x][y];

            if (col < 2)
                temp += " | ";
            ++col

        }
        if (row < 2)
            temp += "\n----------\n";
        ++row;
    }
    console.log(temp);
    
}
//For making the move
function MakeMove(x, y) {
    //check to see if the spot is empty first, then populate it if it is valid.
       const empty = 0; 
   
       const row = x-1;
       const column = y-1;

       if (turn === 1) {
           board[row][column] = player1.choice;
           --turn;
           //console.log("Made it:" +  row + "" + column);
       }
       else if (turn === 0) {
           board[row][column] = player2.choice;
           ++turn;
       }
}

//Creating player Object for the 2 players in tik tak toe. Can be used for other games as a baseline
function Player(wins, losses, username, choice) {
    this.wins = wins;
    this.losses = losses;
    this.username = username;
    this.choice = choice;
}



//Forchecking the win. Wanted to get it done in one shot so checking for row/column/diagnal all at once
function CheckWin() {
    //need to check to see if board has a winning board.
    //check horizontal
    //check3 = if there's 3 in a row
    let hCheck3 = 0;
    let vCheck3 = 0;
    let p2hCheck3 = 0;
    let p2vCheck3 = 0;
    let diagCheck3 = 0;
    let reverseDiagCheck3 = 0;
    let p2diagCheck3 = 0;
    let p2reverseDiagCheck3 = 0;
    let tie = 0;

    for (i = 0; i < board.length; ++i) {
        hCheck3 = 0;
        vCheck3 = 0;
        p2hCheck3 = 0;
        p2vCheck3 = 0;
        diagCheck3 = 0;
        reverseDiagCheck3 = 0;
        tie = 0;
        for (j = 0; j < board.length; ++j) {
            if (player1.choice === board[i][j]) {
                //console.log("ij: " + board[i][j]);
                hCheck3++;
                tie++;
                
            }
            if (player1.choice === board[j][i]) {
                //console.log("ji: " +board[j][i]);
                vCheck3++;
                tie++;
                
            }
            if (player2.choice === board[i][j]) {
                //console.log("ij: " + board[i][j]);
                p2hCheck3++;
                tie++;

            }
            if (player2.choice === board[j][i]) {
                //console.log("ji: " +board[j][i]);
                p2vCheck3++;
                tie++;

            }
        }
          
        //after checking see if the winner exists.
        if (hCheck3 === 3 || vCheck3 === 3 || p2hCheck3 === 3 || p2vCheck3 === 3 || diagCheck3 === 3 || reverseDiagCheck3 === 3) {
            winner = 1;
            //gameEnd = -1;
            console.log("win");
            if (turn === 1) {
                player1.wins++;
                --turn;
                resetBoard();
                //console.log("Made it:" +  row + "" + column);
            }
            else if (turn === 0) {
                player2.wins++;
                ++turn;
                resetBoard();
            }
        }
        //console.log(i + " "+ j);
        console.log("Hcheck:" + hCheck3 + " vCheck:" + vCheck3 + " p2hcheck:" + p2hCheck3 + " p2vCheck:" + p2vCheck3);
        
    }

    diagCheck3 = 0;
    reverseDiagCheck3 = 0;
    for (i = 0; i < board.length; ++i)
    {
        for (j = 0; j < board.length; ++j) {
            if (player1.choice === board[i][j]) {
                diagCheck3++;
                tie++;
            }
            if (player2.choice === board[i][j]) {
                reverseDiagCheck3++;
                tie++;
            }
            ++i;
        }
        if (diagCheck3 === 3 || reverseDiagCheck3 === 3) {
            winner = 1;
            //gameEnd = -1;
            console.log("win");
            if (turn === 1) {
                player1.wins++;
                --turn;
                resetBoard();
                //console.log("Made it:" +  row + "" + column);
            }
            else if (turn === 0) {
                player2.wins++;
                ++turn;
                resetBoard();
            }
        }
        console.log("Diag Check: " + diagCheck3 + "  pwDiag Check: " + reverseDiagCheck3);
    }
    
    //TODO
    p2diagCheck3 = 0;
    p2reverseDiagCheck3 = 0;
    for (i = board.length-1; i > -1 ; --i) 
    {
        for (j = 0; j < board.length; ++j) {
            if (player1.choice === board[i][j]) {
                p2diagCheck3++;
                //tie++;
            }
            if (player2.choice === board[i][j]) {
                p2reverseDiagCheck3++;
                //tie++;
            }
            --i;
            
        }
        if (p2diagCheck3 === 3 || p2reverseDiagCheck3 === 3) {
            winner = 1;
            //gameEnd = -1;
            console.log("win");
            if (turn === 1) {
                player1.wins++;
                --turn;
                resetBoard();
                //console.log("Made it:" +  row + "" + column);
            }
            else if (turn === 0) {
                player2.wins++;
                ++turn;
                resetBoard();
            }
        }
        console.log("revDiag Check: " + p2diagCheck3 + " revReverse Diag Check: " + p2reverseDiagCheck3);
    }
    if (tie === 9) {
        console.log("The Game has ended in a tie.");
        console.log("Creating new game:");
        resetBoard();
    }
}
//create player1
let player1 = new Player(0, 0, "", "X");
//create player 2
let player2 = new Player(0, 0, "", "O");

let turn = 1;
let xCor = 0;
let yCor= 0;
let input = 0;
let gameEnd = 0;

console.log("Player " + turn + " , Please enter where you would like to place your " + player1.choice);

//populateBoard(board);
resetBoard();
//board[0][0] = 'X';
while(gameEnd === 0)
{
    displayBoard(board);
    getUserInput(board);
    MakeMove(xCor, yCor);
    CheckWin();
}


//Adds the x and y coordinates for the entry.
function getUserInput(params) {
    input = 0;
    while (input === 0) {
        x = prompt("Enter the row:");
        console.log(x + " was chosen");

        if (x < 4 && x > 0) {
            input = 1;
        }
        else {
            input = 0;
            console.log("Invalid row, Please choose between 1-3 (top to bottom): ");
        }
    }
    input = 0;
    while (input === 0) {
        y = prompt("Enter the column:");
        //console.log(y + " was chosen");

        if (y < 4 && y > 0) {
            input = 1;
        }
        else {
            input = 0;
            console.log("Invalid column, Please choose between 1-3 (left to right): ");
        }
    }
    input = 0;
    while (input === 0) {
        if (params[x - 1][y - 1] != undefined)
        {
            console.log("Invalid Space, Please select a different spot:");
            input = 0;
            getUserInput(params);
        }
        else
            input = 1;
    }
    xCor = x;
    yCor = y;
    //console.log(params[x - 1][y - 1]);
}
