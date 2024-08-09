import { NextResponse } from 'next/server';
import url from '@/routes/url';

// Configuração para determinar quais rotas serão processadas pelo middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.ico|assets/).*)', // Exclui rotas que não precisam de middleware
  ]
};

// Expressão regular para definir as rotas públicas estáticas e dinâmicas
const PUBLIC_ROUTES_PATTERN = /^(\/$|\/login|\/membros|\/artigos|\/projetos|\/tccs)(\/[\w-]*)?$/;

// Prefixo das rotas privadas
const PRIVATE_ROUTES_PREFIX = url.admin.home;

// Função middleware para manipular as requisições
export function middleware(req) {
  const pathname = req.nextUrl.pathname; // Obtém o caminho da URL da requisição

  // Verifica se a rota é pública
  if (PUBLIC_ROUTES_PATTERN.test(pathname)) {
    return NextResponse.next(); // Permite o acesso à próxima etapa de processamento
  }

  // Verifica se a rota é privada
  if (pathname.startsWith(PRIVATE_ROUTES_PREFIX)) {

    const hasToken = req.cookies.has('authjs.session-token');
    if (!hasToken) {
      return NextResponse.redirect(new URL(url.auth.login, req.url)); // Redireciona para a página de login se não estiver autenticado
    }

    return NextResponse.next(); // Permite o acesso à próxima etapa de processamento
  }

  // Caso não seja nem rota pública nem rota privada
  return NextResponse.next(); // Permite o acesso à próxima etapa de processamento
}
