
import React, { useState } from "react";
import SongCard from "../components/SongCard";
import Player from "../components/Player";
import vaaCover from "../assets/images/vaavaa.jpg"
import monica from "../assets/images/monica.jpg"
import PowerHouse from "../assets/images/power.jpg"
import Badass from "../assets/images/badass.jpg"
import vibe from "../assets/images/vibe.jpg"
import soniya from "../assets/images/soniya.jpg"
import mobsta from "../assets/images/mobsta.jpg"
import Chikitu from "../assets/images/Chikitu.jpg"
import kanima from "../assets/images/kanima.jpg"
import neesingam from "../assets/images/singam.jpg"
import thalaivan from "../assets/images/Thalaivan.jpg"
import madharasi from "../assets/images/Madharaasi.jpg"



function Home() {
  const [songs] = useState([
    { id: 1, title: "vaa vaa pakkam vaa", artist: "DJ Gowtham", url: "", cover: vaaCover },
    { id: 2, title: "Monica ", artist: "Anirudh", url: "", cover: monica },
    { id: 3, title: "PowerHouse", artist: "Anirudh", url: "", cover: PowerHouse },
    { id: 4, title: "Badass", artist: "Anirudh", url: "", cover: Badass},
    { id: 5, title: "Vibe", artist: "PaalDabba", url: "", cover: vibe },
    { id: 6, title: "Soniya soniya", artist: "AR.Rahman", url: "", cover: soniya },
    { id: 7, title: "Mobsta", artist: "Anirudh", url: "", cover: mobsta },
    { id: 8, title: "Chikitu", artist: "Anirudh", url: "", cover: Chikitu },
    { id: 9, title: "Kanima", artist: "Santhosh Naraynan", url: "", cover: kanima },
    { id: 10, title: "Nee Singam Dhan", artist: "AR.Rahman", url: "", cover: neesingam},
    { id: 11, title: "thalaivan", artist: "Santhosh Naraynan", url: "", cover: thalaivan },
    { id: 12, title: "madharasi", artist: "AR.Rahman", url: "", cover: madharasi },
  ]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const playSong = (index) => setCurrentIndex(index);

  return (
    <div className="home">
      <h2>🎶 Trending Now</h2>
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
