'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Download,
  Edit2,
  Users,
  Calendar,
  Star,
  Share2
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
  tempo_minimo_segundos: number
  concluida?: boolean
  tempo_assistido?: number
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
  descricao_curta: string
  carga_horaria: number
  nivel: string
  modalidade: string
  nr_aplicavel: string[]
  responsavel_tecnico: string
  possui_parte_pratica: boolean
  progresso_total: number
  categoria: string
  data_criacao: string
  alunos_matriculados: number
  avaliacao_media: number
  modulos: Modulo[]
}

export default function CursoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const [curso, setCurso] = useState<Curso | null>(null)
  const [loading, setLoading] = useState(true)
  const [aulaAtual, setAulaAtual] = useState<Aula | null>(null)
  const [moduloAtual, setModuloAtual] = useState<string | null>(null)
  const [progressoTotal, setProgressoTotal] = useState(0)

  useEffect(() => {
    const carregarCurso = async () => {
      try {
        // Tentar carregar do localStorage primeiro
        const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]')
        const cursoEncontrado = cursosSalvos.find((c: any) => c.id === params.id)
        
        if (cursoEncontrado) {
          // Converter dados do localStorage para o formato esperado
          const cursoFormatado: Curso = {
            id: cursoEncontrado.id,
            titulo: cursoEncontrado.titulo,
            descricao: cursoEncontrado.descricao || 'Curso completo para desenvolvimento profissional',
            descricao_curta: cursoEncontrado.subtitulo || cursoEncontrado.titulo,
            carga_horaria: cursoEncontrado.carga_horaria || 20,
            nivel: cursoEncontrado.nivel || 'INTERMEDIARIO',
            modalidade: 'EAD',
            nr_aplicavel: cursoEncontrado.nr_aplicavel || [],
            responsavel_tecnico: cursoEncontrado.responsavel_tecnico || 'Equipe Vigorre',
            possui_parte_pratica: cursoEncontrado.possui_parte_pratica || false,
            progresso_total: 45,
            categoria: 'Desenvolvimento',
            data_criacao: new Date().toISOString(),
            alunos_matriculados: 342,
            avaliacao_media: 4.8,
            modulos: cursoEncontrado.modulos || []
          }
          setCurso(cursoFormatado)
          setProgressoTotal(cursoFormatado.progresso_total)
          
          // Selecionar primeira aula não concluída
          for (const modulo of cursoFormatado.modulos) {
            for (const aula of modulo.aulas) {
              if (!aula.concluida) {
                setAulaAtual(aula)
                setModuloAtual(modulo.id)
                break
              }
            }
            if (aulaAtual) break
          }
          
          // Se todas concluídas ou sem aulas, pegar a primeira
          if (!aulaAtual && cursoFormatado.modulos.length > 0) {
            const primeiroModulo = cursoFormatado.modulos[0]
            if (primeiroModulo.aulas.length > 0) {
              setAulaAtual(primeiroModulo.aulas[0])
              setModuloAtual(primeiroModulo.id)
            }
          }
        } else {
          // Dados mock para fallback
          const cursoMock: Curso = {
            id: params.id as string,
            titulo: 'Liderança e Gestão de Equipes',
            descricao: 'Aprenda a liderar equipes de alta performance com técnicas modernas de gestão e desenvolvimento de pessoas',
            descricao_curta: 'Curso completo de liderança',
            carga_horaria: 20,
            nivel: 'INTERMEDIARIO',
            modalidade: 'EAD',
            nr_aplicavel: [],
            responsavel_tecnico: 'Dr. Carlos Mendes',
            possui_parte_pratica: false,
            progresso_total: 45,
            categoria: 'Liderança',
            data_criacao: '2026-01-15',
            alunos_matriculados: 342,
            avaliacao_media: 4.8,
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
                    tempo_minimo_segundos: 600,
                    concluida: true,
                    tempo_assistido: 620
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
                    tempo_minimo_segundos: 900,
                    concluida: false,
                    tempo_assistido: 350
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
                    tempo_minimo_segundos: 1200,
                    concluida: false,
                    tempo_assistido: 0
                  }
                ]
              }
            ]
          }
          setCurso(cursoMock)
          setProgressoTotal(cursoMock.progresso_total)
          
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
          
          if (!aulaAtual && cursoMock.modulos.length > 0) {
            setAulaAtual(cursoMock.modulos[0].aulas[0])
            setModuloAtual(cursoMock.modulos[0].id)
          }
        }
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
      const novoProgresso = Math.min(progressoTotal + 5, 100)
      setProgressoTotal(novoProgresso)
      
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
          // Todas concluídas
          alert('🎉 Parabéns! Você concluiu todas as aulas deste curso!')
        }
      }
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#5B7A9A]">Carregando curso...</p>
        </div>
      </div>
    )
  }

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-[#0D2745]">Curso não encontrado</h2>
          <p className="text-[#5B7A9A] mb-4">O curso que você está procurando não existe ou foi removido</p>
          <Link href="/dashboard">
            <Button className="bg-[#0D2745] hover:bg-[#14365E] text-white rounded-full">
              Voltar ao dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-[#0D2745]"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-[#0D2745] line-clamp-1">{curso.titulo}</h1>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="blue">{curso.nivel}</Badge>
                  <span className="text-[#5B7A9A]">•</span>
                  <span className="text-[#5B7A9A] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {curso.carga_horaria}h
                  </span>
                  {curso.nr_aplicavel.map((nr) => (
                    <Badge key={nr} variant="gold">{nr}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/cursos/${curso.id}/editar`}>
                <Button variant="outline" className="border-[#E2E8F0] text-[#0D2745] rounded-full">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar curso
                </Button>
              </Link>
              <div className="text-right">
                <div className="text-sm text-[#5B7A9A]">Progresso</div>
                <div className="font-semibold text-[#0D2745]">{Math.round(progressoTotal)}%</div>
              </div>
              <Progress value={progressoTotal} className="w-24 h-2 bg-[#F6F8FB]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Responsável Técnico */}
            {curso.responsavel_tecnico && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200 text-sm">
                <span className="text-blue-600 text-lg">👨‍🏫</span>
                <span className="text-blue-800">
                  <span className="font-medium">Responsável Técnico:</span> {curso.responsavel_tecnico}
                </span>
              </div>
            )}

            {/* Player */}
            <Card className="border-[#E2E8F0] overflow-hidden">
              <CardContent className="p-0">
                {aulaAtual ? (
                  <div>
                    <div className="aspect-video bg-[#0D2745] flex items-center justify-center text-white relative">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                          <Play className="w-10 h-10 text-white/60" />
                        </div>
                        <h3 className="text-xl font-semibold">{aulaAtual.titulo}</h3>
                        <p className="text-white/60 text-sm mt-1">
                          Duração: {aulaAtual.duracao_minutos} minutos
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <span>▶ Play</span>
                            <span>•</span>
                            <span>{aulaAtual.duracao_minutos}min</span>
                          </div>
                          <Button 
                            onClick={handleAulaConcluida}
                            className="bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Marcar como concluída
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#0D2745]">{aulaAtual.titulo}</h4>
                          <p className="text-sm text-[#5B7A9A]">{aulaAtual.descricao}</p>
                        </div>
                        <Badge variant="outline" className="border-[#E2E8F0] text-[#5B7A9A]">
                          {aulaAtual.concluida ? '✅ Concluída' : '⏳ Em andamento'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-[#0D2745] flex items-center justify-center text-white">
                    <div className="text-center">
                      <Award className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
                      <h3 className="text-xl font-semibold">Curso concluído! 🎉</h3>
                      <p className="text-white/60">Você completou todas as aulas</p>
                      <Button 
                        className="mt-4 bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full"
                        onClick={() => router.push(`/dashboard/certificados/${curso.id}`)}
                      >
                        Ver certificado
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sobre o curso */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-[#0D2745]">Sobre o curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#5B7A9A]">{curso.descricao}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#5B7A9A]">
                    <BookOpen className="w-4 h-4" />
                    {curso.modulos.length} módulos
                  </div>
                  <div className="flex items-center gap-2 text-[#5B7A9A]">
                    <Clock className="w-4 h-4" />
                    {curso.carga_horaria} horas
                  </div>
                  <div className="flex items-center gap-2 text-[#5B7A9A]">
                    <Users className="w-4 h-4" />
                    {curso.alunos_matriculados} alunos
                  </div>
                  <div className="flex items-center gap-2 text-[#5B7A9A]">
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    {curso.avaliacao_media} / 5.0
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Conteúdo do curso */}
          <div className="space-y-6">
            {/* Conteúdo */}
            <Card className="border-[#E2E8F0] sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg text-[#0D2745] flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Conteúdo do curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                {curso.modulos.map((modulo) => {
                  const aulasConcluidas = modulo.aulas.filter(a => a.concluida).length
                  const totalAulas = modulo.aulas.length
                  const progressoModulo = totalAulas > 0 ? (aulasConcluidas / totalAulas) * 100 : 0

                  return (
                    <div key={modulo.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-[#0D2745]">
                          Módulo {modulo.ordem}: {modulo.titulo}
                        </h4>
                        <span className="text-xs text-[#5B7A9A]">
                          {aulasConcluidas}/{totalAulas}
                        </span>
                      </div>
                      <Progress value={progressoModulo} className="h-1 bg-[#F6F8FB]" />
                      <div className="space-y-1">
                        {modulo.aulas.map((aula) => (
                          <button
                            key={aula.id}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                              aula.id === aulaAtual?.id
                                ? 'bg-[#D4AF37]/10 text-[#0D2745] border border-[#D4AF37]'
                                : aula.concluida
                                ? 'text-[#5B7A9A] hover:bg-[#F6F8FB]'
                                : 'hover:bg-[#F6F8FB] text-[#0D2745]'
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
                              <Play className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#5B7A9A] flex-shrink-0" />
                            )}
                            <span className="flex-1 truncate">{aula.titulo}</span>
                            <span className="text-xs text-[#5B7A9A] flex-shrink-0">
                              {aula.duracao_minutos}min
                            </span>
                            {aula.tempo_minimo_segundos > 0 && (
                              <span className="text-xs text-amber-500 flex-shrink-0" title="Tempo mínimo obrigatório">
                                ⏱
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Informações */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#0D2745] flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#5B7A9A]">Modalidade</span>
                  <span className="font-medium text-[#0D2745]">{curso.modalidade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B7A9A]">Nível</span>
                  <span className="font-medium text-[#0D2745]">{curso.nivel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B7A9A]">Categoria</span>
                  <span className="font-medium text-[#0D2745]">{curso.categoria}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5B7A9A]">Criado em</span>
                  <span className="font-medium text-[#0D2745]">{formatDate(curso.data_criacao)}</span>
                </div>
                {curso.nr_aplicavel.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#5B7A9A]">NRs aplicáveis</span>
                    <div className="flex gap-1">
                      {curso.nr_aplicavel.map((nr) => (
                        <Badge key={nr} variant="gold" className="text-xs">
                          {nr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ações rápidas */}
            <div className="space-y-2">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar curso
              </Button>
              <Button variant="outline" className="w-full border-[#E2E8F0] text-[#0D2745] rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Baixar material
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
