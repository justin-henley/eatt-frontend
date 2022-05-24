import styles from './App.module.css'; // Import css modules stylesheet as styles
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
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link to="/">Menu Translation</Link>
          </div>

          <ul className={styles.navLinks}>
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" className={styles.hamburger}>
              &#9776;
            </label>

            <div className={styles.menu}>
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
        <div className={styles.bodyArea}>
          <Routes>
            <Route path="/dishes" element={<DishAll />} />
            <Route path="/search" element={<DishSearch />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
