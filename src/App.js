import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishAll from './DishAll';
import DishSearch from './DishSearch';
import Welcome from './Welcome';

function App() {
  return (
    <Router>
      <div>
        <nav class="navbar">
          <div class="logo">
            <Link to="/">Menu Translation</Link>
          </div>

          <ul class="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">
              &#9776;
            </label>

            <div class="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dishes">Show All Dishes</Link>
              </li>
              <li>
                <Link to="/search">Search Dishes</Link>
              </li>
            </div>
          </ul>
        </nav>

        <Routes>
          <Route path="/dishes" element={<DishAll />} />
          <Route path="/search" element={<DishSearch />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
