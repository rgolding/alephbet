
function login() {
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var query = "../php/login.php?username=" + username + "&password=" + password;
    console.log(username, password)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            if(this.responseText=='Fail'){
                console.log("popup");
                show("message");
                return;                  
            } else {
                hide("header");
                show("welcomeHeader");
            }
            return false;
        }
    };
    xhttp.open("GET", query, true);
    xhttp.send(); 
    return false;
}
function register() {
    window.open ('register.html','_self',false)
}
 
function hideMessageBox(){
    var messageBox = document.getElementById("messageBox");
    messageBox.style.visibility = "hidden";
}
function hide(elem){
    document.getElementById(elem).style.visibility = "hidden";
}
function show(elem){
    document.getElementById(elem).style.visibility = "visible";
}