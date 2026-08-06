import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'VIGORRE™ - Inteligência e Gestão Estratégica',
  description: 'Plataforma inteligente de consultoria estratégica, educação corporativa e people analytics',
  keywords: 'consultoria estratégica, gestão, RH, people analytics, treinamentos, Vigorre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header platformName="VIGORRE™" platformTagline="Inteligência e Gestão Estratégica" />
          
          <main className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          
          <Footer platformName="VIGORRE™" />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
