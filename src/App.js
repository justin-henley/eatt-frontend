import styles from './App.module.css'; // Import css modules stylesheet as styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishAll from './DishAll';
import DishSearch from './DishSearch';
import Welcome from './Welcome';

class PageRecord extends Object {
  constructor(name, link, element) {
    super();
    this.name = name;
    this.link = link;
    this.element = element;
  }
}

const PageRecords = {
  home: new PageRecord('Home', '/', <Welcome />),
  dishes: new PageRecord('Show All Dishes', '/dishes', <DishAll />),
  search: new PageRecord('Search Dishes', '/search', <DishSearch />),
  adv: new PageRecord('Advanced Search', '/adv-search', <Welcome />),
};

function App() {
  return (
    <Router>
      <div>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link to={PageRecords.home.link}>Menu Translation</Link>
          </div>

          <ul className={styles.navLinks}>
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className={styles.hamburger}>
              &#9776;
            </label>

            <div className={styles.menu}>
              <li>
                <Link to={PageRecords.home.link}>{PageRecords.home.name}</Link>
              </li>
              <li>
                <Link to={PageRecords.dishes.link}>
                  {PageRecords.dishes.name}
                </Link>
              </li>
              <li>
                <Link to={PageRecords.search.link}>
                  {PageRecords.search.name}
                </Link>
              </li>
              <li>
                <Link to={PageRecords.adv.link}>{PageRecords.adv.name}</Link>
              </li>
            </div>
          </ul>
        </nav>
        <div className={styles.bodyArea}>
          <Routes>
            <Route
              path={PageRecords.adv.link}
              element={PageRecords.adv.element}
            />
            <Route
              path={PageRecords.dishes.link}
              element={PageRecords.dishes.element}
            />
            <Route
              path={PageRecords.search.link}
              element={PageRecords.search.element}
            />
            <Route
              path={PageRecords.home.link}
              element={PageRecords.home.element}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
