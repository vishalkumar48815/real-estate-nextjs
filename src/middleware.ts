// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const protectedPaths = ['/dashboard', '/profile', '/listings']

  const isProtectedRoute = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Define the paths where middleware should apply
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/listings/:path*'],
}
