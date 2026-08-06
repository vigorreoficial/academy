import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Configuração oficial das fontes com next/font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vigorre Academy™ - Educação Corporativa com IA',
  description: 'Plataforma inteligente de educação corporativa, treinamentos e certificação com IA',
  keywords: 'educação corporativa, LMS, treinamentos, certificação, IA, cursos online',
  authors: [{ name: 'Vigorre Academy' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Vigorre Academy™ - Educação Corporativa com IA',
    description: 'Plataforma inteligente de educação corporativa, treinamentos e certificação',
    url: 'https://academy.vigorre.com.br',
    siteName: 'Vigorre Academy',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-[#F8FAFC]`}>
        <Header />
        <main className="pt-[80px] min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
