import React, { useRef, useEffect, useState } from "react";

function Player({ songs, currentIndex, setCurrentIndex, isPlaying, setIsPlaying, addToLibrary }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();

      const handleCanPlay = () => {
        setDuration(audio.duration || 0);
        if (isPlaying) {
          audio.play().catch((err) => console.log("Play prevented:", err));
        }
      };

      const updateTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [currentIndex]);

  // Sync play/pause with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play prevented:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player">
      <h3>Now Playing: {songs[currentIndex].title}</h3>
      <p>{songs[currentIndex].artist}</p>

      <audio ref={audioRef} controls style={{ display: "none" }}>
        <source src={songs[currentIndex].url} type="audio/mp3" />
      </audio>

      {/* 🎵 Timer + Seek bar */}
      <div className="timer">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          style={{
            background: `linear-gradient(
              to right,
              rebeccapurple ${(currentTime / duration) * 100}%,
              white ${(currentTime / duration) * 100}%
            )`,
          }}
        />

        <span>{formatTime(duration)}</span>
      </div>

      {/* 🎵 Controls */}
      <div className="controls">
        <button onClick={playPrev}>⏮</button>
        <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
        <button onClick={playNext}>⏭</button>
        <button onClick={() => addToLibrary(songs[currentIndex])}>❤︎</button>
      </div>
    </div>
  );
}

export default Player;



