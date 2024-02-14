document.addEventListener("DOMContentLoaded", function () {
    var paintBord = document.getElementById("paintBord");
    var isMouseDown = false;

    var gridSize = 200;
    var pixelSize = 3;

    function changeClass(element) {
        element.classList.remove("white");
        element.classList.add("black");
    }

    function kongeId(x, y) {
        return `${x},${y}`;
    }

    function droningId(x, y) {
        let surroundingDiv = document.getElementById(kongeId(x, y));
        if (surroundingDiv && surroundingDiv.classList.contains("white")) {
            changeClass(surroundingDiv);
        }
    }

    paintBord.addEventListener("mousedown", function (event) {
        isMouseDown = true;
        updateDivClass(event.target);
    });

    paintBord.addEventListener("mouseup", function () {
        isMouseDown = false;
    });

    paintBord.addEventListener("mouseover", function (event) {
        if (isMouseDown) {
            console.log(`${event.target.id}`);
            updateDivClass(event.target);
        }
    });

    function updateDivClass(element) {
            let [x, y] = element.id.split(",").map(Number);
            for (let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                   
                    droningId(x + j, y + i);
                }
            }
            changeClass(element);
    }

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            var newDiv = document.createElement("div");
            newDiv.id = kongeId(i, j);
            newDiv.className = "white";
            paintBord.appendChild(newDiv);
        }
    }

    paintBord.style.position = "absolute";
    paintBord.style.width = "100vw";
    paintBord.style.height = "100vh";
    paintBord.style.top = "0";
    paintBord.style.left = "0";

    paintBord.style.display = "grid";
    paintBord.style.gap = "0px";
    paintBord.style.border = "2px solid black";
    paintBord.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    paintBord.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
});
