import React, { useEffect, useState, useRef } from "react";

function Library() {
  const [librarySongs, setLibrarySongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem("library")) || [];
    setLibrarySongs(savedLibrary);
  }, []);

  useEffect(() => {
    if (currentIndex !== null && audioRef.current && librarySongs[currentIndex]) {
      audioRef.current.src = librarySongs[currentIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, librarySongs, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setCurrentTime(0);
      setIsPlaying(false);
      // 👉 If you want auto-next, replace with: playNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  const playNext = () =>
    setCurrentIndex((prev) => (prev + 1) % librarySongs.length);

  const playPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + librarySongs.length) % librarySongs.length);

  const removeSong = (id) => {
    const updated = librarySongs.filter((s) => s.id !== id);
    setLibrarySongs(updated);
    localStorage.setItem("library", JSON.stringify(updated));
    if (currentIndex !== null && librarySongs[currentIndex]?.id === id) {
      audioRef.current.pause();
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="library">
      <h4>📚 Your Music Library</h4>

      {librarySongs.length === 0 ? (
        <p>No songs in your library yet.</p>
      ) : (
        <div className="song-list">
          {librarySongs.map((song, index) => (
            <div key={song.id} className="song-card">
              <img src={song.cover} alt={song.title} className="cover" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <div className="actions">
                <button
                  onClick={() => {
                    if (currentIndex === index) togglePlayPause();
                    else {
                      setCurrentIndex(index);
                      setIsPlaying(true);
                    }
                  }}
                >
                  {isPlaying && currentIndex === index ? "⏸" : "▶"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentIndex !== null && (
        <div className="librarycontrols">
          <h3>Now Playing: {librarySongs[currentIndex].title}</h3>
          <p>{librarySongs[currentIndex].artist}</p>

          <div className="timer">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                background: duration
                  ? `linear-gradient(
                      to right,
                      rebeccapurple ${(currentTime / duration) * 100}%,
                      #ddd ${(currentTime / duration) * 100}%
                    )`
                  : "#ddd",
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <button onClick={playPrev}>⏮</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={playNext}>⏭</button>
            <button onClick={() => removeSong(librarySongs[currentIndex].id)}>
              🛇
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} controls style={{ display: "none" }} />
    </div>
  );
}

export default Library;

