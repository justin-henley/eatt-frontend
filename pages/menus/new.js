// Custom Components
import NewMenuForm from '../../components/Menus/NewMenuForm';
// CSS
import styles from '../../styles/NewMenu.module.css';

export default function NewMenu() {
  return (
    <div className={styles.wrapper}>
      <NewMenuForm />
    </div>
  );
}

// Requires auth to access
NewMenu.auth = true;
