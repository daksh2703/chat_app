function login(){
username = document.getElementById("logininput").value;
localStorage.setItem("Username", username);
window.location="kwitter_room.html";
} 