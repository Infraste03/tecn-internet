 src="/socket.io/socket.io.js"
 var socket=io()
socket.on('connect',()=> {

   alert('gioschio')

} )

socket.emit('custom-event', 10, 'Hi')

//variabili per giocatori
var giocatoreRosso = "R"
var giocatoreGiallo= "G"
var giocatoreStart= giocatoreRosso;
//uncle pear

//variabili per il gioco 
var gameOver = false;

//variabili per la strutturaa dell area di gioco
var board;
var currColumns;
var rows = 6;
var columns = 7;

window.onload = function()
{
setGame();
}

function setGame()
{
    board = [];
    currColumns=[5, 5, 5 ,5, 5, 5, 5];

    for(let r = 0; r< rows; r++)
    {
        let rows= [];
        for (let c= 0; c < columns; c++)
        {
            //js
            rows.push(' ');

            //html
            let tile = document.createElement('div');
            tile.id= r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click',setPiece)
            document.getElementById('board').append(tile);
        }
        board.push(rows);
    }
}

function setPiece()
{
    if (gameOver)
    {
        return;
    }
    let coords =this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r= currColumns[c];
    if (r< 0)
    {
        return;
    }

    board [r][c] = giocatoreStart;
    let tile = document.getElementById(r.toString()+"-" + c.toString());
    if (giocatoreStart == giocatoreRosso)
    {
        tile.classList.add("red-pice");
        giocatoreStart = giocatoreGiallo;
    }
    else
    {
        tile.classList.add("yellow-pice");
        giocatoreStart = giocatoreRosso;
    }
    r-= 1; // update l' altezza per le colonne
    currColumns[c] = r; //update the array of 

}





//console.log('ciao pluto')