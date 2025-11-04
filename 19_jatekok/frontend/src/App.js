// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import Jatekok from './Jatekok/Jatekok';


// App komponens
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Jatekok />} />
         
          <Route path="/jatekok" element={<Jatekok />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
