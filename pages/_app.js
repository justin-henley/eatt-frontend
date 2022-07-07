// Libraries
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';
// Custom components
import GlobalNav from '../components/GlobalNav';
import GlobalFooter from '../components/GlobalFooter';
// CSS
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
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
          {/* Including the bootstrap css via CDN */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        </Head>
        <div>
          <GlobalNav />
          <div className="bodyDiv">
            <Component {...pageProps} />
          </div>
          <GlobalFooter />
        </div>
      </div>
    </SSRProvider>
  );
}
