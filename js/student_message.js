$(document).ready(function () {
    var useroll = localStorage.getItem("att_user_stu_roll");
    if (useroll = "" || !useroll)
        window.location = "student_login.html"

    $("#logout").click(function () {
        localStorage.removeItem("att_user_stu_roll");
        window.location = "prof_login.html";
    });
    
});