
import React, { useState } from "react";
import SongCard from "../components/SongCard";
import Player from "../components/Player";




function Home() {
  const [songs] = useState([
    { id: 1, title: "vaa vaa pakkam vaa", artist: "DJ Gowtham", url: "", cover:"" },
    { id: 2, title: "Monica ", artist: "Anirudh", url: "", cover: "" },
    { id: 3, title: "PowerHouse", artist: "Anirudh", url: "", cover: "" },
    { id: 4, title: "Badass", artist: "Anirudh", url: "", cover: "" },
    { id: 5, title: "Vibe", artist: "PaalDabba", url: "", cover: "" },
    { id: 6, title: "Soniya soniya", artist: "AR.Rahman", url: "", cover: "" },
    { id: 7, title: "Mobsta", artist: "Anirudh", url: "", cover: "" },
    { id: 8, title: "Chikitu", artist: "Anirudh", url: "", cover: "" },
    { id: 9, title: "Kanima", artist: "Santhosh Naraynan", url: "", cover: "" },
    { id: 10, title: "Nee Singam Dhan", artist: "AR.Rahman", url: "", cover: "" },
 { id: 9, title: "Kanima", artist: "Santhosh Naraynan", url: "", cover: "" },
    { id: 10, title: "Nee Singam Dhan", artist: "AR.Rahman", url: "", cover: "" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const playSong = (index) => setCurrentIndex(index);

  return (
    <div className="home">
      <h2>🎶 Trending Songs</h2>
      <div className="song-list">
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} playSong={() => playSong(index)} />
        ))}
      </div>
      {currentIndex !== null && (
        <Player songs={songs} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      )}
    </div>
  );
}

export default Home;
