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


username = localStorage.getItem("Username");
roomname = localStorage.getItem("roomname"); // earlier you had written 'room name' with space in between.
function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomname).push({
            Name: username,
            Message: msg,
            Like: 0
      });
      document.getElementById("msg").value = "";
}

function logout() {
      window.location = "index.html";
      localStorage.removeItem("Username");
      localStorage.removeItem("room name");
}

function getData() {
      firebase.database().ref("/" + roomname).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val();
                  if (childKey != "room") { //Earlier 'purpose' was written here. In 'kwitter_room.js' line no. 14 the key name you have given is 'room'
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        Name = message_data['Name'];
                        Message = message_data['Message'];
                        Like = message_data['Like'];
                        Nametag = "<h4>" + Name + "<img class = 'user_tick' src='tick.png'> </h4>";
                        Messagetag = "<h4 class = 'message_h4'>" + Message + "</h4>"; // single quote was missing in message_h4
                        Likes_button = "<button class = 'btn btn-success' id = " + firebase_message_id + " value = " + Like + " onclick = 'Updatelike(this.id)'>";
                        Spantag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: " + Like + " </span></button><hr>";
                        Row = Nametag + Messagetag + Likes_button + Spantag;
                        document.getElementById("output").innerHTML += Row;
                  }
            });
      });
}
getData();

function Updatelike(message_id) {
      Likes = document.getElementById(message_id).value;
      Updatedlikes = Number(Likes) + 1;
      firebase.database().ref(roomname).child(message_id).update({
            Like: Updatedlikes // Earlier 'updatedLikes' was written with 'U' in lowercase and 'L' in uppercase
      });
}