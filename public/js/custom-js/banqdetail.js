let ownerName = document.getElementById("banq-person-name").value;
let banqName = document.getElementById("banq-name").value;
let address = document.getElementById("address").value;
let contact = document.getElementById("contact").value;
let cnic = document.getElementById("nic").value;
let about = document.getElementById("about").value;

function submitData(){
    let ownerData = firebase.database().ref('ownerData/'+uid);

    ownerData.on('value',function (snapshot) {
        
        let user = snapshot.val()
    })
}