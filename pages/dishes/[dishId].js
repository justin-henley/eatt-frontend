// Libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Custom Components
import DishTile from '../../components/Dishes/DishTile';
import NotFound from '../../src/NotFound';
// CSS
import styles from '../../styles/Dish.module.css';

function Dish() {
  // Access the params to get the dish ID to display
  const router = useRouter();
  const { dishId } = router.query;

  // Use state to store the dish returned
  const [data, setData] = useState();

  // Retrieve the dish entry by id
  const getData = async () => {
    try {
      const result = await fetch(`https://menu-translation-backend.herokuapp.com/dishes/${dishId}`, {
        method: 'GET',
      });

      const json = await result.json();

      setData(json);
    } catch (error) {
      setData({ message: 'This dish does not exist.' });
    }
  };

  useEffect(() => {
    getData();
  });

  // If a dish is not found, a 'message' is returned
  // If no data is available yet, show placeholders
  return !data ? (
    <p>Loading...{/* <Placeholder xs={6} bg="secondary" /> */}</p>
  ) : data?.message ? (
    <NotFound message={data.message} />
  ) : (
    <div>
      <h1 className={styles.dishH1}>Dish</h1>
      {console.log(data)}
      <DishTile item={data} />
    </div>
  );
}

export default Dish;
