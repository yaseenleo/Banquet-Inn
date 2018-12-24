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


let signUpBtn = document.getElementById("signUp")
signUpBtn.addEventListener('click', () => {
  let name = document.getElementById("username").value;
  let email = document.getElementById("useremail").value;
  let password = document.getElementById("password").value;
  let phone = document.getElementById("phoneNum").value;

  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((success) => {
      let userObj = {
        name,
        email,
        password,
        phone,
      }
      let userUid = firebase.auth().currentUser.uid
      firebase.database().ref('users/' + userUid)
        .set(userObj)
        .then(() => {
          window.location = 'signin.html'
        })
      console.log(success, "success")

    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)

      // ...
    });
    
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(function (error) {
      // Some error occurred, you can inspect the code: error.code
    });
})

