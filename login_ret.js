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

// ✅ Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("pass").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert("Login successful! Redirecting...");
            window.location.href = "dashboard_ret.html"; // ✅ Redirect to Dashboard Page
        })
        .catch((error) => {
            console.error("Login Error:", error.message);
            alert("Error: " + error.message);
        });
});
