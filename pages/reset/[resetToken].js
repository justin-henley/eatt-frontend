// Libraries
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
// Axios
import axios from '../api/axios';
const RESET_URL = '/reset';
// Icons
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegTimesCircle } from 'react-icons/fa';
// CSS
import styles from '../../styles/NewPassword.module.css';

export default function SetNewPassword() {
  // Access the params from the url to get the reset token, which was email to the user
  const router = useRouter();
  const { resetToken } = router.query;
  // Password regex. Must have an uppercase letter, a lowercase letter, a digit, and a special character. 8 to 24 characters
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  // REFS
  const errRef = useRef();
  const pwdRef = useRef();

  // STATE
  // Results
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Password input field
  const [pwd, setPwd] = useState(''); // Value of the password input field
  const [validPwd, setValidPwd] = useState(false); // Whether the password validates or not
  const [pwdFocus, setPwdFocus] = useState(false); // Whether we have focus on the password field

  // Password match input field
  const [matchPwd, setMatchPwd] = useState(''); // Value of the password match input field
  const [validMatch, setValidMatch] = useState(false); // Whether the match validates or not
  const [matchFocus, setMatchFocus] = useState(false); // Whether we have focus on the match field

  // EFFECTS
  // Set the focus when the component loads
  useEffect(() => {
    pwdRef.current.focus(); // Follow the ref to the password field
  }, []);

  // Validates the password and match fields
  useEffect(() => {
    const valid = PWD_REGEX.test(pwd);
    setValidPwd(valid);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // Error message is cleared on further user input
  useEffect(() => {
    setErrMsg('');
  }, [pwd, matchPwd]);

  // FUNCTIONS
  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const validPwd = PWD_REGEX.test(pwd);
    if (!validPwd || pwd !== matchPwd) {
      setErrMsg('Invalid entry');
      return;
    }

    // Send to backend
    try {
      const response = await axios.post(`${RESET_URL}/${resetToken}`, JSON.stringify({ pwd }), {});

      setSuccess(true);
      setPwd('');
      setMatchPwd('');
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 403) {
        setErrMsg('Invalid or Expired Password Reset Link.');
      } else {
        setErrMsg('Password Reset Failed.');
      }
      // Set focus on error message for screen readers
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
          <h1>Reset Password</h1>
          <p>Please enter your new account password.</p>
          <form onSubmit={handleSubmit}>
            {/* Password Field */}
            <label htmlFor="password">
              New Password:
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
              ref={pwdRef}
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
            <button disabled={!validPwd || !validMatch ? true : false} className={styles.btn}>
              Reset Password
            </button>
          </form>
          <p>
            Remembered your password?
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
}
