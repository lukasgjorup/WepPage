
let username;
let counter = 0;

document.getElementById("sumit").onclick = function() {
    afunction();
}

function afunction(){

username = document.getElementById("userText").value;
document.getElementById("myP").textContent = (`hej med dig ${username}`);
}

document.getElementById("debutton").onclick = function(){
    counter--;
    document.getElementById("contLable").textContent = counter;
}
document.getElementById("inbutton").onclick = function(){
    counter++;
    document.getElementById("contLable").textContent = counter;
}
document.getElementById("reset").onclick = function(){
    counter = 0;
    document.getElementById("contLable").textContent = counter;
}