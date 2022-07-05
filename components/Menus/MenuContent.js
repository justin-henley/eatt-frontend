// Custom Components
import MenuCategory from './MenuCategory';
// CSS
import styles from '../../styles/MenuContent.module.css';

function MenuContent({ menu }) {
  return (
    <div>
      <h1 className={styles.menu}>Menu</h1>
      {menu?.map((category) => (
        <MenuCategory category={category} key={category._id} />
      ))}
    </div>
  );
}

export default MenuContent;
