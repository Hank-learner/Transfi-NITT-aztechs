const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require("./login.js");
const tagger = require("./tagger");

exports.studentLogin = login.studentLogin;
exports.profLogin = login.profLogin;
exports.tagger = tagger.tagger;
