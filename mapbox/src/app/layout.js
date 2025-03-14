import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Snowmap Tile Server',
  description: 'A tile server for displaying snow depth data',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  )
}
