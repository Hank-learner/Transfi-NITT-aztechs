const firebase = require("firebase");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const jwt = require("jsonwebtoken");
const jwtCheck = require("./middleware.js");
const secrets = require("./secrets.json");
const privateKey = secrets.jwt_key;

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
            let token = jwt.sign(
                { rollno: rollno },
                privateKey
              );
              req.token = token;
              console.log(token);
              res.status(200).send("Login Successful");
        } else {
            res.status(401).send("Login failed");
        }

    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// login for professors
exports.profLogin = functions.https.onRequest(async (req, res) => {
    try {
        let { rollno, password } = req.body;
        const ref = await db.ref(`/Professors/${rollno}`);
        const snapshot = await ref.once("value");
        let pass = snapshot.val()["password"];
        if(pass == password) {
            let token = jwt.sign(
                { rollno: rollno },
                privateKey
              );
            req.token = token;
            res.status(200).send("Login Successful");
        } else {
            res.status(401).send("Login failed");
        }

    } catch(err) {
        console.log(err);
        res.status(500).send("Login failed");
    }
});