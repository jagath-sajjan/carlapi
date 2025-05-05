import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carl Api',
  description: 'Carl More Like Crawl Api To Crawl Websites :)',
  generator: 'jagath',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
