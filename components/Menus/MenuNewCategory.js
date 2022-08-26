// Libraries
import { useState } from 'react';
// Custom Components
import MenuCategory from './MenuCategory';
import MenuCategoryForm from './MenuCategoryForm';

// Required fields are only checked if form is showing. Extra error handling is in the submit function for the full form
// https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component

function MenuNewCategory({ index, category, handleChange, handleAddItem, handleRemoveItem, handleRemoveCategory }) {
  const [showForm, setShowForm] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };
  return (
    <div className="newCategory">
      {showForm ? (
        <MenuCategoryForm
          index={index}
          category={category}
          handleChange={handleChange}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
      ) : (
        <MenuCategory category={category} />
      )}
      <button type="button" onClick={handleClick}>
        {showForm ? 'Save' : 'Edit'}
      </button>
      <button type="button" data-category-id={category.categoryId} onClick={handleRemoveCategory}>
        Delete Category
      </button>
      <hr />
    </div>
  );
}

export default MenuNewCategory;
