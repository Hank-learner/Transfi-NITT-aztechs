$(document).ready(function () {


    var useroll=localStorage.getItem("att_user_prof_roll");
    if(useroll=="" || !useroll)
        window.location = "prof_login.html";

    var selected_subject="";
    $('#dropdown-menu a').on('click', function(){
        console.log("hell");
        selected_subject=$(this).text();
        $("#sel_sub_disp").html(selected_subject+" - Class List");
    });

    () =>{
        console.log("reg");
        var username = localStorage.getItem("att_user_prof_roll");

        if (username != "" && base64string != "" && selected_subject != "" ) {
            $.ajax({
                url: 'http://localhost:5001/aztech-e3e7f/us-central1/studentLogin',
                type: 'post',
                data: { rollno: username, subject:selected_subject },
                success: function (response) {
                    var msg = "";
                    if (response == 1) {
                        msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Logging in</strong></div>";
                        window.location = "student_report.html";
                    } else {
                        msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Invalid user credentials</strong></div>";
                    }
                    $("#message-confirm").html(msg);
                }
            });
        }
        else {
            var msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Select subject</strong></div>";
            $("#message-confirm").html(msg);
        }
    };
    

});