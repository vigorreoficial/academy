'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Plus, 
  FileUp, 
  Sparkles,
  Users,
  Calendar,
  Star,
  ChevronRight,
  Flame,
  Trophy
} from 'lucide-react'
import { mockCursos, mockStats } from '@/lib/mock-data'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  const cursosEmAndamento = mockCursos.filter(c => c.status === 'publicado').slice(0, 3)
  const xpTotal = 2450

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
            Olá, {user?.name || 'Usuário'} 👋
          </h1>
          <p className="text-[#6B7280]">Continue aprendendo e evoluindo sua carreira</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#D4AF37] text-white px-4 py-1.5 flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Nível Bronze
          </Badge>
          <Badge variant="outline" className="border-[#E5E7EB] flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            7 dias
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0A2540]/10">
              <BookOpen className="w-6 h-6 text-[#0A2540]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{mockStats.cursosEmAndamento}</p>
              <p className="text-sm text-[#6B7280]">Em andamento</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{mockStats.certificados}</p>
              <p className="text-sm text-[#6B7280]">Certificados</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#1E3A8A]/10">
              <Clock className="w-6 h-6 text-[#1E3A8A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{mockStats.horasTreinadas}h</p>
              <p className="text-sm text-[#6B7280]">Horas treinadas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#16A34A]/10">
              <TrendingUp className="w-6 h-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{mockStats.cursosConcluidos}</p>
              <p className="text-sm text-[#6B7280]">Concluídos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card className="border-[#E5E7EB] rounded-2xl shadow-sm mb-8">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0A2540]">XP para próximo nível</span>
            <span className="text-sm text-[#6B7280]">{xpTotal} / 3000 XP</span>
          </div>
          <Progress value={(xpTotal / 3000) * 100} className="h-2 bg-[#E5E7EB]" />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[#6B7280]">Nível Bronze</span>
            <span className="text-xs text-[#6B7280]">Próximo: Prata</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-[#0A2540]">Criar curso com IA</CardTitle>
            <p className="text-[#6B7280] text-sm">
              Faça upload de um documento e crie um curso completo com IA
            </p>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/cursos/novo">
              <Button className="w-full bg-[#0A2540] hover:bg-[#1E3A8A] text-white rounded-xl">
                <FileUp className="w-4 h-4 mr-2" />
                Criar agora
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-[#0A2540]">Explorar catálogo</CardTitle>
            <p className="text-[#6B7280] text-sm">
              Descubra novos cursos e trilhas de aprendizagem
            </p>
          </CardHeader>
          <CardContent>
            <Link href="/cursos">
              <Button variant="outline" className="w-full border-[#E5E7EB] text-[#0A2540] rounded-xl">
                Ver catálogo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Cursos em andamento */}
      <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A2540]">Seus cursos</CardTitle>
            <Link href="/dashboard/cursos">
              <Button variant="ghost" className="text-[#D4AF37] hover:text-[#C49F27]">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cursosEmAndamento.length === 0 ? (
            <div className="text-center py-8 text-[#6B7280]">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Você ainda não está matriculado em nenhum curso</p>
              <Link href="/cursos">
                <Button variant="link" className="text-[#D4AF37] mt-2">
                  Explorar catálogo
                </Button>
              </Link>
            </div>
          ) : (
            cursosEmAndamento.map((curso) => (
              <div key={curso.id} className="border border-[#E5E7EB] rounded-xl p-4 hover:border-[#D4AF37]/30 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0A2540]/10 flex items-center justify-center text-[#0A2540] font-bold">
                      {curso.titulo.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A2540]">{curso.titulo}</h4>
                      <p className="text-sm text-[#6B7280]">{curso.categoria}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#0A2540]">75%</span>
                </div>
                <Progress value={75} className="h-1.5 mt-3 bg-[#E5E7EB]" />
                <Link href={`/dashboard/cursos/${curso.id}`} className="mt-3 inline-block">
                  <Button size="sm" variant="outline" className="border-[#E5E7EB] text-[#0A2540] rounded-full">
                    Continuar
                  </Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
