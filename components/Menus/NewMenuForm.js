// Libraries
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
// Custom Components
import MenuNewCategory from './MenuNewCategory';
import MenuNewRestaurant from './MenuNewRestaurant';
import axios from '../../pages/api/axios';
import useAuth from '../../hooks/useAuth';
// CSS
import styles from '../../styles/NewMenuForm.module.css';
// Constants
const MENU_URL = '/menus';

/** NewMenuForm handles the form for creating and editing menus and submits the data to the backend.
 *
 * @param {Object} data -
 * @param {Boolean} edit - Flag that specifies this form is editing an existing menu.
 */
export default function NewMenuForm({ data = {}, edit = false }) {
  // AUTH
  const { auth } = useAuth();

  // STATE

  // Menu data
  const [menu, setMenu] = useState({ ...data });

  // If data was passed in to edit, populate the restaurant name
  const [restaurant, setRestaurant] = useState(
    // Restaurant placeholder values OR existing values to edit
    edit
      ? { ...data.restaurant }
      : {
          zhtw: '',
          pinyin: '',
          en: '',
        }
  );

  const [categories, setCategories] = useState(edit ? [...data?.menu] : []);

  const [showRestaurantForm, setShowRestaurantForm] = useState(true);

  // HANDLERS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO Input validation. Make sure all fields have values
    const valid =
      restaurant.zhtw &&
      restaurant.en &&
      restaurant.pinyin &&
      categories.every(
        (category) =>
          category.zhtw && category.pinyin && category.en && category.categoryId && category.items.length > 0
      );
    // Inform user if the menu fails validation
    if (!valid) {
      alert(
        'All restaurant fields are required.\nEvery added category must have a Chinese, Pinyin, and English name.\nEvery category must have at least one dish.'
      );
      return;
    }

    // Confirm submission
    const isSubmitted = window.confirm('Are you sure you are ready to submit this menu?');

    // Return early if canceled
    if (!isSubmitted) return;

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
            categoryId: category.categoryId,
            // Each item is a dishId in the items array of the category
            // TODO The object ids don't show up in the changelogs
            items: category.items.map((item) => {
              return item.id || item._id;
            }),
          };
        }),
    };

    // Submit the new menu and await a response
    let request;
    try {
      // Edits use patch, new submissions use post
      if (edit) {
        request = await axios.patch(
          MENU_URL,
          { ...menuData, id: data._id },
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
      setMenu({ ...request.data, success: true });
      // Clear data from form
      setRestaurant({
        zhtw: '',
        pinyin: '',
        en: '',
      });
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

    setCategories(
      categories.map((category) =>
        category.categoryId === categoryId ? { ...category, [fieldName]: fieldValue } : category
      )
    );
  };

  const handleAddCategory = (e) => {
    setCategories((values) => [
      ...values,
      {
        categoryId: nanoid(),
        zhtw: '',
        pinyin: '',
        en: '',
        items: [],
      },
    ]);
  };

  const handleRemoveCategory = (e) => {
    setCategories((values) => values.filter((category) => category.categoryId !== e.target.dataset.categoryId));
  };

  const handleAddItem = (e) => {
    const vals = e.target.dataset;

    // Index of relevant category
    const index = categories.findIndex((category) => category.categoryId === vals.categoryId);
    // Existance of this item in that category
    const isAdded = categories[index]?.items?.find((item) => item._id === vals.dishId);

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
                    _id: vals.dishId,
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
    const index = categories.findIndex((category) => category.categoryId === categoryId);
    // Filter that item out of that category

    setCategories(
      categories.map((category, i) =>
        i !== index ? category : { ...category, items: category.items.filter((item) => item._id !== dishId) }
      )
    );
  };

  return (
    <div>
      <div className={styles.result}>
        {menu.hasOwnProperty('message') ? (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Menu {edit ? 'Edit' : 'Creation'} Failed</Alert.Heading> <p>Error: {menu.message}</p>
            <p>Please check your inputs and try again.</p>
          </Alert>
        ) : (
          <div>
            {menu.success && (
              <Alert variant="success">
                Menu {edit ? 'edited' : 'created'} successfully.&nbsp;
                <Link href={`/menus/${menu._id}`}>
                  <a target="_blank">Open menu in new window</a>
                </Link>
              </Alert>
            )}
          </div>
        )}
      </div>
      {/* If editing a menu, form disappears after successful submission */}
      {((edit && !menu.success) || !edit) && (
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
              key={category.categoryId}
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
      )}
    </div>
  );
}

// Requires auth to access
NewMenuForm.auth = true;
