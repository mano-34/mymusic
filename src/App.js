import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import About from "./pages/About";
import "./App.css";
import "@fontsource/poppins"; 
import "@fontsource/poppins/700.css"; 



function App() {
  const[searchTerm, setSearchTerm] = useState("")
  return (
    <BrowserRouter>
      <Navbar  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

