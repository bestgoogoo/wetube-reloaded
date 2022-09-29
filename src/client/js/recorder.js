const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let rerecordBtn;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "Myrecording.webm";
  document.main.appendChild(a);
  a.click();
};

const handleRerecordBtn = () => {
  document.main.removeChild(rerecordBtn);
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleStart);
};

const createRerecordBtn = () => {
  const reset = document.createElement("button");
  reset.innerText = "Rerecord Audio";
  reset.id = "rerecordBtn";
  document.body.appendChild(reset);
  rerecordBtn = document.getElementById("rerecordBtn");
  rerecordBtn.addEventListener("click", handleRerecordBtn);
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
  createRerecordBtn();
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
