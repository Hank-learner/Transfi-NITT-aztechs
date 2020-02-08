const firebase = require("firebase");
const admin = require("firebase-admin");
var serviceAccount = require("../aztech-e3e7f-firebase-adminsdk-xneln-36bb3043f6.json");
const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aztech-e3e7f.firebaseio.com"
});
  
exports.db = firebaseApp.database();