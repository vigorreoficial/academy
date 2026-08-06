'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, BookOpen, Award, BarChart3, TrendingUp,
  AlertTriangle, CheckCircle, Shield, PlusCircle,
  ChevronRight, Clock, FileText, UserCheck, GraduationCap
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">
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
    </div>
  )
}
