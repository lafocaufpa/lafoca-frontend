import { NextResponse } from 'next/server';
import deleteCookie from '@/components/auth/authorization/deleteCookie';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.ico|assets/).*)',
  
  ] 
};

const publicRoutes = ['/', '/login/'];
const dynamicPublicsRoutesPattern = /^\/(members|articles|projects)\/search\/[\w-]+\/$/;
const dynamicPrivatesRoutesPattern = /^\/admin\//;


export function middleware(req) {
  const pathname = req.nextUrl.pathname;
  
  if (publicRoutes?.includes(pathname) || dynamicPublicsRoutesPattern.test(pathname)) {
    return NextResponse.next();
  } 
  
  if (dynamicPrivatesRoutesPattern.test(pathname)) {

    const tokenBoolean = req.cookies.has('next-auth.token');
    const sessionTokenBoolean = req.cookies.has('next-auth.session-token');
    
    if(!tokenBoolean || !sessionTokenBoolean) {
      
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}