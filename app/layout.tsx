// app/layout.tsx
import "./globals.css"
import type { Metadata } from 'next'
import ConditionalLayout from "@/components/ConditionalLayout"

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Next.js',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning is key here to ignore extension attributes
    <html lang="en" suppressHydrationWarning>
      <body 
        className="bg-slate-50 antialiased font-sans text-slate-900 overflow-x-hidden"
        suppressHydrationWarning
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}