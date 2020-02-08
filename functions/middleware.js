const jwt = require("jsonwebtoken");
const secrets = require("./secrets.json");
const pubkey = secrets.jwt_key;

exports.jwtCheck = function checkJWT(req, res, next) {
  let token = req.token;
  console.log(token);
  try {
    if (token) {
      jwt.verify(token, pubkey, (err, decoded) => {
        if (err) {
          return res.status(401).send("Not Authorised");
        } else {
          return next();
        }
      });
    } 
  } catch(err) {
    console.log(err);
    return res.status(401).send("Not Authorised");
  }
};
