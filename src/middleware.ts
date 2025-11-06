import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// CONFIGURAÇÕES DE ROTAS
// ==========================================

// Rotas públicas que NÃO precisam de autenticação
const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];

// Rotas que SÓ usuários não autenticados podem acessar
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

// Regras de redirect para rotas base sem conteúdo
const REDIRECT_RULES: Record<string, string> = {
  '/auth': '/auth/login',
  '/auth/recovery/authorize-by-link': '/auth/login',
  // Adicione outras rotas aqui conforme necessário
  // '/app': '/app/dashboard',
  // '/docs': '/docs/introduction',
};

// ==========================================
// MIDDLEWARE PRINCIPAL
// ==========================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ REDIRECT RULES - Processa primeiro (redirects de rotas base)
  if (pathname in REDIRECT_RULES) {
    const url = request.nextUrl.clone();
    url.pathname = REDIRECT_RULES[pathname];
    return NextResponse.redirect(url);
  }

  // 2️⃣ AUTENTICAÇÃO - Verifica token e protege rotas
  const accessToken = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!accessToken;

  // Se está autenticado e tenta acessar página de login/register
  if (isAuthenticated && AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  // Se NÃO está autenticado e tenta acessar rota protegida
  if (!isAuthenticated && !PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/auth/login', request.url);
    // Salva a URL que tentou acessar para redirecionar depois do login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ CONTINUA - Permite a requisição
  return NextResponse.next();
}

// ==========================================
// CONFIGURAÇÃO DO MATCHER
// ==========================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svg, png, jpg, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};