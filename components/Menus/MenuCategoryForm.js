// Libraries
import { FloatingLabel, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
// Custom Components
import MenuItemSearch from './MenuItemSearch';

/**
 * The form for creating a new menu category
 * @requires react-bootstrap
 * @requires MenuItemSearch
 * @param {Number} index - The index of the category in the menu's array of categories
 * @param {Object} category - The category managed by the form. If this has a value, the form is populated with the existing data
 * @param {Function} handleChange - Handler for changes to the category name properties
 * @param {Function} handleAddItem - Handler for adding items to the category
 * @param {Function} handleRemoveItem - Handler for removing an item from the category
 */
export default function MenuCategoryForm({ index, category, handleChange, handleAddItem, handleRemoveItem }) {
  // TODO test with screen reader and add aria labels where needed
  return (
    <FormGroup
      as="fieldset"
      data-category-id={category.categoryId}
      aria-label="Enter the name of the new menu category in Traditional Chinese, Hanyu Pinyin, and English."
    >
      <FormLabel as="legend">Category {index + 1}</FormLabel>
      <FloatingLabel controlId="floatingCategoryChinese" label="Traditional Chinese">
        <FormControl
          type="text"
          size="sm"
          name="zhtw"
          required
          value={category.zhtw}
          onChange={handleChange}
          placeholder="Traditional Chinese"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingCategoryPinyin" label="Hanyu Pinyin">
        <FormControl
          type="text"
          name="pinyin"
          required
          value={category.pinyin}
          onChange={handleChange}
          placeholder="Hanyu Pinyin"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingCategoryEnglish" label="English">
        <FormControl type="text" name="en" required value={category.en} onChange={handleChange} placeholder="English" />
      </FloatingLabel>
      <MenuItemSearch
        items={category.items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        categoryId={category.categoryId}
      />
    </FormGroup>
  );
}
