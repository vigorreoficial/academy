'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Course = {
  id: number
  title: string
  category: string
  duration: string
  level: string
  price: number
  originalPrice?: number
  students: string
  rating: number
  image: string
  badge?: string
}

const courses: Course[] = [
  {
    id: 1,
    title: "Liderança Estratégica 360°",
    category: "Liderança",
    duration: "18h",
    level: "Avançado",
    price: 0,
    originalPrice: 0,
    students: "4.2k",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    badge: "Mais vendido"
  },
  {
    id: 2,
    title: "Gestão por Competências",
    category: "Gestão",
    duration: "12h",
    level: "Intermediário",
    price: 0,
    students: "3.8k",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    id: 3,
    title: "NRs e Segurança do Trabalho",
    category: "Operacional",
    duration: "24h",
    level: "Essencial",
    price: 0,
    originalPrice: 0,
    students: "6.1k",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    badge: "Certificado MEC"
  },
  {
    id: 4,
    title: "Analytics & Data Driven HR",
    category: "Tecnologia",
    duration: "10h",
    level: "Intermediário",
    price: 0,
    students: "2.9k",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    id: 5,
    title: "ISO 9001 - Gestão da Qualidade",
    category: "Qualidade",
    duration: "16h",
    level: "Avançado",
    price: 0,
    students: "1.8k",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    id: 6,
    title: "Negociação e Gestão de Conflitos",
    category: "Liderança",
    duration: "8h",
    level: "Iniciante",
    price: 0,
    originalPrice: 0,
    students: "5.4k",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1521791136064-7986c86c6438?w=600&q=80",
  },
]

const categories = ["Todos", "Liderança", "Gestão", "Tecnologia", "Operacional", "Qualidade"]

