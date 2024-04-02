const canvas = document.getElementById("canvas");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
canvas.width = width;
canvas.height = height;
const startBackground = "white";
let draw_color = "black";
let draw_withd = 50;
const context = canvas.getContext("2d");
context.fillStyle = startBackground;
context.fillRect(0,0,canvas.width,canvas.height);
const canvasPosition = canvas.getBoundingClientRect();

const mouse ={
    x : 0,
    y : 0,
};

canvas.addEventListener("pointerdown",function(event){
    event.preventDefault();
    mouse.x = event.clientX - canvasPosition.left;
    mouse.y = event.clientY - canvasPosition.top;
    dot(event);
    canvas.addEventListener("pointermove", onMouseMove);
    canvas.addEventListener("pointerup", removeMouseMove);
})

function onMouseMove(event) {
    mouse.x = event.clientX - canvasPosition.left;
    mouse.y = event.clientY - canvasPosition.top;
    draw();
}

function removeMouseMove() {
    canvas.removeEventListener("pointermove", onMouseMove);
}

function dot(input){
    context.beginPath();
    context.moveTo(mouse.x,mouse.y);
    console.log(mouse.x,mouse.y);
    draw();
}

function draw(){
    context.strokeStyle = draw_color;
    context.lineWidth = draw_withd;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
}