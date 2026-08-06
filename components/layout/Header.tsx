'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  platformName?: string
  platformTagline?: string
}

export default function Header({ 
  platformName = 'VIGORRE', 
  platformTagline = 'Inteligência e Gestão Estratégica' 
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenu(prev => !prev)
  }, [])

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Empresas', href: '/#empresas' },
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Contato', href: '/#contato' },
  ]

  // Proteção contra hydration mismatch
  if (!mounted) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[70px] lg:h-[80px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo-vigorre.png" alt="Vigorre Logo" className="h-10 lg:h-12 w-auto" />
            </Link>
          </div>
        </header>
        <div className="h-[70px] lg:h-[80px]" />
      </>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-[0_4px_20px_rgba(10,37,64,0.08)]' : 'border-b border-[#E5E7EB]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[70px] lg:h-[80px] flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo-vigorre.png"
              alt="Vigorre Logo"
              className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <div className="flex items-baseline gap-1">
                <span 
                  className="font-extrabold text-[18px] lg:text-[20px] tracking-tight uppercase"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#0A2540' }}
                >
                  {String(platformName)}
                </span>
                <span 
                  className="font-extrabold text-[18px] lg:text-[20px] tracking-tight uppercase"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#D4AF37' }}
                >
                  ACADEMY™
                </span>
              </div>
              <span 
                className="text-[10px] lg:text-[11px] tracking-[0.15em] font-medium uppercase mt-0.5"
                style={{ color: '#6B7280' }}
              >
                {String(platformTagline)}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={String(item.href)}
                  href={item.href}
                  className={`relative px-5 py-2.5 text-[14.5px] font-medium tracking-wide transition-all duration-200 rounded-lg group ${
                    isActive ? 'text-[#0A2540]' : 'text-[#6B7280] hover:text-[#0A2540]'
                  }`}
                >
                  {String(item.label)}
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                      isActive ? 'w-5' : 'w-0 group-hover:w-5'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/5534999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-[#0A2540] font-semibold text-sm border-2 border-[#0A2540]/20 hover:border-[#0A2540] hover:bg-[#0A2540]/5 rounded-full transition-all"
            >
              WhatsApp
            </a>
            <button className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C49F27] text-white font-bold text-sm rounded-full shadow-lg shadow-[#D4AF37]/20 transition-all">
              Solicitar Diagnóstico
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors"
            aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 right-0 h-0.5 bg-[#0A2540] transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#0A2540] transition-opacity duration-300 ${mobileMenu ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 right-0 h-0.5 bg-[#0A2540] transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>

        <div
          className={`lg:hidden bg-white border-t border-[#E5E7EB] overflow-hidden transition-all duration-300 ${
            mobileMenu ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={String(item.href)}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="block py-3 px-4 text-[#0A2540] font-medium hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                {String(item.label)}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-[#E5E7EB] space-y-3">
              <a
                href="https://wa.me/5534999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 border-2 border-[#0A2540]/20 text-[#0A2540] font-semibold rounded-full"
              >
                WhatsApp
              </a>
              <button className="w-full py-3 bg-[#D4AF37] hover:bg-[#C49F27] text-white font-bold rounded-full">
                Solicitar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[70px] lg:h-[80px]" />
    </>
  )
}
