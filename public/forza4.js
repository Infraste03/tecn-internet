 src="/socket.io/socket.io.js"
 var socket=io.connect('http://localhost:3000/');


socket.on('connect',()=> {

   alert('Benvenuti nel gioco!')

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
var board ;
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
        board[r][c]= 'red-pice';
        giocatoreStart = giocatoreGiallo;
    }
    else
    {
        tile.classList.add("yellow-pice");
        board[r][c]= 'yellow-pice';
        giocatoreStart = giocatoreRosso;
    }
    r-= 1; // update l' altezza per le colonne
    currColumns[c] = r; //update the array of 
    checkWinner();

    

}

function checkWinner()
{
  
 /*  //orizzontale 
  for (let r = 0; r < rows; r++)
  {
    for (let c = 0; c < columns - 3;c++)
    {
      
        if (board[r][c] =!'')
        {
          
          
        if (board[r][c]==board[r][c+1]&& board[r][c+1]==board[r][c+2] )
        {
          alert(board[r][c+1])
          alert(board[r][c+2])
          alert(board[r][c+3])
            
          setWinner(r,c);
          return;
        }
        
        }
    }
  }

  //verticale 

  for (let c = 0; c< columns; c++)
  {
    for (let r = 0; r< rows -3;r++)
    {
      if (board[r][c] ='')
      {
        if (board[r][c]==board[r+1][c]&&board[r+1][c]==board[r+2][c]&&board[r+2][c]==board[r+3][c])
        {alert(r,c)
            
          setWinner(r,c);
          return;
        }
      }
    }
  } */

  //diagonale minore
  for (let r=0; r< rows-3;r++)
  {
    for (let c=0; c< columns-3; c++)
    {
      if (board[r][c] !='')
      {
        if (board[r][c]== board[r+1][c+1] && board[r+1][c+1]== board[r+2][c+2] && board[r+2][c+2]== board[r+3][c+3])
        {
          setWinner(r,c);
          return;
        }
      }
    }
  }

  //diagonale maggiore 

  for (let r=3; r< rows;r++)
  {
    for (let c=0; c< columns-3; c++)
    {
      if (board[r][c] !='')
      {
        if (board[r][c]== board[r-1][c+1] && board[r-1][c+1]== board[r-2][c+2] && board[r-2][c+2]== board[r-3][c+3])
        {
          setWinner(r,c);
          return;
        }
      }
    }
  }

}

function setWinner(r,c)
{
let winnwer = document.getElementById("winner");

if (board[r][c]==giocatoreRosso)
{
  winnwer.innerText = "HA VINTO IL ROSSO!"
}
else
{
  winnwer.innerText = "HA VINTO IL GIALLO"
}
//gameOver= true;
}


$(document).ready(function()
{


  

$("#Login").click(function()
{
    
socket.emit("login", 
{

logUsername: $("#username").val(),

logPwd: $("#pwd").val()

});
});

$("#Signup").click(function()
{
    alert('cubi2')
socket.emit("signup", 
{

    signName : $("#name").val(),
    signSurname : $("#surname").val(), 
    signPwd: $("#pwd1").val(),
    signUsername : $("#username1").val(), 
    

});
});

});

socket.on('login',function(data)
    {
        if (data.status == true)
        {
           document.getElementById("board").style.visibility='visible'
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           
        }
    });

socket.on('signup',function(data)
    {
        if (data.status == true)
        {

           document.getElementById("board").style.visibility='visible'
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           
        }

        /* inserire scritta quando username già presente*/ 
    });








