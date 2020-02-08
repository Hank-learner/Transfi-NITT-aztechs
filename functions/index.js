const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require('./login.js');

exports.studentLogin = login.studentLogin;
exports.profLogin = login.profLogin;