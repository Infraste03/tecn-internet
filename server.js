const http = require('http')
const fs = require("fs");
const express = require('express')
app = express()
socketIo = require("socket.io");
var path = require('path');
var mysql = require('mysql');
const server = http.Server(app).listen(process.env.PORT || 3000);
const io = socketIo(server);


console.log("Server - listening at port 3000 ");
  
  app.use(express.static(__dirname + "/../node_modules/"));
  //app.use(express.static(__dirname + 'forza4.css'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get("/", (req, res) => 
  {
    const stream = fs.createReadStream(__dirname + "/public/forza4.html");
    stream.pipe(res);
  });



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
  var sql = "INSERT INTO giocatore (name, surname,username,mail,pwd) VALUES ('Francesca', 'Stefano','frastef','fra.stefano@gmail.com','ziopera')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

/* io.on('connection', socket =>{
  console.log(socket.id)
  socket.on('custom-event',(number,string) => {

    console.log(number,string)

  })
})
 */

io.on("login", function(data){
  const user = data.user,
  pass = data.pass;

   

  var sql =("SELECT * FROM giocatore WHERE username=?", [user], function(err, rows, fields)
  {
  if(rows.length == 0){
  console.log("nothing here");
  }else{
  console.log("here");
  }
  });
});





