/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar volumeRange = document.getElementById(\"volume\");\nvar currenTime = document.getElementById(\"currenTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeline = document.getElementById(\"timeline\");\nvar fullscreenBtn = document.getElementById(\"fullscreen\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar videoControls = document.getElementById(\"videoControls\");\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick() {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nvar handleMuteClick = function handleMuteClick(e) {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"Unmute\" : \"Mute\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nvar formatTime = function formatTime(second) {\n  return new Date(second * 1000).toISOString().substring(14, 19);\n}; // 나중에 이거 수정해주기\n//if (video.duration >= 60*60*1000) => .substring(11, 19)\n//else => substring(14, 19)\n\n\nvar handleLoadedmetadata = function handleLoadedmetadata() {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nvar handleTimeupdate = function handleTimeupdate() {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handleTimelineChange = function handleTimelineChange(event) {\n  var value = event.target.value;\n  video.currentTime = value;\n};\n\nvar handleFullscreenClick = function handleFullscreenClick() {\n  var fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullscreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullscreenBtn.innerText = \"Exit Full Screen\";\n  }\n};\n\nvar moveIntoScreenTimeout = null;\nvar movementInScreenTimeout = null;\n\nvar hideControls = function hideControls() {\n  return videoControls.classList.remove(\"showing\");\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  if (moveIntoScreenTimeout) {\n    clearTimeout(moveIntoScreenTimeout);\n    moveIntoScreenTimeout = null;\n  }\n\n  if (movementInScreenTimeout) {\n    clearTimeout(movementInScreenTimeout);\n    movementInScreenTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n  movementInScreenTimeout = setTimeout(hideControls, 1000);\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  moveIntoScreenTimeout = setTimeout(hideControls, 1000);\n};\n\nvar handlePlayKey = function handlePlayKey(event) {\n  var key = event.key;\n\n  if (key === \" \") {\n    handlePlayClick();\n  }\n};\n\nvar handleEnded = function handleEnded() {\n  var id = videoContainer.dataset.id;\n  fetch(\"/api/videos/\".concat(id, \"/view\"), {\n    method: \"POST\"\n  });\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nplayBtn.addEventListener(\"keyup\", handlePlayKey);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\ntimeline.addEventListener(\"input\", handleTimelineChange);\nfullscreenBtn.addEventListener(\"click\", handleFullscreenClick);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedmetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeupdate);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\nvideo.addEventListener(\"ended\", handleEnded);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;