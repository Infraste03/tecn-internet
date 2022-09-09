src="/socket.io/socket.io.js"
//var socket=io.connect('http://localhost:3000/'); //IN LOCALE
var socket = io.connect('https://forza4game.herokuapp.com'); //SU HEROKU


//variabili per giocatori
var playerRed = "Red"
var playerYellow= "Yellow"
var currPlayer= playerRed;
var yourName;
var multiPl = 0;
var turno= true;
var setField = 0;



/* Creating variables for each cell in the table. */
var cell00 = document.getElementById('0-0');
var cell01 = document.getElementById('0-1');
var cell02 = document.getElementById('0-2');
var cell03 = document.getElementById('0-3');
var cell04 = document.getElementById('0-4');
var cell05 = document.getElementById('0-5');
var cell06 = document.getElementById('0-6');


var cell10 = document.getElementById('1-0');
var cell11 = document.getElementById('1-1');
var cell12 = document.getElementById('1-2');
var cell13 = document.getElementById('1-3');
var cell14 = document.getElementById('1-4');
var cell15 = document.getElementById('1-5');
var cell16 = document.getElementById('1-6');

var cell20 = document.getElementById('2-0');
var cell21 = document.getElementById('2-1');
var cell22 = document.getElementById('2-2');
var cell23 = document.getElementById('2-3');
var cell24 = document.getElementById('2-4');
var cell25 = document.getElementById('2-5');
var cell26 = document.getElementById('2-6');


var cell30 = document.getElementById('3-0');
var cell31 = document.getElementById('3-1');
var cell32 = document.getElementById('3-2');
var cell33 = document.getElementById('3-3');
var cell34 = document.getElementById('3-4');
var cell35 = document.getElementById('3-5');
var cell36 = document.getElementById('3-6');


var cell40 = document.getElementById('4-0');
var cell41 = document.getElementById('4-1');
var cell42 = document.getElementById('4-2');
var cell43 = document.getElementById('4-3');
var cell44 = document.getElementById('4-4');
var cell45 = document.getElementById('4-5');
var cell46 = document.getElementById('4-6');



var cell50 = document.getElementById('5-0');
var cell51 = document.getElementById('5-1');
var cell52 = document.getElementById('5-2');
var cell53 = document.getElementById('5-3'); 
var cell54 = document.getElementById('5-4');
var cell55 = document.getElementById('5-5');
var cell56 = document.getElementById('5-6');



var actualPlayer = " ";
//variabili per il gioco 
var isF = true;
var gameOver = false;
var partitaPari = false;
var sfida= ' ';
var canTalk = true;

//variabili per la strutturaa dell area di gioco
var board=[];
var currColumns;
var rows = 6;
var columns = 7;
var posizione_x = '';
var posizione_y='';
var posx ='';
var posy='';
var nossa = 21;

/* The above code is creating variables that are storing the elements from the HTML file. */
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')

var nickname="Avversario :)"
appendMessage('You joined')
socket.emit('new-user', nickname)

/**
 * The function takes a message as an argument and creates a new div element, sets the innerText of the
 * div to the message, and appends the div to the messageContainer.
 * @param message - The message to be sent.
 */
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



/**
 * It creates a 2D array of empty strings and creates a div for each element in the array.
 */
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
            document.getElementById('alex').append(tile);
            
        }
        board.push(row);
    }
}

/**
 * The function setPiece() is called when a player clicks on a tile. It checks if the game is over, and
 * if not, it updates the board array and the tile's class to reflect the player's move.
 * @returns the value of the variable nossa.
 * 
 */
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
        nossa-=1;
        console.log(nossa
          )
        
        

    }
    r-= 1; // update l' altezza per le colonne
    currColumns[c] = r; //update the array of 
    checkWinner();   

}

/**
 * It checks if there are four consecutive pieces of the same color in a row, column or diagonal.
 * @returns the winner of the game.
 */
