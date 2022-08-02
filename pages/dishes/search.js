// Libraries
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import debounce from 'lodash.debounce';
// Custom Components
import DishDisplay from '../../components/Dish/DishDisplay';
import DishSearchFormGroup from '../../components/Dish/DishSearchFormGroup';
// CSS
import styles from '../../styles/DishSearch.module.css';

// onChange generates a crazy number of db requests
// Set debounce timeout on getSearchResults appropriately to limit requests

export default function DishSearch() {
  // Search text, type, and results saved in state with initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('en');
  const [searchResults, setSearchResults] = useState([]);

  // Handles changes to the search field
  const handleInput = (event) => {
    // Cannot trim value here as it wouldnt allow spaces in search terms
    setSearchTerm(event.target.value);
  };

  // Handles select menu
  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  // Run the search whenever either the search type or text changes
  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm, searchType]);

  // Ensure that the results displayed still match the search term
  // If the search field is now blank, clears any response belatedly returned from search request promise
  useEffect(() => {
    if (searchResults && !searchTerm.trim()) setSearchResults([]);
  }, [searchResults]);

  // Debounce limits repeated requests by setting a timeout between subsequent calls
  const getSearchResults = debounce(async (searchTerm) => {
    // Ensure the search field has a value
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) {
      setSearchResults([]);
      return;
    }

    // Search by search type and text
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes?${searchType}=${trimmedTerm}`, {
      method: 'GET',
    });

    const json = await result.json();

    setSearchResults(json);
  }, 300);

  return (
    <div>
      <h1 className={styles.title}>Search Dishes</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <DishSearchFormGroup
          searchTerm={searchTerm}
          searchType={searchType}
          handleInput={handleInput}
          handleChange={handleChange}
        />
      </Form>
      <DishDisplay dishes={searchResults} />
    </div>
  );
}
