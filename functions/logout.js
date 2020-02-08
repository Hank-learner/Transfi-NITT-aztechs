const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middlware = require("./middleware.js");
const cors = require('cors')({
    origin: true
});

// logout professor
exports.logoutProf = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            return cors(req, res, async () => {
            req.token = null;
            res.status(200).send("Logged out successfully");
            });
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
})

// logout student
exports.logoutStudent = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            return cors(req, res, async () => {
            req.token = null;
            res.status(200).send("Logged out successfully");
            });
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Errror");
        }
    // })
})