// Libraries
import { useState, useEffect } from 'react';
// Custom components
import DishDisplay from '../../components/Dish/DishDisplay';
import useAuth from '../../hooks/useAuth';
import axios from '../api/axios';
// CSS
import styles from '../../styles/AllDishes.module.css';

export default function AllDishes() {
  const { auth } = useAuth();
  // Dish data is set in state and updated upon fetching
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const result = await axios.get(`/dishes/all`, {
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
          <h1 className={styles.title}>Dishes</h1>
          <hr className={styles.rule} />
          <DishDisplay dishes={data} />
        </>
      )}
    </div>
  );
}

// Requires auth to access
AllDishes.auth = true;
