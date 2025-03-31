
// ✅ Replace with your Firebase project credentials
var firebaseConfig = {
    apiKey: "AIzaSyBFJ1gqeIhoFLxnPNYHTQt8lXdLvU0oj4s",
    authDomain: "pharmalink-testing.firebaseapp.com",
    projectId: "pharmalink-testing",
    storageBucket: "pharmalink-testing.firebasestorage.app",
    messagingSenderId: "879950412352",
    appId: "1:879950412352:web:e88c95ae4b41bf26b1bda5"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth and Firestore
var auth = firebase.auth();
var db = firebase.firestore();

// ✅ Handle Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById("firstName").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var lname = document.getElementById("lastName").value.trim();
    var address = document.getElementById("address").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value.trim();
    var pincode = document.getElementById("pincode").value.trim();

    if (!name || !email || !password || !address) {
        alert("Please fill in all fields.");
        return;
    }

    // ✅ Create user in Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("User Created:", user.uid);

            // ✅ Store user details in Firestore
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                address: address,
                Last_name: lname,
                City: city,
                State: state,
                PinCode: pincode,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "Customer_login.html";
        })
        .catch((error) => {
            console.error("Signup Error:", error);
            alert("Error: " + error.message);
        });
});
