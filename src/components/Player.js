
import React, { useRef, useEffect, useState } from "react";

function Player({ songs, currentIndex, setCurrentIndex }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const togglePlayPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="player">
      <h3>Now Playing: {songs[currentIndex].title}</h3>
      <p>{songs[currentIndex].artist}</p>
      <audio ref={audioRef} controls style={{ display: "none" }}>
        <source src={songs[currentIndex].url} type="audio/mp3" />
      </audio>
      <div className="controls">
        <button onClick={playPrev}>⏮</button>
        <button onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
        <button onClick={playNext}>⏭</button>
      </div>
    </div>
  );
}

export default Player;

