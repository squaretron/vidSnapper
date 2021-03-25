// Global Vars
let width = 500,
     height = 0,
     streaming = false;

// DOM Elements
let video = document.getElementById('webcam');
let snapBtn = document.getElementById('snapBtn');
let canvas = document.getElementById('canvas');
let photo = document.getElementById('photo');
let img = document.getElementById('img');

navigator.mediaDevices.getUserMedia({video: true, audio: false})
     .then(function(stream) {
          video.srcObject = stream;
          video.play();
     })
     .catch(function(err) {
          console.log(`Error: ${err}`);
     });

// Play when ready
video.addEventListener('canplay', function(e) {
     if (!streaming) {
          // Set Video Canvas Height
          height = video.videoHeight / (video.videoWidth / width);

          video.width = width;
          video.height = height;
          canvas.width = width;
          canvas.height = height;

          streaming = true;
     }
}, false);

// Snap Button Event
snapBtn.addEventListener('click', function(e) {
     takeSnap();

     e.preventDefault();
})

function takeSnap() {
     let ctx = canvas.getContext('2d');

     if (width && height) {
          canvas.width = width;          
          canvas.height = height;
          
          ctx.drawImage(video, 0, 0, width, height);

          let snapURL = canvas.toDataURL('image/png');
          // console.log(snapURL);

          img.src = snapURL;
          img.title = 'Click to download snap';

          document.querySelector('a').href = document.getElementById("canvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
     }
}