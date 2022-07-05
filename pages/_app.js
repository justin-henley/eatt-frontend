// Libraries

// Custom components
import GlobalNav from '../components/GlobalNav';
import GlobalFooter from '../components/GlobalFooter';
// CSS
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GlobalNav />
      <div className="bodyDiv">
        <Component {...pageProps} />
      </div>
      <GlobalFooter />
    </div>
  );
}
