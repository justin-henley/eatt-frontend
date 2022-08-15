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

export default function Account() {
  // STATE
  const [option, setOption] = useState(''); // Track which menu is selected
  const [dishes, setDishes] = useState(false);
  const [menus, setMenus] = useState(false);
  const { auth } = useAuth(); // Username needed for display, check auth context

  // FUNCTIONS
  // Fetch all dishes by user
  // Username is passed to backend encoded in JWT token. No need to pass it in the requests.
  // TODO check these work!
  const getUserDishes = async () => {
    // Request the data
    const results = await axios.get(`${ACCOUNT_URL}/dishes`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
    });

    // Store the returned data
    setDishes(results.data);
  };

  // Fetch all menus by user
  const getUserMenus = async () => {
    const results = await axios.get(`${ACCOUNT_URL}/menus`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
    });
    const json = await results.json();

    // Store the returned data
    setMenus(json);
  };

  // Dish edit button handler
  const handleEditDish = (e) => {};

  // Menu edit button handler
  const handleEditMenu = (e) => {};

  // EFFECTS
  // Get items only once per page load, and only if that menu option is selected
  useEffect(() => {
    if (option === 'Dishes') {
      // Return if dishes have already been fetched
      if (dishes !== false) return;

      // Get the data
      getUserDishes();
    } else if (option === 'Menus') {
      // Return if menus have already been fetched
      if (menus) return;

      // Get the data
      getUserMenus();
    }
  }, [option]);

  useEffect(() => {
    setOption('Dishes');
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
      <div>
        {option === 'Dishes' && dishes ? (
          <MenuItemTable
            items={dishes}
            buttonText="Edit"
            buttonHandler={handleEditDish}
            title={`Your ${dishes.length} Dish${dishes.length === 1 ? '' : 'es'}`}
          />
        ) : option === 'Menus' && menus ? (
          <p>havent handled menus yet</p>
        ) : (
          <p>nothing is ready</p>
        )}
      </div>
    </div>
  );
}

// Requires auth to access
Account.auth = true;
