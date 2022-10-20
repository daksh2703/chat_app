// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyBpwPlhd56Ql09cpCkaU8eq1WYbYP0BOMA",
      authDomain: "kwitter-27.firebaseapp.com",
      databaseURL: "https://kwitter-27-default-rtdb.firebaseio.com",
      projectId: "kwitter-27",
      storageBucket: "kwitter-27.appspot.com",
      messagingSenderId: "818187159259",
      appId: "1:818187159259:web:19f6350c24347e8d72aefe"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

function logout(){
window.location="index.html";
localStorage.removeItem("Username");
localStorage.removeItem("roomname");
}

function addroom (){
room = document.getElementById("roomname").value;
console.log(room);
firebase.database().ref("/").child(room).update({
room: "I have added room"
});
localStorage.setItem("roomname", room);
window.location = "kwitter_page.html";
}

username = localStorage.getItem("Username");

document.getElementById("user_name").innerHTML="Welcome "+username;

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirect(this.id)'>"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirect(Name) {
localStorage.setItem("roomname",Name);
window.location = "kwitter_page.html";
}

