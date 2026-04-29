import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Protected routes — require auth token
    const protectedRoutes = ['/dashboard', '/profile']
    const isProtected = protectedRoutes.some(
        route => pathname.startsWith(route)
    )

    if (isProtected) {
        // Check for auth token in cookies
        const token = request.cookies.get('accessToken')

        if (!token) {
            // Redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Add security headers
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)',
    ]
}