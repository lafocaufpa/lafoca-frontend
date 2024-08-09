'use client';
import Header from '@components/header/Header';
import Footer from '@components/home/Footer/Footer';
import TccsPageMain from '@components/tccs/TccsPageMain';
import LoadingPage from '@/components/loading/LoadingPage';
import { useEffect, useState } from 'react';

export default function TccsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Header />
          <TccsPageMain />
          <Footer marginTop={6.375} />
        </>
      )}
    </>
  );
}
