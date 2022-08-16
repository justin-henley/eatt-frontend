// Libraries

import { useEffect, useState } from 'react';
import MenuItemTable from '../../components/Menus/MenuItemTable';
// Hooks
import useAuth from '../../hooks/useAuth';
// Axios
import axios from '../api/axios';
const ACCOUNT_URL = '/account';

// Custom components

// CSS

export default function UserMenus() {
  // AUTH
  const { auth } = useAuth();

  // STATE
  const [menus, setMenus] = useState(false);

  // FUNCTIONS
  // Fetch all menus by user
  const getUserMenus = async () => {
    // TODO fix request
    /* const results = await axios.get(`${ACCOUNT_URL}/menus`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
    });
    const json = await results.json();

    // Store the returned data
    setMenus(json); */
  };

  // TODO Menu edit button handler
  const handleEditMenu = (e) => {};

  // EFFECTS
  // Get menu data once on component load
  useEffect(() => {
    getUserMenus();
  }, []);

  // TODO add edit icon
  return (
    <div>
      <div>
        <h1>
          {auth.user}

          {auth.title}
        </h1>
      </div>
      <div>{menus ? <p>You have some menus.</p> : <p>You have not created any menus yet.</p>}</div>
    </div>
  );
}
