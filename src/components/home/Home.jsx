import Header from './Header/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Main from '@home/Main/Main';
import Footer from '@home/Footer/Footer';

export default function HomePage() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
}