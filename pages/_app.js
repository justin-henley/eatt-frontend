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
import Login from '../components/Login';
// CSS
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <div>
          <Head>
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
          <div>
            <GlobalNav />
            {/* Check if the page requires authorization. Only contacts /api/auth/session endpoint for pages requiring auth */}
            {Component.auth ? (
              <RequireAuth>
                <Component {...pageProps} />
              </RequireAuth>
            ) : (
              /* Render without auth */
              <Component {...pageProps} />
            )}
            <GlobalFooter />
          </div>
        </div>
      </AuthProvider>
    </SSRProvider>
  );
}

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  // const location = useLocation();  this uses react router, how to do it in next?
  console.log('auth: ', auth);

  return auth?.user ? children : <Login />;
  /* return children; */
};
