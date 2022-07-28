// Libraries
import DishTile from './DishTile';
// CSS
import styles from '../../styles/DishDisplay.module.css';

const DishDisplay = ({ dishes }) => {
  // Map iterates over all dishes and creates a tile for each
  return (
    <div className={styles.display}>
      {dishes?.map((dish) => (
        <DishTile key={dish._id || dish.id} item={dish} />
      ))}
    </div>
  );
};

export default DishDisplay;
