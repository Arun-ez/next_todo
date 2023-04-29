import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> All Tasks </title>
        <meta name="description" content="Todo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Provider store={store}>
        <Navbar />
        <div style={{ height: "80px" }}> </div>
        <Component {...pageProps} />
      </Provider>

    </>
  )
}
