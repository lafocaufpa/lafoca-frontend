'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@home/Header/Header';
import Main from '@home/Main/Main';
import Footer from '@home/Footer/Footer';

export default function HomePage() {

  useEffect(() => {
    AOS.init();
    

  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>

  );
}
