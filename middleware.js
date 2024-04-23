import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.ico).*)',
  ]
};

const publicRoutes = ['/', '/login/'];

export function middleware(req) {


  const pathname = req.nextUrl.pathname;

  if(publicRoutes?.includes(pathname)) {
    return NextResponse.next();
  } 


  // 
  
  // eslint-disable-next-line no-constant-condition
  if(true) {
    console.log('ha um cookie criado');
    console.log(cookies().getAll());
    
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}