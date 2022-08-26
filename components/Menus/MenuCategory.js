// Custom Components
import DishDisplay from '../Dish/DishDisplay';
// CSS
import styles from '../../styles/MenuCategory.module.css';

/**
 * Displays a single category from a menu, with all of its dishes
 * @requires DishDisplay
 * @param {Object} category - The category to be displayed
 */
export default function MenuCategory({ category }) {
  return (
    <div className={styles.category}>
      <div className={styles.categoryName}>
        <h3 className={styles.categoryName__zhtw}>{category.zhtw}</h3>
        <h3 className={styles.categoryName__pinyin}>{category.pinyin}</h3>
        <h3 className={styles.categoryName__en}>{category.en}</h3>
      </div>
      <DishDisplay dishes={category?.items} />
    </div>
  );
}
