// Outside Components
import { useState } from 'react';

// Custom Components
import MenuCategory from './MenuCategory';
import MenuCategoryForm from './MenuCategoryForm';

// TODO Required fields are only checked if form is showing. Add error checking to the 'save' button
// https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component

function MenuNewCategory({ category, handleChange, handleAddItem, handleRemoveItem, handleRemoveCategory }) {
  const [showForm, setShowForm] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
    // TODO remove, just for checking
    console.log('category: ', category);
  };
  return (
    <div className="newCategory">
      {showForm ? (
        <MenuCategoryForm
          category={category}
          handleChange={handleChange}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
      ) : (
        <MenuCategory category={category} />
      )}
      <button onClick={handleClick}>{showForm ? 'Save' : 'Edit'}</button>
      <button data-category-id={category.id} onClick={handleRemoveCategory}>
        Delete Category
      </button>
    </div>
  );
}

export default MenuNewCategory;
