document.addEventListener("DOMContentLoaded", function(){
var paintBord = document.getElementById("paintBord");

var isMouseDown = false;

var gridSize = 100;
var pixelSize = 2;

paintBord.addEventListener("mousedown", function(event) {
    isMouseDown = true;
    updateDivClass(event.target);
});

paintBord.addEventListener("mouseup", function() {
    isMouseDown = false;
});

paintBord.addEventListener("mouseover", function(event) {
    if (isMouseDown) {
        updateDivClass(event.target);
    }
});

function updateDivClass(element) {
    if (element.classList.contains("white")) {
        element.classList.remove("white");
        element.classList.add("black");
    }
}


for(i=0;i<gridSize;i++){
    for(j=0;j<gridSize;j++){

    var newDiv= document.createElement("div");

    newDiv.className = "white";

    paintBord.appendChild(newDiv);
}}


paintBord.style.display = "grid";
paintBord.style.gap = "0px";
paintBord.style.border = "1px solid black";
paintBord.style.gridTemplateColumns = `repeat(${gridSize}, ${pixelSize}px)`;
paintBord.style.gridTemplateRows = `repeat(${gridSize}, ${pixelSize}px)`;
});