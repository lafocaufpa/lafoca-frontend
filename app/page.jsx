'use client';

import HomePage from '@home/Home';
import LoadingPage from '@/components/loading/LoadingPage';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  return (
    <>
      {isLoading ? <LoadingPage/> : <HomePage/>}
    </>
  );
};

export default Page;