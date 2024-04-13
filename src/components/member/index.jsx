'use client';

import { MemberProvider } from '@/contexts/member';
import Header from '@components/member/header/Header';
import Main from '@components/member/main/Main';

export default function Member({ member }) {
  return (
    
    <MemberProvider member={member}>
      <>
        <Header />
        <Main />
      </>
    </MemberProvider>
  );
}