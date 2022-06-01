import { useState, useEffect } from 'react';
import DishDisplay from './DishDisplay';

function AllDishes() {
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch(
      'https://menu-translation-backend.herokuapp.com/dishes',
      {
        method: 'GET',
      }
    );

    const json = await result.json();

    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="App-header">Dishes</h1>
      <DishDisplay dishes={data} />
    </div>
  );
}

export default AllDishes;
