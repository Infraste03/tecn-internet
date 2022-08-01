const http = require('http')
const fs = require("fs");
const express = require('express')
app = express()
socketIo = require("socket.io");
var path = require('path');
var mysql = require('mysql');
const { posix } = require('path');
const server = http.Server(app).listen(process.env.PORT || 3000);
const io = socketIo(server);


const utenti = {}
var users =[]; //lista giocatore
var Listsocket = [];
pos_x= ''
pos_y=''


console.log("Server - listening at port 3000 ");
  
  app.use(express.static(__dirname + "/../node_modules/"));
  //app.use(express.static(__dirname + 'forza4.css'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get("/", (req, res) => 
  {
    const stream = fs.createReadStream(__dirname + "/public/forza4.html");
    stream.pipe(res);
  });

  /*  */


var con = mysql.createConnection({
  host: "mysql-forza4.alwaysdata.net",
  user: "forza4_",
  password: "Forza4toni?",
  database: "forza4_db"
});

con.connect(function(err) 
{
  if (err) throw err;
  console.log("Connected!");
  
});

functionServer();

function functionServer()
{
  io.on('connection', socket => {
    socket.on('new-user', nickname => {
      utenti[socket.id] = nickname
      socket.broadcast.emit('user-connected', nickname)
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message, nickname: utenti[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', utenti[socket.id])
      delete utenti[socket.id]
    })
  })


  

 
  io.on("connection", function(socket)
  {
  
    socket.on('mossa',function(data)
  {
    console.log(data)
    
    /* var poizx=data.posizionex;
    var poizy=data.posizioney;
    console.log( 'posizione x' +poizx + poizy) */
    ///console.log(data.posizioney)
    
    
    /* data.posx
    data.posy */
    //users[socket.id]= data.posizionex,data.posizioney
    socket.broadcast.emit('mossa',data)
  })
    
 
   /*  socket.on('mossa',() => {
      socket.broadcast.emit('user-mossa', utenti[socket.id])
      
    }) */
     /*  
      for (let l=0; l<Listsocket;l++ )
      {
        if(Listsocket[l] =! socket.id)
        {
        io.to(Listsocket).emit('mossa',posizione_x,posizione_y,socket.id)
    }
    } */

    
/* 
    for (let u=0; u<users; u++)
    if (users[u]==users.id)
    {
    socket.emit('mossa')
    {
      pos_x
      pos_y 
    }
  } */
  


    socket.on('searchUser', function(data)
    {
      
      var query = "SELECT * FROM giocatore WHERE username = '" + data.searchUsername + "'";

      con.query(query,function(error,rows,field)
      {
        if (error)
      {
        console.log('Server - search friend : Query error ' + error);
      }
      else
      {
        if(rows.length == 1)
        {
          console.log("Server - search : user " + data.searchUsername + " trovato nel db !!");
          
          

          socket.broadcast.emit('searchUser', 
          {
            username : data.searchUsername
            
          });

        /*   username =data.searchUsername
          socket.connect[username].emit('searchUser', data.searchUsername) */

          console.log(data.searchUsername)

        }

    }
      });
      

    });
    
    console.log('Server - new login request ');
    socket.on('login',function(data)
  {

    var query = "SELECT * FROM giocatore WHERE username = '" + data.logUsername + "' AND pwd = '" + data.logPwd + "'";

    con.query(query,function(error,rows,field)
    {
      if (error)
      {
        console.log('Server - login : Query error ' + error);
      }
      else 
      {
        if(rows.length == 1)
        {
          console.log("Server - login : user " + data.logUsername + " logged !!");
          users.push(data.logUsername)
          Listsocket.push(socket.id)

          io.to(socket.id).emit('login', 
          {
            status: true,
            username: data.logUsername
          });
          
          
        }
        else
        {
          console.log("Server - login : user " + data.logUsername + " not exist !!")

          io.to(socket.id).emit('login',
          {
            status: false,
            reason: "USERNAME O PASSWORD ERRATI",
          })
        }
      }
    });
  });

  console.log('Server - new singup request ');
  socket.on('signup',function(data)
  {

    var query = "SELECT * FROM giocatore WHERE username = '" + data.signUsername + "'";
    con.query(query,function(error,rows,field)
    {
    
      if (error)
      {
        console.log('Server - signup : Query error ' + error);
      }
      else 
      {
        if(rows.length == 1)
        {
          console.log("Server - login : user " + data.signUsername + " nome già presnete !!");
          
        }

    else 
    {
      var query = "INSERT INTO giocatore (username,pwd) VALUES ('" + data.signUsername + "','"+ data.signPwd + "')";

      con.query(query,function(error,rows,field)
      {
        if (error)
        {
          console.log('Server - signup : Query error ' + error);
          io.to(socket.id).emit('signup', 
          {
            status: false,
      
          });
        }
        else 
        {
          console.log('Server - signup : OK');
          io.to(socket.id).emit('signup of new user ', 
          {
            status: true,
      
          });
        }
      });
      
      
    }

      }

  });


  });

 


    });

  
  };




 





