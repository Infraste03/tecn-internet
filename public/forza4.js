src="/socket.io/socket.io.js"
var socket=io.connect('http://localhost:3000/'); //IN LOCALE
//var socket = io.connect('https://forza4game.herokuapp.com'); //SU HEROKU

var posizionex ='';
var posizioney='';
//variabili per giocatori
var playerRed = "R"
var playerYellow= "Y"
var currPlayer= playerRed;
var yourName;
var multiPl = 0;


var cell00 = document.getElementById('0-0"');
var cell01 = document.getElementById('0-1"');
var cell02 = document.getElementById('0-2"');
var cell03 = document.getElementById('0-3"');
var cell04 = document.getElementById('0-4"');
var cell05 = document.getElementById('0-5"');
var cell06 = document.getElementById('0-6"');


var cell10 = document.getElementById('1-0"');
var cell11 = document.getElementById('1-1"');
var cell12 = document.getElementById('1-2"');
var cell13 = document.getElementById('1-3"');
var cell14 = document.getElementById('1-4"');
var cell15 = document.getElementById('1-5"');
var cell16 = document.getElementById('1-6"');

var cell20 = document.getElementById('2-0"');
var cell21 = document.getElementById('2-1"');
var cell22 = document.getElementById('2-2"');
var cell23 = document.getElementById('2-3"');
var cell24 = document.getElementById('2-4"');
var cell25 = document.getElementById('2-5"');
var cell26 = document.getElementById('2-6"');


var cell30 = document.getElementById('3-0"');
var cell31 = document.getElementById('3-1"');
var cell32 = document.getElementById('3-2"');
var cell33 = document.getElementById('3-3"');
var cell34 = document.getElementById('3-4"');
var cell35 = document.getElementById('3-5"');
var cell36 = document.getElementById('3-6"');


var cell40 = document.getElementById('4-0"');
var cell41 = document.getElementById('4-1"');
var cell42 = document.getElementById('4-2"');
var cell43 = document.getElementById('4-3"');
var cell44 = document.getElementById('4-4"');
var cell45 = document.getElementById('4-5"');
var cell46 = document.getElementById('4-6"');



var cell50 = document.getElementById('5-0"');
var cell51 = document.getElementById('5-1"');
var cell52 = document.getElementById('5-2"');
var cell53 = document.getElementById('5-3"');
var cell54 = document.getElementById('5-4"');
var cell55 = document.getElementById('5-5"');
var cell56 = document.getElementById('5-6"');


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



function setGameMultiPl()
{
    //board = [];
   // currColumns=[5, 5, 5 ,5, 5, 5, 5]; //faccio sempre partire dall basso, così è come se simulassi la forza di gravità
   
   document.getElementById("board").style.visibility='visible'


   function addEventCell(cell) {
    cell.addEventListener('click', function (event) {
        if (cell.textContent == "") {
            if (round == true && checkResult == "") {
                round = false;
                socket.emit('mossa', {
                    roomName: roomName,
                    idCella: cell.id,
                    simbolo: symbol,
                });
            } else {
                alert("Attendi il tuo round per poter fare la tua mossa.");
            }
        }
    });
}

//aggiungo evento alle celle del campo
addEventCell(cell0);
addEventCell(cell1);
addEventCell(cell2);
addEventCell(cell3);
addEventCell(cell4);
addEventCell(cell5);
addEventCell(cell6);
addEventCell(cell7);
addEventCell(cell8);


   /*  for(let r = 0; r< rows; r++)
    {
        let row= [];
        for (let c= 0; c < columns; c++)
        {

          let tile = document.createElement('div');
            //js
            row.push(' ');

            //html
            
            
            tile.id= r.toString() + "-" + c.toString();
            
            tile.classList.add('tile');
            
            document.getElementById('board').append(tile);
            
        }
        board.push(row);
    } */

    /* tile.addEventListener('click',
    alert("pippozzo1")
    //setPieceMultiPl(posx,posy)
    ) */
}

function setPieceMultiPl(posx,posy)
{

  if (gameOver)
    {
        return;
    }
    //let coords =this.id.split("-") // "0-0" ==> ["0","0"]
    posx= parseInt(posx);
    posy= parseInt(posy);
    alert('posx'+posx)
    

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

   $("#board").click(function()
{
  
  socket.emit("mossa", posx,posy);

}) 

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

  
    
  socket.emit("mossa", 
  {
    
    posx:posizionex,
    posy:posizioney

  });
  
 


  socket.on('mossa',function(data)
  {
    
   
    //setPieceMultiPl(data.posx, data.posy)
  })


  



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
      setGameMultiPl()
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
 setGame() 
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
  












