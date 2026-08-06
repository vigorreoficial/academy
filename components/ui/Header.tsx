'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './button'
import { Container } from './Container'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  children?: React.ReactNode
  scrolled?: boolean
}

export function Header({ children, scrolled: scrolledProp }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isScrolled = scrolledProp !== undefined ? scrolledProp : scrolled

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container className="h-[76px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D2745] to-[#1E4D7B] rounded-[10px] shadow-lg shadow-[#0D2745]/20" />
            <div className="relative flex flex-col items-center leading-none">
              <span
                className="text-white font-black text-[20px] tracking-tighter"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                V
              </span>
              <span className="w-5 h-[2px] bg-gradient-to-r from-[#9BB8D9] to-white -mt-[2px] rounded-full" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2A7BD8] rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
          <div>
            <div
              className="font-extrabold text-[20px] tracking-tight leading-none text-[#0D2745]"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              Vigorre
            </div>
            <div className="text-[10px] tracking-[0.16em] font-semibold text-[#5B7A9A] uppercase -mt-[2px]">
              Academy™
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-6">{children}</div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden w-10 h-10 rounded-full bg-white border border-slate-200 grid place-items-center"
        >
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-6 space-y-4">
          {children}
        </div>
      )}
    </header>
  )
}
