// Libraries
import { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
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
  const [query, setQuery] = useState({ text: '', type: 'en' });
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState({});

  // Handles changes to the search field
  const handleInput = (event) => {
    // Cannot trim value here as it wouldnt allow spaces in search terms
    setQuery({ ...query, text: event.target.value });
  };

  // Handles select menu
  const handleChange = (event) => {
    setQuery({ ...query, type: event.target.value });
  };

  // Run the search whenever either the search type or text changes
  useEffect(() => {
    getSearchResults(query);
  }, [query]);

  // Ensure that the results displayed still match the search term
  // If the search field is now blank, clears any response belatedly returned from search request promise
  useEffect(() => {
    setSearchResults([]);
  }, [searchResults.length !== 0 && query.text === '']);

  // Debounce limits repeated requests by setting a timeout between subsequent calls
  const getSearchResults = debounce(async (query) => {
    // Ensure the search field has a value
    const trimmedTerm = query.text?.trim();
    if (!trimmedTerm) {
      setSearchResults([]);
      return;
    }
    try {
      // Search by search type and text
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dishes?${query.type}=${trimmedTerm}`, {
        method: 'GET',
      });

      const json = await result.json();
      setSearchResults(json);
      setError({});
    } catch (error) {
      setError({ heading: 'Error', body: 'Search could not be completed.' });
    }
  }, 300);

  // TODO add error ref to point screen readers to the error message
  return (
    <div>
      {!!error.heading && (
        <Alert variant="danger" className={styles.error}>
          <Alert.Heading>{error.heading}</Alert.Heading>
          <p>{error.body}</p>
        </Alert>
      )}

      <h1 className={styles.title}>Search Dishes</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <DishSearchFormGroup
          searchTerm={query.text}
          searchType={query.type}
          handleInput={handleInput}
          handleChange={handleChange}
        />
      </Form>
      {/* Page flashes when async responses come in. This hides the updates while useEffect above clears out the stale response data */}
      <DishDisplay dishes={query.text !== '' ? searchResults : []} />
    </div>
  );
}
