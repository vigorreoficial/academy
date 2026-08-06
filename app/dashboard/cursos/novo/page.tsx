'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  X,
  BookOpen,
  Clock,
  Users
} from 'lucide-react'
import { extractTextFromFile, isSupportedFileType } from '@/lib/file-processor'
import { generateCourseFromFile, generateCourseFromPrompt, type GeneratedCourse } from '@/lib/course-generator'

export default function NewCoursePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [cursoGerado, setCursoGerado] = useState<GeneratedCourse | null>(null)
  const [step, setStep] = useState<'input' | 'gerando' | 'preview' | 'salvando'>('input')
  const [progresso, setProgresso] = useState(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      
      if (!isSupportedFileType(selectedFile)) {
        alert('Tipo de arquivo não suportado. Use PDF, DOCX, PPTX ou TXT.')
        return
      }

      setFile(selectedFile)
      
      try {
        const result = await extractTextFromFile(selectedFile)
        setFileContent(result.text)
      } catch (error) {
        console.error('Erro ao processar arquivo:', error)
        alert('Erro ao processar o arquivo. Tente novamente.')
      }
    }
  }

  const gerarCurso = async () => {
    if (!prompt && !fileContent) {
      alert('Descreva o curso ou faça upload de um documento')
      return
    }

    setLoading(true)
    setStep('gerando')

    // Simular progresso
    const interval = setInterval(() => {
      setProgresso(prev => Math.min(prev + 10, 90))
    }, 300)

    try {
      let curso: GeneratedCourse

      if (fileContent && file) {
        curso = await generateCourseFromFile(fileContent, file.name)
      } else if (prompt) {
        curso = await generateCourseFromPrompt(prompt)
      } else {
        throw new Error('Nenhum conteúdo fornecido')
      }

      setCursoGerado(curso)
      setStep('preview')
      setProgresso(100)
    } catch (error) {
      console.error('Erro ao gerar curso:', error)
      alert('Erro ao gerar curso. Tente novamente.')
      setStep('input')
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const salvarCurso = () => {
    // Salvar no localStorage para testes locais
    if (cursoGerado) {
      const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]')
      const novoCurso = {
        id: `curso-${Date.now()}`,
        ...cursoGerado,
        criado_em: new Date().toISOString(),
        status: 'rascunho'
      }
      cursosSalvos.push(novoCurso)
      localStorage.setItem('cursos', JSON.stringify(cursosSalvos))
      
      alert('Curso salvo com sucesso!')
      router.push('/dashboard')
    }
  }

  const removerArquivo = () => {
    setFile(null)
    setFileContent('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-[#0D2745]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="text-xl font-bold text-[#0D2745]">Criar novo curso</span>
          </div>
          {step === 'preview' && (
            <Badge variant="gold" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gerado por IA
            </Badge>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === 'input' && (
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                Criar curso com Inteligência Artificial
              </CardTitle>
              <CardDescription className="text-[#5B7A9A]">
                Descreva o curso ou faça upload de um documento (PDF, DOCX, PPTX, TXT)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt */}
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-[#0D2745] font-semibold">
                  📝 O que você quer aprender?
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Ex: Crie um curso de 20 horas sobre Gestão de Pessoas com foco em liderança, comunicação e desenvolvimento de equipes..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none border-[#E2E8F0] focus:border-[#2A7BD8]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E2E8F0]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#5B7A9A]">ou</span>
                </div>
              </div>

              {/* Upload */}
              <div>
                <Label className="text-[#0D2745] font-semibold">
                  📄 Upload de documento
                </Label>
                <div 
                  className={`mt-2 border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
                    file ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#E2E8F0] hover:border-[#2A7BD8]'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.pptx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="space-y-2">
                      <FileText className="w-10 h-10 mx-auto text-[#D4AF37]" />
                      <p className="font-medium text-[#0D2745]">{file.name}</p>
                      <p className="text-sm text-[#5B7A9A]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="success" className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Pronto para processar
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removerArquivo()
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 mx-auto text-[#5B7A9A] mb-2" />
                      <p className="text-sm text-[#5B7A9A]">
                        Clique para selecionar ou arraste um arquivo
                      </p>
                      <p className="text-xs text-[#5B7A9A] mt-1">
                        PDF, DOCX, PPTX, TXT
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={gerarCurso}
                disabled={loading || (!prompt && !file)}
                className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white text-lg py-6 rounded-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Gerando curso...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Gerar curso com IA
                  </>
                )}
              </Button>

              <p className="text-xs text-[#5B7A9A] text-center">
                A IA analisará seu conteúdo e criará um curso estruturado com módulos, aulas e avaliações
              </p>
            </CardContent>
          </Card>
        )}

        {step === 'gerando' && (
          <Card>
            <CardContent className="py-16 text-center">
              <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#0D2745] mb-2">Gerando seu curso...</h3>
              <p className="text-[#5B7A9A] max-w-md mx-auto">
                A IA está analisando seu conteúdo e criando uma estrutura completa de aprendizado
              </p>
              <div className="max-w-md mx-auto mt-6">
                <Progress value={progresso} className="h-2 bg-[#F6F8FB]" />
                <p className="text-xs text-[#5B7A9A] mt-2">
                  {progresso < 30 && '📖 Analisando conteúdo...'}
                  {progresso >= 30 && progresso < 60 && '🏗️ Criando estrutura do curso...'}
                  {progresso >= 60 && progresso < 90 && '📝 Gerando módulos e aulas...'}
                  {progresso >= 90 && '✅ Finalizando...'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'preview' && cursoGerado && (
          <div className="space-y-6">
            {/* Preview do curso */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  Curso gerado com IA
                </CardTitle>
                <CardDescription className="text-[#5B7A9A]">
                  Revise o conteúdo gerado e clique em "Publicar" para disponibilizar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Título */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0D2745]">{cursoGerado.titulo}</h2>
                  {cursoGerado.subtitulo && (
                    <p className="text-lg text-[#5B7A9A]">{cursoGerado.subtitulo}</p>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">{cursoGerado.nivel}</Badge>
                  <Badge variant="outline">{cursoGerado.carga_horaria}h</Badge>
                  {cursoGerado.nr_aplicavel.map((nr) => (
                    <Badge key={nr} variant="gold">{nr}</Badge>
                  ))}
                </div>

                {/* Objetivos */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#0D2745]">🎯 Objetivo Geral</h4>
                  <p className="text-[#5B7A9A]">{cursoGerado.objetivo_geral}</p>
                </div>

                {cursoGerado.objetivos_especificos.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0D2745]">📋 Objetivos Específicos</h4>
                    <ul className="list-disc list-inside text-[#5B7A9A] space-y-1">
                      {cursoGerado.objetivos_especificos.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Público-alvo */}
                {cursoGerado.publico_alvo && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0D2745]">👥 Público-alvo</h4>
                    <p className="text-[#5B7A9A]">{cursoGerado.publico_alvo}</p>
                  </div>
                )}

                {/* Competências */}
                {cursoGerado.competencias.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0D2745]">🏆 Competências desenvolvidas</h4>
                    <div className="flex flex-wrap gap-2">
                      {cursoGerado.competencias.map((comp, i) => (
                        <Badge key={i} variant="secondary">{comp}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Módulos */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#0D2745]">📚 Estrutura do curso</h4>
                  {cursoGerado.modulos.map((modulo, idx) => (
                    <div key={idx} className="border border-[#E2E8F0] rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-[#0D2745]">
                          Módulo {idx + 1}: {modulo.titulo}
                        </h5>
                        <Badge variant="outline">{modulo.aulas.length} aulas</Badge>
                      </div>
                      {modulo.descricao && (
                        <p className="text-sm text-[#5B7A9A] mt-1">{modulo.descricao}</p>
                      )}
                      <ul className="mt-2 space-y-1">
                        {modulo.aulas.map((aula, aidx) => (
                          <li key={aidx} className="flex items-center gap-2 text-sm text-[#5B7A9A]">
                            <span className="w-5 h-5 bg-[#F6F8FB] rounded-full text-xs flex items-center justify-center text-[#0D2745]">
                              {aidx + 1}
                            </span>
                            {aula.titulo}
                            <span className="text-xs text-[#5B7A9A]">({aula.duracao_minutos}min)</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Avaliação */}
                {cursoGerado.avaliacao.questoes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0D2745]">📝 Avaliação</h4>
                    <p className="text-sm text-[#5B7A9A]">
                      {cursoGerado.avaliacao.questoes.length} questões de múltipla escolha
                    </p>
                  </div>
                )}

                {/* Bibliografia */}
                {cursoGerado.bibliografia.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0D2745]">📖 Bibliografia</h4>
                    <ul className="list-disc list-inside text-sm text-[#5B7A9A]">
                      {cursoGerado.bibliografia.map((ref, i) => (
                        <li key={i}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-4 pt-4 border-t border-[#E2E8F0]">
                  <Button
                    onClick={salvarCurso}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Publicar curso
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStep('input')}
                    className="rounded-full border-[#E2E8F0] text-[#0D2745]"
                  >
                    Voltar e editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'salvando' && (
          <Card>
            <CardContent className="py-16 text-center">
              <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#0D2745] mb-2">Salvando curso...</h3>
              <p className="text-[#5B7A9A]">O curso está sendo criado no sistema</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
