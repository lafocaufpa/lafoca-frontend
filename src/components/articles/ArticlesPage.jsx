'use client';

import Header from '@components/header/Header';
import ArticlesMain from '@components/articles/main/ArticlesMain';
import Footer from '@components/home/Footer/Footer';
import { useState, useEffect } from 'react';
import LoadingPage from '@/components/loading/LoadingPage';

export default function ArticlesPage() {
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
          <Header/>
          <ArticlesMain />
          <Footer marginTop={6.375}/>
        </>
      )}
    </>
  );
}
