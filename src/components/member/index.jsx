'use client';

import Header from '@components/member/header/Header';
import Main from '@components/member/main/Main';
import Footer from '@components/home/Footer/Footer';

export default function Member({ member }) {
  return (
    <>
      <Header/>
      {member !== null ? <Main member={member} /> : <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Não encontrado</h1>}
      <Footer marginTop={6.375}/>
    </>
  );
}