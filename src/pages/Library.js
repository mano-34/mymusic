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
    if (currentIndex !== null && audioRef.current) {
      audioRef.current.src = librarySongs[currentIndex].url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentIndex]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  // Update currentTime & duration for slider
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  const playNext = () => setCurrentIndex((prev) => (prev + 1) % librarySongs.length);
  const playPrev = () => setCurrentIndex((prev) => (prev - 1 + librarySongs.length) % librarySongs.length);

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

      {librarySongs.length === 0 ? <p>No songs in your library yet.</p> :
        <div className="song-list">
          {librarySongs.map((song, index) => (
            <div key={song.id} className="song-card">
              <img src={song.cover} alt={song.title} className="cover" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <div className="actions">
                <button onClick={() => {
                  if (currentIndex === index) togglePlayPause();
                  else setCurrentIndex(index);
                }}>
                  {isPlaying && currentIndex === index ? "⏸" : "▶"}
                </button>
              </div>
            </div>
          ))}
        </div>
      }

      {currentIndex !== null && (
        <div className="librarycontrols">
          <h3>Now Playing: {librarySongs[currentIndex].title}</h3>
          <p>{librarySongs[currentIndex].artist}</p>

          {/* Home-style timer + slider */}
          <div className="timer">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(to right, rebeccapurple ${(currentTime/duration)*100}%, white ${(currentTime/duration)*100}%)`
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <button onClick={playPrev}>⏮</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={playNext}>⏭</button>
            <button onClick={() => removeSong(librarySongs[currentIndex].id)}>🗑</button>
          </div>
        </div>
      )}

      <audio ref={audioRef} controls style={{ display: "none" }} />
      <hr />
    </div>
  );
}

export default Library;



