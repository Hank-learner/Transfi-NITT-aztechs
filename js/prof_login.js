$(document).ready(function () {

    $('.message a').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    var useroll=localStorage.getItem("att_user_prof_roll");
    if(useroll!="" && useroll)
        window.location = "prof_attendance.html";
    
    $("#login-button").click(function(){
        console.log("reg");
        var username = $("#login-username").val().trim();
        var password = $("#login-password").val().trim();
        if( username != "" && password != "" ){
            $.ajax({
                url:'http://localhost:5001/aztech-e3e7f/us-central1/profLogin',
                type:'post',
                data:{rollno:username,password:password},
                success:function(response){
                    var msg = "";
                    if(response == 1){
                        msg="<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Logging in</strong></div>";
                        localStorage.setItem("att_user_prof_roll",username);
                        window.location = "prof_attendance.html";
                    }else{
                        msg="<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Invalid user credentials</strong></div>";
                    }
                    $("#login-message").html(msg);
                }
            });
        }
        else{
            var msg="<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Enter all the Fields</strong></div>";
            $("#login-message").html(msg);
        }
    });

});