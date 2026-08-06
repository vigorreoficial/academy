import Link from 'next/link'

interface FooterProps {
  platformName?: string
}

export default function Footer({ platformName = 'VIGORRE' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { label: 'Quem Somos', href: '/#sobre' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Contato', href: '/#contato' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'LGPD', href: '/lgpd' },
  ]

  const solutionsLinks = [
    { label: 'Consultoria Estratégica', href: '/#consultoria' },
    { label: 'Recrutamento & Seleção', href: '/#recrutamento' },
    { label: 'Estruturação Organizacional', href: '/#estruturacao' },
    { label: 'Plano de Cargos e Salários', href: '/#cargos' },
    { label: 'Treinamentos', href: '/#treinamentos' },
    { label: 'People Analytics', href: '/#analytics' },
  ]

  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-20">
      {/* AVISO LGPD */}
      <div className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <p className="text-[13px] text-[#6B7280] leading-relaxed text-center max-w-4xl mx-auto">
            <span className="font-semibold text-[#0A2540]">LGPD:</span>{' '}
            A Vigorre™ trata seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), adotando medidas técnicas e administrativas para garantir a segurança, confidencialidade e integridade das informações.
          </p>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* COLUNA 1 - LOGO */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logo-vigorre.png"
                alt="Vigorre Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-[16px] uppercase" style={{ fontFamily: 'Poppins', color: '#0A2540' }}>
                    {String(platformName)}
                  </span>
                  <span className="font-extrabold text-[16px] uppercase" style={{ fontFamily: 'Poppins', color: '#D4AF37' }}>
                    ACADEMY™
                  </span>
                </div>
              </div>
            </Link>

            <div className="space-y-3">
              <a href="mailto:contato@vigorre.com.br" className="flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                contato@vigorre.com.br
              </a>
              <a href="tel:+5534999999999" className="flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                +55 (34) 99999-9999
              </a>
              <a href="https://www.vigorre.com.br" className="flex items-center gap-2 text-[14px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                www.vigorre.com.br
              </a>
            </div>
          </div>

          {/* COLUNA 2 - EMPRESA */}
          <div>
            <h3 className="font-bold text-[14px] tracking-wider uppercase mb-5" style={{ fontFamily: 'Poppins', color: '#0A2540' }}>
              Empresa
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={String(link.href)}>
                  <Link href={link.href} className="text-[14.5px] text-[#6B7280] hover:text-[#0A2540] hover:translate-x-1 transition-all duration-200 inline-block">
                    {String(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3 - SOLUÇÕES */}
          <div>
            <h3 className="font-bold text-[14px] tracking-wider uppercase mb-5" style={{ fontFamily: 'Poppins', color: '#0A2540' }}>
              Soluções
            </h3>
            <ul className="space-y-3">
              {solutionsLinks.map((link) => (
                <li key={String(link.href)}>
                  <Link href={link.href} className="text-[14.5px] text-[#6B7280] hover:text-[#0A2540] hover:translate-x-1 transition-all duration-200 inline-block">
                    {String(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4 - CONTATO */}
          <div>
            <h3 className="font-bold text-[14px] tracking-wider uppercase mb-5" style={{ fontFamily: 'Poppins', color: '#0A2540' }}>
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/5534999999999" target="_blank" rel="noopener noreferrer" className="text-[14.5px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://instagram.com/vigorre" target="_blank" rel="noopener noreferrer" className="text-[14.5px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/vigorre" target="_blank" rel="noopener noreferrer" className="text-[14.5px] text-[#6B7280] hover:text-[#0A2540] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LINHA SEPARADORA */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-[#E5E7EB]" />
      </div>

      {/* PARTE INFERIOR */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          <p className="text-[13px] text-[#6B7280]">
            © {currentYear} <span className="text-[#0A2540] font-semibold">{String(platformName)}</span>{' '}
            <span className="text-[#D4AF37] font-semibold">ACADEMY™</span>. Todos os direitos reservados.
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">CNPJ: 68.413.252/0001-86</span>
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px]">
            <Link href="/privacidade" className="text-[#6B7280] hover:text-[#0A2540] transition-colors">
              Privacidade
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/termos" className="text-[#6B7280] hover:text-[#0A2540] transition-colors">
              Termos
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/lgpd" className="text-[#6B7280] hover:text-[#0A2540] transition-colors">
              LGPD
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/cookies" className="text-[#6B7280] hover:text-[#0A2540] transition-colors">
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
