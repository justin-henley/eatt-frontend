// Libraries
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Hooks
import useAuth from '../hooks/useAuth';
// CSS
import styles from '../styles/GlobalNav.module.css';

// TODO add login/out link
function GlobalNav() {
  return (
    <Navbar expand="lg" sticky="top" collapseOnSelect className={styles.navbar}>
      <Container>
        <Navbar.Brand className={styles.navLogo}>
          <Link href="/">eatt</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.justifyEnd}>
            <Link href="/" passHref>
              <Nav.Link className={styles.navText}>Home</Nav.Link>
            </Link>

            {/* Contains the links to all dish-related pages */}
            <NavDropdown title={<span className={styles.navText}>Dishes</span>}>
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
            <NavDropdown title={<span className={styles.navText}>Menus</span>}>
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
            <LogInOut />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNav;

const LogInOut = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  return auth?.user ? (
    <button
      className={styles.logBtn}
      onClick={() => {
        setAuth({});
        router.push('/');
      }}
    >
      Log Out
    </button>
  ) : (
    <button className={styles.logBtn} onClick={() => router.push('/login')}>
      Log In
    </button>
  );
};