function checkWinner()
{

  
   //orizzontale 
  /* Checking for a horizontal win. */
  for (let r = 0; r < rows; r++)
  {
    for (let c = 0; c < columns - 3; c++)
    {
      
        if (board[r][c] !=' ')
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

/**
 * It checks if the game is over and if it is, it sets the gameOver variable to true
 * @param r - row
 * @param c - the column where the player clicked
 */
function setWinner(r,c)
{

let winnwer = document.getElementById("winner");
console.log(nossa)
if (nossa==1)
{
  partitaPari=true;
 alert('partita pari')

}

if (board[r][c]==playerRed)
{
  
  alert("VINCITORE ROSSO")
  socket.emit("esitorosso", 
  {
    esito:"vincitore rosso"
  }
  )
}
if (board[r][c]==playerYellow)
{
  alert("VINCITORE GIALLO")
  /* Sending a message to the server. */
  socket.emit("esitoye", 
  {
    esitoy:"vincitore ye"
  }
  )
}


  gameOver= true;
}

/* Checking if the game is over, if it is not, it is checking if it is the first turn, if it is, it is
creating the board. */ //il polpo
function move(pos)
{
  if (gameOver)
    {
        return;
    }
  if(isF)
  {
    actualPlayer = currPlayer;
    isF = false;
    if(setField == 0){
      for(let r = 0; r< rows; r++)
      {
          let row= [];
          for (let c= 0; c < columns; c++)
          {
            row.push(' ');
          }
          board.push(row);
        
      }
      setField = 1;
  }
  }

  if (turno==true)
  {
    
    let pluto = pos.split("-") // "0-0" ==> ["0","0"]
    let r = parseInt(pluto[0]);
    let c = parseInt(pluto[1]);
    for(let i= r; i<6; i++)
    {
      if (i<5)
      {
        //alert(i)
        /*while(board[i+1][c]===" ")
        {
          
          break;
        }*/
        if (board[i+1][c]!=" ")
        {
          //alert("speriamo been")
          board[i][c]=actualPlayer;
          let tile = document.getElementById(i.toString()+ "-" + c.toString());
          if (currPlayer == playerRed)
          {
              tile.classList.add("red-pice");
              pos=i+'-'+c;
              break;
          }
          else
          {
              tile.classList.add("yellow-pice");
              pos=i+'-'+c;
              break;
          }
        }
      
      }
      else{
        
          board[i][c]=actualPlayer;
          let tile = document.getElementById(i.toString()+ "-" + c.toString());
            if (currPlayer == playerRed)
            {
                tile.classList.add("red-pice");
            }
            else
            {
                tile.classList.add("yellow-pice");
                
            }

            pos=i+'-'+c;
        
      }
    }

    

  
/* Sending the position of the move and the color of the player to the server. */
    socket.emit("mossa", 
  {
    posiz:pos,
    colore:actualPlayer

  });
}


}

/* Listening for a message from the server called "esitored2" and if the message is "vincitore rosso"
and the current player is "Yellow" then it will alert the user that they have lost. */
socket.on("esitored2", function(data)
{
  if(data.es=="vincitore rosso" & currPlayer=="Yellow")
  {
    alert(" GIALLO HAI PERSO :(")
    gameOver=true;
  }
}
)

socket.on("esitoye2", function(data)
{
  if(data.es=="vincitore ye" & currPlayer=="Red")
  {
    alert(" ROSSO HAI PERSO :(")
    gameOver=true;
  }
}
)

/* Receiving the move from the other player and updating the board. */
socket.on('mossa1',function(data)
  {  
    //
    //alert("board = "+ board)
    //currColumns=[5, 5, 5 ,5, 5, 5, 5];
    //alert(currColumns)
    let pluto = data.p.split("-") // "0-0" ==> ["0","0"]
    let r = parseInt(pluto[0]);
    let c = parseInt(pluto[1]);


    
  console.log("ricevuto colore " + data.col + " attuale " + actualPlayer);
  //
  document.getElementById(data.p).style.backgroundColor = data.col
 
  


  if(actualPlayer!=data.col)
    {
      
      turno = true;
    
      if(data.col=="Red")
      {
        
        currPlayer=playerYellow

      }

      else
      {
       
        currPlayer=playerRed;
        
      }

      if(currPlayer == "Yellow" & setField == 0){
        for(let r = 0; r< rows; r++)
    {
        let row= [];
        for (let c= 0; c < columns; c++)
        {
          row.push(' ');
        }
        board.push(row);

        setField = 1;
       
    }
      }
      board [r][c] = data.col;
    }

  else 
  {
    turno = false; 
  }
  
   

  
  console.log("alla mossa  " + currPlayer + "\n actualPlayer " + actualPlayer);
  //r-= 1; // update l' altezza per le colonne
  //currColumns[c] = r; //update the array of 
  checkWinner();

  });

  


$(document).ready(function()
{
  
 /* Sending the username of the person who is searching for a user and the username of the person who
 is being searched for. */
  $("#buttonSearch").click(function()
  
{
  //document.getElementById("buttonSearch").style.visibility='hidden'
  //document.getElementById("idsearch").style.visibility='hidden'

socket.emit("searchUser", 
{

    
    searchUsername : $("#idsearch").val(), 
    yourName : username
    

});
});




  /* Listening for a message from the server called 'searchUser'. When it receives this message, it
  checks if the username is the same as the one you entered. If it is, it shows the board and the
  message container. It then asks the user if they want to accept the challenge. If they do, it
  shows the board. */
  socket.on('searchUser',function(data)
  {
   
     if(yourName==data.username)
    {
      //var nickname = yourName
      document.getElementById("board").style.visibility='visible'
      document.getElementById("message-container").style.visibility='visible'
      document.getElementById("send-container").style.visibility='visible'
      document.getElementById("message-input").style.visibility='visible'
      document.getElementById("send-button").style.visibility='visible'

      
       var gio = confirm('sfida ricevuta')

      if(gio=='ok'|| 'OK')
      {
      document.getElementById("board").style.visibility='visible'
      }
     
      
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
    alert('Registrazione avvenuta, procedere con il login')
socket.emit("signup", 
{

   signUsername : $("#username1").val(), 
    signPwd: $("#pwd1").val(),
    
    

});
});


/* Setting the game to single player mode. */
$("#idgiocopc").click(function()
{
  setGame() 
  document.getElementById("alex").style.visibility='visible'
  document.getElementById("idgiocopc").style.visibility='hidden'
  document.getElementById("idgiocomulti").style.visibility='hidden'
});

//bottone multiplayer

/* Hiding the button and showing the search bar. */
$("#idgiocomulti").click(function()
{
  

  document.getElementById("idgiocomulti").style.visibility='hidden'
  document.getElementById("idgiocopc").style.visibility='hidden'
  document.getElementById("buttonSearch").style.visibility='visible'
  document.getElementById("idsearch").style.visibility='visible'
});


});

/* Listening for a login event from the server. If the login is successful, it hides the login and
signup divs and shows the game divs. */
socket.on('login',function(data)
    {
        if (data.status == true)
        {
          yourName= data.username
           
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           document.getElementById("idgiocopc").style.visibility='visible'
           document.getElementById("idgiocomulti").style.visibility='visible'
        }
    });
/* Listening for a 'signup' event from the server. When the server emits a 'signup' event, the client
will execute the function that is passed as the second argument to the socket.on() method. */

socket.on('signup',function(data)
    {
        if (data.status == true)
        {

           document.getElementById("board").style.visibility='visible'
           document.getElementById("divlogin").style.visibility='hidden'
           document.getElementById("divsignup").style.visibility='hidden'
           document.getElementById("divgiocopc").style.visibility='hidden'
           
        }

        
    });
  












