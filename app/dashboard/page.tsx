'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { BookOpen, Award, Clock, TrendingUp, Plus, FileUp } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    cursosEmAndamento: 0,
    certificados: 0,
    horasTreinadas: 0,
    cursosConcluidos: 0,
  })

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigorre-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-vigorre-blue">Vigorre</span>
            <span className="text-sm text-vigorre-gold font-semibold">Academy™</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/cursos/novo">
              <Button className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo curso
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/')
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user?.user_metadata?.name || 'Aluno'} 👋</h1>
            <p className="text-muted-foreground">Bem-vindo à sua jornada de aprendizado</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em andamento</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cursosEmAndamento}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificados</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.certificados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas treinadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.horasTreinadas}h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cursosConcluidos}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Criar curso com IA</CardTitle>
              <CardDescription>
                Faça upload de um documento ou use um prompt para criar um curso completo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/cursos/novo">
                <Button className="w-full bg-vigorre-blue hover:bg-vigorre-blue/90">
                  <FileUp className="w-4 h-4 mr-2" />
                  Criar agora
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Meus certificados</CardTitle>
              <CardDescription>
                Visualize e compartilhe seus certificados de conclusão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/certificados">
                <Button variant="outline" className="w-full">
                  Ver certificados
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Cursos em andamento */}
        <Card>
          <CardHeader>
            <CardTitle>Seus cursos</CardTitle>
            <CardDescription>Continue de onde parou</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Você ainda não está matriculado em nenhum curso</p>
              <Link href="/cursos">
                <Button variant="link" className="mt-2">
                  Explorar catálogo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
