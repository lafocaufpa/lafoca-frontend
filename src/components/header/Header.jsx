'use client';
import url from '@/routes/url';
import Logo from '@components/header/logo/Logo';
import Link from 'next/link';
export default function Header() {
  return (
    <header>
      <div className='global-container'>
        <Link href={url.homepage}><Logo/></Link>
      </div>
    </header>
  );
}