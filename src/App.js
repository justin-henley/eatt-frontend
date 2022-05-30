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
  dishes: new PageRecord('Show All Dishes', '/dishes', <DishAll />),
  search: new PageRecord('Search Dishes', '/search', <DishSearch />),
  adv: new PageRecord('Advanced Search', '/adv-search', <Welcome />),
};

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" sticky="top" collapseOnSelect>
        <Container>
          <LinkContainer to={PageRecords.home.link}>
            <Navbar.Brand>Parakeat</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {/* Contains the links to all dish-related pages */}
              <NavDropdown title="Dishes" id="nav-dropdown">
                <LinkContainer to={PageRecords.dishes.link}>
                  <NavDropdown.Item>{PageRecords.dishes.name}</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={PageRecords.search.link}>
                  <NavDropdown.Item>{PageRecords.search.name}</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to={PageRecords.adv.link}>
                  <NavDropdown.Item>{PageRecords.adv.name}</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes className={styles.bodyArea}>
        <Route path={PageRecords.adv.link} element={PageRecords.adv.element} />
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
