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
            <Nav.Link>
              {/* TODO restyle */}
              <Link href="/">Home</Link>
            </Nav.Link>

            {/* Contains the links to all dish-related pages */}
            <NavDropdown title="Dishes">
              <NavDropdown.Item>
                <Link href="/dishes">All Dishes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/dishes/search">Search Dishes</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link href="/dishes/new">Create New Dish</Link>
              </NavDropdown.Item>
            </NavDropdown>

            {/* Contains the links to all menu-related pages */}
            <NavDropdown title="Menus" id="nav-dropdown">
              <NavDropdown.Item>
                <Link href="/menus">All Menus</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/menus/search">Search Menus</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link href="/menus/new">Create New Menu</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;
