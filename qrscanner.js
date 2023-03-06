
/* #region scanner */
const video = document.createElement("video");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");
const loadingMessage = document.getElementById("loadingMessage");
const outputContainer = document.getElementById("output");
const outputMessage = document.getElementById("outputMessage");
const outputData = document.getElementById("outputData");
const scanstart=document.getElementById("scanstart");
const scanstop=document.getElementById("scanstop");   


function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x+canvas.width/4, begin.y+canvas.height/4);
  canvas.lineTo(end.x+canvas.width/4, end.y+canvas.height/4);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();   
}

function drawRect(color) {
  let oneforth=canvasElement.width/4;
  canvas.beginPath();
  canvas.rect(canvasElement.width/4, canvasElement.height/4, canvasElement.width/2, canvasElement.height/2);
  canvas.strokeStyle = color;
  canvas.stroke();  
}


function tick() {      
  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    canvas.drawImage(video, 0, 0, canvasElement.width*1, canvasElement.height*1);
    canvas.drawImage(video, 0, 0, canvasElement.width*1.5, canvasElement.height*1.5);

    var imageData = canvas.getImageData(canvasElement.width/4, canvasElement.height/4, canvasElement.width/2, canvasElement.height/2);
    //var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert", 
    });

    if (code) {

/*        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58"); */
      drawRect("green");
      outputMessage.hidden = true;
      outputData.parentElement.hidden = false;
      outputData.innerText = code.data;
      
      
     


      id=parseInt(code.data);
        //setNextplayer();
        drawSmellButtons();
        drawContainerPlayers();
        getSmellForEdit();


      stopStreamedVideo(video);

    } else {
      drawRect("red")
      outputMessage.hidden = false;
      outputData.parentElement.hidden = true;         
    }
  }
  requestAnimationFrame(tick);
}


function stopStreamedVideo(videoElem) {
  
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });
    videoElem.srcObject = null;
    scanstop.hidden=true;
    scanstart.hidden=false;
    setTimeout(() => canvasElement.hidden = true, 1000)//vent 1 sek og skjul derefter cancas
  //  canvasElement.hidden = true;
   
}

function startScanner(){
  loadingMessage.hidden = false;
 
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
                video.srcObject = stream;
                video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                video.play();
                requestAnimationFrame(tick);
                scanstart.hidden=true;
                scanstop.hidden=false;}
    );
}

scanstart.addEventListener("click",(e)=>{
      e.preventDefault();
      startScanner();
});

scanstop.addEventListener("click",(e)=>{
      e.preventDefault();
      stopStreamedVideo(video);
});

/* #endregion scanner */

