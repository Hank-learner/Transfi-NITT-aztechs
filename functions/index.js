const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require('./login.js');
const student= require("./student.js");
exports.studentLogin = login.studentLogin;
exports.profLogin = login.profLogin;
exports.sub_percentage=student.sub_percentage;
exports.message_to_prof= student.message_to_prof;