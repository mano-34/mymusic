import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import About from "./pages/About";
import Footer from "./pages/Footer";
import AuthForms from "./components/Loginform"; 
import "./App.css";
import "@fontsource/poppins";
import "@fontsource/poppins/700.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeForm, setActiveForm] = useState(null); 

  return (
    <div>
      <BrowserRouter>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveForm={setActiveForm}
        />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/library" element={<Library />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>

     
      {activeForm && (
        <AuthForms activeForm={activeForm} setActiveForm={setActiveForm} />
      )}

      <Footer />
    </div>
  );
}

export default App;
