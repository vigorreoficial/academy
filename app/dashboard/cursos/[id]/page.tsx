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
import { TempoMinimoIndicator } from '@/components/courses/TempoMinimoIndicator'
import { PartePraticaForm } from '@/components/courses/PartePraticaForm'
import { NRBadge } from '@/components/courses/NRBadge'
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
  Download,
  AlertTriangle,
  Shield,
  GraduationCap
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
  carga_horaria: number
  nivel: string
  nr_aplicavel: string[]
  modalidade: string
  responsavel_tecnico: string
  possui_parte_pratica: boolean
  progresso_total: number
  modulos: Modulo[]
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
  const [tempoMinimoOk, setTempoMinimoOk] = useState(false)

  useEffect(() => {
    const carregarCurso = async () => {
      try {
        // Simular dados do curso com NR-1
        const cursoMock: Curso = {
          id: params.id as string,
          titulo: 'Segurança em Instalações Elétricas - NR-10',
          descricao: 'Curso completo de segurança em instalações elétricas conforme NR-10',
          carga_horaria: 40,
          nivel: 'AVANCADO',
          nr_aplicavel: ['NR-10', 'NR-1'],
          modalidade: 'EAD',
          responsavel_tecnico: 'Dr. Carlos Mendes - Eng. Eletricista CREA 123456',
          possui_parte_pratica: true,
          progresso_total: 45,
          modulos: [
            {
              id: 'mod1',
              titulo: 'Fundamentos da NR-10',
              descricao: 'Conceitos básicos e legislação',
              ordem: 1,
              aulas: [
                {
                  id: 'aul1',
                  titulo: 'Introdução à NR-10',
                  descricao: 'O que é a NR-10 e sua aplicação',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 15,
                  ordem: 1,
                  is_obrigatorio: true,
                  tempo_minimo_segundos: 600,
                  concluida: true,
                  tempo_assistido: 620
                },
                {
                  id: 'aul2',
                  titulo: 'Riscos Elétricos',
                  descricao: 'Identificação e avaliação de riscos',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 20,
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
              titulo: 'Medidas de Controle',
              descricao: 'Proteção coletiva e individual',
              ordem: 2,
              aulas: [
                {
                  id: 'aul3',
                  titulo: 'EPIs para eletricidade',
                  descricao: 'Equipamentos de proteção individual',
                  tipo: 'video',
                  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duracao_minutos: 25,
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

  const handleTempoMinimoCompleto = () => {
    setTempoMinimoOk(true)
  }

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
          setTempoMinimoOk(false)
        } else {
          // Verificar se tem parte prática
          if (curso.possui_parte_pratica) {
            // Mostrar formulário de parte prática
            // Implementar navegação para página de parte prática
          } else {
            router.push(`/dashboard/certificados/${curso.id}`)
          }
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
              <div className="flex items-center gap-2 text-sm">
                <NRBadge nrs={curso.nr_aplicavel} size="sm" />
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{curso.modalidade}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
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
            {/* Responsável Técnico */}
            {curso.responsavel_tecnico && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">
                  <span className="font-medium">Responsável Técnico:</span> {curso.responsavel_tecnico}
                </span>
              </div>
            )}

            {/* Player */}
            <Card>
              <CardContent className="p-0">
                {aulaAtual ? (
                  <>
                    <VideoPlayer
                      videoUrl={aulaAtual.video_url}
                      title={aulaAtual.titulo}
                      onProgress={(progress) => {
                        // Atualizar tempo assistido
                      }}
                      onComplete={handleAulaConcluida}
                    />
                    <div className="p-4 border-t">
                      <TempoMinimoIndicator
                        tempoMinimoSegundos={aulaAtual.tempo_minimo_segundos}
                        tempoAssistidoSegundos={aulaAtual.tempo_assistido || 0}
                        onTempoCompleto={handleTempoMinimoCompleto}
                      />
                    </div>
                  </>
                ) : (
                  <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Award className="w-16 h-16 mx-auto mb-4 text-vigorre-gold" />
                      <h3 className="text-xl font-semibold">Curso concluído! 🎉</h3>
                      <p className="text-gray-400">Você completou todas as aulas</p>
                      {curso.possui_parte_pratica ? (
                        <div className="mt-4 text-amber-400 text-sm">
                          <AlertTriangle className="w-4 h-4 inline mr-1" />
                          Aguarde a validação da parte prática
                        </div>
                      ) : (
                        <Button 
                          className="mt-4 bg-vigorre-gold text-white hover:bg-vigorre-gold/90"
                          onClick={() => router.push(`/dashboard/certificados/${curso.id}`)}
                        >
                          Ver certificado
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parte Prática (quando necessário) */}
            {curso.possui_parte_pratica && (
              <PartePraticaForm
                cursoId={curso.id}
                aulaId={aulaAtual?.id || ''}
                onComplete={() => {
                  router.push(`/dashboard/certificados/${curso.id}`)
                }}
              />
            )}
          </div>

          {/* Sidebar - Conteúdo do curso */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Conteúdo do curso
                </CardTitle>
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
                              setTempoMinimoOk(false)
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
                          {aula.tempo_minimo_segundos > 0 && (
                            <span className="text-xs text-amber-500" title="Tempo mínimo obrigatório">
                              ⏱
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Informações NR */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Informações NR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Normas aplicáveis</span>
                  <NRBadge nrs={curso.nr_aplicavel} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Carga horária</span>
                  <span className="font-medium">{curso.carga_horaria}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Modalidade</span>
                  <span className="font-medium">{curso.modalidade}</span>
                </div>
                {curso.responsavel_tecnico && (
                  <div className="border-t pt-2 mt-2">
                    <p className="text-xs text-muted-foreground">Responsável Técnico</p>
                    <p className="text-xs font-medium">{curso.responsavel_tecnico}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
