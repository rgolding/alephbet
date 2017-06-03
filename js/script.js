var letters = []
var alephbet = [{"english" : "aleph", "sound": "(silent)"}]
var index = 0;
function hideItem(x){
    var item = document.getElementById(x);
    item.style.visibility = "hidden";
}
function showItem(x){
    var item = document.getElementById(x);
    item.style.visibility = "visible";
}
function begin() {
    showItem("card");
    hideItem("begin");
    //var alephbet = createLetters();
    //console.log("begin",alephbet);

    cardValue();
}
function cardValue() {
    createLetters();
    var letter = displayNextLetter(alephbet);
    var input = document.getElementById("input");
    input.value = "";
    
    index += 1;
    var message = document.getElementById("message");
    message.innerHTML = "";
    var card = document.getElementById("cardText");
    card.innerHTML = letter.english;
}

function createLetters() {
    var alephbet = []

    var query = "../php/letters.php";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText=='Fail'){
                var message = document.getElementById("message");
                message.innerHTML = "Failure to get letters";
                return;                   
            } else{

                alephbet = nextLetter(JSON.parse(this.responseText));
            }
            return false;
        }
    };
    xhttp.open("GET", query, true);
    xhttp.send(); 
    return alephbet;
}
function nextLetter(jsObj) {
    alephbet.pop();
    for( var i=0; i<jsObj.length; i++){
    //   var letter = document.createElement("option");
    //   option.value = jsObj[i].corpsymbol;
    //   option.text = jsObj[i].corpname;
    //   select.add(option);
    
    var letter = {"hebrew":jsObj[i].hebrew, "sound" : jsObj[i].sound, "english":jsObj[i].english};
    alephbet.push(letter);
    
  }
//   console.log("nextletter", alephbet)
  return alephbet;
  
}

function displayNextLetter(alephbet) {
    var num = Math.floor(Math.random() * alephbet.length);
    return alephbet[num]; 
}

function verify() {
    var input = document.getElementById("input").value;
    var message = document.getElementById("message");
    var correct = false;
    var letter = document.getElementById("cardText");
    
    for (var i = 0; i < alephbet.length; i++) {
        if (alephbet[i].english == letter && alephbet[i].sound == input) {
            correct = true;
        }
    }
    if (correct) {
        message.innerHTML = "Wrong";
    } else {
        message.innerHTML = "Correct";
    }
    
    
}
