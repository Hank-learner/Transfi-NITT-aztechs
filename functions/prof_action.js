const functions = require("firebase-functions");
const config = require("./config.js");
const db = config.db;
const jwt = require("jsonwebtoken");
const jwtCheck= require("./middleware.js");

exports.updateproxy= functions.https.onRequest(async (req, res)=>{
//   return jwtCheck(req, res, async ()=>{
     try {
                let item = req.body.rollno;
                let subject = req.body.subject;
                let date = req.body.date;
                let ref1 = await db.ref(`/Students/${item}/subjects/${subject}`);
                let snap= await ref1.once(`value`);
                let profid= await snap.child(`prof`).val();
                
  
                        let ref = await db.ref(`/Professors/${profid}/subjects/${subject}/${item}`);
                        snap = await ref.once("value");
                        let per = snap.child(`percentage`).val();
                        let total = snap.child(`total_classes`).val();
                        per *= 0.01;
                        per = ((per * total) + 1) / (total + 1);
                        per *= 100;
                        total = total + 1;
                        
                        await ref.update({
                            [`percentage`]: per,
                            [`total_classes`]: total
                        });
                        let ref2 = db.ref(`/Students/${item}/subjects/${subject}/attendance`);
                        await ref2.update({
                            [`${date}`]: 1
                        });
                        let ref3 = db.ref(`/Students/${item}/subjects/${subject}`);
                        await ref3.update({
                            percentage: per,
                            total: total
                        });
            
                res.status(200).send("updated");
     }
     catch(err){
        console.log(err)
        res.status(500).send("Internal server error");

     }

//   });
})
