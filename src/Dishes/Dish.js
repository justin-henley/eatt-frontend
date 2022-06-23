// Outside components
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Custom Components
import DishTile from './DishTile';
import NotFound from '../NotFound';
// CSS
import styles from './Dish.module.css';

function Dish(props) {
  // Access the params to get the dish ID to display
  let params = useParams();

  // Use state to store the dish returned
  const [data, setData] = useState();

  // Retrieve the menu entry by id
  // TODO what if no menu found?
  const getData = async () => {
    try {
      const result = await fetch(`https://menu-translation-backend.herokuapp.com/dishes/${params.dishId}`, {
        method: 'GET',
      });

      const json = await result.json();

      setData(json);
    } catch (error) {
      console.log('Fetch failed in Dish.js');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // If a menu is not found, a 'message' is returned
  // If no data is available yet, show placeholders
  // TODO the placeholder doesn't change size or animate when told
  // TODO Forward the restaurant info through the Link state if coming from search of all menus
  return !data ? (
    <p>Loading...{/* <Placeholder xs={6} bg="secondary" /> */}</p>
  ) : data?.message ? (
    <NotFound />
  ) : (
    <div>
      <h1 className={styles.dishH1}>Dish</h1>
      {console.log(data)}
      <DishTile item={data} />
    </div>
  );
}

export default Dish;
