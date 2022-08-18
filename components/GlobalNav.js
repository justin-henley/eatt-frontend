// Libraries
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
// Hooks
import useAuth from '../hooks/useAuth';
// CSS
import styles from '../styles/GlobalNav.module.css';
// Icons
import { FaUserCircle } from 'react-icons/fa';

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
            <NavDropdown title={<span className={styles.navText}>Search</span>}>
              <Link href="/dishes" passHref>
                <NavDropdown.Item>Search Dishes</NavDropdown.Item>
              </Link>
              <Link href="/menus" passHref>
                <NavDropdown.Item>Search Menus</NavDropdown.Item>
              </Link>
            </NavDropdown>

            {/* Contains the links to all menu-related pages */}
            <NavDropdown title={<span className={styles.navText}>Create</span>}>
              <Link href="/dishes/new" passHref>
                <NavDropdown.Item>New Dish</NavDropdown.Item>
              </Link>

              <Link href="/menus/new" passHref>
                <NavDropdown.Item>New Menu</NavDropdown.Item>
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
  // Auth context
  const { auth, setAuth } = useAuth();

  // Logout from the back end and clear auth
  const handleLogout = async () => {
    // Logout from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: 'GET',
    });

    // Clear the access token
    setAuth({});
  };

  return auth?.user ? (
    <>
      <NavDropdown
        title={
          <span className={styles.navText}>
            <FaUserCircle />
            &nbsp;
            {auth.user}
          </span>
        }
      >
        <Link href="/account/dishes" passHref>
          <NavDropdown.Item>My Dishes</NavDropdown.Item>
        </Link>

        <Link href="/account/menus" passHref>
          <NavDropdown.Item>My Menus</NavDropdown.Item>
        </Link>
        <NavDropdown.Divider />
        <Link href="" passHref>
          <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
        </Link>
      </NavDropdown>
    </>
  ) : (
    <Link href="/login" passHref>
      <Nav.Link className={styles.navText}>Log In</Nav.Link>
    </Link>
  );
};
