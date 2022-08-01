// Libraries
import { useState, useEffect } from 'react';
// Custom components
import DishDisplay from '../../components/Dish/DishDisplay';
// CSS
import styles from '../../styles/AllDishes.module.css';

export default function AllDishes() {
  // Dish data is set in state and updated upon fetching
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes`, {
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
