const firebase = require("firebase");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

var serviceAccount = require("../aztech-e3e7f-firebase-adminsdk-xneln-36bb3043f6.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aztech-e3e7f.firebaseio.com"
});

const db = firebaseApp.database();

// login for students
exports.studentLogin = functions.https.onRequest(async (req, res) => {
    try {
        let { rollno, password } = req.body;
        const ref = await db.ref(`/Students/${rollno}`);
        const snapshot = await ref.once("value");
        let pass = snapshot.val()["password"];
        if(pass == password) {
            res.status(200).send("Login Successful");
        } else {
            res.status(401).send("Login failed");
        }

    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

