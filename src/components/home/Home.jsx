import Header from './Header/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function HomePage() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header/>
    </>
  );
}