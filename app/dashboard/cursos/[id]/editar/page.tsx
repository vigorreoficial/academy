'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CourseEditor } from '@/components/courses/CourseEditor'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function EditarCursoPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [curso, setCurso] = useState<any>(null)

  useEffect(() => {
    // Carregar curso do localStorage
    const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]')
    const cursoEncontrado = cursosSalvos.find((c: any) => c.id === params.id)
    
    if (cursoEncontrado) {
      // Converter dados para o formato do editor
      setCurso({
        titulo: cursoEncontrado.titulo,
        descricao: cursoEncontrado.descricao,
        carga_horaria: cursoEncontrado.carga_horaria,
        modulos: cursoEncontrado.modulos || []
      })
    }
    setLoading(false)
  }, [params.id])

  const handleSave = (data: any) => {
    // Salvar no localStorage
    const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]')
    const index = cursosSalvos.findIndex((c: any) => c.id === params.id)
    
    if (index !== -1) {
      cursosSalvos[index] = {
        ...cursosSalvos[index],
        ...data,
        atualizado_em: new Date().toISOString()
      }
      localStorage.setItem('cursos', JSON.stringify(cursosSalvos))
    }
    
    alert('Curso atualizado com sucesso!')
    router.push(`/dashboard/cursos/${params.id}`)
  }

  const handleCancel = () => {
    router.push(`/dashboard/cursos/${params.id}`)
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
          <Link href="/dashboard" className="mt-4 inline-block text-[#2A7BD8] hover:underline">
            Voltar para o dashboard
          </Link>
        </div>
      </div>
    )
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
            <span className="text-xl font-bold text-[#0D2745]">Editar curso</span>
            <Badge variant="gold" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Editor avançado
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <CourseEditor 
          initialData={curso}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </div>
  )
}
