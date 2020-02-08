$(document).ready(function () {

    var useroll = localStorage.getItem("att_user_prof_roll");
    if (useroll == "" || !useroll)
        window.location = "prof_login.html";

    $("#logout").click(function () {
        localStorage.removeItem("att_user_prof_roll");
        window.location = "prof_login.html";
    });


    $.ajax({
        url: 'http://localhost:5001/aztech-e3e7f/us-central1/view_professor_timetable',
        type: 'get',
        data: { roll_no: useroll },
        success: function (response) {
            console.log(response);
            var element;
            element = document.getElementById("timetable");

            element.innerHTML = `<table>
    <thead>
        <tr class="table100-head">
            <th class="column1">Time/Day</th>
            <th class="column2">Monday</th>
            <th class="column3">Tuesday</th>
            <th class="column4">Wednesday</th>
            <th class="column5">Thursday</th>
            <th class="column6">Friday</th>
        </tr>
    </thead>
    <tbody>
            <tr>
                <td class="column1">9:20 - 10:10</td>
                <td class="column2">${response.Monday["9:20 - 10:10"]}</td>
                <td class="column3">${response.Tuesday["9:20 - 10:10"]}</td>
                <td class="column4">${response.Wednesday["9:20 - 10:10"]}</td>
                <td class="column5">${response.Thursday["9:20 - 10:10"]}</td>
                <td class="column6">${response.Friday["9:20 - 10:10"]}</td>
            </tr>
            <tr>
            <td class="column1">10:30 - 11:20</td>
            <td class="column2">${response.Monday["10:30 - 11:20"]}</td>
            <td class="column3">${response.Tuesday["10:30 - 11:20"]}</td>
            <td class="column4">${response.Wednesday["10:30 - 11:20"]}</td>
            <td class="column5">${response.Thursday["10:30 - 11:20"]}</td>
            <td class="column6">${response.Friday["10:30 - 11:20"]}</td>

            </tr>
            <tr>
            <td class="column1">11:20 - 12:10</td>
            <td class="column2">${response.Monday["11:20 - 12:10"]}</td>
            <td class="column3">${response.Tuesday["11:20 - 12:10"]}</td>
            <td class="column4">${response.Wednesday["11:20 - 12:10"]}</td>
            <td class="column5">${response.Thursday["11:20 - 12:10"]}</td>
            <td class="column6">${response.Friday["11:20 - 12:10"]}</td>

            </tr>
          
          
            
    </tbody>
</table>`;


        }
    });
});