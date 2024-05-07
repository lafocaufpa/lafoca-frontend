'use client';

import { MemberProvider } from '@/contexts/member';
import Header from '@components/member/header/Header';
import Main from '@components/member/main/Main';
import Footer from '@components/home/Footer/Footer';

export default function Member({ member }) {
  return (
    
    <MemberProvider member={member}>
      <>
        <Header paddingBottom={27.25}/>
        <Main/>
        <Footer marginTop={6.375}/>
      </>
    </MemberProvider>
  );
}