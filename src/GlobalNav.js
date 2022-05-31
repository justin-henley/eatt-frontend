// Outside Components
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
// CSS
import styles from './GlobalNav.module.css';

function GlobalNav() {
  return (
    <Navbar expand="lg" sticky="top" collapseOnSelect className={styles.navbar}>
      <Container>
        <LinkContainer to="/" className={styles.navLogo}>
          <Navbar.Brand>eatt</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer to="/" className={styles.navText}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {/* Contains the links to all dish-related pages */}
            <NavDropdown title="Dishes">
              <LinkContainer to="/dishes">
                <NavDropdown.Item>All Dishes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/dishes/search">
                <NavDropdown.Item>Search Dishes</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/dishes/new">
                <NavDropdown.Item>Create New Dish</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            {/* Contains the links to all menu-related pages */}
            <NavDropdown title="Menus" id="nav-dropdown">
              <LinkContainer to="/menus">
                <NavDropdown.Item>All Menus</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/menus/search">
                <NavDropdown.Item>Search Menus</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/menus/new">
                <NavDropdown.Item>Create New Menu</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;
