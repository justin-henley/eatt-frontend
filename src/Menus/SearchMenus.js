// Libraries
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
// Custom Components
import MenuDisplay from './MenuDisplay';
import DishSearchFormGroup from '../../components/Dishes/DishSearchFormGroup';
// CSS
import styles from './SearchMenus.module.css';

function SearchMenus() {
  // Search text, type, and results saved in state with initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('en');
  const [searchResults, setSearchResults] = useState([]);

  // Handles changes to the search field
  const handleInput = async (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles change of the search type
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
      `https://menu-translation-backend.herokuapp.com/menus?${searchType}=${searchTerm.trim()}`,
      {
        method: 'GET',
      }
    );

    const json = await result.json();

    setSearchResults(json);
  };

  return (
    <div>
      <h1 className={styles.title}>Search Menus</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <DishSearchFormGroup
          searchTerm={searchTerm}
          searchType={searchType}
          handleInput={handleInput}
          handleChange={handleChange}
        />
      </Form>
      <MenuDisplay menus={searchResults} />
    </div>
  );
}

export default SearchMenus;
