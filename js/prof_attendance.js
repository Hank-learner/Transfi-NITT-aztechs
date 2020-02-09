var selected_subject="";
function update_sel_sub(e){
    selected_subject=e.innerText;
    $("#sel_sub_disp").html("selected subject is "+selected_subject);
}

(function () {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 640;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }

    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();

$(document).ready(function () {

    var useroll=localStorage.getItem("att_user_prof_roll");
    console.log(useroll);
    if(useroll=="" || !useroll)
        window.location = "prof_login.html";

    $( "#logout" ).click(function() {
        localStorage.removeItem("att_user_prof_roll");
        window.location = "student_login.html";
    });

    // var selected_subject="";
    // $('#dropdown-menu a').on('click', function(){
    //     console.log("hell");
    //     selected_subject=$(this).text();
    //     $("#sel_sub_disp").html("selected subject is "+selected_subject);
    // });

    $.ajax({
        url: 'http://localhost:5001/aztech-e3e7f/us-central1/getSubjects',
        type: 'get',
        data: { rollno: localStorage.getItem("att_user_prof_roll") },
        success: function (response) {
            var msg = "";
            console.log(response);
            if (response) {
                console.log("ins");
                response.forEach((element,index)=>{
                    var a=document.createElement("a");
                    a.className="dropdown-item";
                    a.setAttribute("href","#");
                    a.setAttribute("value",element);
                    a.setAttribute("onclick","update_sel_sub(this);");
                    a.innerText=element;
                    $("#dropdown-menu").append(a);
                });
            } else {
                msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Unable to reach server <br> Reload the page and try again</strong></div>";
            }
            $("#status-recieve").html(msg);
        }
    });



    $("#confirm-send").click(function () {
        console.log("reg");
        var username = localStorage.getItem("att_user_prof_roll");
        var base64string = $("#photo").attr("src");
        console.log(base64string);
        if (username != "" && base64string != "" && selected_subject != "" ) {
            $.ajax({
                url: 'http://localhost:5001/aztech-e3e7f/us-central1/update_attendance',
                type: 'post',
                data: { profid: username, image: base64string, subject:selected_subject },
                success: function (response) {
                    var msg = "";
                    console.log(response);
                    if (response) {
                        msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Sucess updating attendance"+response+"</strong></div>";
                    } else {
                        msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>No respsonse from the server</strong></div>";
                    }
                    $("#message-confirm").html(msg);
                }
            });
        }
        else {
            var msg = "<div  class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Log in to continue</strong></div>";
            $("#message-confirm").html(msg);
        }
    });

 



});