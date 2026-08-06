'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Flame,
  Trophy,
  ChevronRight
} from 'lucide-react'

export default function AlunoDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [router, supabase])

  // Evita hydration mismatch
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Carregando...</p>
        </div>
      </div>
    )
  }

  // Proteção contra Promise/undefined (previne erro #423)
  const userName = String(user?.user_metadata?.name || user?.email?.split('@')[0] || 'Aluno')

  const stats = {
    cursosEmAndamento: 3,
    certificados: 5,
    horasTreinadas: 42,
    cursosConcluidos: 8
  }

  const cursosEmAndamento = [
    { id: '1', titulo: 'Liderança Estratégica 360°', progresso: 78, categoria: 'Liderança' },
    { id: '2', titulo: 'NR-10 - Segurança em Eletricidade', progresso: 45, categoria: 'Segurança' },
    { id: '3', titulo: 'Gestão de Pessoas com IA', progresso: 32, categoria: 'RH' },
  ]

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
            Olá, {userName} 👋
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0A2540]/10">
              <BookOpen className="w-6 h-6 text-[#0A2540]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{stats.cursosEmAndamento}</p>
              <p className="text-sm text-[#6B7280]">Em andamento</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{stats.certificados}</p>
              <p className="text-sm text-[#6B7280]">Certificados</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#1E3A8A]/10">
              <Clock className="w-6 h-6 text-[#1E3A8A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{stats.horasTreinadas}h</p>
              <p className="text-sm text-[#6B7280]">Horas treinadas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#16A34A]/10">
              <TrendingUp className="w-6 h-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2540]">{stats.cursosConcluidos}</p>
              <p className="text-sm text-[#6B7280]">Concluídos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link href="/dashboard/cursos/novo">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540]">Criar curso com IA</h3>
                <p className="text-sm text-[#6B7280]">Transforme um documento em curso</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] ml-auto" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/cursos">
          <Card className="border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#1E3A8A]/10">
                <BookOpen className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540]">Explorar catálogo</h3>
                <p className="text-sm text-[#6B7280]">Descubra novos cursos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6B7280] ml-auto" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Cursos em andamento */}
      <Card className="border-[#E5E7EB] rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A2540]">Meus cursos</CardTitle>
            <Link href="/dashboard/cursos">
              <Button variant="ghost" className="text-[#D4AF37] hover:text-[#C49F27]">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cursosEmAndamento.map((curso) => (
            <div key={curso.id} className="border border-[#E5E7EB] rounded-xl p-4 hover:border-[#D4AF37]/30 transition">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#0A2540]">{curso.titulo}</h4>
                  <p className="text-sm text-[#6B7280]">{curso.categoria}</p>
                </div>
                <span className="text-sm font-medium text-[#0A2540]">{curso.progresso}%</span>
              </div>
              <Progress value={Number(curso.progresso) || 0} className="h-1.5 mt-3 bg-[#E5E7EB]" />
              <Link href={`/dashboard/cursos/${curso.id}`} className="mt-3 inline-block">
                <Button size="sm" variant="outline" className="border-[#E5E7EB] text-[#0A2540] rounded-full">
                  Continuar
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
