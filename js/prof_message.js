$(document).ready(function () {

    var useroll=localStorage.getItem("att_user_prof_roll");
    console.log(useroll);
    if(useroll=="" || !useroll)
        window.location = "prof_login.html";

    $( "#logout" ).click(function() {
        localStorage.removeItem("att_user_prof_roll");
        window.location = "student_login.html";
    });

});