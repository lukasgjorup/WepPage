const canvas = document.getElementById("canvas");
const clear = document.querySelector("#clearCanvas");
const undoB = document.querySelector("#undoB");
const uploadInput = document.getElementById("uploadInput");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
canvas.width = width;
canvas.height = height;
const startBackground = "white";
let draw_color = "black";
let draw_withd = 50;
let is_drawing = false;
const context = canvas.getContext("2d");
context.fillStyle = startBackground;
context.fillRect(0, 0, canvas.width, canvas.height);
let canvasPosition = canvas.getBoundingClientRect();
let firstClick = { x: 0, y: 0 };
let secondClick = { x: 0, y: 0 };
let clickCount = 0;
var drawing = true;

let undoarray = [];
let undoindex = -1;

const mouse = {
    x: 0,
    y: 0,
};

class Imageinputter {
    constructor(canvas, canvasPosition, context) {
        this.canvas = canvas;
        this.canvasPosition = canvasPosition;
        this.context = context;
        this.clickCount = 0;
        this.firstClick = { x: 0, y: 0 };
        this.secondClick = { x: 0, y: 0 };
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        // Wrap the logic in a Promise
        const waitForClicks = new Promise(resolve => {
            this.canvas.addEventListener("click", (event) => {
                if (this.clickCount === 0) {
                    // First click
                    this.firstClick.x = event.clientX - this.canvasPosition.left;
                    this.firstClick.y = event.clientY - this.canvasPosition.top;
                    this.clickCount++;
                } else if (this.clickCount === 1) {
                    // Second click
                    this.secondClick.x = event.clientX - this.canvasPosition.left;
                    this.secondClick.y = event.clientY - this.canvasPosition.top;
                    this.clickCount++;
                    // Resolve the Promise when both clicks are registered
                    resolve();
                }
            });
        });

        // Wait for the Promise to resolve
        waitForClicks.then(() => {
            // Once both clicks are registered, proceed with reading and drawing the image
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    // Draw the image after both clicks are registered
                    const imgWidth = this.secondClick.x - this.firstClick.x;
                    const imgHeight = this.secondClick.y - this.firstClick.y;
                    this.context.drawImage(img, this.firstClick.x, this.firstClick.y, imgWidth, imgHeight);
                    // Reset click count and clicks
                    this.clickCount = 0;
                    this.firstClick = { x: 0, y: 0 };
                    this.secondClick = { x: 0, y: 0 };
                };
            };
            reader.readAsDataURL(file);
        });
    }
}

clear.addEventListener("click", clearCanvas);
undoB.addEventListener("click", undo);
uploadInput.addEventListener("change", function (event) { 
    const imageinputter = new Imageinputter(canvas, canvasPosition, context);
    imageinputter.handleFileSelect(event);
});

if (drawing) {
    canvas.addEventListener("pointerdown", function (event) {
        event.preventDefault();
        mouse.x = event.clientX - canvasPosition.left;
        mouse.y = event.clientY - canvasPosition.top;
        dot(event);
        canvas.addEventListener("pointermove", onMouseMove);
        canvas.addEventListener("pointerup", removeMouseMove);
    });
}

function onMouseMove(event) {
    mouse.x = event.clientX - canvasPosition.left;
    mouse.y = event.clientY - canvasPosition.top;
    draw();
}

function removeMouseMove() {
    undoarray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    undoindex += 1;
    canvas.removeEventListener("pointermove", onMouseMove);
}

function dot(input) {
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
    console.log(mouse.x, mouse.y);
    draw();
}

function draw() {
    context.strokeStyle = draw_color;
    context.lineWidth = draw_withd;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
}

function clearCanvas() {
    context.fillStyle = startBackground;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    undoarray = [];
    undoindex = -1;
}

function undo() {
    //if the undoarrays index is 0 or less then we might as well clear canvas.
    if (undoindex <= 0) {
        clearCanvas();
    } else {
        //else we just want to go one back therefore remove the top layer of the stack
        undoindex -= 1;
        undoarray.pop();
        //here we wanty to insert the last saved in the undo into the canvas.
        context.putImageData(undoarray[undoindex], 0, 0);
    }
}

window.addEventListener("resize", function () {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;
    console.log(width, height);
    context.fillStyle = startBackground;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.putImageData(undoarray[undoindex], 0, 0);
    canvasPosition = canvas.getBoundingClientRect();
});

function changeColor(element) {
    draw_color = element.style.backgroundColor;
}
