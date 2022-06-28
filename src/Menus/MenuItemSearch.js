// Outside Components
import { useState, useEffect } from 'react';
// Custom Components

// CSS
import styles from './MenuItemSearch.module.css';

function MenuItemSearch({ items, handleAddItem, handleRemoveItem, categoryId }) {
  // Search text, type, and results saved in state with initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('en');
  const [searchResults, setSearchResults] = useState([]);

  const itemSeparator = ' - ';

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
    // TODO regex to check if it is all spaces (should be treated as empty)
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    // Search by search type and text
    const result = await fetch(`https://menu-translation-backend.herokuapp.com/dishes?${searchType}=${searchTerm}`, {
      method: 'GET',
    });

    const json = await result.json();

    setSearchResults(json);
  };

  return (
    <div>
      <h1 className={styles.title}>Search Dishes</h1>
      <fieldset className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        {/* <label htmlFor="selectType" className={styles.typeLabel}>
          Search By:
        </label> */}
        <select id="selectType" className={styles.selectOptions} value={searchType} onChange={handleChange}>
          <option value="en">English</option>
          <option value="zhtw">Chinese</option>
          <option value="pinyinNoDiacritics">Hanyu Pinyin</option>
        </select>

        <input type="text" placeholder="Search" value={searchTerm} onInput={handleInput} className={styles.search} />
      </fieldset>
      <ul>
        {console.log(searchResults)}
        {searchResults.map((result) => (
          <li key={result._id}>
            <span>
              {result.zhtw}
              {itemSeparator}
              {result.pinyin}
              {itemSeparator}
              {result.en}
            </span>
            <button
              type="button"
              onClick={handleAddItem}
              data-category-id={categoryId}
              data-dish-id={result._id}
              data-zhtw={result.zhtw}
              data-pinyin={result.pinyin}
              data-en={result.en}
              data-meat={result.meat}
              data-category={result.category}
            >
              +
            </button>
          </li>
        ))}
      </ul>
      <h1>Added Dishes</h1>
      <ul hidden={false}>
        {items.map((item) => (
          <li key={categoryId + item.id}>
            <span>
              {item.zhtw}
              {itemSeparator}
              {item.pinyin}
              {itemSeparator}
              {item.en}
            </span>

            <button type="button" data-category-id={categoryId} data-dish-id={item.id} onClick={handleRemoveItem}>
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuItemSearch;
