'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Upload, Sparkles, FileText } from 'lucide-react'

export default function NewCoursePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const generateCourse = async () => {
    setLoading(true)
    try {
      // Simular geração de curso
      await new Promise(resolve => setTimeout(resolve, 3000))

      setGeneratedContent({
        title: 'Curso de Liderança e Gestão de Equipes',
        description: 'Aprenda a liderar equipes de alta performance',
        modules: [
          {
            title: 'Fundamentos da Liderança',
            lessons: ['Introdução à Liderança', 'Estilos de Liderança'],
          },
          {
            title: 'Gestão de Equipes',
            lessons: ['Motivação', 'Comunicação Eficaz'],
          },
        ],
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
            <span className="text-xl font-bold text-vigorre-blue">Criar novo curso</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="ia" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ia" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Criar com IA
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload de arquivo
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Criar manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ia">
            <Card>
              <CardHeader>
                <CardTitle>Gerar curso com IA</CardTitle>
                <CardDescription>
                  Descreva o curso que você deseja criar ou faça upload de um documento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Descrição do curso</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Ex: Crie um curso de 20 horas sobre Gestão de Pessoas com foco em liderança, comunicação e desenvolvimento de equipes para o agronegócio..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Ou faça upload de um documento</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Input
                      type="file"
                      accept=".pdf,.docx,.pptx,.txt,.epub"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p>Clique para fazer upload</p>
                      <p className="text-xs mt-1">PDF, DOCX, PPTX, TXT, EPUB</p>
                      {file && (
                        <p className="text-sm text-vigorre-blue mt-2">
                          📄 {file.name}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <Button
                  onClick={generateCourse}
                  disabled={loading || (!prompt && !file)}
                  className="w-full bg-vigorre-gold hover:bg-vigorre-gold/90 text-white"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Gerando curso...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Gerar curso com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload de arquivo</CardTitle>
                <CardDescription>
                  Faça upload de um PDF, DOCX, PPTX ou TXT para criar seu curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Input
                    type="file"
                    accept=".pdf,.docx,.pptx,.txt,.epub"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload-2"
                  />
                  <label
                    htmlFor="file-upload-2"
                    className="cursor-pointer"
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Solte seu arquivo aqui</p>
                    <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
                    {file && (
                      <p className="text-sm text-vigorre-blue mt-4">
                        📄 {file.name}
                      </p>
                    )}
                  </label>
                </div>
                <Button
                  className="w-full mt-4 bg-vigorre-gold hover:bg-vigorre-gold/90 text-white"
                  disabled={!file || loading}
                >
                  {loading ? 'Processando...' : 'Processar arquivo'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Criar curso manualmente</CardTitle>
                <CardDescription>
                  Crie seu curso do zero, módulo por módulo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do curso</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título do curso"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o conteúdo do curso"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-vigorre-blue hover:bg-vigorre-blue/90">
                  Criar curso
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview do curso gerado */}
        {generatedContent && (
          <Card className="mt-8 border-vigorre-gold border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-vigorre-gold" />
                Curso gerado com IA
              </CardTitle>
              <CardDescription>
                Revise o conteúdo gerado e clique em "Publicar" para disponibilizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{generatedContent.title}</h3>
                <p className="text-muted-foreground">{generatedContent.description}</p>
              </div>
              <div className="space-y-3">
                {generatedContent.modules.map((module: any, idx: number) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h4 className="font-semibold">Módulo {idx + 1}: {module.title}</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {module.lessons.map((lesson: string, lidx: number) => (
                        <li key={lidx}>• {lesson}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-vigorre-gold hover:bg-vigorre-gold/90 text-white">
                  Publicar curso
                </Button>
                <Button variant="outline" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
