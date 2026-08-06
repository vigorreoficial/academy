'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VideoPlayer } from '@/components/courses/VideoPlayer'
import { createClient } from '@/lib/supabase/client'
import { 
  ArrowLeft, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle, 
  Circle,
  Lock,
  Play,
  FileText,
  Download
} from 'lucide-react'

interface Aula {
  id: string
  titulo: string
  descricao: string
  tipo: string
  video_url: string
  duracao_minutos: number
  ordem: number
  is_obrigatorio: boolean
  concluida?: boolean
}

interface Modulo {
  id: string
  titulo: string
  descricao: string
  ordem: number
  aulas: Aula[]
}

interface Curso {
  id: string
  titulo: string
  descricao: string
  carga_horaria: number
  nivel: string
  modulos: Modulo[]
  progresso_total: number
}

export default function CursoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [curso, setCurso] = useState<Curso | null>(null)
  const [loading, setLoading] = useState(true)
  const [aulaAtual, setAulaAtual] = useState<Aula | null>(null)
  const [moduloAtual, setModuloAtual] = useState<string | null>(null)
  const [progressoTotal, setProgressoTotal] = useState(0)

  useEffect(() => {
    const carregarCurso = async () => {
      try {
        // Simular dados do curso
        const cursoMock: Curso = {
          id: params.id as string,
          titulo: 'Liderança e Gestão de Equipes',
          descricao: 'Aprenda a liderar equipes de alta performance com técnicas modernas de gestão',
          carga_horaria: 20,
          nivel: 'INTERMEDIARIO',
          progresso_total: 45,
          modulos: [
            {
              id: 'mod1',
              titulo: 'Fundamentos da Liderança',
              descricao: 'Conceitos básicos e estilos de liderança',
              ordem: 1,
              aulas: [
                {
                  id: 'aul1',
                  titulo: 'Introdução à Liderança',
                  descricao: 'O que é liderança e por que é importante',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 10,
                  ordem: 1,
                  is_obrigatorio: true,
                  concluida: true
                },
                {
                  id: 'aul2',
                  titulo: 'Estilos de Liderança',
                  descricao: 'Conheça os diferentes estilos e quando aplicá-los',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 15,
                  ordem: 2,
                  is_obrigatorio: true,
                  concluida: false
                }
              ]
            },
            {
              id: 'mod2',
              titulo: 'Gestão de Equipes',
              descricao: 'Técnicas para gerenciar e motivar equipes',
              ordem: 2,
              aulas: [
                {
                  id: 'aul3',
                  titulo: 'Motivação e Engajamento',
                  descricao: 'Como manter sua equipe motivada',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 20,
                  ordem: 1,
                  is_obrigatorio: true,
                  concluida: false
                }
              ]
            }
          ]
        }

        setCurso(cursoMock)
        
        // Selecionar primeira aula não concluída
        for (const modulo of cursoMock.modulos) {
          for (const aula of modulo.aulas) {
            if (!aula.concluida) {
              setAulaAtual(aula)
              setModuloAtual(modulo.id)
              break
            }
          }
          if (aulaAtual) break
        }

        // Se todas concluídas, pegar a primeira
        if (!aulaAtual && cursoMock.modulos.length > 0) {
          setAulaAtual(cursoMock.modulos[0].aulas[0])
          setModuloAtual(cursoMock.modulos[0].id)
        }

        setProgressoTotal(cursoMock.progresso_total)
      } catch (error) {
        console.error('Erro ao carregar curso:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarCurso()
  }, [params.id])

  const handleAulaConcluida = () => {
    if (aulaAtual) {
      // Marcar aula como concluída
      const novoProgresso = Math.min(progressoTotal + 5, 100)
      setProgressoTotal(novoProgresso)
      
      // Avançar para próxima aula
      if (curso) {
        let proximaAula: Aula | null = null
        let encontrouAtual = false
        
        for (const modulo of curso.modulos) {
          for (const aula of modulo.aulas) {
            if (encontrouAtual && !aula.concluida) {
              proximaAula = aula
              break
            }
            if (aula.id === aulaAtual.id) {
              encontrouAtual = true
              aula.concluida = true
            }
          }
          if (proximaAula) break
        }
        
        if (proximaAula) {
          setAulaAtual(proximaAula)
        } else {
          // Todas concluídas - mostrar certificado
          router.push(`/dashboard/certificados/${curso.id}`)
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigorre-gold"></div>
      </div>
    )
  }

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold">Curso não encontrado</h2>
          <Link href="/dashboard">
            <Button className="mt-4">Voltar ao dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{curso.titulo}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="blue">{curso.nivel}</Badge>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {curso.carga_horaria}h
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Progresso</div>
              <div className="font-semibold">{Math.round(progressoTotal)}%</div>
            </div>
            <Progress value={progressoTotal} className="w-32 h-2" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player */}
            <Card>
              <CardContent className="p-0">
                {aulaAtual ? (
                  <VideoPlayer
                    videoUrl={aulaAtual.video_url}
                    title={aulaAtual.titulo}
                    onComplete={handleAulaConcluida}
                  />
                ) : (
                  <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Award className="w-16 h-16 mx-auto mb-4 text-vigorre-gold" />
                      <h3 className="text-xl font-semibold">Curso concluído! 🎉</h3>
                      <p className="text-gray-400">Você completou todas as aulas</p>
                      <Button 
                        className="mt-4 bg-vigorre-gold text-white hover:bg-vigorre-gold/90"
                        onClick={() => router.push(`/dashboard/certificados/${curso.id}`)}
                      >
                        Ver certificado
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Descrição do curso */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o curso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{curso.descricao}</p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {curso.modulos.length} módulos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {curso.carga_horaria} horas
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Conteúdo do curso */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conteúdo do curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {curso.modulos.map((modulo) => (
                  <div key={modulo.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">
                        Módulo {modulo.ordem}: {modulo.titulo}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {modulo.aulas.filter(a => a.concluida).length}/{modulo.aulas.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {modulo.aulas.map((aula) => (
                        <button
                          key={aula.id}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            aula.id === aulaAtual?.id
                              ? 'bg-vigorre-blue/10 text-vigorre-blue'
                              : aula.concluida
                              ? 'text-muted-foreground hover:bg-gray-100'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => {
                            if (aula.concluida || aula.id === aulaAtual?.id) {
                              setAulaAtual(aula)
                            }
                          }}
                        >
                          {aula.concluida ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : aula.id === aulaAtual?.id ? (
                            <Play className="w-4 h-4 text-vigorre-blue flex-shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          )}
                          <span className="flex-1 truncate">{aula.titulo}</span>
                          <span className="text-xs text-muted-foreground">
                            {aula.duracao_minutos}min
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Materiais de apoio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Materiais de apoio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4 text-muted-foreground" />
                  <span>Apostila do curso (PDF)</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>Material complementar</span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
