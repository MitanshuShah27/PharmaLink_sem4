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

// ✅ Initialize Firestore
var db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User ID:", user.uid);
    } else {
        window.location.href = "index.html"; // Redirect if not logged in
    }
});
// ✅ Fetch and Display Products
function loadProducts() {
    db.collection("products").get().then((querySnapshot) => {
        var productsList = document.getElementById("productsList");
        productsList.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            var product = doc.data();
            var productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="fw-bold text-primary">₹${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
            productsList.innerHTML += productCard;
        });
    }).catch((error) => {
        console.error("Error fetching products:", error);
    });
}

// ✅ Load products when the page loads
document.addEventListener("DOMContentLoaded", loadProducts);

// ✅ Logout Function
document.getElementById("logoutBtn").addEventListener("click", function () {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error.message);
        alert("Error: " + error.message);
    });
});
