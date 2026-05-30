import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CursorSpotlight } from '@/components/hero/CursorSpotlight' 
import { ScrollReset } from '@/components/ScrollReset' // 1. Import the new utility

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-[#0a0a0a] text-white antialiased selection:bg-teal-500/30`}>
        
        {/* 2. Execute the scroll reset before rendering the page */}
        <ScrollReset />
        
        {children}
        
        <CursorSpotlight />
      </body>
    </html>
  )
}