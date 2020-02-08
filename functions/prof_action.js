const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const jwt = require("jsonwebtoken");
const jwtCheck= require("./middleware.js");

exports.updateproxy= functions.https.onRequest(async (req, res)=>{
//   return jwtCheck(req, res, async ()=>{
     try {
        const sub = req.body.sub;
        const roll_no = req.body.roll_no;
        const date = req.body.date;
        let ref1 = await db.ref(`/Students/${roll_no}/${sub}`);
        let exist=0;

        let snap= await ref1.once(`value`);
        let prof_no= await snap.child(`prof`).val();
        let ref= await db.ref(`/Professors/${prof_no}/subjects/${sub}/${roll_no}/attended`)
        let ref2 = await db.ref(`/Professors/${prof_no}/subjects/${sub}`)
        let exist_snap= await ref2.once("value");
        if(exist_snap.hasChild(`${roll_no}`)){
        let snapshot = await ref.once("value");
        let attended_array = snapshot.val();
        attended_array.push(`${date}`);
        await ref.update({
            [`attended`] : attended_array
        });
        
        res.status(200).send("updated successfully");
        }
        else
        {
            res.status(400).send("student hasn't enrolled for the subject");
        }
     }
     catch(err){
        console.log(err)
        res.status(500).send("Internal server error");

     }

//   });
})
