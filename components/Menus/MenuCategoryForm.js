// Libraries
import { FloatingLabel, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
// Custom Components
import MenuItemSearch from './MenuItemSearch';

function MenuCategoryForm({ index, category, handleChange, handleAddItem, handleRemoveItem }) {
  // TODO test with screen reader and add aria labels where needed
  return (
    <FormGroup
      as="fieldset"
      data-category-id={category.id}
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
        categoryId={category.id}
      />
    </FormGroup>
  );
}

export default MenuCategoryForm;