export default function HomePage() {
  const [audience, setAudience] = useState<'b2b' | 'b2c'>('b2b')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeCat, setActiveCat] = useState("Todos")
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [cart, setCart] = useState<number[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState("")
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const filtered = activeCat === "Todos" ? courses : courses.filter(c => c.category === activeCat)

  const toggleCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter(c => c !== id))
      setToast("Removido do carrinho")
    } else {
      setCart([...cart, id])
      setToast("Adicionado ao carrinho • Acesso imediato")
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenu(false)
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0D2745] selection:bg-[#1E4D7B] selection:text-white" style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');`}</style>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0D2745] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          {toast}
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D2745] to-[#1E4D7B] rounded-[10px] shadow-lg shadow-[#0D2745]/20" />
                <div className="relative flex flex-col items-center leading-none">
                  <span className="text-white font-black text-[20px] tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans' }}>V</span>
                  <span className="w-5 h-[2px] bg-gradient-to-r from-[#9BB8D9] to-white -mt-[2px] rounded-full" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2A7BD8] rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-[20px] tracking-tight leading-none" style={{ fontFamily: 'Plus Jakarta Sans', color: '#0D2745' }}>Vigorre</div>
                <div className="text-[10px] tracking-[0.16em] font-semibold text-[#5B7A9A] uppercase -mt-[2px]">Academy™</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { label: 'Soluções', id: 'solucoes' },
                { label: 'Catálogo', id: 'catalogo' },
                { label: 'Preços', id: 'precos' },
                { label: 'White-Label', id: 'whitelabel' },
              ].map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="px-4 py-2 text-sm font-medium text-[#364F6B] hover:text-[#0D2745] hover:bg-slate-100 rounded-full transition">
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-full">
              <button onClick={() => setAudience('b2b')} className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${audience === 'b2b' ? 'bg-[#0D2745] text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}>PARA EMPRESAS</button>
              <button onClick={() => setAudience('b2c')} className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${audience === 'b2c' ? 'bg-[#2A7BD8] text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}>PARA VOCÊ</button>
            </div>
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <Link href="/login">
              <button className="text-sm font-semibold text-[#0D2745] px-4">Entrar</button>
            </Link>
            <Link href="/signup">
              <button className="bg-[#0D2745] hover:bg-[#14365E] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-[#0D2745]/20 transition flex items-center gap-2">
                {audience === 'b2b' ? 'Solicitar Demo' : 'Começar grátis'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </Link>
            {cart.length > 0 && (
              <button onClick={() => setShowCheckout(true)} className="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D2745" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-13z" /><path d="M6 6L5 2H2" /><circle cx="9" cy="20" r="1.8" /><circle cx="18" cy="20" r="1.8" /></svg>
                <span className="absolute -top-1 -right-1 bg-[#2A7BD8] text-white text-[11px] font-bold w-5 h-5 rounded-full grid place-items-center">{cart.length}</span>
              </button>
            )}
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden w-10 h-10 rounded-full bg-white border border-slate-200 grid place-items-center">
            <div className="space-y-1.5">
              <div className={`w-5 h-0.5 bg-[#0D2745] transition ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-[#0D2745] transition ${mobileMenu ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-[#0D2745] transition ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-6 space-y-4">
            <div className="flex p-1 bg-slate-100 rounded-full w-fit">
              <button onClick={() => setAudience('b2b')} className={`px-4 py-2 rounded-full text-xs font-bold ${audience === 'b2b' ? 'bg-[#0D2745] text-white' : 'text-slate-600'}`}>PARA EMPRESAS</button>
              <button onClick={() => setAudience('b2c')} className={`px-4 py-2 rounded-full text-xs font-bold ${audience === 'b2c' ? 'bg-[#2A7BD8] text-white' : 'text-slate-600'}`}>PARA VOCÊ</button>
            </div>
            <div className="grid gap-2">
              <button onClick={() => scrollTo('solucoes')} className="text-left py-2 font-medium">Soluções</button>
              <button onClick={() => scrollTo('catalogo')} className="text-left py-2 font-medium">Catálogo</button>
              <button onClick={() => scrollTo('precos')} className="text-left py-2 font-medium">Preços</button>
            </div>
            <Link href="/signup">
              <button className="w-full bg-[#0D2745] text-white font-bold py-3 rounded-full">Começar agora</button>
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-[76px] overflow-hidden">
        <div className="absolute inset-0 bg-[#F6F8FB]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #0D2745 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
          <div className="absolute -top-32 -right-32 w-[900px] h-[900px] bg-gradient-to-br from-[#2A7BD8]/10 via-[#0D2745]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#A8B3C1]/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-4 pt-8 lg:pt-14 pb-10 items-center">

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm">
                <span className="bg-[#0D2745] text-white text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full">NOVO</span>
                <span className="text-sm font-medium text-slate-700">Ecossistema B2B + B2C em uma única plataforma</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[36px] sm:text-[44px] lg:text-[56px] font-extrabold leading-[0.92] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  <span className="text-[#0D2745]">Transforme</span>{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#1E4D7B] to-[#2A7BD8] bg-clip-text text-transparent">conhecimento</span>
                    <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#2A7BD8]/15 -rotate-1" />
                  </span>
                  <br />
                  <span className="text-[#0D2745]">em performance</span>
                  <br />
                  <span className="text-[#5B7A9A] font-light">estratégica.</span>
                </h1>
                <p className="text-[17px] leading-7 text-[#4A6582] max-w-[560px]">
                  A <strong className="text-[#0D2745]">Vigorre Academy</strong> capacita empresas e profissionais com trilhas inteligentes, certificações reconhecidas e <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-full text-sm font-semibold text-[#0D2745]">Vigorre Analytics™</span> — a inteligência que mede o ROI do aprendizado.
                </p>
              </div>

              <div className="bg-white rounded-[20px] p-2 shadow-xl shadow-slate-200/50 border border-slate-200 flex gap-2 max-w-[520px]">
                <button onClick={() => setAudience('b2b')} className={`flex-1 rounded-2xl p-[18px] text-left transition border ${audience === 'b2b' ? 'bg-[#0D2745] border-[#0D2745] text-white shadow-lg' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold tracking-widest ${audience === 'b2b' ? 'text-[#9BB8D9]' : 'text-[#2A7BD8]'}`}>PARA EMPRESAS • B2B</span>
                    <span className={`w-6 h-6 rounded-full grid place-items-center ${audience === 'b2b' ? 'bg-white/15' : 'bg-white border'}`}>
                      <span className={`w-2 h-2 rounded-full ${audience === 'b2b' ? 'bg-white' : 'bg-[#2A7BD8]'}`} />
                    </span>
                  </div>
                  <div className={`text-[15px] font-bold leading-tight ${audience === 'b2b' ? 'text-white' : 'text-[#0D2745]'}`}>Academy corporativa + White Label</div>
                  <div className={`text-sm ${audience === 'b2b' ? 'text-white/70' : 'text-slate-500'}`}>Acesso gratuito para empresas</div>
                </button>

                <button onClick={() => setAudience('b2c')} className={`flex-1 rounded-2xl p-[18px] text-left transition border ${audience === 'b2c' ? 'bg-[#2A7BD8] border-[#2A7BD8] text-white shadow-lg' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold tracking-widest ${audience === 'b2c' ? 'text-white/70' : 'text-slate-500'}`}>PARA VOCÊ • B2C</span>
                    <span className={`w-6 h-6 rounded-full grid place-items-center ${audience === 'b2c' ? 'bg-white/15' : 'bg-white border'}`}>
                      <span className={`w-2 h-2 rounded-full ${audience === 'b2c' ? 'bg-white' : 'bg-slate-300'}`} />
                    </span>
                  </div>
                  <div className={`text-[15px] font-bold leading-tight ${audience === 'b2c' ? 'text-white' : 'text-[#0D2745]'}`}>Cursos avulsos & trilhas</div>
                  <div className={`text-sm ${audience === 'b2c' ? 'text-white/80' : 'text-slate-500'}`}>100% gratuito</div>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => audience === 'b2b' ? setShowLeadModal(true) : scrollTo('catalogo')} className="bg-[#0D2745] hover:bg-[#14365E] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#0D2745]/20 flex items-center gap-3 transition">
                  {audience === 'b2b' ? 'Agendar demo com especialista' : 'Explorar catálogo completo'}
                  <span className="w-8 h-8 bg-white/15 rounded-full grid place-items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 8h7M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
                <button onClick={() => scrollTo('solucoes')} className="bg-white border border-slate-200 font-semibold px-6 py-4 rounded-full hover:bg-slate-50 transition">Ver como funciona →</button>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <span className="font-medium">+12 mil alunos • 4.9/5</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-100 grid place-items-center text-emerald-600">✓</span> Certificado com validação LinkedIn</span>
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-100 grid place-items-center text-emerald-600">✓</span> Acesso totalmente gratuito</span>
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-100 grid place-items-center text-emerald-600">✓</span> SSO & Integração RH</span>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="relative bg-white rounded-[32px] shadow-[0_32px_80px_-20px_rgba(13,39,69,0.25)] border border-slate-200 overflow-hidden">
                <div className="h-14 bg-gradient-to-r from-[#0D2745] via-[#1E4D7B] to-[#2A7BD8] flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center text-white font-black text-sm">V</div>
                    <div>
                      <div className="text-white font-bold text-sm leading-none">Vigorre Academy</div>
                      <div className="text-white/60 text-[11px]">Portal do Colaborador • Empresa</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs font-medium">Ao vivo</span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-3 gap-3">
                  {[
                    { k: 'Progresso', v: '78%', sub: '+12% vs mês anterior', color: 'from-[#1E4D7B] to-[#2A7BD8]' },
                    { k: 'Certificações', v: '342', sub: '84% conclusão', color: 'from-emerald-500 to-teal-500' },
                    { k: 'ROI Treinamento', v: '3.2x', sub: 'Vigorre Analytics™', color: 'from-amber-500 to-orange-500' },
                  ].map(m => (
                    <div key={m.k} className="bg-[#F6F8FB] rounded-2xl p-3 border border-slate-100">
                      <div className="text-[11px] font-bold tracking-widest text-slate-500">{m.k.toUpperCase()}</div>
                      <div className="text-xl font-black text-[#0D2745] mt-1">{m.v}</div>
                      <div className="text-[11px] text-slate-500">{m.sub}</div>
                      <div className={`mt-2 h-1.5 rounded-full bg-gradient-to-r ${m.color} opacity-80`} />
                    </div>
                  ))}
                </div>

                <div className="px-6">
                  <div className="bg-[#0D2745] rounded-2xl p-4 text-white relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold">Engajamento por trilha</span>
                      <span className="text-xs bg-white/15 px-2 py-1 rounded-full">Últimos 30 dias</span>
                    </div>
                    <div className="flex items-end gap-2 h-20">
                      {[35, 55, 45, 78, 62, 88, 52, 74, 68, 92].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#2A7BD8] to-[#9BB8D9] rounded-t-lg" style={{ height: `${h}%`, opacity: i === 9 ? 1 : 0.6 + i * 0.03 }} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/50 mt-2">
                      <span>Liderança</span><span>Gestão</span><span>Tecnologia</span><span>Qualidade</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#0D2745]">Trilhas ativas</h4>
                    <span className="text-xs font-bold text-[#2A7BD8] bg-[#2A7BD8]/10 px-2 py-1 rounded-full">Ver todas →</span>
                  </div>
                  {[
                    { title: "Liderança Estratégica 360°", progress: 78, people: "342 colaboradores" },
                    { title: "NR-35 Trabalho em Altura", progress: 94, people: "128 colaboradores" },
                    { title: "Analytics para RH", progress: 45, people: "89 colaboradores" },
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0D2745] to-[#2A7BD8] grid place-items-center text-white">▶</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.people}</div>
                        <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2A7BD8] rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#0D2745]">{item.progress}%</div>
                    </div>
                  ))}
                </div>

                <div className="absolute -left-4 top-28 hidden xl:flex bg-white border border-slate-200 rounded-2xl p-3 shadow-xl items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 grid place-items-center text-white">✓</div>
                  <div>
                    <div className="text-xs font-bold text-emerald-600">CERTIFICADO EMITIDO</div>
                    <div className="text-sm font-bold">ISO 9001 • validado no LinkedIn</div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-24 hidden xl:flex bg-[#0D2745] text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-2xl font-black">500+</div>
                  <div className="text-xs text-white/70 ml-3 leading-tight">empresas<br />capacitadas</div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none rounded-[32px] overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] bg-gradient-to-br from-white/20 to-transparent rotate-12 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL MODALIDADES */}
      <section id="solucoes" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0D2745] text-white rounded-full px-4 py-1.5 text-xs font-bold tracking-widest">ARQUITETURA INTELIGENTE • B2B + B2C</div>
          <h2 className="text-[32px] lg:text-[44px] font-extrabold leading-[0.95] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Uma única <span className="text-[#2A7BD8]">academia</span>, dois<br />modelos de sucesso
          </h2>
          <p className="text-slate-600 text-lg">Escolha a jornada ideal. Mesma qualidade Vigorre, experiências sob medida para empresas e profissionais.</p>
          <div className="flex justify-center p-1 bg-slate-100 rounded-full w-fit mx-auto mt-6">
            <button onClick={() => setAudience('b2b')} className={`px-8 py-3 rounded-full text-sm font-bold transition ${audience === 'b2b' ? 'bg-[#0D2745] text-white shadow' : 'text-slate-600'}`}>Sou Empresa (B2B)</button>
            <button onClick={() => setAudience('b2c')} className={`px-8 py-3 rounded-full text-sm font-bold transition ${audience === 'b2c' ? 'bg-[#2A7BD8] text-white shadow' : 'text-slate-600'}`}>Sou Pessoa Física (B2C)</button>
          </div>
        </div>

        {audience === 'b2b' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '◈', title: 'Planos Corporativos', desc: 'Acesso ilimitado para todos os colaboradores. De 50 a 5.000 vidas.', price: 'R$ 0/colab./mês', highlight: true },
              { icon: '⬢', title: 'Universidade White Label', desc: 'Sua marca, nossa infraestrutura. Portal com domínio próprio.', price: 'Sob consulta', highlight: false },
              { icon: '⬣', title: 'Programas sob Demanda', desc: 'Trilhas personalizadas: NRs, liderança, gestão de obras.', price: 'Projeto exclusivo', highlight: false },
              { icon: '⬔', title: 'Créditos Corporativos', desc: 'Distribua acessos entre equipes conforme a demanda.', price: 'Sob consulta', highlight: false },
            ].map(card => (
              <div key={card.title} className={`rounded-[24px] p-6 border-2 flex flex-col ${card.highlight ? 'bg-[#0D2745] text-white border-[#0D2745] shadow-xl shadow-[#0D2745]/20' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'}`}>
                <div className={`w-12 h-12 rounded-2xl grid place-items-center text-xl mb-4 ${card.highlight ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#0D2745]'}`}>{card.icon}</div>
                <h3 className={`font-bold text-lg leading-tight ${card.highlight ? 'text-white' : 'text-[#0D2745]'}`}>{card.title}</h3>
                <p className={`text-sm mt-2 flex-1 ${card.highlight ? 'text-white/70' : 'text-slate-500'}`}>{card.desc}</p>
                <div className={`mt-6 pt-4 border-t ${card.highlight ? 'border-white/15' : 'border-slate-100'}`}>
                  <div className={`text-xs font-bold tracking-widest ${card.highlight ? 'text-[#9BB8D9]' : 'text-slate-400'}`}>INVESTIMENTO</div>
                  <div className={`font-bold ${card.highlight ? 'text-white' : 'text-[#0D2745]'}`}>{card.price}</div>
                </div>
                <button onClick={() => setShowLeadModal(true)} className={`mt-4 w-full py-3 rounded-full font-bold text-sm ${card.highlight ? 'bg-white text-[#0D2745] hover:bg-slate-100' : 'bg-[#0D2745] text-white hover:bg-[#14365E]'}`}>Saber mais →</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '▶', title: 'Curso Avulso', desc: 'Escolha e comece agora. Acesso imediato gratuito.', price: 'Grátis', cta: 'Ver cursos' },
              { icon: '◆', title: 'Trilhas Completas', desc: '6 a 8 cursos com certificado master.', price: 'Grátis', cta: 'Explorar trilhas' },
              { icon: '✦', title: 'Certificação Avulsa', desc: 'Já domina o tema? Faça só a prova e garanta seu certificado.', price: 'Grátis', cta: 'Ver provas' },
              { icon: '⬣', title: 'Acesso Total', desc: 'Acesso ilimitado ao catálogo inteiro. Para sempre.', price: 'Grátis', cta: 'Acessar agora' },
            ].map(card => (
              <div key={card.title} className="rounded-[24px] p-6 bg-white border border-slate-200 hover:border-[#2A7BD8]/30 hover:shadow-xl transition flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-[#2A7BD8]/10 text-[#2A7BD8] grid place-items-center font-bold mb-4">{card.icon}</div>
                <h3 className="font-bold text-lg text-[#0D2745]">{card.title}</h3>
                <p className="text-sm text-slate-500 mt-2 flex-1">{card.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold tracking-widest text-slate-400">INVESTIMENTO</div>
                  <div className="font-bold text-[#2A7BD8]">{card.price}</div>
                </div>
                <button onClick={() => scrollTo('catalogo')} className="mt-4 w-full py-3 rounded-full font-bold text-sm bg-white border border-slate-200 hover:bg-slate-50 text-[#0D2745]">{card.cta} →</button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 bg-gradient-to-br from-[#0D2745] to-[#1E4D7B] rounded-[28px] p-8 lg:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-center relative">
            <div>
              <div className="text-[#9BB8D9] text-xs font-bold tracking-[0.18em]">COMO FUNCIONA</div>
              <h3 className="text-3xl font-extrabold leading-tight mt-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Fluxo {audience === 'b2b' ? 'corporativo' : 'individual'} em <br />{audience === 'b2b' ? '5 passos' : '4 cliques'}
              </h3>
              <p className="text-white/70 mt-3">{audience === 'b2b' ? 'Do contrato ao relatório de ROI sem fricção. Integração com seu RH em até 48h.' : 'Cadastro com CPF e acesso liberado na hora. Certificado digital com QR Code.'}</p>
              <button onClick={() => setShowLeadModal(true)} className="mt-6 bg-white text-[#0D2745] font-bold px-6 py-3 rounded-full">
                {audience === 'b2b' ? 'Falar com consultor →' : 'Criar minha conta gratuita →'}
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 lg:gap-3 relative">
              {(audience === 'b2b' ? [
                { n: '01', t: 'Escolha o plano', d: 'Corporativo ou créditos' },
                { n: '02', t: 'Assine', d: 'Contrato digital' },
                { n: '03', t: 'Onboard', d: 'SSO + importação' },
                { n: '04', t: 'Aprendizado', d: 'Portal colaborador' },
                { n: '05', t: 'Analytics', d: 'ROI em dashboard' },
              ] : [
                { n: '01', t: 'Explore', d: 'Catálogo + filtros' },
                { n: '02', t: 'Cadastre-se', d: 'Em menos de 1 minuto' },
                { n: '03', t: 'Estude', d: 'Acesso imediato' },
                { n: '04', t: 'Certifique', d: 'LinkedIn 1-clique' },
                { n: '05', t: 'Evolua', d: 'Recomendações IA' },
              ]).map((s, idx, arr) => (
                <div key={s.n} className="relative text-center">
                  <div className="w-full aspect-square max-w-[110px] mx-auto bg-white/10 backdrop-blur border border-white/15 rounded-2xl grid place-items-center">
                    <div>
                      <div className="text-[#9BB8D9] font-black text-xs">{s.n}</div>
                      <div className="text-white font-bold text-sm lg:text-[15px] leading-tight mt-1">{s.t}</div>
                      <div className="text-white/60 text-xs hidden lg:block">{s.d}</div>
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="bg-white border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 text-xs font-bold tracking-widest text-slate-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> CATÁLOGO VIGORRE • 200+ CURSOS
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Trilhas que o mercado <span className="text-[#2A7BD8]">reconhece</span></h2>
              <p className="text-slate-500 mt-2 max-w-xl">Conteúdo validado por especialistas, com certificação digital e integração LinkedIn. Filtre por setor, duração ou nível.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input placeholder="Buscar curso, ex: NR-12" className="pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm w-[260px] focus:outline-none focus:border-[#2A7BD8] focus:bg-white" />
                <svg className="absolute left-3.5 top-3.5 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20L16 16" /></svg>
              </div>
              <button onClick={() => setShowCheckout(true)} className="hidden lg:flex items-center gap-2 border border-slate-200 rounded-full px-5 py-3 text-sm font-bold hover:bg-slate-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D2745" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-13z" /><path d="M6 6L5 2H2" /></svg>
                Carrinho {cart.length > 0 && `• ${cart.length}`}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition ${activeCat === cat ? 'bg-[#0D2745] text-white border-[#0D2745] shadow' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#0D2745]'}`}>
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500 self-center hidden sm:block">{filtered.length} cursos encontrados • 100% gratuitos</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course.id} className="group bg-white rounded-[24px] border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2745]/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 backdrop-blur text-[#0D2745] text-xs font-bold px-2.5 py-1 rounded-full">{course.category}</span>
                    {course.badge && <span className="bg-[#2A7BD8] text-white text-xs font-bold px-2.5 py-1 rounded-full">{course.badge}</span>}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5 text-xs font-medium bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      {course.duration} • {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold">★ {course.rating} • {course.students}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg leading-tight text-[#0D2745] line-clamp-2 group-hover:text-[#1E4D7B] transition">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                    <span className="w-7 h-7 rounded-full bg-slate-100 grid place-items-center text-xs">👨‍🏫</span>
                    <span>Instrutor Vigorre • Especialista no setor</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#0D2745]">Grátis</span>
                      </div>
                      <div className="text-xs text-slate-500">Acesso imediato + Certificado incluso</div>
                    </div>
                    {audience === 'b2c' ? (
                      <button
                        onClick={() => toggleCart(course.id)}
                        className={`px-5 py-2.5 rounded-full font-bold text-sm transition flex items-center gap-2 ${cart.includes(course.id) ? 'bg-emerald-500 text-white' : 'bg-[#0D2745] text-white hover:bg-[#14365E]'}`}
                      >
                        {cart.includes(course.id) ? '✓ Adicionado' : 'Acessar'}
                      </button>
                    ) : (
                      <button onClick={() => setShowLeadModal(true)} className="px-5 py-2.5 rounded-full font-bold text-sm bg-white border border-slate-200 hover:bg-slate-50 text-[#0D2745]">
                        Incluir no plano
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setToast("Catálogo completo em breve • 200+ cursos")} className="px-8 py-3 rounded-full bg-white border border-slate-200 font-bold hover:bg-slate-50">Ver catálogo completo (200+ cursos) →</button>
            <span className="text-sm text-slate-500">Empresas: curadoria sob medida + integração com PDI</span>
          </div>
        </div>
      </section>

      {/* WHITE LABEL */}
      <section id="whitelabel" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2A7BD8]/10 text-[#2A7BD8] rounded-full px-3 py-1 text-xs font-bold tracking-widest">WHITE LABEL • UNIVERSIDADE CORPORATIVA</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-3 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Sua universidade,<br />
              <span className="bg-gradient-to-r from-[#0D2745] to-[#2A7BD8] bg-clip-text text-transparent">nossa inteligência.</span>
            </h2>
            <p className="text-slate-600 mt-4 text-lg">Lançamos em 15 dias sua academia com seu domínio, cores e cursos próprios + catálogo Vigorre. O melhor dos dois mundos.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Domínio próprio (universidade.suaempresa.com.br)",
                "Cursos Vigorre + seus conteúdos internos",
                "SSO com Active Directory / Google Workspace",
                "Relatórios por filial, cargo e líder direto"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center text-xs">✓</span>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowLeadModal(true)} className="bg-[#0D2745] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#14365E] transition">Agendar visita técnica →</button>
              <button onClick={() => setToast("Case em PDF enviado para seu e-mail")} className="bg-white border border-slate-200 font-bold px-6 py-3.5 rounded-full hover:bg-slate-50">Ver cases de sucesso</button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Setup em 15 dias</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Sem fidelidade</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-[20px] border border-slate-200 shadow-2xl overflow-hidden">
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center gap-2 px-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="ml-4 flex-1 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" /> universidade.vigorre.com.br
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0D2745] via-[#1E4D7B] to-[#2A7BD8] p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white/60 text-xs font-bold tracking-widest">UNIVERSIDADE CORPORATIVA</div>
                    <div className="text-2xl font-black mt-1">Vigorre Academy</div>
                    <div className="text-white/70 text-sm">powered by Vigorre • 2.347 colaboradores ativos</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl grid place-items-center text-[#0D2745] font-black">V</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { l: 'Engajamento', v: '94%' },
                    { l: 'Conclusão', v: '87%' },
                    { l: 'NPS', v: '82' },
                  ].map(s => (
                    <div key={s.l} className="bg-white/10 backdrop-blur rounded-2xl p-3 text-center border border-white/10">
                      <div className="text-2xl font-black">{s.v}</div>
                      <div className="text-xs text-white/70">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 gap-3 bg-slate-50">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-3 border border-slate-200">
                    <div className="w-full h-20 bg-slate-100 rounded-xl mb-3 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${['1553877522-43269d4ea984', '1552664730-d307ca884978', '1581091226825-a6a2a5aee158'][i - 1]}?w=300&q=80`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                    <div className="h-2 bg-slate-100 rounded-full w-1/2 mt-2" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0D2745] grid place-items-center text-white">↗</div>
              <div>
                <div className="font-bold text-[#0D2745]">Vigorre Analytics™</div>
                <div className="text-xs text-slate-500">Correlação treinamento x performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precos" className="bg-[#0D2745] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#2A7BD8]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-widest">ACESSO 100% GRATUITO • SEM SURPRESAS</div>
            <h2 className="text-3xl lg:text-[42px] font-extrabold text-white leading-tight mt-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Invista <span className="text-[#7FB1E6]">gratuitamente</span> em <br />conhecimento
            </h2>
          </div>

          {audience === 'b2b' ? (
            <div className="grid lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {[
                { name: 'Essential', desc: 'Para equipes de até 100 pessoas', features: ['Catálogo essencial (80 cursos)', 'Relatórios básicos', 'Suporte por e-mail', 'Certificados digitais'], cta: 'Começar agora', dark: false },
                { name: 'Pro', desc: 'Mais escolhido • 100 a 500 vidas', features: ['Catálogo completo (200+ cursos)', 'Vigorre Analytics™', 'SSO + Integração RH', 'Trilhas personalizadas', 'Sucesso do cliente dedicado'], cta: 'Solicitar proposta', dark: true, badge: 'MAIS POPULAR' },
                { name: 'Enterprise White Label', desc: 'Universidade própria', features: ['Tudo do Pro +', 'Domínio e marca própria', 'Cursos internos ilimitados', 'API completa + onboarding', 'SLA 99.9%'], cta: 'Falar com especialista', dark: false },
              ].map(plan => (
                <div key={plan.name} className={`relative rounded-[28px] p-8 border-2 flex flex-col ${plan.dark ? 'bg-white border-white shadow-2xl scale-[1.03] lg:scale-105' : 'bg-white/5 backdrop-blur border-white/15 text-white'}`}>
                  {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2A7BD8] text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <h3 className={`font-extrabold text-xl ${plan.dark ? 'text-[#0D2745]' : 'text-white'}`}>{plan.name}</h3>
                  <p className={`text-sm mt-1 ${plan.dark ? 'text-slate-500' : 'text-white/60'}`}>{plan.desc}</p>
                  <div className="mt-6">
                    <div className={`text-4xl font-black ${plan.dark ? 'text-[#0D2745]' : 'text-white'}`}>Grátis</div>
                    <div className={`text-xs mt-1 ${plan.dark ? 'text-slate-400' : 'text-white/50'}`}>Acesso corporativo sem custo</div>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className={`w-5 h-5 rounded-full grid place-items-center text-xs flex-shrink-0 ${plan.dark ? 'bg-emerald-100 text-emerald-600' : 'bg-white/15 text-white'}`}>✓</span>
                        <span className={plan.dark ? 'text-slate-700' : 'text-white/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowLeadModal(true)} className={`mt-8 w-full py-3.5 rounded-full font-bold ${plan.dark ? 'bg-[#0D2745] text-white hover:bg-[#14365E]' : 'bg-white text-[#0D2745] hover:bg-slate-100'}`}>
                    {plan.cta} →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {[
                { name: 'Avulso', desc: 'Acesso a cursos individuais', features: ['1 curso à sua escolha', 'Acesso por 12 meses', 'Certificado + LinkedIn', 'Suporte ao aluno'], cta: 'Começar agora' },
                { name: 'Trilha Completa', desc: 'Melhor custo-benefício', features: ['6 cursos + projeto final', 'Mentoria ao vivo mensal', 'Certificado Master', 'Acesso vitalício ao conteúdo'], cta: 'Acessar trilha', badge: 'RECOMENDADO', dark: true },
                { name: 'Acesso Total', desc: 'Plataforma completa', features: ['200+ cursos liberados', 'Lançamentos incluso', 'Certificações ilimitadas', 'Cancele quando quiser'], cta: 'Liberar acesso' },
              ].map(plan => (
                <div key={plan.name} className={`relative rounded-[28px] p-8 border-2 flex flex-col ${plan.dark ? 'bg-white border-white shadow-2xl scale-[1.02]' : 'bg-white/5 backdrop-blur border-white/15 text-white'}`}>
                  {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <h3 className={`font-extrabold text-xl ${plan.dark ? 'text-[#0D2745]' : 'text-white'}`}>{plan.name}</h3>
                  <p className={`text-sm mt-1 ${plan.dark ? 'text-slate-500' : 'text-white/60'}`}>{plan.desc}</p>
                  <div className="mt-6">
                    <div className={`text-4xl font-black ${plan.dark ? 'text-[#0D2745]' : 'text-white'}`}>Grátis</div>
                    <div className={`text-xs mt-1 ${plan.dark ? 'text-slate-400' : 'text-white/50'}`}>Acesso imediato, sem cartão</div>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className={`w-5 h-5 rounded-full grid place-items-center text-xs flex-shrink-0 ${plan.dark ? 'bg-emerald-100 text-emerald-600' : 'bg-white/15 text-white'}`}>✓</span>
                        <span className={plan.dark ? 'text-slate-700' : 'text-white/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowCheckout(true)} className={`mt-8 w-full py-3.5 rounded-full font-bold ${plan.dark ? 'bg-[#0D2745] text-white' : 'bg-white text-[#0D2745]'}`}>
                    {plan.cta} →
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center text-white/60 text-sm">
            ✓ Acesso ilimitado • Certificado reconhecido • Suporte humano em até 2h
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-0">
            <div className="p-8 lg:p-10 bg-[#F6F8FB] border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="text-2xl font-extrabold text-[#0D2745]" style={{ fontFamily: 'Plus Jakarta Sans' }}>B2B vs. B2C:<br />experiências distintas,<br />mesma excelência</h3>
              <p className="text-slate-600 mt-3">A plataforma adapta fluxos e acompanhamento para cada perfil — sem comprometer a qualidade.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setAudience('b2b')} className={`px-4 py-2 rounded-full text-sm font-bold ${audience === 'b2b' ? 'bg-[#0D2745] text-white' : 'bg-white border border-slate-200'}`}>Ver B2B</button>
                <button onClick={() => setAudience('b2c')} className={`px-4 py-2 rounded-full text-sm font-bold ${audience === 'b2c' ? 'bg-[#2A7BD8] text-white' : 'bg-white border border-slate-200'}`}>Ver B2C</button>
              </div>
            </div>

            {[
              {
                title: 'Empresa',
                subtitle: 'PORTAL DO COLABORADOR',
                color: '#0D2745',
                rows: ['SSO + integração Vigorre', 'Cursos definidos pelo RH', 'Gestão centralizada pelo RH', 'Dashboard por equipe e filial', 'PDI + IA preditiva']
              },
              {
                title: 'Pessoa Física',
                subtitle: 'PORTAL DO ALUNO',
                color: '#2A7BD8',
                rows: ['Login com CPF e e-mail', 'Catálogo livre completo', 'Cadastro simples e imediato', 'Progresso individual + ranking', 'Recomendações personalizadas']
              }
            ].map(col => (
              <div key={col.title} className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200 last:border-0">
                <div className="text-xs font-bold tracking-widest" style={{ color: col.color }}>{col.subtitle}</div>
                <div className="text-xl font-black text-[#0D2745] mt-1">{col.title}</div>
                <ul className="mt-6 space-y-3">
                  {[
                    { label: 'Acesso', val: col.rows[0] },
                    { label: 'Catálogo', val: col.rows[1] },
                    { label: 'Gestão', val: col.rows[2] },
                    { label: 'Acompanhamento', val: col.rows[3] },
                    { label: 'Inteligência', val: col.rows[4] },
                  ].map(r => (
                    <li key={r.label} className="flex justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
                      <span className="text-xs font-bold tracking-widest text-slate-400">{r.label.toUpperCase()}</span>
                      <span className="text-sm font-medium text-slate-700 text-right">{r.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-[#2A7BD8] text-xs font-bold tracking-[0.18em]">QUEM VIVE, RECOMENDA</div>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Resultados que viram cultura</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#0D2745]">4.9</span>
              <span className="text-amber-400">★★★★★</span>
              <span className="text-sm text-slate-500">• 2.847 avaliações verificadas</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Renata Amaral', role: 'Diretora de RH • Indústria Nacional', text: '“Reduzimos 42% o tempo de onboarding e aumentamos a retenção em 28%. O Analytics™ mostrou exatamente onde investir.”', avatar: 5 },
              { name: 'Marcos Lima', role: 'Gerente de Operações • Siderúrgica Brasileira', text: '“A White Label nos deu autonomia. Em 3 semanas estávamos com nossa Universidade no ar, com nossa cara.”', avatar: 8 },
              { name: 'Juliana Costa', role: 'Aluna • Trilha de Liderança', text: '“Acessei o curso e em 2 minutos já estava estudando. Certificado no LinkedIn rendeu 3 entrevistas.”', avatar: 9 },
            ].map(t => (
              <div key={t.name} className="bg-[#F6F8FB] rounded-[24px] p-6 border border-slate-200">
                <div className="flex gap-1 text-amber-400 text-sm">★★★★★</div>
                <p className="mt-4 text-slate-700 leading-relaxed">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?img=${t.avatar}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-sm text-[#0D2745]">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[960px] mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>Perguntas frequentes</h2>
          <p className="text-slate-500 mt-2">Tudo que você precisa para decidir com segurança.</p>
        </div>

        <div className="space-y-3">
          {[
            { q: "Posso acessar um único curso sendo pessoa física?", a: "Sim! É o nosso modelo B2C. Você escolhe qualquer curso do catálogo, faz um cadastro rápido e tem acesso imediato por 12 meses, com certificado digital válido e compartilhável no LinkedIn." },
            { q: "Como funciona o White Label para empresas?", a: "Criamos sua universidade corporativa com seu domínio, identidade visual e cursos próprios + todo catálogo Vigorre. SSO, importação de colaboradores e relatórios por filial. Setup médio de 15 dias e suporte dedicado." },
            { q: "Qual a diferença entre créditos e assinatura corporativa?", a: "Assinatura libera acesso ilimitado para todos os colaboradores. Créditos são pacotes (ex: 100 créditos) que o RH distribui conforme a demanda — ideal para equipes sazonais ou projetos específicos." },
            { q: "Os certificados são reconhecidos?", a: "Sim. Todos os cursos têm certificação com QR Code e validação online. Você pode compartilhar com 1 clique no LinkedIn e validar autenticidade em nosso portal." },
            { q: "Consigo integrar com meu sistema de RH?", a: "Sim. Temos integração nativa com principais HRIS, Active Directory, Google Workspace e API aberta. Também geramos PDI automático e cruzamos dados com o Vigorre Analytics™." },
          ].map((faq, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden transition ${openFaq === i ? 'bg-white border-[#0D2745] shadow' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-bold text-[#0D2745] pr-6">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full grid place-items-center border flex-shrink-0 transition ${openFaq === i ? 'bg-[#0D2745] text-white border-[#0D2745] rotate-45' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-slate-600 leading-relaxed -mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-12">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#0D2745] via-[#14365E] to-[#1E4D7B] p-8 lg:p-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[700px] h-[700px] bg-[#2A7BD8] rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
          </div>

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-bold tracking-widest">COMECE HOJE • SEM RISCO</div>
              <h2 className="text-3xl lg:text-[42px] font-extrabold leading-[0.95] tracking-tight mt-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Pronto para <br />
                <span className="text-[#7FB1E6]">acelerar</span> sua<br />
                estratégia?
              </h2>
              <p className="text-white/70 mt-4 text-lg max-w-xl">
                {audience === 'b2b' ? 'Agende uma demo de 20 minutos e receba um diagnóstico gratuito de maturidade de capacitação da sua equipe.' : 'Crie sua conta gratuita, ganhe acesso imediato e faça seu primeiro curso sem pagar nada.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup">
                  <button className="bg-white text-[#0D2745] font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition flex items-center gap-2">
                    {audience === 'b2b' ? 'Quero minha demo gratuita' : 'Criar conta gratuita'} →
                  </button>
                </Link>
                <button onClick={() => scrollTo('catalogo')} className="bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/15 transition">
                  Explorar catálogo
                </button>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-white/60">
                <span>✓ Sem cartão de crédito</span>
                <span>✓ Setup B2B em 48h</span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-2xl">
              <h3 className="font-extrabold text-[#0D2745] text-lg">{audience === 'b2b' ? 'Solicitar proposta personalizada' : 'Receba acesso grátis'}</h3>
              <p className="text-sm text-slate-500 mt-1">{audience === 'b2b' ? 'Resposta em até 2 horas úteis. Sem spam.' : 'Acesso completo ao catálogo essencial.'}</p>

              <div className="mt-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Nome completo" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A7BD8] focus:bg-white" />
                  <input placeholder="Empresa" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A7BD8] focus:bg-white" />
                </div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail corporativo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A7BD8] focus:bg-white" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Telefone / WhatsApp" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A7BD8] focus:bg-white" />
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2A7BD8] focus:bg-white">
                    <option>50-100 colaboradores</option>
                    <option>100-500 colaboradores</option>
                    <option>500+ colaboradores</option>
                    <option>Sou pessoa física</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!email.includes('@')) { setToast("Informe um e-mail válido"); return }
                    setToast(audience === 'b2b' ? "Proposta enviada! Consultor entrará em contato em até 2h" : "Conta criada! Verifique seu e-mail com acesso grátis")
                    setEmail("")
                  }}
                  className="w-full bg-[#0D2745] hover:bg-[#14365E] text-white font-bold py-3.5 rounded-full transition"
                >
                  {audience === 'b2b' ? 'Receber proposta em 2h →' : 'Liberar meu acesso grátis →'}
                </button>
                <div className="text-[11px] text-center text-slate-400">Ao continuar você concorda com nossos Termos e Política de Privacidade. LGPD compliant.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0D2745] grid place-items-center text-white font-black">V</div>
                <div>
                  <div className="font-extrabold text-[#0D2745] leading-none" style={{ fontFamily: 'Plus Jakarta Sans' }}>Vigorre Academy</div>
                  <div className="text-xs tracking-widest font-semibold text-slate-400">INTELIGÊNCIA E GESTÃO ESTRATÉGICA</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">A academia inteligente que conecta aprendizado, performance e resultado. B2B e B2C em uma plataforma única, com Vigorre Analytics™.</p>
              <div className="mt-4 flex gap-2">
                {['in', 'ig', 'yt', 'li'].map(s => (
                  <a key={s} href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-xs font-bold text-slate-600">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-bold text-sm text-[#0D2745]">Soluções B2B</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-[#0D2745]">Planos Corporativos</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">White Label</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">Créditos Flexíveis</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">Vigorre Analytics™</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm text-[#0D2745]">Para Você</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-[#0D2745]">Cursos Avulsos</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">Trilhas Completas</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">Certificações</a></li>
                <li><a href="#" className="hover:text-[#0D2745]">Acesso Ilimitado</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm text-[#0D2745]">Contato</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>contato@vigorreacademy.com.br</li>
                <li>+55 11 4000-2000</li>
                <li>Av. Paulista, 1000 • São Paulo - SP</li>
                <li className="pt-2"><span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">● Atendimento 24/7 para empresas</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col lg:flex-row justify-between gap-4 text-sm text-slate-500">
            <span>© 2026 Vigorre Academy. Todos os direitos reservados. CNPJ 00.000.000/0001-00</span>
            <span className="flex gap-6"><a href="#" className="hover:text-[#0D2745]">Privacidade</a><a href="#" className="hover:text-[#0D2745]">Termos</a><a href="#" className="hover:text-[#0D2745]">LGPD</a></span>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-[#0D2745]/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-white rounded-[28px] max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center">
              <h3 className="font-black text-xl text-[#0D2745]">Seus cursos</h3>
              <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center">✕</button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-100 rounded-full grid place-items-center mx-auto text-2xl">📚</div>
                  <div className="font-bold mt-4">Nenhum curso selecionado</div>
                  <div className="text-sm text-slate-500 mt-1">Explore nosso catálogo e adicione cursos para começar.</div>
                  <button onClick={() => setShowCheckout(false)} className="mt-6 bg-[#0D2745] text-white font-bold px-6 py-3 rounded-full">Explorar cursos</button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {courses.filter(c => cart.includes(c.id)).map(c => (
                      <div key={c.id} className="flex gap-3 p-3 border border-slate-200 rounded-2xl">
                        <img src={c.image} alt={c.title} className="w-20 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-sm leading-tight">{c.title}</div>
                          <div className="text-xs text-slate-500">{c.category} • {c.duration}</div>
                          <div className="font-black text-emerald-600 text-sm mt-1">Grátis</div>
                        </div>
                        <button onClick={() => toggleCart(c.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 rounded-full self-start py-1">Remover</button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-[#F6F8FB] rounded-2xl p-4 border border-slate-200">
                    <div className="flex justify-between font-black text-lg"><span>Total</span><span className="text-emerald-600">Grátis</span></div>
                    <div className="text-xs text-slate-500 mt-1">Acesso imediato liberado após cadastro</div>
                  </div>

                  <Link href="/signup">
                    <button
                      onClick={() => {
                        setCart([])
                        setShowCheckout(false)
                      }}
                      className="w-full mt-6 bg-[#0D2745] hover:bg-[#14365E] text-white font-bold py-4 rounded-full"
                    >
                      Criar conta gratuita → Acesso imediato
                    </button>
                  </Link>
                  <div className="text-xs text-center text-slate-400 mt-3">Cadastro 100% gratuito • Certificado digital + LinkedIn</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-[#0D2745]/60 backdrop-blur-sm" onClick={() => setShowLeadModal(false)} />
          <div className="relative bg-white rounded-[28px] max-w-md w-full p-8 shadow-2xl">
            <button onClick={() => setShowLeadModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 grid place-items-center">✕</button>
            <div className="w-12 h-12 rounded-2xl bg-[#0D2745] grid place-items-center text-white font-black">V</div>
            <h3 className="font-black text-2xl text-[#0D2745] mt-4 leading-tight">Vamos desenhar sua<br />academia ideal</h3>
            <p className="text-sm text-slate-500 mt-2">Converse com um especialista Vigorre. Diagnóstico gratuito + proposta em até 2h.</p>

            <div className="mt-6 space-y-3">
              <input placeholder="Nome completo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="E-mail corporativo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              <input placeholder="Empresa" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                <option>Número de colaboradores</option>
                <option>Até 50</option>
                <option>50 - 200</option>
                <option>200 - 1000</option>
                <option>1000+</option>
              </select>
              <button
                onClick={() => {
                  setShowLeadModal(false)
                  setToast("Solicitação enviada! Especialista Vigorre entrará em contato em breve")
                }}
                className="w-full bg-[#0D2745] text-white font-bold py-3.5 rounded-full mt-2"
              >
                Agendar conversa →
              </button>
              <div className="text-xs text-center text-slate-400">✓ Sem compromisso • Resposta em até 2h úteis</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
