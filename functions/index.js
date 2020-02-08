const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require('./login.js');
const subjects = require('./subjects');

exports.studentLogin = login.studentLogin;
exports.profLogin = login.profLogin;

//working
exports.getSubjects = subjects.getSubjects;
exports.getClass = subjects.getClass;