'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  FileQuestion,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  UserCog,
  Building2,
  GraduationCap,
  FileText,
  ClipboardCheck,
  Database,
  TrendingUp,
  AlertTriangle,
  Scale,
  Zap,
  Key,
  LogOut
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MenuItem {
  label: string
  icon: React.ReactNode
  href: string
  subItems?: MenuItem[]
}

export function AdminSidebar() {
  const pathname = usePathname()
  const supabase = createClient()
  const [expanded, setExpanded] = useState<string[]>(['cursos', 'usuarios'])

  const toggleExpand = (key: string) => {
    setExpanded(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname?.startsWith(href)
  }

  const isExpanded = (key: string) => expanded.includes(key)

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/admin'
    },
    {
      label: 'Cursos',
      icon: <BookOpen className="w-5 h-5" />,
      href: '/admin/cursos',
      subItems: [
        { label: 'Todos os cursos', icon: <BookOpen className="w-4 h-4" />, href: '/admin/cursos' },
        { label: 'Criar novo curso', icon: <PlusCircle className="w-4 h-4" />, href: '/admin/cursos/novo' },
        { label: 'Categorias', icon: <Database className="w-4 h-4" />, href: '/admin/categorias' },
        { label: 'Matriz de treinamentos (NRs)', icon: <ClipboardCheck className="w-4 h-4" />, href: '/admin/matriz-treinamentos' },
      ]
    },
    {
      label: 'Usuários',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/usuarios',
      subItems: [
        { label: 'Todos os usuários', icon: <Users className="w-4 h-4" />, href: '/admin/usuarios' },
        { label: 'Alunos (B2C)', icon: <GraduationCap className="w-4 h-4" />, href: '/admin/usuarios/alunos' },
        { label: 'Colaboradores (B2B)', icon: <UserCog className="w-4 h-4" />, href: '/admin/usuarios/colaboradores' },
        { label: 'Empresas', icon: <Building2 className="w-4 h-4" />, href: '/admin/empresas' },
        { label: 'Instrutores', icon: <Users className="w-4 h-4" />, href: '/admin/instrutores' },
      ]
    },
    {
      label: 'Certificados',
      icon: <Award className="w-5 h-5" />,
      href: '/admin/certificados',
      subItems: [
        { label: 'Emitir certificado', icon: <FileText className="w-4 h-4" />, href: '/admin/certificados/emitir' },
        { label: 'Validar certificado', icon: <ShieldCheck className="w-4 h-4" />, href: '/admin/certificados/validar' },
        { label: 'Histórico de emissões', icon: <Database className="w-4 h-4" />, href: '/admin/certificados/historico' },
      ]
    },
    {
      label: 'Avaliações',
      icon: <FileQuestion className="w-5 h-5" />,
      href: '/admin/avaliacoes',
      subItems: [
        { label: 'Banco de questões', icon: <Database className="w-4 h-4" />, href: '/admin/avaliacoes/questoes' },
        { label: 'Criar avaliação', icon: <PlusCircle className="w-4 h-4" />, href: '/admin/avaliacoes/nova' },
        { label: 'Resultados', icon: <BarChart3 className="w-4 h-4" />, href: '/admin/avaliacoes/resultados' },
      ]
    },
    {
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/admin/analytics',
      subItems: [
        { label: 'People Analytics', icon: <TrendingUp className="w-4 h-4" />, href: '/admin/analytics/people' },
        { label: 'Relatórios gerenciais', icon: <FileText className="w-4 h-4" />, href: '/admin/analytics/relatorios' },
        { label: 'Indicadores de RH', icon: <ClipboardCheck className="w-4 h-4" />, href: '/admin/analytics/indicadores' },
        { label: 'IA Preditiva', icon: <Zap className="w-4 h-4" />, href: '/admin/analytics/ia' },
      ]
    },
    {
      label: 'Governança e Compliance',
      icon: <ShieldCheck className="w-5 h-5" />,
      href: '/admin/governanca',
      subItems: [
        { label: 'NR-1 Compliance', icon: <ShieldCheck className="w-4 h-4" />, href: '/admin/governanca/nr-1' },
        { label: 'Auditoria', icon: <ClipboardCheck className="w-4 h-4" />, href: '/admin/governanca/auditoria' },
        { label: 'Gestão de Riscos', icon: <AlertTriangle className="w-4 h-4" />, href: '/admin/governanca/riscos' },
        { label: 'ESG', icon: <Scale className="w-4 h-4" />, href: '/admin/governanca/esg' },
      ]
    },
    {
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      href: '/admin/configuracoes',
      subItems: [
        { label: 'Gerais', icon: <Settings className="w-4 h-4" />, href: '/admin/configuracoes/gerais' },
        { label: 'Integrações (API)', icon: <Key className="w-4 h-4" />, href: '/admin/configuracoes/integracoes' },
        { label: 'LGPD', icon: <ShieldCheck className="w-4 h-4" />, href: '/admin/configuracoes/lgpd' },
        { label: 'Logs', icon: <Database className="w-4 h-4" />, href: '/admin/configuracoes/logs' },
      ]
    }
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const key = item.href.replace('/admin/', '').replace('/', '') || 'dashboard'
    const isItemExpanded = isExpanded(key)

    return (
      <div key={item.href} className={depth > 0 ? 'ml-4' : ''}>
        {hasSubItems ? (
          <div>
            <button
              onClick={() => toggleExpand(key)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive(item.href) ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0A2540]'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={isActive(item.href) ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {isItemExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {isItemExpanded && (
              <div className="mt-1 space-y-0.5">
                {item.subItems?.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 text-sm rounded-xl transition-all duration-200 ml-2",
                      isActive(subItem.href)
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                        : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0A2540]'
                    )}
                  >
                    <span className={isActive(subItem.href) ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                      {subItem.icon}
                    </span>
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
              isActive(item.href)
                ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0A2540]'
            )}
          >
            <span className={isActive(item.href) ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        )}
      </div>
    )
  }

  return (
    <aside className="w-[280px] min-h-screen bg-white border-r border-[#E5E7EB] fixed left-0 top-0 z-30 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] flex items-center justify-center text-white font-extrabold text-lg">
            V
          </div>
          <div>
            <div className="font-extrabold text-[16px] uppercase" style={{ fontFamily: 'Poppins' }}>
              VIGORRE
            </div>
            <div className="text-[11px] tracking-widest font-semibold text-[#D4AF37] uppercase">
              Admin
            </div>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E5E7EB] space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-[#6B7280] hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sair
        </Button>
        <div className="text-[11px] text-center text-[#6B7280]">
          Vigorre Academy v1.0
        </div>
      </div>
    </aside>
  )
}
