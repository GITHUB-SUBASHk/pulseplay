export const MoodEngine = (() => {
  let recentMoods = [];

  const classifyMood = (tags = {}, filename = "") => {
    const genre = (tags.genre || "").toLowerCase();
    const title = (tags.title || filename).toLowerCase();
    const artist = (tags.artist || "").toLowerCase();

    if (genre.includes("sad") || title.includes("sad")) return "sad";
    if (genre.includes("love") || title.includes("love")) return "romantic";
    if (genre.includes("lofi") || title.includes("chill")) return "chill";
    if (genre.includes("edm") || title.includes("party")) return "energy";
    return "neutral";
  };

  const pushMood = (mood) => {
    recentMoods.push(mood);
    if (recentMoods.length > 5) recentMoods.shift();
  };

  const getCurrentMoodTrend = () => {
    const count = {};
    for (const mood of recentMoods) {
      count[mood] = (count[mood] || 0) + 1;
    }
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "neutral";
  };

  const findNextByMood = (files, metadataMap) => {
    const trend = getCurrentMoodTrend();
    const match = files.findIndex((file) => {
      const mood = classifyMood(metadataMap[file.name] || {}, file.name);
      return mood === trend;
    });
    return match >= 0 ? match : Math.floor(Math.random() * files.length);
  };

  return { classifyMood, pushMood, getCurrentMoodTrend, findNextByMood };
})();
