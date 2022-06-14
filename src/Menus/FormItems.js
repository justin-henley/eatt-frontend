// Outside Components
import { useState, useEffect } from 'react';
// Custom Components

// CSS
import styles from './FormItems.module.css';

function FormItems({ handleSubmit, items, setItems }) {
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

  const handleAddItem = (e) => {
    if (!items.find((item) => item.id === e.target.id)) {
      setItems((values) => [
        ...values,
        {
          id: e.target.id,
          zhtw: e.target.parentElement.childNodes[0].textContent,
          pinyin: e.target.parentElement.childNodes[2].textContent,
          en: e.target.parentElement.childNodes[4].textContent,
        },
      ]);
    }
  };

  const handleRemove = (e) => {
    setItems((values) => values.filter((item) => item.id !== e.target.id));
  };

  return (
    <div>
      <h1>Added Dishes</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button id={item.id} onClick={handleRemove}>
              -
            </button>
            {item.zhtw} - {item.pinyin} - {item.en}
          </li>
        ))}
      </ul>

      <h1 className={styles.title}>Search Dishes</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        {/* <label htmlFor="selectType" className={styles.typeLabel}>
          Search By:
        </label> */}
        <select id="selectType" className={styles.selectOptions} value={searchType} onChange={handleChange}>
          <option value="en">English</option>
          <option value="zhtw">Chinese</option>
          <option value="pinyinNoDiacritics">Hanyu Pinyin</option>
        </select>

        <input type="text" placeholder="Search" value={searchTerm} onInput={handleInput} className={styles.search} />
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>
            <p>
              {result.zhtw} &#8226; {result.pinyin} &#8226; {result.en}{' '}
              <button onClick={handleAddItem} id={result._id}>
                +
              </button>
            </p>
          </li>
        ))}
      </ul>
      <button type="submit">Add Items to Category</button>
    </div>
  );
}

export default FormItems;
