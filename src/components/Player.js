import React, { useRef, useEffect, useState } from "react";

function Player({ songs, currentIndex, setCurrentIndex, addToLibrary }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();

      const handleCanPlay = () => {
        audio.play().catch((err) =>
          console.log("Play prevented by browser:", err)
        );
        setIsPlaying(true);
      };

      audio.addEventListener("canplay", handleCanPlay);

      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentIndex]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) =>
        console.log("Play prevented by browser:", err)
      );
    }
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
       
        <button onClick={() => addToLibrary(songs[currentIndex])}>
          ❤️</button>
      </div>
    </div>
  );
}

export default Player;


