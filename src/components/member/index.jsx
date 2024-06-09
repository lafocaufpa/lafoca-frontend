'use client';

import Header from '@components/member/header/Header';
import Main from '@components/member/main/Main';
import Footer from '@components/home/Footer/Footer';

export default function Member({ member }) {
  return (
    <>
      <Header paddingBottom={22.25}/>
      <Main member={member}/>
      <Footer marginTop={6.375}/>
    </>
  );
}