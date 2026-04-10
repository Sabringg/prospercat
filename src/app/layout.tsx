import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProsperCat — AI Listing Generator',
  description: 'Generate winning product titles, tags, descriptions for Etsy, Shopify & Amazon',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
