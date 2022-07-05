// Libraries
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
// CSS
import styles from '../styles/GlobalNav.module.css';

function GlobalNav() {
  return (
    <Navbar expand="lg" sticky="top" collapseOnSelect className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/">eatt</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/" className={styles.navText}>
              Home
            </Nav.Link>

            {/* Contains the links to all dish-related pages */}
            <NavDropdown title="Dishes">
              <NavDropdown.Item href="/dishes">All Dishes</NavDropdown.Item>
              <NavDropdown.Item href="/dishes/search">Search Dishes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dishes/new">Create New Dish</NavDropdown.Item>
            </NavDropdown>

            {/* Contains the links to all menu-related pages */}
            <NavDropdown title="Menus" id="nav-dropdown">
              <NavDropdown.Item href="/menus">All Menus</NavDropdown.Item>
              <NavDropdown.Item href="/menus/search">Search Menus</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/menus/new">Create New Menu</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;
