src="/socket.io/socket.io.js"
//var socket=io.connect('http://localhost:3000/'); //IN LOCALE
var socket = io.connect('https://forza4game.herokuapp.com'); //SU HEROKU

//METTI BOARD VISIBLE APPENA CERC AMICI P 
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')

var nickname = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', nickname)

socket.on('chat-message', data => {
  appendMessage(`${data.nickname}: ${data.message}`)
})

socket.on('user-connected', nickname => {
  appendMessage(`${nickname} connected`)
})

socket.on('user-disconnected', nickname => {
  appendMessage(`${nickname} disconnected`)
})


messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}




socket.on('connect',()=> {

   console.log('Benvenuti nel gioco!')

} )


socket.emit('custom-event', 10, 'Hi')

//variabili per giocatori
var playerRed = "R"
var playerYellow= "Y"
var currPlayer= playerRed;
var yourName;
var multiPl = 0;

//uncle pear

//variabili per il gioco 
var gameOver = false;
var sfida= ' ';


//variabili per la strutturaa dell area di gioco
var board ;
var currColumns;
var rows = 6;
var columns = 7;
var posizione_x = '';
var posizione_y='';
var posx ='';
var posy='';



window.onload = function()
{
setGame();

}


function setGameMultiPl()
{
    board = [];
    currColumns=[5, 5, 5 ,5, 5, 5, 5]; //faccio sempre partire dall basso, così è come se simulassi la forza di gravità

    for(let r = 0; r< rows; r++)
    {
        let row= [];
        for (let c= 0; c < columns; c++)
        {
            //js
            row.push(' ');

            //html
            let tile = document.createElement('div');
            tile.id= r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click',setPieceMultiPl)
            document.getElementById('board').append(tile);
            
        }
        board.push(row);
    }
}

function setPieceMultiPl(posx,posy)
{

  if (gameOver)
    {
        return;
    }
    let coords =this.id.split("-") // "0-0" ==> ["0","0"]
    posx= parseInt(coords[0]);
    posy= parseInt(coords[1]);
    

    posx= currColumns[posy];
    if (posx< 0)
    {
        return;
    }

    board [posx][posy] = currPlayer;
    
    
    let tile = document.getElementById(posx.toString()+ "-" + posy.toString());
    if (currPlayer == playerRed)
    {
        tile.classList.add("red-pice");
        currPlayer = playerYellow;

    }
    else
    {
        tile.classList.add("yellow-pice");
        currPlayer = playerRed;

    }
    posx-= 1; // update l' altezza per le colonne
    currColumns[posy] = posx; //update the array of 
    checkWinner();   

}


function setGame()
{
    board = [];
    currColumns=[5, 5, 5 ,5, 5, 5, 5]; //faccio sempre partire dall basso, così è come se simulassi la forza di gravità

    for(let r = 0; r< rows; r++)
    {
        let row= [];
        for (let c= 0; c < columns; c++)
        {
            //js
            row.push(' ');

            //html
            let tile = document.createElement('div');
            tile.id= r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click',setPiece)
            document.getElementById('board').append(tile);
            
        }
        board.push(row);
    }
}

function setPiece()
{
    if (gameOver)
    {
        return;
    }
    let coords =this.id.split("-") // "0-0" ==> ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    

    r= currColumns[c];
    if (r< 0)
    {
        return;
    }

    board [r][c] = currPlayer;
    
    
    let tile = document.getElementById(r.toString()+ "-" + c.toString());
    if (currPlayer == playerRed)
    {
        tile.classList.add("red-pice");
        currPlayer = playerYellow;

    }
    else
    {
        tile.classList.add("yellow-pice");
        currPlayer = playerRed;

    }
    r-= 1; // update l' altezza per le colonne
    currColumns[c] = r; //update the array of 
    checkWinner();   

}

function checkWinner()
{
  
   //orizzontale 
  for (let r = 0; r < rows; r++)
  {
    for (let c = 0; c < columns - 3; c++)
    {
      
        if (board[r][c] != ' ')
        {

        if (board[r][c]==board[r][c+1]&& board[r][c+1]==board[r][c+2] && board[r][c+2]==board[r][c+3] )

        {
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
      if (board[r][c] !=' ')
      {
        if (board[r][c]==board[r+1][c]&&board[r+1][c]==board[r+2][c]&&board[r+2][c]==board[r+3][c])
        {
            setWinner(r,c);
            return;
        }
      }
    }
  } 

  //diagonale minore
  
  for (let r=0; r< rows-3;r++)
  {
    for (let c=0; c< columns-3; c++)
    {
      if (board[r][c] !=' ')
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
      if (board[r][c] !=' ')
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


if (board[r][c]==playerRed)
{
  winnwer.innerText = "HA VINTO IL ROSSO!"
}
else
{
  winnwer.innerText = "HA VINTO IL GIALLO"
}

gameOver= true;
}


$(document).ready(function()
{

/*   $("#board").click(function()
{
  
  socket.emit("mossa", posx,posy);

}) */

/* socket.on('mossa',function(posizione_x,posizione_y,id)
{
  for (let l=0; l<Listsocket;l++ )
  {
    if(id==socket.id)
    {
      setPieceMultiPl(posizione_x,posizione_y);
    }
}

}) */

$("#board").click(function()

{
  
    
  socket.emit("mossa", 
  {
    setGameMultiPl(posx, posy)
    {
      posizione_x : posx
      posizione_y : posy
      
    }
    
   
   
  });
  });


  socket.on('mossa',function(data)
  {
   
   alert('server ricevuto')
    
  });



  $("#buttonSearch").click(function()
{
    
socket.emit("searchUser", 
{

    
    searchUsername : $("#idsearch").val(), 
    yourName : username
    

});
});




  socket.on('searchUser',function(data)
  {
   
     if(yourName==data.username)
    {
      
      //da scommenentare per herock
       var gio = confirm('sfida ricevuta')

      if(gio=='ok'|| 'OK')
      {
      document.getElementById("board").style.visibility='visible'
      }
      //document.getElementById("board").style.visibility='visible'
     // multiPl =1;
      
    }
  });

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

   signUsername : $("#username1").val(), 
    signPwd: $("#pwd1").val(),
    
    

});
});


$("#idgiocopc").click(function()
{
  
  document.getElementById("board").style.visibility='visible'
  document.getElementById("idgiocopc").style.visibility='hidden'

});

//bottone multiplayer

$("#idgiocomulti").click(function()
{
  
  document.getElementById("board").style.visibility='visible'
  document.getElementById("idgiocomulti").style.visibility='hidden'
  document.getElementById("idgiocopc").style.visibility='hidden'

});







});

socket.on('login',function(data)
    {
        if (data.status == true)
        {
          yourName= data.username
           //yourName  :data.username
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           document.getElementById("idgiocopc").style.visibility='visible'
           document.getElementById("idgiocomulti").style.visibility='visible'
        }
    });

socket.on('signup',function(data)
    {
        if (data.status == true)
        {

           document.getElementById("board").style.visibility='visible'
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           document.getElementById("divgiocopc").style.visibility='hidden'
           
        }

        /* inserire scritta quando username già presente*/ 
    });
  












