const jwt = require("jsonwebtoken");
const secrets = require("./secrets.json");
const pubkey = secrets.jwt_key;

exports.jwtCheck = function checkJWT(req, res, next) {
  if (req.token) {
    jwt.verify(token, pubkey, (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    return false;
  }
};
