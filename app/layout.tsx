import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body { 
              background: #1a1a2e !important; 
              margin: 0 !important; 
              padding: 0 !important; 
            }
          `
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const hour = new Date().getHours();
                const isDay = hour >= 6 && hour < 18;
                const bgColor = isDay ? '#87CEEB' : '#1a1a2e';
                document.documentElement.style.setProperty('--time-bg-color', bgColor);
                document.body.style.backgroundColor = bgColor;
                document.documentElement.style.backgroundColor = bgColor;
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
