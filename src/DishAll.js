import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishDisplay from './DishDisplay';

function DishAll() {
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

export default DishAll;
