import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishAll from './DishAll';
import DishSearch from './DishSearch';
import Welcome from './Welcome';

function App() {
  /*return (
    <div className="App">
      <Nav />
    </div>
  );*/
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/dishes">Show All Dishes</Link>
            </li>
            <li>
              <Link to="/search">Search by English Name</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dishes" element={<DishAll />} />
          <Route path="/search" element={<DishSearch />} />
          <Route path="/" element={<h1>index</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
