import Link from 'next/link'

interface FooterProps {
  platformName?: string
}

export default function Footer({ platformName = 'VIGORRE™' }: FooterProps) {
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
    { label: 'Transformação Digital', href: '/#digital' },
    { label: 'Mapeamento de Competências', href: '/#competencias' },
    { label: 'Avaliação de Desempenho', href: '/#desempenho' },
    { label: 'Pesquisa de Clima', href: '/#clima' },
  ]

  const contactLinks = [
    { label: 'WhatsApp', href: 'https://wa.me/5534999999999', icon: 'whatsapp', external: true },
    { label: 'Instagram', href: 'https://instagram.com/vigorre', icon: 'instagram', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/vigorre', icon: 'linkedin', external: true },
    { label: 'Email', href: 'mailto:contato@vigorre.com.br', icon: 'email', external: false },
  ]

  const socialIcons: Record<string, JSX.Element> = {
    whatsapp: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    email: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  }

  return (
    <footer
      role="contentinfo"
      className="bg-white border-t border-[#F5F5F5] mt-20"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* AVISO LGPD */}
      <div className="bg-[#F5F5F5] border-b border-[#F5F5F5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <p className="text-[12px] lg:text-[13px] text-[#666666] leading-relaxed text-center max-w-4xl mx-auto">
            <span className="font-semibold text-[#002147]">LGPD:</span>{' '}
            A Vigorre™ trata seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), adotando medidas técnicas e administrativas para garantir a segurança, confidencialidade e integridade das informações.
          </p>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* COLUNA 1 - LOGO E CONTATO */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <img
                src="/logo-vigorre.png"
                alt="Vigorre Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span 
                  className="font-extrabold text-[18px] tracking-tight uppercase"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#002147' }}
                >
                  {platformName}
                </span>
              </div>
            </Link>

            <div className="space-y-3 mb-6">
              <a 
                href="mailto:contato@vigorre.com.br"
                className="flex items-center gap-2 text-[14px] text-[#666666] hover:text-[#002147] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                contato@vigorre.com.br
              </a>
              <a 
                href="tel:+5534999999999"
                className="flex items-center gap-2 text-[14px] text-[#666666] hover:text-[#002147] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                +55 (34) 99999-9999
              </a>
              <a 
                href="https://www.vigorre.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] text-[#666666] hover:text-[#002147] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                www.vigorre.com.br
              </a>
            </div>
          </div>

          {/* COLUNA 2 - EMPRESA */}
          <div>
            <h3 
              className="font-bold text-[14px] tracking-wider uppercase mb-5"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#002147' }}
            >
              Empresa
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-[14.5px] text-[#666666] hover:text-[#002147] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3 - SOLUÇÕES */}
          <div>
            <h3 
              className="font-bold text-[14px] tracking-wider uppercase mb-5"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#002147' }}
            >
              Soluções
            </h3>
            <ul className="space-y-3">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-[14.5px] text-[#666666] hover:text-[#002147] hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4 - CONTATO / SOCIAL */}
          <div>
            <h3 
              className="font-bold text-[14px] tracking-wider uppercase mb-5"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#002147' }}
            >
              Contato
            </h3>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-[14.5px] text-[#666666] hover:text-[#002147] transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#F5F5F5] group-hover:bg-[#D4AF37] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      {socialIcons[link.icon]}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* LINHA SEPARADORA */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-[#E5E5E5]" />
      </div>

      {/* PARTE INFERIOR */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          <p className="text-[13px] text-[#666666]">
            © {currentYear} {platformName} Todos os direitos reservados.{' '}
            <span className="hidden sm:inline">•</span>{' '}
            <span className="block sm:inline">CNPJ: 68.413.252/0001-86</span>
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px]">
            <Link href="/privacidade" className="text-[#666666] hover:text-[#002147] transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/termos" className="text-[#666666] hover:text-[#002147] transition-colors">
              Termos de Uso
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/lgpd" className="text-[#666666] hover:text-[#002147] transition-colors">
              LGPD
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/cookies" className="text-[#666666] hover:text-[#002147] transition-colors">
              Cookies
            </Link>
            <span className="text-[#D4AF37]">•</span>
            <Link href="/mapa" className="text-[#666666] hover:text-[#002147] transition-colors">
              Mapa do Site
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
