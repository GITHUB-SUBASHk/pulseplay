🎵 Mood-Based Smart Music Player (Offline & AI-enhanced)

A powerful, elegant offline music player built for the web with support for smart mood-based shuffling, AI playlist prediction, and offline access via Progressive Web App (PWA). It supports folder upload, drag-and-drop, and plays audio in a smooth, responsive UI.(AI - mood engine needs preliminary training).,


---

📁 Features

🎶 Upload music folders or files (offline access)

🤖 AI-powered mood-based smart shuffling

⏯️ Unified Play/Pause button with intuitive controls

⏮️ Previous / ⏭️ Next auto-play

🧠 Learns user mood based on song choices (local AI)

🧱 PWA support with service workers

📦 Fully containerized with Docker support



---

🚀 Getting Started

---
RUN locally use GIT pages 

else;

1. PULL the Repo:

https://github.com/GITHUB-SUBASHk/pulseplay.git

🐳 Run Locally with Docker

Build the Docker Image

docker build -t mood-music-player:v1 .

This uses the Dockerfile in the root to build your player app into a small static web server image using Nginx.

Run the Container

docker run -d -p 8080:80 --name music-app mood-music-player

Then open in browser:
👉 http://localhost:8080


---

(Optional) :)
CROSS check the command as of ur needs

📤 Push to Docker Hub 
1. Login to Docker

docker login
2. Tag the Image

docker tag mood-music-player yourdockerhubusername/music-player:latest
3. Push
docker push yourdockerhubusername/music-player:latest

---

📂 Project Structure

pulse-player/
├── index.html             # Main HTML entry
├── style.css              # Styling
├── script.js              # Core logic: Player, Mood AI, UI
├── manifest.json          # PWA manifest
├── service-worker.js      # Offline support
├── assets/                # Icons, logos, default assets
├── Dockerfile             # Docker configuration
└── README.md              # You're here


---

📦 Dockerfile Explained

# Use a lightweight web server
FROM nginx:alpine

# Copy the app files into nginx's public directory
COPY . /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

> This serves your app via Nginx on port 80.

---

⚙️ Tech Stack

HTML5, CSS3,Vanilla JS(without use of any external dependecies)

Service Workers (for offline use)

LocalStorage + IndexedDB (for mood learning)

Docker (for deployment)

Nginx (as static web server)

---

💡 Future Features (Coming Soon)

🌙 Light/Dark theme switch.

🎧 Genre and artist-aware AI queueing

💽 Integration with external metadata sources

📈 Analytics view (mood trends, favorites)

🧠 Neural model plug-in support

---

🙌 Contributing

Contributions are welcomed. Please fork the repo and create a pull request. For major changes, please open an issue first to discuss the proposed change.

---

📄 License

MIT License © 2025 [SUBASH K]

---

Let me know!
