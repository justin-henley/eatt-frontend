// Libraries
import { useState, useEffect } from 'react';
// Custom components
import MenuDisplay from '../../components/Menus/MenuDisplay';
import useAuth from '../../hooks/useAuth';
import axios from '../api/axios';

export default function AllMenus() {
  const { auth } = useAuth();
  // Menu data is set in state and updated upon fetching
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const result = await axios.get(`/menus/all`, {
        withCredentials: true,
        headers: { Accept: 'application/json', authorization: `Bearer ${auth.accessToken}` },
      });

      setData(result.data);
    } catch (error) {
      setData({ message: 'You do not have permission to view this page.' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data?.message ? (
        <h1>{data.message}</h1>
      ) : (
        <>
          <h1>All Menus</h1>
          <MenuDisplay menus={data} />
        </>
      )}
    </div>
  );
}

// Requires auth to access
AllMenus.auth = true;
