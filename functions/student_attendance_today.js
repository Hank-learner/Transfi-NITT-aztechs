const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;

exports.attendance_today = functions.https.onRequest(async (req, res) => {
    return jwtCheck(req, res, async() => {
        try {
            let rollno = req.query.rollno;
            let ref = await db.ref(`/Students/${rollno}/subjects`);
            let snapshot = await ref.once("value");
            let present = [];
            let absent = [];
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
        } catch(err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    })
})