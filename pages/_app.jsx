import Head from 'next/head';
import '../src/styles/global.css';

export default function App({ Component, pageProps }) {
  <script>
  AOS.init();
  </script>;
  return (
    <>
      <Head>
        <title>La Foca</title>
        <link rel="icon" href="/assets/img/Favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>

  );

}