import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DishAll from './DishAll';
import DishSearch from './DishSearch';
import Welcome from './Welcome';

function App() {
  /*return (
    <div className="App">
      <Nav />
    </div>
  );*/
  const n = (
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
  );

  return (
    <Router>
      <StyledApp>
        {n}

        {/* A <Routes> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/dishes" element={<DishAll />} />
          <Route path="/search" element={<DishSearch />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </StyledApp>
    </Router>
  );
}

export default App;

const StyledApp = styled.div`
  width: 90vw;
  margin: 2em auto;
`;
