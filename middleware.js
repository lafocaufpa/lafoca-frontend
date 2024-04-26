import { NextResponse } from 'next/server';

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
  
  // Verifica se a rota é pública ou dinâmica
  if (publicRoutes?.includes(pathname) || dynamicPublicsRoutesPattern.test(pathname)) {
    return NextResponse.next();
  } 
  
  // Verifica se a rota é privada
  if (dynamicPrivatesRoutesPattern.test(pathname)) {
    // Redireciona para a página de login se a rota for privada
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se nenhuma das condições acima for atendida, permite o acesso à rota e deixa a página 404 (Not Found) ser tratada pelo Next.js
  return NextResponse.next();
}