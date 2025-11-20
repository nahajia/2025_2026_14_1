// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import Menu1 from './Menu1/Menu1';


// App komponens
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Menu1 />} />
         
          <Route path="/menu1" element={<Menu1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
