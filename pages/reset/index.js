// Libraries
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
// Axios
import axios from '../api/axios';
const RESET_URL = '/reset';
// CSS
import styles from '../../styles/Reset.module.css';

const Reset = () => {
  // REFS
  const emailRef = useRef();
  const errRef = useRef();

  // STATE
  // User email to reset
  const [email, setEmail] = useState('');
  // Error message to display to user
  const [errMsg, setErrMsg] = useState('');
  // Set when the request is successful to switch display
  const [success, setSuccess] = useState(false);

  // EFFECTS
  // Set the focus on the email field when component loads
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Clear the error message when the user modifies any field
  useEffect(() => {
    setErrMsg('');
  }, [email]);

  // FUNCTIONS
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send to backend
    try {
      const response = await axios.post(RESET_URL, JSON.stringify({ email }), {
        headers: { 'Content-Type': 'application/json' },
      });

      // Success
      setSuccess(true);
      // Clear input fields
      setEmail('');
    } catch (error) {
      // Error messages
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (errMsg.response?.status === 409) {
        setErrMsg(
          'Reset email has already been sent. Please check your email, or wait 15 minutes before trying again.'
        );
      } else if (errMsg.response?.status === 400) {
        setErrMsg('Invalid email address.');
      } else {
        setErrMsg('Reset Failed.');
      }

      // Set focus on error message
      errRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      {success ? (
        <section className={styles.section}>
          <h1>Reset Email Sent.</h1>
          <p>Please check your email for your reset link.</p>
        </section>
      ) : (
        <section className={styles.section}>
          <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Password Reset</h1>
          <p className={styles.instructions}>Please enter your email address to reset your account</p>
          <form onSubmit={handleSubmit} className={styles.resetForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className={styles.input}
            />
            <button disabled={!email} className={styles.btn}>
              Reset Password
            </button>
          </form>
          <p className={styles.line}>
            Remembered your password? <Link href="/login">Sign In</Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Reset;
