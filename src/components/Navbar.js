import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";

function Navbar({ searchTerm, setSearchTerm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <Music2 size={28} />
          <span>BeatBox</span>
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔍︎</button>
      </div>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>

      <ul className={isOpen ? "show" : ""}>
        <li><Link to="/" onClick={handleLinkClick}> 🏠︎ Home</Link></li>
        <li><Link to="/library" onClick={handleLinkClick}>📖 Library</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>ⓘ About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;


