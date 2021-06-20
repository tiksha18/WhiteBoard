
const express = require("express");
const app = express();

const cors = require('cors')

app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors:{
        origin : '*',
    }
});

io.on('connection', function(socket)  
{
    console.log(`${socket.id} connected !`);   

    socket.on("md", function(point)
    {
        socket.broadcast.emit('onMouseDown', point); 
    })
    socket.on("mm", function(point)
    {
        socket.broadcast.emit('onMouseMove', point);
    })
});


http.listen(3000, function()
{
    console.log("Server is listening at 3000 port !");
})