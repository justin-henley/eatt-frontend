// Libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// Axios
import axios from '../api/axios';
const REGISTER_URL = '/register';
// CSS
/* import styles from '../../styles/ConfirmEmail.module.css'; */

export default function ConfirmUserEmail() {
  // Access the params from the url to get the confirmation code, which was emailed as a link to the user by the back end
  const router = useRouter();
  const { confirmationCode } = router.query;

  // Use state to store the message returned
  const [message, setMessage] = useState('Please wait...');

  // Send the confirmation code to the back end to verify the user
  const verify = async () => {
    try {
      // NextJS will first load the page with query as an empty object, and pass the query after page loads
      if (confirmationCode !== undefined) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/${confirmationCode}`, {
          method: 'GET',
        });

        const json = await response.json();
        setMessage(json.message);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  // Run verify on page load, only once
  useEffect(() => {
    verify();
  }, [router.query]);

  return (
    <div style={{ margin: 'auto', paddingTop: '2em', textAlign: 'center' }}>
      <h1>{message}</h1>
      <br />
      {confirmationCode !== undefined && <Link href="/login">Sign In</Link>}
    </div>
  );
}
