// Libraries

import { useEffect, useState } from 'react';
import MenuItemTable from '../../components/Menus/MenuItemTable';
// Hooks
import useAuth from '../../hooks/useAuth';

// Custom components

// CSS

export default function Account() {
  // Username needed for display, check auth context
  const { auth } = useAuth();

  // Fetch all dishes by user
  // Username is passed to backend encoded in JWT token. No need to pass it in the requests.
  const getUserDishes = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/dishes`, {
      method: 'GET', // TODO include credentials
    });

    const json = await result.json();

    // Store the returned data
    setDishes(json);
  };

  // Fetch all menus by user
  const getUserMenus = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/menus`, {
      method: 'GET', // TODO with credentials
    });

    const json = await resultjson();

    // Store the returned data
    setMenus(json);
  };

  // EFFECTS
  // Get items only once per page load, and only if that menu option is selected
  useEffect(() => {
    if (option === 'Dishes') {
      // Return if dishes have already been fetched
      if (dishes) return;

      // Get the data
      getUserDishes();
    } else if (option === 'Menus') {
      // Return if menus have already been fetched
      if (menus) return;

      // Get the data
      getUserMenus();
    }
  }, [option]);

  // STATE
  const [option, setOption] = useState('Dishes'); // Track which menu is selected
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);

  // TODO I don't remember what data is stored in the auth context. Are roles in there?
  return (
    <div>
      <div>
        <h1>
          {auth.user}
          {/* {user.role !== 'User' && ` (${user.role})`} */}
        </h1>
      </div>
      <div>{option === 'Dishes' ? <MenuItemTable /> : <p>havent handled menus yet</p>}</div>
    </div>
  );
}
