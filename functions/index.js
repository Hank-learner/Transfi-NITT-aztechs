const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require('./login.js');
const student= require("./student.js");
const student_today_attendance = require("student_today_attendance");
const subjects = require("./subjects.js");

exports.studentLogin = login.studentLogin;
exports.profLogin = login.profLogin;
exports.sub_percentage=student.sub_percentage;
exports.message_to_prof= student.message_to_prof;
exports.getSubjects = subjects.getSubjects;
exports.getClass = subjects.getClass;
exports.student_today_attendance = student_today_attendance.attendance_today;
