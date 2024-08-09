// ViewPage.js
import Header from '@components/header/Header';
import ViewPageMain from '@components/viewer/main/ViewPageMain';
import Footer from '@components/home/Footer/Footer';
import { useState, useEffect } from 'react';
import LoadingPage from '@/components/loading/LoadingPage';

export default function ViewPage() {
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
          <ViewPageMain/>
          <Footer marginTop={6.375}/>
        </>
      )}
    </>
  );
}
