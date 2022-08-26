// Custom Components
import MenuCategory from './MenuCategory';
// CSS
import styles from '../../styles/MenuContent.module.css';

/**
 * Handles display of the menu body by breaking the array of menu categories into individual categories, and rendering each
 * @requires MenuCategory
 * @param {Object} menu - The menu body to display
 */
export default function MenuContent({ menu }) {
  return (
    <div>
      <h1 className={styles.menu}>Menu</h1>
      {menu?.map((category) => (
        <MenuCategory category={category} key={category._id} />
      ))}
    </div>
  );
}
