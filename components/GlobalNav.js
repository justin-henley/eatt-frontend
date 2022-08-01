// Libraries
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
// CSS
import styles from '../styles/GlobalNav.module.css';

// TODO add login/out link
function GlobalNav() {
  return (
    <Navbar expand="lg" sticky="top" collapseOnSelect className={styles.navbar}>
      <Container>
        <Navbar.Brand className={styles.navLogo}>
          <Link href="/" className={styles.navLogo}>
            eatt
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link href="/" passHref>
              <Nav.Link>
                {/* TODO restyle */}
                Home
              </Nav.Link>
            </Link>

            {/* Contains the links to all dish-related pages */}
            <NavDropdown title="Dishes">
              <Link href="/dishes" passHref>
                <NavDropdown.Item>All Dishes</NavDropdown.Item>
              </Link>

              <Link href="/dishes/search" passHref>
                <NavDropdown.Item>Search Dishes</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />

              <Link href="/dishes/new" passHref>
                <NavDropdown.Item>Create New Dish</NavDropdown.Item>
              </Link>
            </NavDropdown>

            {/* Contains the links to all menu-related pages */}
            <NavDropdown title="Menus" id="nav-dropdown">
              <Link href="/menus" passHref>
                <NavDropdown.Item>All Menus</NavDropdown.Item>
              </Link>

              <Link href="/menus/search" passHref>
                <NavDropdown.Item>Search Menus</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />

              <Link href="/menus/new" passHref>
                <NavDropdown.Item>Create New Menu</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;
