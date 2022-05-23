import { useState, useEffect } from 'react';
//import styled from 'styled-components';
import DishDisplay from './DishDisplay';

// TODO onChange seems like it generates a crazy number of db requests
// Also its a bit flaky
// Maybe change to a submit button, OR cache all results locally and search the cache

function DishSearch() {
  // Search text, type, and results saved in state with initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('en');
  const [searchResults, setSearchResults] = useState([]);

  // Handles changes to the search field
  const handleInput = async (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles selection of the radio buttons
  const handleClick = (event) => {
    setSearchType(event.target.value);
  };

  // Run the search whenever either the search type or text changes
  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm, searchType]);

  const getSearchResults = async (searchTerm) => {
    // Ensure the search field has a value
    // TODO regex to check if it is all spaces (should be treated as empty)
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    // Search by search type and text
    const result = await fetch(
      `https://menu-translation-backend.herokuapp.com/dishes?${searchType}=${searchTerm}`,
      {
        method: 'GET',
      }
    );

    const json = await result.json();

    setSearchResults(json);
  };

  return (
    <div className="App">
      <header className="App-header">Search Dishes</header>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Search by:</legend>

          <div>
            <input
              type="radio"
              id="en-name"
              name="search-by"
              value="en"
              onClick={handleClick}
              defaultChecked
            />
            <label htmlFor="en-name">English name</label>
          </div>

          <div>
            <input
              type="radio"
              id="zh-name"
              name="search-by"
              value="zhtw"
              onClick={handleClick}
            />
            <label htmlFor="zh-name">Chinese Name</label>
          </div>

          <div>
            <input
              type="radio"
              id="other"
              name="search-by"
              value="other"
              onClick={handleClick}
            />
            <label htmlFor="other">Unused</label>
          </div>
        </fieldset>
        <input
          type="text"
          placeholder="English Name"
          value={searchTerm}
          onInput={handleInput}
        />
      </form>

      <DishDisplay dishes={searchResults} />
    </div>
  );
}

export default DishSearch;
