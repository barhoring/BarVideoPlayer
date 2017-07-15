const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
let fullscreenOn = false;
let mousedown = false;


function togglePlay(){
	video.paused ? video.play() : video.pause() ;
}

function updateButton(){
	toggle.textContent = this.paused ? '►' : '❚❚';
}

function skip(){
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e){
	video[this.name] = this.value;
}

function handleProgress(){
	percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	time = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime += time; 
	console.log(e);
}

function setFullscreen(e){
	console.log(this);
	fullscreenOn = !fullscreenOn;
	debugger;
	elem = video;
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}
}



ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
//ranges.forEach(button => button.addEventListener('mousemove', skip));
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', 	() => mousedown = true);
progress.addEventListener('mouseup', 	() => mousedown = false);
fullscreen.addEventListener('click', setFullscreen);
console.dir(video);
