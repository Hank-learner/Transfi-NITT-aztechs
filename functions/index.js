const firebase = require("firebase");
const functions = require("firebase-functions");
const login = require('./login.js');
const student= require("./student.js");
const student_attendance_today = require("./student_attendance_today.js");
const subjects = require("./subjects.js");
const update_attendance = require("./update_attendance.js");
const logout = require("./logout.js");
const timetable = require("./timetable.js");

// student
exports.studentLogin = login.studentLogin;
exports.student_today_attendance = student_attendance_today.attendance_today;
exports.message_to_prof = student.message_to_prof;
// get all the details of the student regarding the subjects
exports.student_details = student.student_details;
exports.view_student_timetable = timetable.view_student_timetable;
exports.logoutStudent = logout.logoutStudent;

//prof
exports.profLogin = login.profLogin;
exports.getSubjects = subjects.getSubjects;
exports.getClass = subjects.getClass;
exports.update_attendance = update_attendance.update_attendance;
exports.view_professor_timetable = timetable.view_professor_timetable;
exports.logoutProf = logout.logoutProf;

exports.generateImage = update_attendance.generateImage;
