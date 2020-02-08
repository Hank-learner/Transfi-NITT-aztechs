const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const middleware = require("./middleware.js");
const cors = require('cors')({
    origin: true
});

exports.attendance_today = functions.https.onRequest(async (req, res) => {
    // return middleware.jwtCheck(req, res, async () => {
        try {
            return cors(req, res, async () => {
            let rollno = req.query.rollno;
            let ref = await db.ref(`/Students/${rollno}/subjects`);
            let snapshot = await ref.once("value");
            let subjects = [];
            let attendance = {};
            let date = Date().slice(0, 15);
            console.log(date);
            snapshot.forEach(child => {
                subjects.push(child.key);
            });
            console.log(subjects);
            await Promise.all(
                subjects.map(async subject => {
                    console.log(subject);
                    let child_ref = await db.ref(`/Students/${rollno}/subjects/${subject}/attendance`);
                    let snap = await child_ref.once("value");
                  
    
                    if(snap.hasChild(`\"${date}\"`)) {
                           
                            attendance[`${subject}`] = snap.child(`\"${date}\"`).val();
                        }
                    })
            )
            res.status(200).send(attendance);
            });
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    // })
})