// Libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Custom Components
import DishTile from '../../components/Dish/DishTile';
import NotFound from '../404';
// CSS
import styles from '../../styles/Dish.module.css';

export default function Dish() {
  // Access the params to get the dish ID to display
  const router = useRouter();
  const { dishId } = router.query;

  // Use state to store the dish returned
  const [data, setData] = useState();

  // Retrieve the dish entry by id
  const getData = async () => {
    try {
      let result;
      if (dishId) {
        result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes/${dishId}`, {
          method: 'GET',
        });

        const json = await result.json();

        setData(json);
      }
    } catch (error) {
      setData({ message: 'This dish does not exist.' });
    }
  };

  useEffect(() => {
    getData();
  }, [dishId]);

  // If a dish is not found, a 'message' is returned
  // If no data is available yet, show placeholders
  return (
    <div className={styles.wrapper}>
      {!data ? (
        <p>Loading...</p>
      ) : data?.message ? (
        <NotFound message={data.message} />
      ) : (
        <div className={styles.dishWrapper}>
          <h1 className={styles.dishH1}>Dish</h1>
          <DishTile item={data} />
        </div>
      )}{' '}
    </div>
  );
}
