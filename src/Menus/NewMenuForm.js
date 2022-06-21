// Outside Components
import { useState } from 'react';
import FormCategory from './FormCategory';
import FormItems from './FormItems';
import FormRestaurant from './FormRestaurant';
// Custom Components

import MenuContent from './MenuContent';
import MenuName from './MenuName';
// CSS
import styles from './NewMenuForm.module.css';

function NewMenuForm() {
  // Data with initial placeholder values
  const [restaurant, setRestaurant] = useState({
    // Restaurant placeholder values
    zhtw: '',
    pinyin: '',
    en: '',
  });

  const [menu, setMenu] = useState([]);

  const [category, setCategory] = useState({ zhtw: '', pinyin: '', en: '', items: [{ zhtw: 'fake' }, {}] });
  const [items, setItems] = useState([]);
  const [flags, setFlags] = useState({
    showRestaurantForm: true,
    showCategoryForm: false,
    showItemsForm: false,
  });
  // HANDLERS

  // SUBMIT HANDLERS
  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    // TODO
    setFlags((values) => ({ ...values, showRestaurantForm: false, showCategoryForm: true }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    // TODO

    // Push the new category onto the menu
    setMenu((values) => [...values, category]);
    /* // Reset the category fields
    setCategory({ zhtw: '', pinyin: '', en: '' }); */
    // Switch to the items form
    setFlags((values) => ({ ...values, showCategoryForm: false, showItemsForm: true }));
  };

  const handleMenuSubmit = () => {
    alert('Submitting');
  };

  const handleItemsSubmit = () => {
    setCategory((values) => ({ ...values, items: items }));
    setMenu((values) => [...values, category]);
    // Reset the category fields
    setCategory({ zhtw: '', pinyin: '', en: '' });
    setItems([]);
    // Switch to the categories form
    setFlags((values) => ({ ...values, showCategoryForm: true, showItemsForm: false }));
  };

  // CHANGE HANDLERS
  const handleRestaruantChange = (e) => {
    // TODO
    const name = e.target.name;
    const value = e.target.value;
    setRestaurant((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    // TODO
    const name = e.target.name;
    const value = e.target.value;
    setCategory((values) => ({ ...values, [name]: value }));
  };

  // FORMS
  const forms = {
    restaurant: (
      <FormRestaurant
        restaurant={restaurant}
        handleChange={handleRestaruantChange}
        handleSubmit={handleRestaurantSubmit}
      />
    ),
    category: (
      <FormCategory category={category} handleChange={handleCategoryChange} handleSubmit={handleCategorySubmit} />
    ),
    items: <FormItems />,
  };

  return (
    <div>
      <button onClick={handleMenuSubmit}>Submit Menu</button>

      {flags.showRestaurantForm ? forms.restaurant : null}

      <div>
        <MenuName restaurant={restaurant} />
        <MenuContent menu={menu} />
      </div>
      {flags.showCategoryForm ? forms.category : null}
      {flags.showItemsForm ? forms.items : null}
    </div>
  );
}

export default NewMenuForm;
