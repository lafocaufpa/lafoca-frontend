import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.ico).*)',
  ]
};

const publicRoutes = ['/', '/login/'];

export function middleware(req, res) {


  const pathname = req.nextUrl.pathname;

  console.log('resposta :');
  console.log(req);

  if(publicRoutes?.includes(pathname)) {
    return NextResponse.next();
  } 


  const session = cookies().get('token');
  
  if(session) {
    console.log('ha um cookie criado');
    console.log(session);
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}