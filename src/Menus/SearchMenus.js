// Outside Components
import { useState, useEffect } from 'react';
// Custom Components
import MenuDisplay from './MenuDisplay';
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
    // TODO regex to check if it is all spaces (should be treated as empty)
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    // Search by search type and text
    const result = await fetch(
      `https://menu-translation-backend.herokuapp.com/menus?${searchType}=${searchTerm}`,
      {
        method: 'GET',
      }
    );

    const json = await result.json();
    // TODO delete
    console.log(json);

    setSearchResults(json);
  };

  return (
    <div>
      <h1>The SearchMenus component</h1>
      <h1 className={styles.title}>Search Dishes</h1>
      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        {/* <label htmlFor="selectType" className={styles.typeLabel}>
          Search By:
        </label> */}
        <select
          id="selectType"
          className={styles.selectOptions}
          value={searchType}
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="zhtw">Chinese</option>
          <option value="pinyinNoDiacritics">Hanyu Pinyin</option>
        </select>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onInput={handleInput}
          className={styles.search}
        />
      </form>

      <MenuDisplay menus={searchResults} />
    </div>
  );
}

export default SearchMenus;
