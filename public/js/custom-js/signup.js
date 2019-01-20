
function signUp() {
  let displayName = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let phoneNumber = document.getElementById("phonenum").value;

  var gender = document.getElementsByName("gender");
  for (var i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      console.log("radioButton " + i + ": " + gender[i].value);
      gender = gender[i].value;
      console.log(gender)
    }
  }

  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((success) => {
      let userObj = {
        displayName,
        email,
        password,
        phoneNumber,
        gender
      }
      let userUid = firebase.auth().currentUser.uid
      firebase.database().ref('users/' + userUid)
        .set(userObj)
        .then(() => {
          swal({
            title: "Congradulation!",
            text: `${displayName} you have successfully created your account`,
            icon: "success",
            button: "Done",
          }).then(() => {
            window.location.assign("signin")

          })
        })
      console.log(success, "success");

    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

      swal({
        title: "Sign Up Failed",
        text: errorMessage,
        icon: "error",
        button: "Ok",
      });

      // ...
    });
}

function clientSignUp() {
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let email = document.getElementById("c-email").value;
  let password = document.getElementById("c-password").value;
  let phoneNumber = document.getElementById("c-phonenum").value;
  let displayName = firstName + " " + lastName;
  let gender = document.getElementsByName("c-gender");
  for (var i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      console.log("radioButton " + i + ": " + gender[i].value);
      gender = gender[i].value;
      console.log(gender)
      console.log(typeof (email));
    }
  }
  let banqName = document.getElementById("banq-name").value;
  let ownerName = document.getElementById("owner-name").value;
  let qtyPerson = document.getElementById("qty-person").value;
  let about = document.getElementById("about").value;
  let services = document.getElementById("services").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success) => {
      let clientUserObj = {
        displayName,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        banqName,
        ownerName,
        qtyPerson,
        about,
        services,
        reservations: []
      }

      let userUid = firebase.auth().currentUser.uid
      firebase.database().ref('clientUsers/' + userUid)
        .set(clientUserObj)
        .then(() => {
          swal({
            title: "Congradulation!",
            text: `${displayName} you are close publish your business`,
            icon: "success",
            button: "Done",
          }).then(() => {
            window.location.assign("banquetdetail")

          })

        })
      console.log(success, "success");
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);

      swal({
        title: "Sign Up Failed",
        text: errorMessage,
        icon: "error",
        button: "Ok",
      });
    });
}
