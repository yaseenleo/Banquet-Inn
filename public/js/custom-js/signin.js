// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKqnOx3whVTOPnoc6K9AbS51nK0nUIcnY",
    authDomain: "banquet-inn.firebaseapp.com",
    databaseURL: "https://banquet-inn.firebaseio.com",
    projectId: "banquet-inn",
    storageBucket: "",
    messagingSenderId: "84905194109"
  };
  firebase.initializeApp(config);

  let signIn = document.getElementById("signin");
  signIn.addEventListener('click' ,() =>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((success) =>{
      console.log(success, "success");
      alert("You are successfully loged in");
      window.location.assign("../../index.html")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      console.log(errorCode);
      console.log(errorMessage);
    });
  })
