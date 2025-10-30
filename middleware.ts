import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Skip middleware for now to avoid auth issues
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}