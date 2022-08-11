// Libraries
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
// Custom Components
import MenuNewCategory from '../../components/Menus/MenuNewCategory';
import MenuNewRestaurant from '../../components/Menus/MenuNewRestaurant';
import axios from '../api/axios';
import useAuth from '../../hooks/useAuth';
// CSS
import styles from '../../styles/NewMenu.module.css';
// Constants
const MENU_URL = '/menus';

export default function NewMenu({ editMenu, editRestaurant, edit }) {
  // Auth
  const { auth } = useAuth();
  // DATA
  const [menu, setMenu] = useState(editMenu || {});
  const emptyRestaurant = editRestaurant || {
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
    // Creator name is conditionally attached. Edits should not change creator name.
    if (!edit) menuData.creator = auth.user;

    // Confirm submission
    const isSubmitted = window.confirm('Are you sure you are ready to submit this menu?');

    // Return early if canceled
    if (!isSubmitted) return;

    // Submit the new menu and await a response
    let request;
    try {
      // Edits use patch, new submissions use post
      if (edit) {
        request = await axios.patch(
          MENU_URL,
          { ...menuData },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
          }
        );
      } else {
        request = await axios.post(
          MENU_URL,
          { ...menuData },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${auth.accessToken}` },
          }
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // User is not logged in
        console.log(request);
        request = { data: { message: 'Unauthorized. Please log in.' } };
      } else {
        // Catchall for other failures
        request = { data: { message: `Submission failed: ${error.message}.` } };
      }
    }

    // Check json for success
    if (request?.data?.message) {
      // Failure
      alert(`Menu submission failed.\n${request.data.message}`);
      return;
    } else {
      // Success
      alert('Menu submission succeeded. ');
      // Save menu data
      setMenu({ ...request.data });
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
                Menu created successfully.&nbsp;
                <Link href={`/menus/${menu._id}`}>
                  <a target="_blank">Open menu in new window</a>
                </Link>
              </Alert>
            )}
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
          <MenuNewCategory
            index={index}
            category={category}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            key={category.id}
            handleChange={handleCategoryChange}
            handleRemoveCategory={handleRemoveCategory}
          />
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

// Requires auth to access
NewMenu.auth = true;
