import MenuItemSearch from './MenuItemSearch';

function MenuCategoryForm({ category, handleChange, handleAddItem, handleRemoveItem }) {
  return (
    <fieldset data-category-id={category.id}>
      <legend>Category</legend>
      <label>
        Traditional Chinese:
        <input type="text" name="zhtw" value={category.zhtw} onChange={handleChange} />
      </label>
      <label>
        Hanyu Pinyin:
        <input type="text" name="pinyin" value={category.pinyin} onChange={handleChange} />
      </label>
      <label>
        English:
        <input type="text" name="en" value={category.en} onChange={handleChange} />
      </label>
      <MenuItemSearch
        items={category.items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        categoryId={category.id}
      />
    </fieldset>
  );
}

export default MenuCategoryForm;
