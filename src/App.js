import './App.css';
import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishDisplay from './DishDisplay';

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    const result = await fetch(
      'https://menu-translation-mern.herokuapp.com/dishes',
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
    <div className="App">
      <header className="App-header">Dishes</header>
      <DishDisplay dishes={data} />
    </div>
  );
}

export default App;
