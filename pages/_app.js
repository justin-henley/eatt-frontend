// Libraries

// Custom components
import GlobalNav from '../components/GlobalNav';
import GlobalFooter from '../components/GlobalFooter';
// CSS
import styles from '../styles/App.module.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalNav />
      <div className={styles.bodyDiv}>
        <Component {...pageProps} />
      </div>
      <GlobalFooter />
    </div>
  );
}
