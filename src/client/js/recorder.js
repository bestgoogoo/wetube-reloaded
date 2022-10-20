const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let restartBtn;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "Myrecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleRestartBtn = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  restartBtn.remove();
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleStart);
};

const createRestartBtn = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart Recording";
  restartBtn.id = "restartBtn";
  startBtn.parentNode.insertBefore(restartBtn, startBtn);
  restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", handleRestartBtn);
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
  createRestartBtn();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 200, height: 300 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
