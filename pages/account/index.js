// Libraries

import { useEffect, useState } from 'react';
import MenuItemTable from '../../components/Menus/MenuItemTable';

// Custom components

// CSS

export default function Account() {
  // fetch user account data
  // TODO session tracks this?? Delete static values
  const user = {
    username: 'username',
    role: 'Admin',
    dishes: 20,
    menus: 5,
  };

  // Fetch all dishes by user
  // TODO modify in back end to accept a username arg to restrict returns to only those owned by user. That path requires auth
  // TODO way innefficient like this don't push to prod
  const getUserDishes = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes`, {
      method: 'GET',
    });

    const json = await result.json();

    // Filters and keeps only those dishes created by the user
    // TODO this is horrid
    // Does json return an object or array as the outer wrapper?
    setDishes(json.filter((dish) => dish.history?.creator === user.username));
  };

  // Fetch all menus by user
  // TODO modify in back end to accept a username arg to restrict returns to only those owned by user. That path requires auth
  // TODO way innefficient like this don't push to prod
  const getUserMenus = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
      method: 'GET',
    });

    const json = await resultjson();

    // Filters and keeps only those dishes created by the user
    // TODO this is horrid
    setMenus(json.filter((menu) => menu.history?.creator === user.username));
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

  return (
    <div>
      <div>
        <h1>
          {user.username}
          {user.role !== 'User' && ` (${user.role})`}
        </h1>
        <div>
          <span>{user.dishes} dishes</span>
          <span>{user.menus} menus</span>
        </div>
      </div>
      <div>{option === 'Dishes' ? <MenuItemTable /> : <p>havent handled menus yet</p>}</div>
    </div>
  );
}
