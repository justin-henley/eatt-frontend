// Libraries

import { useEffect, useState } from 'react';
import MenuItemTable from '../../components/Menus/MenuItemTable';
// Hooks
import useAuth from '../../hooks/useAuth';

// Custom components

// CSS

export default function Account() {
  // STATE
  const [option, setOption] = useState('Dishes'); // Track which menu is selected
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState([]);
  const { auth } = useAuth(); // Username needed for display, check auth context

  // FUNCTIONS
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

  // Dish edit button handler
  const handleEditDish = (e) => {};

  // Menu edit button handler
  const handleEditMenu = (e) => {};

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

  // TODO add edit icon
  return (
    <div>
      <div>
        <h1>
          {auth.user}
          {/* Decode role based on highest available role for user */}
          {auth.role.Admin ? 'Admin' : auth.role.Editor ? 'Editor' : 'User'}
        </h1>
      </div>
      <div>
        {option === 'Dishes' ? (
          <MenuItemTable items={dishes} buttonText="Edit" buttonHandler={handleEditDish} title="Your Dishes" />
        ) : (
          <p>havent handled menus yet</p>
        )}
      </div>
    </div>
  );
}

// Requires auth to access
Account.auth = true;
