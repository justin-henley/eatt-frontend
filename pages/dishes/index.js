// Libraries
import { useState, useEffect } from 'react';
// Custom components
import DishDisplay from '../../components/Dishes/DishDisplay';
// CSS
import styles from '../../styles/AllDishes.module.css';

function AllDishes() {
  // Dish data is set in state and updated upon fetching
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch('https://menu-translation-backend.herokuapp.com/dishes', {
      method: 'GET',
    });

    const json = await result.json();

    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Dishes</h1>
      <hr className={styles.rule} />
      <DishDisplay dishes={data} />
    </div>
  );
}

export default AllDishes;
