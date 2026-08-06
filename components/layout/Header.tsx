'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  platformName?: string
  platformTagline?: string
}

export default function Header({ 
  platformName = 'VIGORRE™', 
  platformTagline = 'Inteligência e Gestão Estratégica' 
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Empresas', href: '/#empresas' },
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Contato', href: '/#contato' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled 
            ? 'shadow-[0_4px_20px_rgba(0,33,71,0.08)] backdrop-blur-xl bg-white/95' 
            : 'border-b border-transparent'
        }`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[70px] lg:h-[85px] flex items-center justify-between">
          
          {/* LOGO + NOME */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="Vigorre - Página inicial"
          >
            <img
              src="/logo-vigorre.png"
              alt="Vigorre Logo"
              className="h-11 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span 
                className="font-extrabold text-[18px] lg:text-[20px] tracking-tight uppercase"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#002147' }}
              >
                {platformName}
              </span>
              <span 
                className="text-[10px] lg:text-[11px] tracking-[0.15em] font-medium uppercase mt-0.5"
                style={{ color: '#666666' }}
              >
                {platformTagline}
              </span>
            </div>
          </Link>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav 
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2.5 text-[14.5px] font-medium tracking-wide transition-all duration-200 rounded-lg group ${
                    isActive 
                      ? 'text-[#002147]' 
                      : 'text-[#666666] hover:text-[#002147]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                      isActive ? 'w-5' : 'w-0 group-hover:w-5'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* AÇÕES DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/5534999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contato via WhatsApp"
              className="flex items-center gap-2 px-5 py-2.5 text-[#002147] font-semibold text-sm border-2 border-[#002147]/20 hover:border-[#002147] hover:bg-[#002147]/5 rounded-full transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <button 
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold text-sm rounded-full shadow-lg shadow-[#D4AF37]/20 hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Solicitar Diagnóstico
            </button>
          </div>

          {/* BOTÃO MENU MOBILE */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] transition-colors"
            aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenu}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 right-0 h-0.5 bg-[#002147] transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#002147] transition-opacity duration-300 ${mobileMenu ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 right-0 h-0.5 bg-[#002147] transition-all duration-300 ${mobileMenu ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div
          className={`lg:hidden bg-white border-t border-[#F5F5F5] overflow-hidden transition-all duration-300 ${
            mobileMenu ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="px-6 py-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-[#002145] font-medium hover:bg-[#F5F5F5] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-[#F5F5F5] space-y-3">
              <a
                href="https://wa.me/5534999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#002145]/20 text-[#002145] font-semibold rounded-full hover:bg-[#F5F5F5] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <button className="w-full py-3 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-bold rounded-full shadow-lg transition-all">
                Solicitar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Espaço reservado para o header fixo não cobrir conteúdo */}
      <div className="h-[70px] lg:h-[85px]" />
    </>
  )
}
