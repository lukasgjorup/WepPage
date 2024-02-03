
let username;


document.getElementById("sumit").onclick = function() {
    afunction();
}

function afunction(){

username = document.getElementById("userText").value;
document.getElementById("myP").textContent = (`hej med dig ${username}`);

}