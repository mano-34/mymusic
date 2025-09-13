import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>

      <div className="logo">
        <Link to="/">
          <Music2 size={28} />
          <span>BeatBox</span>
        </Link>
      </div>


      <div className="search-bar">
        <input type="text" placeholder="Search music..." />
        <button> 🔍︎</button>
      </div>
       <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>
      <ul className={isOpen ? "show" : ""}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

