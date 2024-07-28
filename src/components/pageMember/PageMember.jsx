'use client';

import { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import PageMainMember from '@components/pageMember/main/PageMainMember';
import Footer from '@components/home/Footer/Footer';
import LoadingPage from '@/components/loading/LoadingPage';

export default function PageMember() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Header />
          <PageMainMember />
          <Footer />
        </>
      )}
    </>
  );
}
