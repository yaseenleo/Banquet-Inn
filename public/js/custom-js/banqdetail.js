let ownerName = document.getElementById("banq-person-name").value;
let banqName = document.getElementById("banq-name").value;
let address = document.getElementById("address").value;
let contact = document.getElementById("contact").value;
let cnic = document.getElementById("nic").value;
let about = document.getElementById("about").value;

function submitData(){
    // let ownerData = firebase.database().ref('ownerData/');

    // ownerData.on('value',function (snapshot) {
        
    //     let user = snapshot.val();
    //     console.log(user)
    // })
    firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
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
    
          //  document.getElementById("logout").style.display = "block";
    
    
        } else {
            // User is signed out.
            // ...
            //document.getElementById("logout").style.display = "none";
    
        }
    });
    
}