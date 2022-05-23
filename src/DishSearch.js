import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishDisplay from './DishDisplay';

// TODO onChange seems like it generates a crazy number of db requests
// Also its a bit flaky
// Maybe change to a submit button, OR cache all results locally and search the cache

function DishSearch() {
  // Search results
  const [data, setData] = useState();

  // English search term
  const [searchTerm, setSearchTerm] = useState();
  const handleChange = async (event) => {
    // Save the value
    setSearchTerm(event.target.value);
  };

  // Run the search
  useEffect(() => {
    getData(searchTerm);
  }, [searchTerm]);

  const getData = async (searchTerm) => {
    const result = await fetch(
      `https://menu-translation-backend.herokuapp.com/dishes?en=${searchTerm}`,
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
      <header className="App-header">Search Dishes</header>
      <div>
        <input
          type="text"
          placeholder="English Name"
          value={searchTerm}
          onInput={handleChange}
        />
      </div>
      <DishDisplay dishes={data} />
    </div>
  );
}

export default DishSearch;
