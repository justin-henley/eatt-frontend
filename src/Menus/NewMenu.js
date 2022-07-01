// Libraries
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
// Custom Components
import MenuNewCategory from './MenuNewCategory';
import MenuNewRestaurant from './MenuNewRestaurant';
// CSS
import styles from './NewMenu.module.css';

function NewMenu() {
  // DATA
  const [menu, setMenu] = useState({});
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
      alert('Menu submission succeeded. ');
      // Save menu data
      setMenu(json);
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
    <div>
      <div className={styles.result}>
        {menu.hasOwnProperty('message') ? (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Menu Creation Failed</Alert.Heading> <p>Error: {menu.message}</p>
            <p>Please check your inputs and try again.</p>
          </Alert>
        ) : (
          <div>
            {menu._id && (
              <Alert variant="success">
                Menu created successfully.
                <Link to={`/menus/${menu._id}`} target="_blank">
                  Open menu in new window
                </Link>
              </Alert>
            )}
            <menuTile item={menu} />
          </div>
        )}
      </div>
      <Form className={styles.newMenu} onSubmit={handleSubmit}>
        <MenuNewRestaurant
          showRestaurantForm={showRestaurantForm}
          setShowRestaurantForm={setShowRestaurantForm}
          restaurant={restaurant}
          handleChange={handleRestaurantChange}
        />
        {categories.map((category, index) => (
          <>
            <MenuNewCategory
              index={index}
              category={category}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
              key={`category${category.id}`}
              handleChange={handleCategoryChange}
              handleRemoveCategory={handleRemoveCategory}
            />
            <hr />
          </>
        ))}
        <div className={styles.formButtons}>
          <button type="button" className={styles.addCatButton} onClick={handleAddCategory}>
            Add Category
          </button>
          <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
            Submit Menu
          </button>
        </div>
      </Form>
    </div>
  );
}

export default NewMenu;
