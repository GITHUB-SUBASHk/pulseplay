import { MoodEngine } from './moodEngine.js';

const audio = document.getElementById("audio");
const seekBar = document.getElementById("seekBar");
const currentSong = document.getElementById("currentSong");
const playPauseBtn = document.getElementById("playPauseBtn");
const songListUI = document.getElementById("songList");

let songs = [];
let metadataMap = {};
let currentIndex = -1;
let isPlaying = false;

function renderSongList() {
  songListUI.innerHTML = "";
  songs.forEach((file, idx) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.addEventListener("click", () => loadSong(idx, true));
    songListUI.appendChild(li);
  });
}

function highlightSong(index) {
  const listItems = songListUI.querySelectorAll("li");
  listItems.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

function updatePlayButton() {
  playPauseBtn.textContent = isPlaying ? "⏸" : "▶️";
}

function togglePlayPause() {
  if (!audio.src) return;
  isPlaying = !isPlaying;
  isPlaying ? audio.play() : audio.pause();
  updatePlayButton();
}

function playNext() {
  if (!songs.length) return;
  const nextIndex = MoodEngine.findNextByMood(songs, metadataMap);
  loadSong(nextIndex, true);
}

function playPrevious() {
  if (currentIndex > 0) {
    loadSong(currentIndex - 1, true);
  }
}

function loadSong(index, autoPlay = false) {
  const file = songs[index];
  if (!file) return;
  currentIndex = index;

  const reader = new FileReader();
  reader.onload = (e) => {
    audio.src = e.target.result;
    if (autoPlay || isPlaying) {
      audio.play();
      isPlaying = true;
    }
    updatePlayButton();
    highlightSong(index);
    currentSong.textContent = file.name;
  };
  reader.readAsDataURL(file);

  window.jsmediatags.read(file, {
    onSuccess: (tag) => {
      metadataMap[file.name] = tag.tags;
      const mood = MoodEngine.classifyMood(tag.tags, file.name);
      MoodEngine.pushMood(mood);
    },
    onError: () => {
      const mood = MoodEngine.classifyMood({}, file.name);
      MoodEngine.pushMood(mood);
    }
  });
}

audio.addEventListener("timeupdate", () => {
  seekBar.max = audio.duration || 0;
  seekBar.value = audio.currentTime;
});
seekBar.addEventListener("input", () => {
  audio.currentTime = seekBar.value;
});
audio.addEventListener("ended", () => playNext());

document.getElementById("playPauseBtn").addEventListener("click", togglePlayPause);
document.getElementById("nextBtn").addEventListener("click", playNext);
document.getElementById("prevBtn").addEventListener("click", playPrevious);

// Folder popup logic
document.getElementById("openFolderPopup").addEventListener("click", () => {
  document.getElementById("folderPopup").classList.add("active");
});
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("folderPopup").classList.remove("active");
});
document.getElementById("chooseBtn").addEventListener("click", () => {
  document.getElementById("folderInput").click();
});
document.getElementById("folderInput").addEventListener("change", () => {
  const files = Array.from(document.getElementById("folderInput").files).filter(f => f.type.startsWith("audio/"));
  if (files.length > 0) {
    songs = files;
    currentIndex = -1;
    renderSongList();
    loadSong(0, true);
    document.getElementById("folderPopup").classList.remove("active");
  }
});
