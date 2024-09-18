
const audio = new Audio();
const favicon = document.querySelector("link[rel~='icon']");
const title = document.querySelector("title");
const background = document.querySelector(".player");
const playBtn = document.querySelector(".button__play");
const forwardBtn = document.querySelector(".button__forward");
const backBtn = document.querySelector(".button__back");
const tarckArtist = document.querySelector(".track__title")
const trackName = document.querySelector(".track__subtitle");
const cover = document.querySelector(".track__img");
const progress = document.querySelector(".progress");
const timeLine = document.querySelector(".timeline");
const trackDurationContainer = document.querySelector(".duration");
const currentTimeContainer = document.querySelector(".time");

let isPlay = false;
let playNum = 0;
const songs = ["Mr.Crowley", "Euthanize", "Two Towers"];
const artist = ["Moonspell", "Zero Theorem", "Fit for an Autopsy"]

const loadSong = (song) => {
  title.innerHTML = `${artist[playNum]} - ${song}`;
  trackName.innerHTML = song;
  tarckArtist.innerHTML = artist[playNum];
  background.style.backgroundImage = `url(./assets/img/band${playNum + 1}.jpg)`;
  audio.src = `./assets/audio/${song}.mp3`
  cover.src = `./assets/img/cover${playNum + 1}.jpg`
};

loadSong(songs[playNum]);

const playAudio = () => {
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playBtn.classList.add("pause")
    favicon.href = "./assets/svg/favicon.png";
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("pause");
    favicon.href = "./assets/svg/pause-favicon.png";
  }
};

const playNext = () => {
  let trackDuration = audio.duration;

  playNum++;
  trackDurationContainer.innerHTML = `${getTimeCodeFromNum(trackDuration)}`;
  isPlay = false;
  if (playNum < 0) {
    playNum = songs.length - 1;
  }
  if (playNum > songs.length - 1) {
    playNum = 0;
  }
  loadSong(songs[playNum]);
  playAudio();
};

const playPrev = () => {
  let trackDuration = audio.duration;

  playNum--;
  trackDurationContainer.innerHTML = `${getTimeCodeFromNum(trackDuration)}`;
  isPlay = false;
  if (playNum < 0) {
    playNum = songs.length - 1;
  }
  if (playNum > songs.length - 1) {
    playNum = 0;
  }
  loadSong(songs[playNum]);
  playAudio();
};

const updateProgress = (e) => {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeContainer.innerHTML = `${getTimeCodeFromNum(audio.currentTime)}`
};

const setProgress = (e) => {
  const width = timeLine.clientWidth;
  const clientX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientX / width) * duration;
};

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

playBtn.addEventListener("click", playAudio);
forwardBtn.addEventListener("click", playNext);
backBtn.addEventListener("click", playPrev);
audio.addEventListener ("timeupdate", updateProgress);
timeLine.addEventListener("click", setProgress);
audio.addEventListener("ended", playNext);
