import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import Shop from './component/Shop';
import Contact from './component/Contact';
import'./App.css';
function App() {
  return (

   
    <Router>
    
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          
        </Routes>
    
    </Router>


  );
}

export default App;
