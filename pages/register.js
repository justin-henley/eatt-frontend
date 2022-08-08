// Libraries
import Link from 'next/link';
// Hooks
import { useRef, useState, useEffect } from 'react';
// Icons
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegTimesCircle } from 'react-icons/fa';
// Axios
import axios from './api/axios';
const REGISTER_URL = '/register';
// CSS
import styles from '../styles/Register.module.css';
// REGEX
// Email not registered by regex

// username must start with a letter, and must be 4 to 24 characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// password must have an uppercase letter, a lowercase letter, a digit, and a special character. 8 to 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  // Refs
  const userRef = useRef(); // User input
  const errRef = useRef(); // Allows focus on error for screen readers to announce
  const emailRef = useRef(); // Email input field

  // STATE
  // Email input field
  const [email, setEmail] = useState(''); // Value of the email input field
  const [emailFocus, setEmailFocus] = useState(false); // Whether we have focus on the email field

  // User input field
  const [user, setUser] = useState(''); // Value of the user input field
  const [validName, setValidName] = useState(false); // Whether the name validates or not
  const [userFocus, setUserFocus] = useState(false); // Whether we have focus on the input field

  // Password input field
  const [pwd, setPwd] = useState(''); // Value of the password input field
  const [validPwd, setValidPwd] = useState(false); // Whether the password validates or not
  const [pwdFocus, setPwdFocus] = useState(false); // Whether we have focus on the password field

  // Password match input field
  const [matchPwd, setMatchPwd] = useState(''); // Value of the password match input field
  const [validMatch, setValidMatch] = useState(false); // Whether the match validates or not
  const [matchFocus, setMatchFocus] = useState(false); // Whether we have focus on the match field

  // Submission results
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // EFFECTS
  // Sets the focus when the component loads. Empty dependency array means it only happens on component load
  useEffect(() => {
    emailRef.current.focus(); // Follow the ref to the email input field
  }, []);

  // Validates the username when it changes
  useEffect(() => {
    const result = USER_REGEX.test(user);
    /* console.log(result, user); */
    setValidName(result);
  }, [user]);

  // Validates the password AND match fields
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    /* console.log(result, pwd); */
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // Error message
  useEffect(() => {
    // Error should be cleared once the user modifies any input fields
    setErrMsg('');
  }, [email, user, pwd, matchPwd]);

  // FUNCTIONS
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const validUser = USER_REGEX.test(user);
    const validPwd = PWD_REGEX.test(pwd);
    if (!validUser || !validPwd || !email) {
      setErrMsg('Invalid Entry');
      return;
    }

    // Send to backend
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ email, user, pwd }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
        withCredentials: true,
      });

      /* console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response)); */

      setSuccess(true);
      // clear input fields
      setEmail('');
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      // Set focus on error component for screen readers to announce
      errRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      {success ? (
        <section className={styles.section}>
          <h1>Registration successful!</h1>
          <p>
            Please check your email for your confirmation link. You will not be able to sign in until you have confirmed
            your account.
          </p>
          <p>
            <Link href="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section className={styles.section}>
          <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            {/* Email field, with a p for aria describing the field */}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className={styles.input}
            />
            <p id="uidnote" className={emailFocus && !email ? styles.instructions : styles.offscreen}>
              <AiOutlineInfoCircle />
              Please enter a valid email address.
            </p>

            {/* Username field, with a p for aria describing the field */}
            <label htmlFor="username">
              Username:
              <span className={validName ? styles.valid : styles.hide}>
                <AiOutlineCheckCircle />
              </span>
              <span className={validName || !user ? styles.hide : styles.invalid}>
                <FaRegTimesCircle />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className={styles.input}
            />
            <p id="uidnote" className={userFocus && user && !validName ? styles.instructions : styles.offscreen}>
              <AiOutlineInfoCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, and hyphens allowed.
            </p>

            {/* Password field, with a p for aria describing the field */}
            <label htmlFor="password">
              Password:
              <span className={validPwd ? styles.valid : styles.hide}>
                <AiOutlineCheckCircle />
              </span>
              <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                <FaRegTimesCircle />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className={styles.input}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
              <AiOutlineInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a special character.
              <br />
              Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            {/* Password match field, with a p for aria describing the field */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                <AiOutlineCheckCircle />
              </span>
              <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                <FaRegTimesCircle />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className={styles.input}
            />
            <p id="confirmnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
              <AiOutlineInfoCircle />
              Passwords must match.
            </p>

            {/* Submit button */}
            <button
              disabled={!email || !validName || !validPwd || !validMatch ? true : false}
              className={styles.registerBtn}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className={styles.line}>
              {/* put router link here */}
              <Link href="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
