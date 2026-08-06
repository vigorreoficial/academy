'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  Settings,
  FileText,
  PlusCircle,
  ChevronRight,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Shield,
  Database,
  UserCog
} from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      // Verificar se é admin
      const role = user?.user_metadata?.role || 'user'
      if (role !== 'admin' && role !== 'super_admin') {
        // Se não for admin, redirecionar para dashboard do aluno
        router.push('/dashboard')
        return
      }
      
      setUser(user)
      setIsAdmin(true)
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Redirecionado pelo useEffect
  }

  // Dados mock para admin
  const adminStats = {
    totalUsuarios: 342,
    totalCursos: 28,
    totalCertificados: 156,
    taxaConclusao: 78,
    cursosAtivos: 12,
    usuariosAtivos: 89,
    questoesBanco: 245,
    empresasAtivas: 18
  }

  const atividadesRecentes = [
    { id: 1, usuario: 'João Silva', acao: 'Concluiu o curso "Liderança 360°"', data: '2h atrás' },
    { id: 2, usuario: 'Maria Santos', acao: 'Iniciou o curso "NR-10"', data: '4h atrás' },
    { id: 3, usuario: 'Carlos Souza', acao: 'Solicitou certificado', data: '6h atrás' },
    { id: 4, usuario: 'Ana Oliveira', acao: 'Atualizou perfil', data: '8h atrás' },
  ]

  const alertas = [
    { id: 1, tipo: 'warning', mensagem: '3 cursos com NR-10 precisam de atualização', link: '/admin/cursos' },
    { id: 2, tipo: 'info', mensagem: '42 usuários não confirmaram e-mail', link: '/admin/usuarios' },
    { id: 3, tipo: 'success', mensagem: 'Novo certificado ISO 9001 emitido', link: '/admin/certificados' },
  ]

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-3xl font-bold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
              Painel Administrativo
            </h1>
            <Badge variant="gold" className="ml-2">ADMIN</Badge>
          </div>
          <p className="text-[#6B7280]">Gerencie todos os aspectos da plataforma Vigorre Academy</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/cursos/novo">
            <Button className="bg-[#D4AF37] hover:bg-[#C49F27] text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo curso
            </Button>
          </Link>
        </div>
      </div>

      {/* Alertas */}
      {alertas.length > 0 && (
        <div className="grid gap-3 mb-8">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`p-4 rounded-xl border flex items-center justify-between ${
                alerta.tipo === 'warning' ? 'bg-amber-50 border-amber-200' :
                alerta.tipo === 'info' ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {alerta.tipo === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {alerta.tipo === 'info' && <AlertTriangle className="w-5 h-5 text-blue-500" />}
                {alerta.tipo === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                <span className="text-sm font-medium text-[#0A2540]">{alerta.mensagem}</span>
              </div>
              <Link href={alerta.link}>
                <Button variant="ghost" size="sm" className="text-[#0A2540]">
                  Ver
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0A2540]/10">
              <Users className="w-6 h-6 text-[#0A2540]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{adminStats.totalUsuarios}</p>
              <p className="text-sm text-[#6B7280]">Usuários</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{adminStats.totalCursos}</p>
              <p className="text-sm text-[#6B7280]">Cursos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#1E3A8A]/10">
              <Award className="w-6 h-6 text-[#1E3A8A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{adminStats.totalCertificados}</p>
              <p className="text-sm text-[#6B7280]">Certificados</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#16A34A]/10">
              <TrendingUp className="w-6 h-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{adminStats.taxaConclusao}%</p>
              <p className="text-sm text-[#6B7280]">Taxa de conclusão</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/usuarios">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 text-center">
              <UserCog className="w-8 h-8 mx-auto text-[#0A2540] mb-2" />
              <h3 className="font-semibold text-[#0A2540]">Usuários</h3>
              <p className="text-sm text-[#6B7280]">Gerenciar contas</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/cursos">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-[#D4AF37] mb-2" />
              <h3 className="font-semibold text-[#0A2540]">Cursos</h3>
              <p className="text-sm text-[#6B7280]">Gerenciar catálogo</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/certificados">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto text-[#1E3A8A] mb-2" />
              <h3 className="font-semibold text-[#0A2540]">Certificados</h3>
              <p className="text-sm text-[#6B7280]">Emissão e validação</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/relatorios">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-[#16A34A] mb-2" />
              <h3 className="font-semibold text-[#0A2540]">Relatórios</h3>
              <p className="text-sm text-[#6B7280]">Métricas e análise</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Atividades Recentes */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2540]">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {atividadesRecentes.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 last:border-0">
                <div>
                  <p className="font-medium text-[#0A2540]">{item.usuario}</p>
                  <p className="text-sm text-[#6B7280]">{item.acao}</p>
                </div>
                <span className="text-xs text-[#6B7280]">{item.data}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2540]">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/cursos/novo">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <PlusCircle className="w-4 h-4 mr-2" />
                Criar novo curso
              </Button>
            </Link>
            <Link href="/admin/usuarios/novo">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <Users className="w-4 h-4 mr-2" />
                Adicionar usuário
              </Button>
            </Link>
            <Link href="/admin/matriz-treinamentos">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <Database className="w-4 h-4 mr-2" />
                Matriz de treinamentos (NRs)
              </Button>
            </Link>
            <Link href="/admin/configuracoes">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <Settings className="w-4 h-4 mr-2" />
                Configurações da plataforma
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
