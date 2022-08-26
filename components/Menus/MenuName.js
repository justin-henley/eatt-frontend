// CSS
import styles from '../../styles/MenuName.module.css';

/**
 * Displays the names of the given menu
 * @param {Object} restaurant - The names of the given menu
 */
export default function MenuName({ restaurant }) {
  return (
    <div className={styles.tile}>
      <h2 className={styles.restaurantZHTW}>{restaurant?.zhtw}</h2>
      <h3 className={styles.restaurantPinyin}>{restaurant?.pinyin}</h3>
      <h3 className={styles.restaurantEN}>{restaurant?.en}</h3>
    </div>
  );
}
