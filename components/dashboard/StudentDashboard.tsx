'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  Users,
  Star,
  Flame,
  Trophy
} from 'lucide-react'
import Link from 'next/link'

interface StudentDashboardProps {
  userId: string
}

export function StudentDashboard({ userId }: StudentDashboardProps) {
  const [stats, setStats] = useState({
    cursosEmAndamento: 3,
    certificados: 5,
    horasTreinadas: 42,
    cursosConcluidos: 8,
    xpTotal: 2450,
    nivel: 'Bronze',
    proximoNivel: 'Prata',
    xpProximoNivel: 3000,
    rachaAtual: 7
  })

  const [cursosRecentes, setCursosRecentes] = useState([
    {
      id: '1',
      titulo: 'Liderança e Gestão de Equipes',
      progresso: 75,
      ultimoAcesso: '2026-08-05',
      status: 'em_andamento'
    },
    {
      id: '2',
      titulo: 'NR-10 - Segurança em Eletricidade',
      progresso: 45,
      ultimoAcesso: '2026-08-04',
      status: 'em_andamento'
    },
    {
      id: '3',
      titulo: 'Comunicação Eficaz',
      progresso: 100,
      ultimoAcesso: '2026-08-01',
      status: 'concluido'
    }
  ])

  const [certificadosRecentes, setCertificadosRecentes] = useState([
    {
      id: '1',
      curso: 'Gestão de Pessoas com IA',
      data: '2026-07-30',
      codigo: 'VIG-2026-001'
    },
    {
      id: '2',
      curso: 'Segurança no Trabalho - Básico',
      data: '2026-07-15',
      codigo: 'VIG-2026-002'
    }
  ])

  const [atividadesRecentes, setAtividadesRecentes] = useState([
    { id: '1', tipo: 'concluiu', descricao: 'Aula 3 - Estilos de Liderança', data: 'Hoje, 14:30' },
    { id: '2', tipo: 'iniciou', descricao: 'Módulo 2 - Gestão de Equipes', data: 'Hoje, 10:15' },
    { id: '3', tipo: 'certificado', descricao: 'Certificado emitido para NR-10', data: 'Ontem, 16:45' },
    { id: '4', tipo: 'concluiu', descricao: 'Quiz - Comunicação Eficaz', data: 'Ontem, 09:30' }
  ])

  const getNivelColor = (nivel: string) => {
    const cores = {
      'Bronze': 'bg-amber-600',
      'Prata': 'bg-gray-400',
      'Ouro': 'bg-yellow-500',
      'Platina': 'bg-blue-400',
      'Diamante': 'bg-cyan-400'
    }
    return cores[nivel as keyof typeof cores] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, Usuário 👋</h1>
          <p className="text-muted-foreground">Continue aprendendo e evoluindo sua carreira</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${getNivelColor(stats.nivel)} text-white px-4 py-1`}>
            <Trophy className="w-3 h-3 mr-1" />
            Nível {stats.nivel}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            {stats.rachaAtual} dias
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.cursosEmAndamento}</p>
              <p className="text-sm text-muted-foreground">Em andamento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.certificados}</p>
              <p className="text-sm text-muted-foreground">Certificados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.horasTreinadas}h</p>
              <p className="text-sm text-muted-foreground">Horas treinadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.cursosConcluidos}</p>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">XP para próximo nível</span>
            <span className="text-sm text-muted-foreground">
              {stats.xpTotal} / {stats.xpProximoNivel} XP
            </span>
          </div>
          <Progress value={(stats.xpTotal / stats.xpProximoNivel) * 100} className="h-2" />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">Nível {stats.nivel}</span>
            <span className="text-xs text-muted-foreground">Próximo: {stats.proximoNivel}</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cursos em andamento */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Seus cursos</CardTitle>
                <Link href="/dashboard/cursos">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cursosRecentes.map((curso) => (
                <div key={curso.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{curso.titulo}</span>
                      {curso.status === 'concluido' && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Concluído
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {curso.progresso}%
                    </span>
                  </div>
                  <Progress value={curso.progresso} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Último acesso: {curso.ultimoAcesso}</span>
                    <Link href={`/dashboard/cursos/${curso.id}`}>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Play className="w-3 h-3" />
                        Continuar
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Atividades recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividades recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {atividadesRecentes.map((atividade) => (
                <div key={atividade.id} className="flex items-start gap-3 text-sm">
                  {atividade.tipo === 'concluiu' && (
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  )}
                  {atividade.tipo === 'iniciou' && (
                    <Play className="w-4 h-4 text-blue-500 mt-0.5" />
                  )}
                  {atividade.tipo === 'certificado' && (
                    <Award className="w-4 h-4 text-amber-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p>{atividade.descricao}</p>
                    <p className="text-xs text-muted-foreground">{atividade.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certificados recentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Últimos certificados</CardTitle>
                <Link href="/dashboard/certificados">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificadosRecentes.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between border-b pb-2 text-sm">
                  <div>
                    <p className="font-medium">{cert.curso}</p>
                    <p className="text-xs text-muted-foreground">{cert.data}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {cert.codigo}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
