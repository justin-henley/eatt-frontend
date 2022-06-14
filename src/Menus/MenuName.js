// CSS
import styles from './MenuName.module.css';

const MenuName = ({ restaurant }) => {
  return (
    <div className={styles.tile}>
      <h2 className={styles.restaurantZHTW}>{restaurant?.zhtw}</h2>
      <h3 className={styles.restaurantPinyin}>{restaurant?.pinyin}</h3>
      <h3 className={styles.restaurantEN}>{restaurant?.en}</h3>
    </div>
  );
};
export default MenuName;
