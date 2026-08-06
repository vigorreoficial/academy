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
  title: 'VIGORRE ACADEMY™ - Educação Corporativa com IA',
  description: 'Plataforma inteligente de educação corporativa, treinamentos e certificação com IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body 
        className={`${inter.className} ${poppins.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header platformName="VIGORRE" platformTagline="Inteligência e Gestão Estratégica" />
            
            <main className="flex-1 pt-[70px] lg:pt-[80px]">
              {children}
            </main>
            
            <Footer platformName="VIGORRE" />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
