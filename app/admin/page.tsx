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
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Shield,
  PlusCircle,
  ChevronRight,
  Clock,
  FileText,
  UserCheck,
  GraduationCap
} from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Carregando...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Usuários', value: '342', icon: Users, color: '#0A2540', bg: 'bg-[#0A2540]/10' },
    { label: 'Cursos', value: '28', icon: BookOpen, color: '#D4AF37', bg: 'bg-[#D4AF37]/10' },
    { label: 'Certificados', value: '156', icon: Award, color: '#1E3A8A', bg: 'bg-[#1E3A8A]/10' },
    { label: 'Taxa de conclusão', value: '78%', icon: TrendingUp, color: '#16A34A', bg: 'bg-[#16A34A]/10' },
  ]

  const alerts = [
    { type: 'warning', message: '3 cursos com NR-10 precisam de atualização' },
    { type: 'info', message: '42 usuários não confirmaram e-mail' },
    { type: 'success', message: 'Novo certificado ISO 9001 emitido' },
  ]

  const recentActivities = [
    { user: 'João Silva', action: 'Concluiu "Liderança 360°"', time: '2h atrás' },
    { user: 'Maria Santos', action: 'Iniciou "NR-10"', time: '4h atrás' },
    { user: 'Carlos Souza', action: 'Solicitou certificado', time: '6h atrás' },
    { user: 'Ana Oliveira', action: 'Atualizou perfil', time: '8h atrás' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
            Dashboard Administrativo
          </h1>
          <p className="text-[#6B7280]">Bem-vindo, {user?.user_metadata?.name || 'Admin'} 👋</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#D4AF37] text-white">Admin</Badge>
          <Link href="/admin/cursos/novo">
            <Button className="bg-[#D4AF37] hover:bg-[#C49F27] text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo curso
            </Button>
          </Link>
        </div>
      </div>

      {/* Alertas */}
      <div className="grid gap-3 mb-8">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              alert.type === 'warning' ? 'bg-amber-50 border-amber-200' :
              alert.type === 'info' ? 'bg-blue-50 border-blue-200' :
              'bg-green-50 border-green-200'
            }`}
          >
            {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
            {alert.type === 'info' && <AlertTriangle className="w-5 h-5 text-blue-500" />}
            {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
            <span className="text-sm text-[#0A2540]">{alert.message}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-[#E5E7EB] rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">{stat.value}</p>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grid inferior */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Atividades recentes */}
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2540]">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 last:border-0">
                <div>
                  <p className="font-medium text-[#0A2540]">{item.user}</p>
                  <p className="text-sm text-[#6B7280]">{item.action}</p>
                </div>
                <span className="text-xs text-[#6B7280]">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ações rápidas */}
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
            <Link href="/admin/usuarios">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar usuários
              </Button>
            </Link>
            <Link href="/admin/certificados/emitir">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <FileText className="w-4 h-4 mr-2" />
                Emitir certificado
              </Button>
            </Link>
            <Link href="/admin/governanca/nr-1">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0A2540]">
                <Shield className="w-4 h-4 mr-2" />
                NR-1 Compliance
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
