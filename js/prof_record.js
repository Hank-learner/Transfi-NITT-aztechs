$(document).ready(function () {

    var useroll=localStorage.getItem("att_user_prof_roll");
    console.log(useroll);
    if(useroll=="" || !useroll)
        window.location = "prof_login.html";

    $( "#logout" ).click(function() {
        localStorage.removeItem("att_user_prof_roll");
        window.location = "prof_login.html";
    });

    $.ajax({
        url: 'http://localhost:5001/aztech-e3e7f/us-central1/studentLogin',
        type: 'post',
        data: { rollno: localStorage.getItem("att_user_prof_roll") },
        success: function (response) {
            var msg = "";
            
            if (!response) {
                response.forEach((element,index)=>{
                    var a=document.createElement("a");
                    a.className="dropdown-item";
                    a.setAttribute("href","#");
                    a.setAttribute("value",element);
                    a.innerText=element;
                    $("#dropdown-menu").append(a);
                });
            } else {
                msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Unable to reach server <br> Reload the page and try again</strong></div>";
            }
            $("#status-recieve").html(msg);
        }
    });

    var selected_subject="";
    $('#dropdown-menu a').on('click', function(){
        console.log("hell");
        selected_subject=$(this).text();
        $("#sel_sub_disp").html(selected_subject+" - Class List");
        var username = localStorage.getItem("att_user_prof_roll");
        if (username != ""  && selected_subject != "" ) {
            $.ajax({
                url: 'http://localhost:5001/aztech-e3e7f/us-central1/studentLogin',
                type: 'post',
                data: { rollno: username, subject:selected_subject },
                success: function (response) {
                    var msg = "";
                    if (!response) {
                        response.forEach((element,index)=>{
                            var tr=document.createElement("tr");
                            var td=document.createElement(td);
                            td.innerText=element.rollno;
                            tr.appendChild(td);
                            var span=document.createElement("span");
                            if(element.attendance < 50)
                                span.className="badge bg-red";
                            else if(element.attendance <70)
                                span.className="badge bg-yellow";
                            else if(element.attendance <80)
                                span.className="badge bg-light-blue";
                            else
                                span.className="badge bg-green";
                            span.innerText=element.attendance;
                            td.appendChild(span);
                            tr.appendChild(td);
                            $("#class_list_table").append(tr);
                        });
                    } else {
                        msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Unable to fetch, please select again</strong></div>";
                    }
                    $("#sel_sub_disp").html(msg);
                }
            });
        }
        else {
            var msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Select subject</strong></div>";
            $("#sel_sub_disp").html(msg);
        }
    });

});