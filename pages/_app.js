// Libraries
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';
// Context
import { AuthProvider } from '../context/AuthProvider';
// Hooks
import useAuth from '../hooks/useAuth';
// Custom components
import GlobalNav from '../components/GlobalNav';
import GlobalFooter from '../components/GlobalFooter';
import Login from './login';
// CSS
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <Head>
          {' '}
          {/* Consider moving this into each page separately for seo */}
          <title>Eatt</title>
          <meta
            name="description"
            content="Expand your meals with bilingual menus for your favorite local restaurants"
          />
          <meta name="keywords" content="translation, menu, chinese, english, mandarin, taiwan" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        </Head>

        <GlobalNav />
        {/* TODO why doesn't login state persist? Possibly because secure doesn't work with local dev? */}
        {Component.auth ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : (
          /* Render without auth */
          <Component {...pageProps} />
        )}
        <GlobalFooter />
      </AuthProvider>
    </SSRProvider>
  );
}

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  console.log(auth);
  // const location = useLocation();  this uses react router, how to do it in next?

  return auth?.user ? children : <Login />;
  /* return children; */
};
