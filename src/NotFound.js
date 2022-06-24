// Icon
import { MdNoFood } from 'react-icons/md';
// CSS
import styles from './NotFound.module.css';

function NotFound({ message }) {
  return (
    <div className={styles.container}>
      <MdNoFood size="250" className={styles.foodIcon} />
      <div className={styles.text}>
        <h1 className={styles.notFound}>Page Not Found</h1>
        <h2 className={styles.message}>{message || '404'}</h2>
      </div>
    </div>
  );
}

export default NotFound;
