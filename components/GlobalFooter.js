// CSS
import styles from '../styles/GlobalFooter.module.css';

function GlobalFooter() {
  return (
    <footer className={styles.foot}>
      <div className={styles.credits}>
        <p>
          Favicon courtesy of{' '}
          <a href="https://icons8.com/" target="_blank">
            icons8
          </a>
        </p>
        <p>
          Pearl tea photo created by tawatchai07 -{' '}
          <a href="https://www.freepik.com/photos/pearl-tea" target="_blank">
            www.freepik.com
          </a>
        </p>
      </div>
      <span className={styles.copyright}>
        Eatt &copy;2022{' '}
        <a target="_blank" href="https://www.justin-henley.com">
          Justin Henley
        </a>
      </span>
    </footer>
  );
}

export default GlobalFooter;
