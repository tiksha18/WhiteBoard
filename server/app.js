// create server folder
// create a app.js file in it
// npm init -y
// npm install express => module in nodeJS used to create server in easy steps
// so basically we are implementing socket.io
// server deployed on localhost
// npm install socket.io
// emit() => data send;    on() => data consume

const express = require("express");
const app = express();
//const http = require('http').createServer(app);
//const io = require('socket.io')(http);
const cors = require('cors')

app.use(cors());

// acts like API
// app => get type request(to get data) from client side(chrome) => when address is /home in URL => in response server(app.js) gives "welcom to homepage"
// app.get("/home", function(req, res)   
// {
//     res.end("welcome to homepage");
// })

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors:{
        origin : '*',
    }
});


// jab bhi koi client connect karega to ye event fire hoga
io.on('connection', function(socket)  
{
    console.log(`${socket.id} connected !`);   // socket id bhejega server
    // socket.on("testing", function(data)
    // {
    //     console.log(data);
    // })
    socket.on("md", function(point)
    {
        socket.broadcast.emit('onMouseDown', point);   //this broadcast func send data to all the clients except to the sender
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