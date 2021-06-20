let canvas = document.querySelector("#canvas");
let points = [];
let redoPoints = [];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", function()
{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    redraw();
})

// 2D drawing API => ctx
let ctx = canvas.getContext('2d');
ctx.fillStyle = "black";
ctx.lineCap = "round";
ctx.miterLimit = 1;
// ctx.fillRect(10, 10, 100, 100);
// ctx.beginPath();
// ctx.moveTo(10,10);
// ctx.lineTo(50,10);
// ctx.lineTo(50,50);
// ctx.lineTo(10,50);
// ctx.lineTo(10,10);
// ctx.stroke();

let isPenDown = false;
canvas.addEventListener("mousedown", function(e)
{
    isPenDown = true;
    let {top, left} = canvas.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    //console.log(x,y);
    ctx.beginPath();
    ctx.moveTo(x,y);

    let point = {
        id : "md",
        x : x,
        y : y,
        color : ctx.strokeStyle,
        width : ctx.lineWidth
    }
    points.push(point);
    socket.emit("md", point);
})

canvas.addEventListener("mousemove", function(e)
{
    if(isPenDown)
    {
        redoPoints = [];
        let {top, left} = canvas.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;
        //console.log(x,y);
        ctx.lineTo(x,y);
        ctx.stroke();
        let point = {
            id : "mm",
            x : x,
            y : y,
            color : ctx.strokeStyle,
            width : ctx.lineWidth
        }
        points.push(point);
        socket.emit("mm", point);
    }

})

canvas.addEventListener("mouseup", function(e)
{
    isPenDown = false;
})

canvas.addEventListener("click", function()
{
    if(pencilOptions.classList.contains("tool-options-active"))
    {
        pencilOptions.classList.remove("tool-options-active");
    }
    if(eraserOptions.classList.contains("tool-options-active"))
    {
        eraserOptions.classList.remove("tool-options-active");
    }
})