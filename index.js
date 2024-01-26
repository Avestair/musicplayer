const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/Change.m4a",
    displayName: "Change",
    cover: "assets/djo.jpg",
    artist: "Djo",
  },
  {
    path: "assets/chicago.mp3",
    displayName: "Chicago",
    cover: "assets/chicago.png",
    artist: "Ekkstacy",
  },
  {
    path: "assets/Outshined.m4a",
    displayName: "Outshined",
    cover: "assets/outshined.jfif",
    artist: "Soundgarden",
  },
  {
    path: "assets/SexTypeThing.m4a",
    displayName: "Sex Type Thing",
    cover: "assets/sextype.jpg",
    artist: "Stone Temple Pilots",
  },
  {
    path: "assets/Elephant.m4a",
    displayName: "Elephant",
    cover: "assets/tame.jpg",
    artist: "Tame Impala",
  },
  {
    path: "assets/blackhole.m4a",
    displayName: "Black Hole Sun",
    cover: "assets/blackhole.jfif",
    artist: "Soundgarden",
  },
  {
    path: "assets/Freaks.mp3",
    displayName: "Freaks",
    cover: "assets/surfcurse.jpg",
    artist: "Surf Curse",
  },
  {
    path: "assets/EndofBeginning.mp3",
    displayName: "EndofBeginning",
    cover: "assets/djo.jpg",
    artist: "Djo",
  },
  {
    path: "assets/ChamberOfReflection.mp3",
    displayName: "ChamberOfReflection",
    cover: "assets/chamber.jpg",
    artist: "Mac DeMacro",
  },
  {
    path: "assets/Intermission.mp3",
    displayName: "Intermission",
    cover: "assets/straw.jpg",
    artist: "Strawberry Guy",
  },
  {
    path: "assets/lithium.mp3",
    displayName: "lithium",
    cover: "assets/lit.jpg",
    artist: "Nirvana",
  },
  {
    path: "assets/inmy.mp3",
    displayName: "in my head till I'm dead",
    cover: "assets/surfcurse.jpg",
    artist: "surfcurse",
  },
  {
    path: "assets/LongGoneday.m4a",
    displayName: "long gone day",
    cover: "assets/longgone.jpg",
    artist: "Mad Season",
  },
  {
    path: "assets/EvenFlow.m4a",
    displayName: "Even Flow",
    cover: "assets/evenflow.jfif",
    artist: "Pearl Jam",
  },
  {
    path: "assets/thenimether.m4a",
    displayName: "Then I Met Her",
    cover: "assets/theni.jfif",
    artist: "Ekkstacy",
  },
  {
    path: "assets/purge.m4a",
    displayName: "Purge",
    cover: "assets/purge.jpg",
    artist: "Downface",
  },
];

let musicIndex = 0;
let isPlaying = false;
image.style.animationPlayState = "paused";

function togglePlay() {
  if (isPlaying === true) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  image.style.animationPlayState = "running";
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  image.style.animationPlayState = "paused";
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
  image.classList.add("rotating");
  image.style.animation = "none";
  image.offsetHeight;
  image.style.animation = null;
}

loadMusic(songs[musicIndex]);

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);
