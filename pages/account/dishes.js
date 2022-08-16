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

export default function UserDishes() {
  const { auth } = useAuth();
  const [dishes, setDishes] = useState(false);

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

  // Dish edit button handler
  const handleEditDish = (e) => {};

  // EFFECTS
  // Get dish data once on component load
  useEffect(() => {
    getUserDishes();
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
        {dishes ? (
          <MenuItemTable
            items={dishes}
            buttonText="Edit"
            buttonHandler={handleEditDish}
            title={`Your ${dishes.length} Dish${dishes.length === 1 ? '' : 'es'}`}
          />
        ) : (
          <p>You have not created any dishes yet.</p>
        )}
      </div>
    </div>
  );
}

UserDishes.auth = true;
