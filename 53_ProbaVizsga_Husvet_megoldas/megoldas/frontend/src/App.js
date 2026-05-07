import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Nyitolap from "./Nyitolap/Nyitolap";
import Versek from "./Versek/Versek";
import StilusTorles from "./StilusTorles/StilusTorles";
import KeresesKedveles from "./VersKereses/KeresesKedveles";
import StilusFelvitel from "./StilusFelvitel/StilusFelvitel";
import StilusModositas from "./StilusModositas/StilusModositas";
import KeresCim from "./VersKereses/KeresCim";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Nyitolap />} />
        <Route path="/nyitolap" element={<Nyitolap />} />
        <Route path="/versek" element={<Versek />} />
        <Route path="/stilusTorles" element={<StilusTorles />} />
        <Route path="/keresKedveles" element={<KeresesKedveles />} />
        <Route path="/stilusFelvitel" element={<StilusFelvitel />} />
        <Route path="/stilusModositas" element={<StilusModositas />} />
        <Route path="/keresCim" element={<KeresCim />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;