import { useState } from 'react';
import { nanoid } from 'nanoid';
/* import { Toast } from 'react-bootstrap'; */
// Custom Components
import MenuNewCategory from './MenuNewCategory';
import MenuNewRestaurant from './MenuNewRestaurant';
// CSS
import styles from './NewMenu.module.css';
import { Form } from 'react-bootstrap';

function NewMenu() {
  // DATA
  const emptyRestaurant = {
    zhtw: '',
    pinyin: '',
    en: '',
  };

  const [restaurant, setRestaurant] = useState({
    // Restaurant placeholder values
    ...emptyRestaurant,
  });

  const [categories, setCategories] = useState([]);

  const [showRestaurantForm, setShowRestaurantForm] = useState(true);

  // HANDLERS
  const handleSubmit = async (e) => {
    // TODO input validation. Make sure all fields have values
    e.preventDefault();

    // Open a preview window and ask for confirmation
    // TODO

    // Create the request body using only the necessaary menu data
    const menuData = {
      restaurant: restaurant,
      menu:
        // Each category is an object in this array
        categories.map((category) => {
          return {
            zhtw: category.zhtw,
            pinyin: category.pinyin,
            en: category.en,
            // Each item is a dishId in the items array of the category
            items: category.items.map((item) => item.id),
          };
        }),
    };

    // Confirm submission
    const isSubmitted = window.confirm('Are you sure you are ready to submit this menu?');

    // Return early if canceled
    if (!isSubmitted) return;

    // Submit the new menu and await a response
    const menu = await fetch('https://menu-translation-backend.herokuapp.com/menus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });

    // Await the json version of the results
    const json = await menu.json();
    console.log(json);

    // Check for success
    if (json.message) {
      // Failure
      alert(`Menu submission failed.\n${json.message}`);
    } else {
      // Success
      alert('Menu submission succeeded.');
      // Clear data from form
      setRestaurant({ ...emptyRestaurant });
      setCategories([]);
      setShowRestaurantForm(true);
    }
  };

  const handleRestaurantChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRestaurant((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.parentElement.parentElement.dataset.categoryId;
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setCategories(categories.map((item) => (item.id === categoryId ? { ...item, [fieldName]: fieldValue } : item)));
  };

  const handleAddCategory = (e) => {
    setCategories((values) => [
      ...values,
      {
        id: nanoid(),
        zhtw: '',
        pinyin: '',
        en: '',
        items: [],
      },
    ]);
  };

  const handleRemoveCategory = (e) => {
    setCategories((values) => values.filter((category) => category.id !== e.target.dataset.categoryId));
  };

  const handleAddItem = (e) => {
    const vals = e.target.dataset;

    // Index of relevant category
    const index = categories.findIndex((category) => category.id === vals.categoryId);
    // Existance of this item in that category
    const isAdded = categories[index]?.items?.find((item) => item.id === vals.dishId);

    // Add the item if it does not already exist in that category (no duplicates)
    if (!isAdded) {
      setCategories(
        categories.map((category, i) =>
          i !== index
            ? category
            : {
                ...category,
                items: [
                  ...category.items,
                  {
                    id: vals.dishId,
                    zhtw: vals.zhtw,
                    pinyin: vals.pinyin,
                    en: vals.en,
                    category: vals.category,
                    meat: vals.meat,
                  },
                ],
              }
        )
      );
    }
  };

  const handleRemoveItem = (e) => {
    // Get values from html element dataset
    const categoryId = e.target.dataset.categoryId;
    const dishId = e.target.dataset.dishId;

    // Index of the item's category
    const index = categories.findIndex((category) => category.id === categoryId);
    // Filter that item out of that category

    setCategories(
      categories.map((category, i) =>
        i !== index ? category : { ...category, items: category.items.filter((item) => item.id !== dishId) }
      )
    );
  };

  return (
    <Form className={styles.newMenu} onSubmit={handleSubmit}>
      <MenuNewRestaurant
        showRestaurantForm={showRestaurantForm}
        setShowRestaurantForm={setShowRestaurantForm}
        restaurant={restaurant}
        handleChange={handleRestaurantChange}
      />
      {categories.map((category) => (
        <MenuNewCategory
          category={category}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          key={`category${category.id}`}
          handleChange={handleCategoryChange}
          handleRemoveCategory={handleRemoveCategory}
        />
      ))}
      <button type="button" onClick={handleAddCategory}>
        Add Category
      </button>
      <button type="submit" onClick={handleSubmit}>
        Submit Menu
      </button>
    </Form>
  );
}

export default NewMenu;
