const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(14, 19);

// 나중에 이거 수정해주기
//if (video.duration >= 60*60*1000) => .substring(11, 19)
//else => substring(14, 19)

const handleLoadedmetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreenClick = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = "Exit Full Screen";
  }
};

let moveIntoScreenTimeout = null;
let movementInScreenTimeout = null;
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (moveIntoScreenTimeout) {
    clearTimeout(moveIntoScreenTimeout);
    moveIntoScreenTimeout = null;
  }
  if (movementInScreenTimeout) {
    clearTimeout(movementInScreenTimeout);
    movementInScreenTimeout = null;
  }
  videoControls.classList.add("showing");
  movementInScreenTimeout = setTimeout(hideControls, 1000);
};

const handleMouseLeave = () => {
  moveIntoScreenTimeout = setTimeout(hideControls, 1000);
};

const handlePlayKey = (event) => {
  const { key } = event;
  if (key === " ") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
playBtn.addEventListener("keyup", handlePlayKey);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handleFullscreenClick);
video.addEventListener("loadedmetadata", handleLoadedmetadata);
video.addEventListener("timeupdate", handleTimeupdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);
