var btnContainer = document.getElementById("btnContainer");

// Define the number of rows and columns for buttons
document.getElementById("sumit").onclick = function(){
var X = Number(document.getElementById("XuserText").value);
var Y = Number(document.getElementById("YuserText").value);


// Clear existing buttons in btnContainer
btnContainer.innerHTML = "";

// Loop to create buttons dynamically
for (var j = 0; j < X; j++) {
    for (var i = 0; i < Y; i++) {
        // Create a button element
        var button = document.createElement("button");

        // Set button id and text content (you can customize this part)
        button.id = "button_" + j + "_" + i;

        //add to class buttons
        button.classList.add("buttons");

        // Append the button to the btnContainer
        btnContainer.appendChild(button);
    }
    btnContainer.appendChild(document.createElement("br"));
}


// Add click event listener to all buttons with class "buttons"
var buttons = document.getElementsByClassName("buttons");
for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener("click", function () {
        // Inside the click event handler, 'this' refers to the clicked button
        this.classList.add("color");
    });
}
};