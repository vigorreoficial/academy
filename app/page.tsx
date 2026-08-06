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
    students: "5.4k",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1521791136064-7986c86c6438?w=600&q=80",
  },
]

const categories = ["Todos", "Liderança", "Gestão", "Tecnologia", "Operacional", "Qualidade"]

export default function HomePage() {
  const [audience, setAudience] = useState<'b2b' | 'b2c'>('b2b')
  const [activeCat, setActiveCat] = useState("Todos")
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [cart, setCart] = useState<number[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [email, setEmail] = useState("")
  const [toast, setToast] = useState<string | null>(null)

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
  }

  return (
    <div className="min-h-screen bg-white text-[#1F2937] selection:bg-[#1E3A8A] selection:text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0A2540] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
          {toast}
        </div>
      )}

      {/* HERO */}
      <section className="relative pt-8 lg:pt-14 pb-10 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #0A2540 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
        <div className="absolute -top-32 -right-32 w-[900px] h-[900px] bg-gradient-to-br from-[#1E3A8A]/10 via-[#0A2540]/5 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-4 items-center">

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 shadow-sm">
                <span className="bg-[#1E3A8A] text-white text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full">NOVO</span>
                <span className="text-sm font-medium text-[#6B7280]">Ecossistema B2B + B2C em uma única plataforma</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[36px] sm:text-[44px] lg:text-[56px] font-extrabold leading-[0.92] tracking-tight" style={{ fontFamily: 'Poppins' }}>
                  <span className="text-[#0A2540]">Transforme</span>{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">conhecimento</span>
                    <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#D4AF37]/15 -rotate-1" />
                  </span>
                  <br />
                  <span className="text-[#0A2540]">em performance</span>
                  <br />
                  <span className="text-[#6B7280] font-light">estratégica.</span>
                </h1>
                <p className="text-[17px] leading-7 text-[#6B7280] max-w-[560px]">
                  A <strong className="text-[#0A2540]">Vigorre Academy™</strong> capacita empresas e profissionais com trilhas inteligentes, certificações reconhecidas e <span className="bg-white border border-[#E5E7EB] px-2 py-0.5 rounded-full text-sm font-semibold text-[#1E3A8A]">Vigorre Analytics™</span> — a inteligência que mede o ROI do aprendizado.
                </p>
              </div>

              <div className="bg-white rounded-[20px] p-2 shadow-lg shadow-[#0A2540]/5 border border-[#E5E7EB] flex gap-2 max-w-[520px]">
                <button onClick={() => setAudience('b2b')} className={`flex-1 rounded-2xl p-[18px] text-left transition border ${audience === 'b2b' ? 'bg-[#0A2540] border-[#0A2540] text-white shadow-lg' : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#1E3A8A]/30'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold tracking-widest ${audience === 'b2b' ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`}>PARA EMPRESAS • B2B</span>
                    <span className={`w-6 h-6 rounded-full grid place-items-center ${audience === 'b2b' ? 'bg-white/15' : 'bg-white border'}`}>
                      <span className={`w-2 h-2 rounded-full ${audience === 'b2b' ? 'bg-white' : 'bg-[#1E3A8A]'}`} />
                    </span>
                  </div>
                  <div className={`text-[15px] font-bold leading-tight ${audience === 'b2b' ? 'text-white' : 'text-[#0A2540]'}`}>Academy corporativa + White Label</div>
                  <div className={`text-sm ${audience === 'b2b' ? 'text-white/70' : 'text-[#6B7280]'}`}>Acesso gratuito para empresas</div>
                </button>

                <button onClick={() => setAudience('b2c')} className={`flex-1 rounded-2xl p-[18px] text-left transition border ${audience === 'b2c' ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white shadow-lg' : 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#1E3A8A]/30'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold tracking-widest ${audience === 'b2c' ? 'text-white/70' : 'text-[#6B7280]'}`}>PARA VOCÊ • B2C</span>
                    <span className={`w-6 h-6 rounded-full grid place-items-center ${audience === 'b2c' ? 'bg-white/15' : 'bg-white border'}`}>
                      <span className={`w-2 h-2 rounded-full ${audience === 'b2c' ? 'bg-white' : 'bg-[#1E3A8A]'}`} />
                    </span>
                  </div>
                  <div className={`text-[15px] font-bold leading-tight ${audience === 'b2c' ? 'text-white' : 'text-[#0A2540]'}`}>Cursos avulsos & trilhas</div>
                  <div className={`text-sm ${audience === 'b2c' ? 'text-white/80' : 'text-[#6B7280]'}`}>100% gratuito</div>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => audience === 'b2b' ? setShowLeadModal(true) : scrollTo('catalogo')} className="bg-[#0A2540] hover:bg-[#1E3A8A] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#0A2540]/20 flex items-center gap-3 transition">
                  {audience === 'b2b' ? 'Agendar demo com especialista' : 'Explorar catálogo completo'}
                  <span className="w-8 h-8 bg-white/15 rounded-full grid place-items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 8h7M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
                <button onClick={() => scrollTo('solucoes')} className="bg-white border border-[#E5E7EB] font-semibold px-6 py-4 rounded-full hover:border-[#1E3A8A]/30 transition">Ver como funciona →</button>
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <span className="font-medium">+12 mil alunos • 4.9/5</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#16A34A]/10 grid place-items-center text-[#16A34A]">✓</span> Certificado com validação LinkedIn</span>
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#16A34A]/10 grid place-items-center text-[#16A34A]">✓</span> Acesso totalmente gratuito</span>
                <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#16A34A]/10 grid place-items-center text-[#16A34A]">✓</span> SSO & Integração RH</span>
              </div>
            </div>

            {/* Right - Dashboard Mock */}
            <div className="relative lg:pl-8">
              <div className="relative bg-white rounded-[32px] shadow-[0_32px_80px_-20px_rgba(10,37,64,0.15)] border border-[#E5E7EB] overflow-hidden">
                <div className="h-14 bg-gradient-to-r from-[#0A2540] via-[#1E3A8A] to-[#2563EB] flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center text-white font-black text-sm">V</div>
                    <div>
                      <div className="text-white font-bold text-sm leading-none">Vigorre Academy™</div>
                      <div className="text-white/60 text-[11px]">Portal do Colaborador • Empresa</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs font-medium">Ao vivo</span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-3 gap-3">
                  {[
                    { k: 'Progresso', v: '78%', sub: '+12% vs mês anterior', color: 'from-[#0A2540] to-[#1E3A8A]' },
                    { k: 'Certificações', v: '342', sub: '84% conclusão', color: 'from-[#1E3A8A] to-[#2563EB]' },
                    { k: 'ROI Treinamento', v: '3.2x', sub: 'Vigorre Analytics™', color: 'from-[#D4AF37] to-[#F59E0B]' },
                  ].map(m => (
                    <div key={m.k} className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#E5E7EB]">
                      <div className="text-[11px] font-bold tracking-widest text-[#6B7280]">{m.k.toUpperCase()}</div>
                      <div className="text-xl font-black text-[#0A2540] mt-1">{m.v}</div>
                      <div className="text-[11px] text-[#6B7280]">{m.sub}</div>
                      <div className={`mt-2 h-1.5 rounded-full bg-gradient-to-r ${m.color} opacity-80`} />
                    </div>
                  ))}
                </div>

                <div className="px-6">
                  <div className="bg-[#0A2540] rounded-2xl p-4 text-white relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold">Engajamento por trilha</span>
                      <span className="text-xs bg-white/15 px-2 py-1 rounded-full">Últimos 30 dias</span>
                    </div>
                    <div className="flex items-end gap-2 h-20">
                      {[35, 55, 45, 78, 62, 88, 52, 74, 68, 92].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#1E3A8A] to-[#2563EB] rounded-t-lg" style={{ height: `${h}%`, opacity: i === 9 ? 1 : 0.6 + i * 0.03 }} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/50 mt-2">
                      <span>Liderança</span><span>Gestão</span><span>Tecnologia</span><span>Qualidade</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#0A2540]">Trilhas ativas</h4>
                    <span className="text-xs font-bold text-[#1E3A8A] bg-[#1E3A8A]/10 px-2 py-1 rounded-full">Ver todas →</span>
                  </div>
                  {[
                    { title: "Liderança Estratégica 360°", progress: 78, people: "342 colaboradores" },
                    { title: "NR-35 Trabalho em Altura", progress: 94, people: "128 colaboradores" },
                    { title: "Analytics para RH", progress: 45, people: "89 colaboradores" },
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 p-3 rounded-2xl border border-[#E5E7EB] hover:border-[#1E3A8A]/30 hover:bg-[#F8FAFC] transition">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] grid place-items-center text-white">▶</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.title}</div>
                        <div className="text-xs text-[#6B7280]">{item.people}</div>
                        <div className="mt-1.5 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1E3A8A] rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#0A2540]">{item.progress}%</div>
                    </div>
                  ))}
                </div>

                <div className="absolute -left-4 top-28 hidden xl:flex bg-white border border-[#E5E7EB] rounded-2xl p-3 shadow-xl items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#16A34A] grid place-items-center text-white">✓</div>
                  <div>
                    <div className="text-xs font-bold text-[#16A34A]">CERTIFICADO EMITIDO</div>
                    <div className="text-sm font-bold">ISO 9001 • validado no LinkedIn</div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-24 hidden xl:flex bg-[#0A2540] text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-2xl font-black">500+</div>
                  <div className="text-xs text-white/70 ml-3 leading-tight">empresas<br />capacitadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL MODALIDADES */}
      <section id="solucoes" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0A2540] text-white rounded-full px-4 py-1.5 text-xs font-bold tracking-widest">ARQUITETURA INTELIGENTE • B2B + B2C</div>
          <h2 className="text-[32px] lg:text-[44px] font-extrabold leading-[0.95] tracking-tight" style={{ fontFamily: 'Poppins' }}>
            Uma única <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">academia</span>, dois<br />modelos de sucesso
          </h2>
          <p className="text-[#6B7280] text-lg">Escolha a jornada ideal. Mesma qualidade Vigorre, experiências sob medida para empresas e profissionais.</p>
          <div className="flex justify-center p-1 bg-[#F8FAFC] rounded-full w-fit mx-auto mt-6">
            <button onClick={() => setAudience('b2b')} className={`px-8 py-3 rounded-full text-sm font-bold transition ${audience === 'b2b' ? 'bg-[#0A2540] text-white shadow' : 'text-[#6B7280]'}`}>Sou Empresa (B2B)</button>
            <button onClick={() => setAudience('b2c')} className={`px-8 py-3 rounded-full text-sm font-bold transition ${audience === 'b2c' ? 'bg-[#1E3A8A] text-white shadow' : 'text-[#6B7280]'}`}>Sou Pessoa Física (B2C)</button>
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
              <div key={card.title} className={`rounded-2xl p-6 border-2 flex flex-col ${card.highlight ? 'bg-[#0A2540] text-white border-[#0A2540] shadow-xl shadow-[#0A2540]/20' : 'bg-white border-[#E5E7EB] hover:border-[#1E3A8A]/30 hover:shadow-lg'}`}>
                <div className={`w-12 h-12 rounded-2xl grid place-items-center text-xl mb-4 ${card.highlight ? 'bg-white/15 text-white' : 'bg-[#1E3A8A]/10 text-[#1E3A8A]'}`}>{card.icon}</div>
                <h3 className={`font-bold text-lg leading-tight ${card.highlight ? 'text-white' : 'text-[#0A2540]'}`}>{card.title}</h3>
                <p className={`text-sm mt-2 flex-1 ${card.highlight ? 'text-white/70' : 'text-[#6B7280]'}`}>{card.desc}</p>
                <div className={`mt-6 pt-4 border-t ${card.highlight ? 'border-white/15' : 'border-[#E5E7EB]'}`}>
                  <div className={`text-xs font-bold tracking-widest ${card.highlight ? 'text-[#D4AF37]' : 'text-[#6B7280]'}`}>INVESTIMENTO</div>
                  <div className={`font-bold ${card.highlight ? 'text-white' : 'text-[#0A2540]'}`}>{card.price}</div>
                </div>
                <button onClick={() => setShowLeadModal(true)} className={`mt-4 w-full py-3 rounded-full font-bold text-sm ${card.highlight ? 'bg-[#D4AF37] text-white hover:bg-[#C49F27]' : 'bg-[#0A2540] text-white hover:bg-[#1E3A8A]'}`}>Saber mais →</button>
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
              <div key={card.title} className="rounded-2xl p-6 bg-white border border-[#E5E7EB] hover:border-[#1E3A8A]/30 hover:shadow-xl transition flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A]/10 text-[#1E3A8A] grid place-items-center font-bold mb-4">{card.icon}</div>
                <h3 className="font-bold text-lg text-[#0A2540]">{card.title}</h3>
                <p className="text-sm text-[#6B7280] mt-2 flex-1">{card.desc}</p>
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-xs font-bold tracking-widest text-[#6B7280]">INVESTIMENTO</div>
                  <div className="font-bold text-[#1E3A8A]">{card.price}</div>
                </div>
                <button onClick={() => scrollTo('catalogo')} className="mt-4 w-full py-3 rounded-full font-bold text-sm bg-white border border-[#E5E7EB] hover:border-[#1E3A8A]/30 text-[#0A2540]">{card.cta} →</button>
              </div>
            ))}
          </div>
        )}

        {/* Fluxo */}
        <div className="mt-14 bg-gradient-to-br from-[#0A2540] via-[#1E3A8A] to-[#2563EB] rounded-[28px] p-8 lg:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-center relative">
            <div>
              <div className="text-[#D4AF37] text-xs font-bold tracking-[0.18em]">COMO FUNCIONA</div>
              <h3 className="text-3xl font-extrabold leading-tight mt-2" style={{ fontFamily: 'Poppins' }}>
                Fluxo {audience === 'b2b' ? 'corporativo' : 'individual'} em <br />{audience === 'b2b' ? '5 passos' : '4 cliques'}
              </h3>
              <p className="text-white/70 mt-3">{audience === 'b2b' ? 'Do contrato ao relatório de ROI sem fricção. Integração com seu RH em até 48h.' : 'Cadastro com CPF e acesso liberado na hora. Certificado digital com QR Code.'}</p>
              <button onClick={() => setShowLeadModal(true)} className="mt-6 bg-[#D4AF37] text-white font-bold px-6 py-3 rounded-full hover:bg-[#C49F27] transition">
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
                      <div className="text-[#D4AF37] font-black text-xs">{s.n}</div>
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
      <section id="catalogo" className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 text-xs font-bold tracking-widest text-[#6B7280] border border-[#E5E7EB]">
                <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" /> CATÁLOGO VIGORRE • 200+ CURSOS
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-3" style={{ fontFamily: 'Poppins' }}>Trilhas que o mercado <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">reconhece</span></h2>
              <p className="text-[#6B7280] mt-2 max-w-xl">Conteúdo validado por especialistas, com certificação digital e integração LinkedIn. Filtre por setor, duração ou nível.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input placeholder="Buscar curso, ex: NR-12" className="pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-full text-sm w-[260px] focus:outline-none focus:border-[#1E3A8A]" />
                <svg className="absolute left-3.5 top-3.5 text-[#6B7280]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20L16 16" /></svg>
              </div>
              <button onClick={() => setShowCheckout(true)} className="hidden lg:flex items-center gap-2 border border-[#E5E7EB] rounded-full px-5 py-3 text-sm font-bold hover:border-[#1E3A8A]/30 bg-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-13z" /><path d="M6 6L5 2H2" /></svg>
                Carrinho {cart.length > 0 && `• ${cart.length}`}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition ${activeCat === cat ? 'bg-[#0A2540] text-white border-[#0A2540] shadow' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#1E3A8A]/30 hover:text-[#0A2540]'}`}>
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-[#6B7280] self-center hidden sm:block">{filtered.length} cursos encontrados • 100% gratuitos</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course.id} className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl hover:border-[#1E3A8A]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 backdrop-blur text-[#0A2540] text-xs font-bold px-2.5 py-1 rounded-full">{course.category}</span>
                    {course.badge && <span className="bg-[#D4AF37] text-white text-xs font-bold px-2.5 py-1 rounded-full">{course.badge}</span>}
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
                  <h3 className="font-bold text-lg leading-tight text-[#0A2540] line-clamp-2 group-hover:text-[#1E3A8A] transition">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-3 text-sm text-[#6B7280]">
                    <span className="w-7 h-7 rounded-full bg-[#F8FAFC] grid place-items-center text-xs">👨‍🏫</span>
                    <span>Instrutor Vigorre • Especialista no setor</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#0A2540]">Grátis</span>
                      </div>
                      <div className="text-xs text-[#6B7280]">Acesso imediato + Certificado incluso</div>
                    </div>
                    {audience === 'b2c' ? (
                      <button
                        onClick={() => toggleCart(course.id)}
                        className={`px-5 py-2.5 rounded-full font-bold text-sm transition flex items-center gap-2 ${cart.includes(course.id) ? 'bg-[#16A34A] text-white' : 'bg-[#0A2540] text-white hover:bg-[#1E3A8A]'}`}
                      >
                        {cart.includes(course.id) ? '✓ Adicionado' : 'Acessar'}
                      </button>
                    ) : (
                      <button onClick={() => setShowLeadModal(true)} className="px-5 py-2.5 rounded-full font-bold text-sm bg-white border border-[#E5E7EB] hover:border-[#1E3A8A]/30 text-[#0A2540]">
                        Incluir no plano
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setToast("Catálogo completo em breve • 200+ cursos")} className="px-8 py-3 rounded-full bg-white border border-[#E5E7EB] font-bold hover:border-[#1E3A8A]/30">Ver catálogo completo (200+ cursos) →</button>
            <span className="text-sm text-[#6B7280]">Empresas: curadoria sob medida + integração com PDI</span>
          </div>
        </div>
      </section>

      {/* WHITE LABEL */}
      <section id="whitelabel" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full px-3 py-1 text-xs font-bold tracking-widest">WHITE LABEL • UNIVERSIDADE CORPORATIVA</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-3 leading-tight" style={{ fontFamily: 'Poppins' }}>
              Sua universidade,<br />
              <span className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] bg-clip-text text-transparent">nossa inteligência.</span>
            </h2>
            <p className="text-[#6B7280] mt-4 text-lg">Lançamos em 15 dias sua academia com seu domínio, cores e cursos próprios + catálogo Vigorre. O melhor dos dois mundos.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Domínio próprio (universidade.suaempresa.com.br)",
                "Cursos Vigorre + seus conteúdos internos",
                "SSO com Active Directory / Google Workspace",
                "Relatórios por filial, cargo e líder direto"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#16A34A]/10 text-[#16A34A] grid place-items-center text-xs">✓</span>
                  <span className="font-medium text-[#1F2937]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowLeadModal(true)} className="bg-[#0A2540] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#1E3A8A] transition">Agendar visita técnica →</button>
              <button onClick={() => setToast("Case em PDF enviado para seu e-mail")} className="bg-white border border-[#E5E7EB] font-bold px-6 py-3.5 rounded-full hover:border-[#1E3A8A]/30">Ver cases de sucesso</button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-[#6B7280]">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#16A34A] rounded-full" /> Setup em 15 dias</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full" /> Sem fidelidade</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-2xl overflow-hidden">
              <div className="h-10 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center gap-2 px-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="ml-4 flex-1 bg-white border border-[#E5E7EB] rounded-full px-3 py-1 text-xs text-[#6B7280] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#16A34A] rounded-full" /> universidade.vigorre.com.br
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0A2540] via-[#1E3A8A] to-[#2563EB] p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white/60 text-xs font-bold tracking-widest">UNIVERSIDADE CORPORATIVA</div>
                    <div className="text-2xl font-black mt-1">Vigorre Academy™</div>
                    <div className="text-white/70 text-sm">powered by Vigorre • 2.347 colaboradores ativos</div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl grid place-items-center text-[#0A2540] font-black">V</div>
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
              <div className="p-4 grid grid-cols-3 gap-3 bg-[#F8FAFC]">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-3 border border-[#E5E7EB]">
                    <div className="w-full h-20 bg-[#F8FAFC] rounded-xl mb-3 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${['1553877522-43269d4ea984', '1552664730-d307ca884978', '1581091226825-a6a2a5aee158'][i - 1]}?w=300&q=80`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-2 bg-[#E5E7EB] rounded-full w-3/4" />
                    <div className="h-2 bg-[#E5E7EB] rounded-full w-1/2 mt-2" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xl hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A2540] grid place-items-center text-white">↗</div>
              <div>
                <div className="font-bold text-[#0A2540]">Vigorre Analytics™</div>
                <div className="text-xs text-[#6B7280]">Correlação treinamento x performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precos" className="bg-[#0A2540] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#1E3A8A]/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-widest">ACESSO 100% GRATUITO • SEM SURPRESAS</div>
            <h2 className="text-3xl lg:text-[42px] font-extrabold text-white leading-tight mt-4" style={{ fontFamily: 'Poppins' }}>
              Invista <span className="text-[#D4AF37]">gratuitamente</span> em <br />conhecimento
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
                  {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <h3 className={`font-extrabold text-xl ${plan.dark ? 'text-[#0A2540]' : 'text-white'}`}>{plan.name}</h3>
                  <p className={`text-sm mt-1 ${plan.dark ? 'text-[#6B7280]' : 'text-white/60'}`}>{plan.desc}</p>
                  <div className="mt-6">
                    <div className={`text-4xl font-black ${plan.dark ? 'text-[#0A2540]' : 'text-white'}`}>Grátis</div>
                    <div className={`text-xs mt-1 ${plan.dark ? 'text-[#6B7280]' : 'text-white/50'}`}>Acesso corporativo sem custo</div>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className={`w-5 h-5 rounded-full grid place-items-center text-xs flex-shrink-0 ${plan.dark ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]' : 'bg-white/15 text-white'}`}>✓</span>
                        <span className={plan.dark ? 'text-[#1F2937]' : 'text-white/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowLeadModal(true)} className={`mt-8 w-full py-3.5 rounded-full font-bold ${plan.dark ? 'bg-[#0A2540] text-white hover:bg-[#1E3A8A]' : 'bg-white text-[#0A2540] hover:bg-slate-100'}`}>
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
                  {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#16A34A] text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <h3 className={`font-extrabold text-xl ${plan.dark ? 'text-[#0A2540]' : 'text-white'}`}>{plan.name}</h3>
                  <p className={`text-sm mt-1 ${plan.dark ? 'text-[#6B7280]' : 'text-white/60'}`}>{plan.desc}</p>
                  <div className="mt-6">
                    <div className={`text-4xl font-black ${plan.dark ? 'text-[#0A2540]' : 'text-white'}`}>Grátis</div>
                    <div className={`text-xs mt-1 ${plan.dark ? 'text-[#6B7280]' : 'text-white/50'}`}>Acesso imediato, sem cartão</div>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2 text-sm">
                        <span className={`w-5 h-5 rounded-full grid place-items-center text-xs flex-shrink-0 ${plan.dark ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]' : 'bg-white/15 text-white'}`}>✓</span>
                        <span className={plan.dark ? 'text-[#1F2937]' : 'text-white/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowCheckout(true)} className={`mt-8 w-full py-3.5 rounded-full font-bold ${plan.dark ? 'bg-[#0A2540] text-white hover:bg-[#1E3A8A]' : 'bg-white text-[#0A2540]'}`}>
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
        <div className="bg-white rounded-[28px] border border-[#E5E7EB] overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-0">
            <div className="p-8 lg:p-10 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
              <h3 className="text-2xl font-extrabold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>B2B vs. B2C:<br />experiências distintas,<br />mesma excelência</h3>
              <p className="text-[#6B7280] mt-3">A plataforma adapta fluxos e acompanhamento para cada perfil — sem comprometer a qualidade.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setAudience('b2b')} className={`px-4 py-2 rounded-full text-sm font-bold ${audience === 'b2b' ? 'bg-[#0A2540] text-white' : 'bg-white border border-[#E5E7EB]'}`}>Ver B2B</button>
                <button onClick={() => setAudience('b2c')} className={`px-4 py-2 rounded-full text-sm font-bold ${audience === 'b2c' ? 'bg-[#1E3A8A] text-white' : 'bg-white border border-[#E5E7EB]'}`}>Ver B2C</button>
              </div>
            </div>

            {[
              {
                title: 'Empresa',
                subtitle: 'PORTAL DO COLABORADOR',
                color: '#0A2540',
                rows: ['SSO + integração Vigorre', 'Cursos definidos pelo RH', 'Gestão centralizada pelo RH', 'Dashboard por equipe e filial', 'PDI + IA preditiva']
              },
              {
                title: 'Pessoa Física',
                subtitle: 'PORTAL DO ALUNO',
                color: '#1E3A8A',
                rows: ['Login com CPF e e-mail', 'Catálogo livre completo', 'Cadastro simples e imediato', 'Progresso individual + ranking', 'Recomendações personalizadas']
              }
            ].map(col => (
              <div key={col.title} className="p-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] last:border-0">
                <div className="text-xs font-bold tracking-widest" style={{ color: col.color }}>{col.subtitle}</div>
                <div className="text-xl font-black text-[#0A2540] mt-1">{col.title}</div>
                <ul className="mt-6 space-y-3">
                  {[
                    { label: 'Acesso', val: col.rows[0] },
                    { label: 'Catálogo', val: col.rows[1] },
                    { label: 'Gestão', val: col.rows[2] },
                    { label: 'Acompanhamento', val: col.rows[3] },
                    { label: 'Inteligência', val: col.rows[4] },
                  ].map(r => (
                    <li key={r.label} className="flex justify-between gap-4 py-2.5 border-b border-[#E5E7EB] last:border-0">
                      <span className="text-xs font-bold tracking-widest text-[#6B7280]">{r.label.toUpperCase()}</span>
                      <span className="text-sm font-medium text-[#1F2937] text-right">{r.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-[#1E3A8A] text-xs font-bold tracking-[0.18em]">QUEM VIVE, RECOMENDA</div>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{ fontFamily: 'Poppins' }}>Resultados que viram cultura</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#0A2540]">4.9</span>
              <span className="text-amber-400">★★★★★</span>
              <span className="text-sm text-[#6B7280]">• 2.847 avaliações verificadas</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Renata Amaral', role: 'Diretora de RH • Indústria Nacional', text: '"Reduzimos 42% o tempo de onboarding e aumentamos a retenção em 28%. O Analytics™ mostrou exatamente onde investir."', avatar: 5 },
              { name: 'Marcos Lima', role: 'Gerente de Operações • Siderúrgica Brasileira', text: '"A White Label nos deu autonomia. Em 3 semanas estávamos com nossa Universidade no ar, com nossa cara."', avatar: 8 },
              { name: 'Juliana Costa', role: 'Aluna • Trilha de Liderança', text: '"Acessei o curso e em 2 minutos já estava estudando. Certificado no LinkedIn rendeu 3 entrevistas."', avatar: 9 },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#1E3A8A]/20 transition">
                <div className="flex gap-1 text-amber-400 text-sm">★★★★★</div>
                <p className="mt-4 text-[#1F2937] leading-relaxed">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?img=${t.avatar}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-sm text-[#0A2540]">{t.name}</div>
                    <div className="text-xs text-[#6B7280]">{t.role}</div>
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
          <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins' }}>Perguntas frequentes</h2>
          <p className="text-[#6B7280] mt-2">Tudo que você precisa para decidir com segurança.</p>
        </div>

        <div className="space-y-3">
          {[
            { q: "Posso acessar um único curso sendo pessoa física?", a: "Sim! É o nosso modelo B2C. Você escolhe qualquer curso do catálogo, faz um cadastro rápido e tem acesso imediato por 12 meses, com certificado digital válido e compartilhável no LinkedIn." },
            { q: "Como funciona o White Label para empresas?", a: "Criamos sua universidade corporativa com seu domínio, identidade visual e cursos próprios + todo catálogo Vigorre. SSO, importação de colaboradores e relatórios por filial. Setup médio de 15 dias e suporte dedicado." },
            { q: "Qual a diferença entre créditos e assinatura corporativa?", a: "Assinatura libera acesso ilimitado para todos os colaboradores. Créditos são pacotes (ex: 100 créditos) que o RH distribui conforme a demanda — ideal para equipes sazonais ou projetos específicos." },
            { q: "Os certificados são reconhecidos?", a: "Sim. Todos os cursos têm certificação com QR Code e validação online. Você pode compartilhar com 1 clique no LinkedIn e validar autenticidade em nosso portal." },
            { q: "Consigo integrar com meu sistema de RH?", a: "Sim. Temos integração nativa com principais HRIS, Active Directory, Google Workspace e API aberta. Também geramos PDI automático e cruzamos dados com o Vigorre Analytics™." },
          ].map((faq, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden transition ${openFaq === i ? 'bg-white border-[#1E3A8A] shadow' : 'bg-white border-[#E5E7EB] hover:border-[#1E3A8A]/30'}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-bold text-[#0A2540] pr-6">{faq.q}</span>
                <span className={`w-8 h-8 rounded-full grid place-items-center border flex-shrink-0 transition ${openFaq === i ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] rotate-45' : 'bg-[#F8FAFC] border-[#E5E7EB] text-[#6B7280]'}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-[#6B7280] leading-relaxed -mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-12">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1E3A8A] to-[#2563EB] p-8 lg:p-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[700px] h-[700px] bg-[#D4AF37] rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
          </div>

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-bold tracking-widest">COMECE HOJE • SEM RISCO</div>
              <h2 className="text-3xl lg:text-[42px] font-extrabold leading-[0.95] tracking-tight mt-4" style={{ fontFamily: 'Poppins' }}>
                Pronto para <br />
                <span className="text-[#D4AF37]">acelerar</span> sua<br />
                estratégia?
              </h2>
              <p className="text-white/70 mt-4 text-lg max-w-xl">
                {audience === 'b2b' ? 'Agende uma demo de 20 minutos e receba um diagnóstico gratuito de maturidade de capacitação da sua equipe.' : 'Crie sua conta gratuita, ganhe acesso imediato e faça seu primeiro curso sem pagar nada.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup">
                  <button className="bg-[#D4AF37] text-white font-bold px-8 py-4 rounded-full hover:bg-[#C49F27] transition flex items-center gap-2">
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
              <h3 className="font-extrabold text-[#0A2540] text-lg">{audience === 'b2b' ? 'Solicitar proposta personalizada' : 'Receba acesso grátis'}</h3>
              <p className="text-sm text-[#6B7280] mt-1">{audience === 'b2b' ? 'Resposta em até 2 horas úteis. Sem spam.' : 'Acesso completo ao catálogo essencial.'}</p>

              <div className="mt-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Nome completo" className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white" />
                  <input placeholder="Empresa" className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white" />
                </div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail corporativo" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Telefone / WhatsApp" className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white" />
                  <select className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A] focus:bg-white">
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
                  className="w-full bg-[#0A2540] hover:bg-[#1E3A8A] text-white font-bold py-3.5 rounded-full transition"
                >
                  {audience === 'b2b' ? 'Receber proposta em 2h →' : 'Liberar meu acesso grátis →'}
                </button>
                <div className="text-[11px] text-center text-[#6B7280]">Ao continuar você concorda com nossos Termos e Política de Privacidade. LGPD compliant.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-white rounded-[28px] max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex justify-between items-center">
              <h3 className="font-black text-xl text-[#0A2540]">Seus cursos</h3>
              <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-full bg-[#F8FAFC] grid place-items-center hover:bg-[#E5E7EB] transition">✕</button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#F8FAFC] rounded-full grid place-items-center mx-auto text-2xl">📚</div>
                  <div className="font-bold mt-4">Nenhum curso selecionado</div>
                  <div className="text-sm text-[#6B7280] mt-1">Explore nosso catálogo e adicione cursos para começar.</div>
                  <button onClick={() => setShowCheckout(false)} className="mt-6 bg-[#0A2540] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1E3A8A] transition">Explorar cursos</button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {courses.filter(c => cart.includes(c.id)).map(c => (
                      <div key={c.id} className="flex gap-3 p-3 border border-[#E5E7EB] rounded-2xl hover:border-[#1E3A8A]/20 transition">
                        <img src={c.image} alt={c.title} className="w-20 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-sm leading-tight">{c.title}</div>
                          <div className="text-xs text-[#6B7280]">{c.category} • {c.duration}</div>
                          <div className="font-black text-[#16A34A] text-sm mt-1">Grátis</div>
                        </div>
                        <button onClick={() => toggleCart(c.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 rounded-full self-start py-1 transition">Remover</button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-[#F8FAFC] rounded-2xl p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between font-black text-lg"><span>Total</span><span className="text-[#16A34A]">Grátis</span></div>
                    <div className="text-xs text-[#6B7280] mt-1">Acesso imediato liberado após cadastro</div>
                  </div>

                  <Link href="/signup">
                    <button
                      onClick={() => {
                        setCart([])
                        setShowCheckout(false)
                      }}
                      className="w-full mt-6 bg-[#0A2540] hover:bg-[#1E3A8A] text-white font-bold py-4 rounded-full transition"
                    >
                      Criar conta gratuita → Acesso imediato
                    </button>
                  </Link>
                  <div className="text-xs text-center text-[#6B7280] mt-3">Cadastro 100% gratuito • Certificado digital + LinkedIn</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm" onClick={() => setShowLeadModal(false)} />
          <div className="relative bg-white rounded-[28px] max-w-md w-full p-8 shadow-2xl">
            <button onClick={() => setShowLeadModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F8FAFC] grid place-items-center hover:bg-[#E5E7EB] transition">✕</button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] grid place-items-center text-white font-black">V</div>
            <h3 className="font-black text-2xl text-[#0A2540] mt-4 leading-tight">Vamos desenhar sua<br />academia ideal</h3>
            <p className="text-sm text-[#6B7280] mt-2">Converse com um especialista Vigorre. Diagnóstico gratuito + proposta em até 2h.</p>

            <div className="mt-6 space-y-3">
              <input placeholder="Nome completo" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]" />
              <input placeholder="E-mail corporativo" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]" />
              <input placeholder="Empresa" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]" />
              <select className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A8A]">
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
                className="w-full bg-[#0A2540] text-white font-bold py-3.5 rounded-full mt-2 hover:bg-[#1E3A8A] transition"
              >
                Agendar conversa →
              </button>
              <div className="text-xs text-center text-[#6B7280]">✓ Sem compromisso • Resposta em até 2h úteis</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
