// Custom Components
import NewDishForm from '../../components/Dish/NewDishForm';
// CSS
import styles from '../../styles/NewDish.module.css';

export default function NewDish() {
  return (
    <div className={styles.wrapper}>
      <NewDishForm />
    </div>
  );
}

// Requires auth to access
NewDish.auth = true;
