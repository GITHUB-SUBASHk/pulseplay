export const MoodEngine = (() => {
  let recentMoods = [];

  const classifyMood = (tags, filename = "") => {
    const genre = (tags.genre || "").toLowerCase();
    const title = (tags.title || filename).toLowerCase();
    const artist = (tags.artist || "").toLowerCase();

    if (genre.includes("sad") || title.includes("sad") || artist.includes("ar rahman")) return "sad";
    if (genre.includes("romantic") || title.includes("love")) return "romantic";
    if (genre.includes("lofi") || title.includes("chill")) return "chill";
    if (genre.includes("edm") || genre.includes("hip hop")) return "energy";
    if (genre.includes("classical") || title.includes("focus")) return "focus";

    return "neutral";
  };

  const pushMood = (mood) => {
    recentMoods.push(mood);
    if (recentMoods.length > 5) recentMoods.shift();
  };

  const getCurrentMoodTrend = () => {
    const count = {};
    for (let mood of recentMoods) {
      count[mood] = (count[mood] || 0) + 1;
    }
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "neutral";
  };

  const matchNextSong = (files, metadataMap) => {
    const currentMood = getCurrentMoodTrend();

    const ranked = files
      .map((file, idx) => {
        const tags = metadataMap[file.name] || {};
        const mood = classifyMood(tags, file.name);
        let score = 0;
        if (mood === currentMood) score += 5;
        else if (isMoodNear(currentMood, mood)) score += 3;
        else score -= 1;
        return { index: idx, score };
      })
      .sort((a, b) => b.score - a.score);

    return ranked[0]?.index ?? 0;
  };

  const isMoodNear = (m1, m2) => {
    const moods = ["sad", "romantic", "neutral", "chill", "energy"];
    const i1 = moods.indexOf(m1);
    const i2 = moods.indexOf(m2);
    return Math.abs(i1 - i2) <= 1;
  };

  return {
    classifyMood,
    pushMood,
    getCurrentMoodTrend,
    matchNextSong
  };
})();