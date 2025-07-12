const folderInput = document.getElementById("folderInput");
const folderPopup = document.getElementById("folderPopup");
const openFolderPopup = document.getElementById("openFolderPopup");
const chooseBtn = document.getElementById("chooseBtn");
const closePopup = document.getElementById("closePopup");

openFolderPopup.addEventListener("click", () => {
  folderPopup.classList.add("active");
});

closePopup.addEventListener("click", () => {
  folderPopup.classList.remove("active");
});

chooseBtn.addEventListener("click", () => {
  folderInput.click();
});

folderInput.addEventListener("change", () => {
  const files = Array.from(folderInput.files).filter(f => f.type.startsWith("audio/"));
  if (files.length > 0) {
    songs = files;
    localStorage.setItem("pulseplay_last_files", JSON.stringify(files.map(f => f.name))); // optional
    loadSong(0);
    folderPopup.classList.remove("active");
  } else {
    currentSong.textContent = "No audio files found.";
  }
});