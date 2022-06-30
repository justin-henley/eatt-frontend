// Libraries
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Custom Components
import DishTile from './DishTile';
import NotFound from '../NotFound';
// CSS
import styles from './Dish.module.css';

function Dish() {
  // Access the params to get the dish ID to display
  let params = useParams();

  // Use state to store the dish returned
  const [data, setData] = useState();

  // Retrieve the dish entry by id
  const getData = async () => {
    try {
      const result = await fetch(`https://menu-translation-backend.herokuapp.com/dishes/${params.dishId}`, {
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
  // TODO the placeholder doesn't change size or animate when told
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
