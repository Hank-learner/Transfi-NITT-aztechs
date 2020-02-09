$(document).ready(function () {
    var useroll = localStorage.getItem("att_user_stu_roll");
    if (useroll == "" || !useroll)
        window.location = "student_login.html"

    $("#logout").click(function () {
        localStorage.removeItem("att_user_stu_roll");
        window.location = "student_login.html";
    });
    $.ajax({
        url:"http://localhost:5001/aztech-e3e7f/us-central1/student_details",
        type: 'get',
        data: { roll_no: useroll},
        success: function(response){
            var element;
            element = $("#progress_table");

            element.append(`<table class="table table-bordered"><tbody><tr><th style="width: 100px">Course code</th><th>Progress bar</th><th style="width: 40px">Attendance percent</th></tr><tr>`);
            const keys= Object.keys(response);
            for(var i=0; i<keys.length; i++){
                
               element.append( `<tr><td>${keys[i]}</td>`);
                console.log(response[`${keys[i]}`]);
                if(response[`${keys[i]}`].percentage>75){
                    element.append (`<td><div class="progress progress-xs"><div class="progress-bar progress-bar-green" style="width: ${response[`${keys[i]}`].percentage}%"></div></div></td><td><span class="badge bg-green">${response[`${keys[i]}`].percentage}</span></td></tr>`);
            }
            else{
                element.append(`<td><div class="progress progress-xs"><div class="progress-bar progress-bar-red" style="width: ${response[`${keys[i]}`].percentage}%"></div></div></td><td><span class="badge bg-red">${response[`${keys[i]}`].percentage}</span></td></tr>`);
            }
            }
         element.append( `</tbody></table>`);

        }
    });
});

