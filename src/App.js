import styles from './App.module.css'; // Import css modules stylesheet as styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishAll from './DishAll';
import DishSearch from './DishSearch';
import Welcome from './Welcome';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

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
  dishes: {
    all: new PageRecord('Show All Dishes', '/dishes', <DishAll />),
    search: new PageRecord('Search Dishes', '/search-dishes', <DishSearch />),
    adv: new PageRecord('Advanced Search', '/adv-search', <Welcome />),
  },

  menus: {
    all: new PageRecord('Show All Menus', '/menus', <DishAll />),
    search: new PageRecord('Search Menus', '/search-dishes', <DishSearch />),
    adv: new PageRecord('Advanced Search', '/adv-search', <Welcome />),
  },
};

function App() {
  return (
    <Router>
      <Navbar
        expand="lg"
        sticky="top"
        collapseOnSelect
        className={styles.navbar}
      >
        <Container>
          <LinkContainer to={PageRecords.home.link} className={styles.navLogo}>
            <Navbar.Brand>eatttttt</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/" className={styles.navText}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {/* Contains the links to all dish-related pages */}
              <NavDropdown title="Dishes">
                <LinkContainer to={PageRecords.dishes.all.link}>
                  <NavDropdown.Item>
                    {PageRecords.dishes.all.name}
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={PageRecords.dishes.search.link}>
                  <NavDropdown.Item>
                    {PageRecords.dishes.search.name}
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to={PageRecords.dishes.adv.link}>
                  <NavDropdown.Item>
                    {PageRecords.dishes.adv.name}
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {/* Contains the links to all menu-related pages */}
              <NavDropdown title="Menus" id="nav-dropdown">
                <LinkContainer to={PageRecords.menus.all.link}>
                  <NavDropdown.Item>
                    {PageRecords.menus.all.name}
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={PageRecords.menus.search.link}>
                  <NavDropdown.Item>
                    {PageRecords.menus.search.name}
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to={PageRecords.menus.adv.link}>
                  <NavDropdown.Item>
                    {PageRecords.menus.adv.name}
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes className={styles.bodyArea}>
        <Route
          path={PageRecords.dishes.adv.link}
          element={PageRecords.dishes.adv.element}
        />
        <Route
          path={PageRecords.dishes.all.link}
          element={PageRecords.dishes.all.element}
        />
        <Route
          path={PageRecords.dishes.search.link}
          element={PageRecords.dishes.search.element}
        />
        <Route
          path={PageRecords.dishes.adv.link}
          element={PageRecords.dishes.adv.element}
        />

        <Route
          path={PageRecords.dishes.search.link}
          element={PageRecords.dishes.search.element}
        />
        <Route index element={PageRecords.home.element} />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>

      <footer>
        Favicon by <a href="https://icons8.com/">icons8</a>
        <a href="https://www.freepik.com/photos/pearl-tea">
          <br />
          Pearl tea photo created by tawatchai07 - www.freepik.com
        </a>
      </footer>
    </Router>
  );
}

export default App;
