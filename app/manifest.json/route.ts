import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    name: "India's Best - Education Platform",
    short_name: "India's Best",
    description: "Find the perfect college or course in India. Your future starts here.",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#FDE047",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }

  return NextResponse.json(manifest)
}