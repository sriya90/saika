var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port =  9999;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
    socket.on('chat message', function(msg,localdata){
         console.log(socket.id);
       var a =  localdata.indexOf(socket.id);
        console.log(a);
        io.to(socket.id).emit('chat message', msg);
        if(a%2===0 && a+1 < localdata.length )
            io.to(localdata[a+1]).emit('chat message', msg);
        if (a%2 ===1 )
            io.to(localdata[a-1]).emit('chat message', msg);
  });
   socket.on('disconnect', function(msg){
        console.log('a user disconnected');
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:8080');
});