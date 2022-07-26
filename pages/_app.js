// Libraries
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';
// Authentication
/*
  Exposes the session context at the top level of the app. 
  Instances of useSession will have access to session data and status.
  SessionProvider also keeps the session updated and synced between browser tabs and windows.
*/
import { SessionProvider, useSession } from 'next-auth/react';
// Custom components
import GlobalNav from '../components/GlobalNav';
import GlobalFooter from '../components/GlobalFooter';
// CSS
import '../styles/globals.css';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <GlobalNav />
        <main className="bodyDiv">
          {/* Check if the page requires authorization. Only contacts /api/auth/session endpoint for pages requiring auth */}
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            /* Render without auth */
            <Component {...pageProps} />
          )}
        </main>
        <GlobalFooter />
      </SessionProvider>
    </SSRProvider>
  );
}

function Auth({ children }) {
  // TODO roles?
  // If '{ required: true }' is supplied, 'status' can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  // Return a loading message if waiting on authentication
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Display the children
  return children;
}
