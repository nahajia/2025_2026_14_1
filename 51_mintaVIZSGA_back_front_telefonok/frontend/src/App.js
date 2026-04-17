import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar';
import Telefonok from './Telefonok/Telefonok';
import TelefonTorles from './TelefonTorles/TelefonTorles';
import KeresKijelzo from './TelefonKereses/KeresesKijelzo';
import TelefonModositas from './TelefonModositas/TelefonModositas';
import TelefonFelvitel from './TelefonFelvitel/TelefonFelvitel';
import TelefonFelvitel2 from './TelefonFelvitel/TelefonFelvitel';
import Nyitolap from './Nyitolap/Nyitolap';
import KeresNev from './TelefonKereses/KeresNev';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Nyitolap />} />
          <Route path="/nyitolap" element={<Nyitolap />} />
          <Route path="/telefonok" element={<Telefonok />} />
          <Route path="/telefonTorles" element={<TelefonTorles />} />
          <Route path="/keresKijelzo" element={<KeresKijelzo />} />
          <Route path="/telefonFelvitel" element={<TelefonFelvitel />} />
          <Route path="/telefonFelvitel2" element={<TelefonFelvitel2 />} />
          <Route path="/telefonModositas" element={<TelefonModositas />} />
          <Route path="/KeresNev" element={<KeresNev />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;