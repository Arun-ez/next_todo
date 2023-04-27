import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> All Tasks </title>
        <meta name="description" content="Todo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Navbar />
      <div style={{ height: "80px" }}> </div>
      <Component {...pageProps} />
    </>
  )
}
