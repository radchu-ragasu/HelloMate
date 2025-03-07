const admin = require("firebase-admin");
const serviceAccount = require("./SecurityProduct.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ServiceProviders.firebaseio.com"
});


// Use this for Firestore
const db = admin.firestore(); 


// Export db so other files can use it
module.exports = db; 
