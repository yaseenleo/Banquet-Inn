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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.name;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...

        console.log(displayName);
        console.log(email);
        console.log(emailVerified);
        console.log(photoURL);
        console.log(isAnonymous);
        console.log(uid);
        console.log(providerData);
    } else {
        // User is signed out.
        // ...
    }
});

let logOut = document.getElementById("logout")
logOut.addEventListener('click', () => {

    firebase.auth().signOut().then((success) => {

        console.log(success, "Log Out Success")

    })
    .catch(function (erroe) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        console.log(errorCode);
        console.log(errorMessage);
    })
})