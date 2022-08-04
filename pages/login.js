// Libraries
import Link from 'next/link';
// Hooks
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
// Axios
import axios from './api/axios';
const LOGIN_URL = '/auth';
// CSS
import styles from '../styles/Login.module.css';

// TODO how to handle refresh?
export default function Login() {
  // Auth context
  const { setAuth } = useAuth();

  // REFS
  const userRef = useRef();
  const errRef = useRef();

  // STATE
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // EFFECTS
  // Focus on username input on component load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error messages if user changes inputs
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  // HANDLERS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend
    try {
      // Attempt to login to backend
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      // Store the access token returned from auth
      const accessToken = response?.data?.accessToken;

      const roles = response?.data?.roles;
      setAuth({ user, /* pwd, */ roles, accessToken });

      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      // Focus on the error display for screen readers
      errRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      {success ? (
        <section className={styles.section}>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link href="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section className={styles.section}>
          {/* Error message */}
          <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Username */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className={styles.input}
            />
            {/* Password */}
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className={styles.input}
            />
            {/* Submit Button */}
            <button className={styles.loginBtn}>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className={styles.line}>
              {/* put router link here */}
              <Link href="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
}
