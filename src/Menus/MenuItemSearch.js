// Libraries
import { useState, useEffect } from 'react';
// Custom Components
import DishSearchFormGroup from '../Dishes/DishSearchFormGroup';

// CSS
import styles from './MenuItemSearch.module.css';
import MenuItemTable from './MenuItemTable';

function MenuItemSearch({ items, handleAddItem, handleRemoveItem, categoryId }) {
  // Search text, type, and results saved in state with initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('en');
  const [searchResults, setSearchResults] = useState([]);

  // Handles changes to the search field
  const handleInput = async (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles selection of the search type
  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  // Run the search whenever either the search type or text changes
  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm, searchType]);

  const getSearchResults = async (searchTerm) => {
    // Ensure the search field has a value
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    // Search by search type and text
    const result = await fetch(
      `https://menu-translation-backend.herokuapp.com/dishes?${searchType}=${searchTerm.trim()}`,
      {
        method: 'GET',
      }
    );

    const json = await result.json();

    setSearchResults(json);
  };

  return (
    <div>
      <MenuItemTable
        items={items}
        categoryId={categoryId}
        buttonText="-"
        buttonHandler={handleRemoveItem}
        title="Added Dishes"
      />

      <DishSearchFormGroup
        searchTerm={searchTerm}
        searchType={searchType}
        handleInput={handleInput}
        handleChange={handleChange}
      />
      <MenuItemTable
        items={searchResults}
        categoryId={categoryId}
        buttonText="+"
        buttonHandler={handleAddItem}
        title="Search Results"
      />
    </div>
  );
}

export default MenuItemSearch;
