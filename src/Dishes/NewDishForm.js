// Outside components
import { useEffect, useState } from 'react';
// Custom Components
import DishTile from './DishTile';
// CSS
import styles from './NewDishForm.module.css';

// TODO Hardcoding the category and meat types is bad. Find a way to retrieve them.

function NewDishForm() {
  const [inputs, setInputs] = useState({ category: 'rice', meat: 'beef' });
  const [dish, setDish] = useState({
    // The placeholder values
    zhtw: '....',
    pinyin: '....',
    en: '....',
    category: 'unknown',
    meat: 'unknown',
  });

  // Handles changes to the input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Query the databases for exact matches on traditional chinese name
  const isUnique = () => {
    // TODO
  };

  const handleSubmit = async (e) => {
    // TODO input validation
    e.preventDefault();

    // Submit the new dish and await a response
    alert(`You entered: ${inputs.zhtw} / ${inputs.pinyin} / ${inputs.en} / ${inputs.category} / ${inputs.meat}`);
    const dish = await fetch('https://menu-translation-backend.herokuapp.com/dishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    console.log(dish);
    console.log(inputs);
    // Await for the json version of the results
    const json = await dish.json();

    // Set the dish data
    setDish(json);
    console.log(json);
    console.log(dish);
  };

  return (
    <div>
      <div className={styles.result}>
        {dish.hasOwnProperty('message') ? (
          <div className={styles.failure}>Operation Failed: {dish.message}</div>
        ) : (
          <DishTile item={dish} />
        )}
      </div>

      <form action="post" onSubmit={handleSubmit} className={styles.form}>
        <h1>Please carefully create a new dish</h1>
        <fieldset>
          <legend>Dish Name</legend>
          <label>
            Traditional Chinese:
            <input type="text" name="zhtw" value={inputs.zhtw || ''} onChange={handleChange} />
          </label>
          <label>
            Hanyu Pinyin:
            <input type="text" name="pinyin" value={inputs.pinyin || ''} onChange={handleChange} />
          </label>
          <label>
            English Translation:
            <input type="text" name="en" value={inputs.en || ''} onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Details</legend>
          <label>
            Dish Category:
            <select name="category" value={inputs.category || ''} onChange={handleChange}>
              <option value="rice">Rice</option>
              <option value="noodle">Noodle</option>
              <option value="bread">Bread, Crepe, Sandwich, etc.</option>
              <option value="soup">Soup, Stew, or Curry</option>
              <option value="drink">Beverage</option>
              <option value="unknown">Unknown</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Protein Type:
            <select required name="meat" value={inputs.meat || ''} onChange={handleChange}>
              <option value="beef">Beef </option>
              <option value="pork">Pork</option>
              <option value="bird">Poultry</option>
              <option value="fish">Seafood</option>
              <option value="egg">Egg</option>
              <option value="veg">Vegetarian</option>
              <option value="unknown">Unknown</option>
              <option value="other">Other</option>
            </select>
          </label>
        </fieldset>

        <input type="submit" />
      </form>
    </div>
  );
}

export default NewDishForm;
