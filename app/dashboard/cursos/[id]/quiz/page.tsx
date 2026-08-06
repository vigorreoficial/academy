'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuizPlayer } from '@/components/courses/QuizPlayer'
import { getQuizById, quizzesMock } from '@/lib/quiz-data'
import { ArrowLeft } from 'lucide-react'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Usar um quiz mock baseado no ID do curso
    const cursoId = params.id as string
    const quizIndex = parseInt(cursoId.slice(-1)) || 0
    
    // Pegar um quiz do banco mock
    const quizEncontrado = quizzesMock[quizIndex % quizzesMock.length]
    setQuiz(quizEncontrado)
    setLoading(false)
  }, [params.id])

  const handleComplete = (resultado: any) => {
    console.log('Resultado do quiz:', resultado)
    // Salvar resultado no localStorage
    const resultados = JSON.parse(localStorage.getItem('resultados_quiz') || '[]')
    resultados.push({
      cursoId: params.id,
      ...resultado,
      data: new Date().toISOString()
    })
    localStorage.setItem('resultados_quiz', JSON.stringify(resultados))
  }

  const handleCancel = () => {
    router.push(`/dashboard/cursos/${params.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#5B7A9A]">Carregando avaliação...</p>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-[#0D2745]">Avaliação não encontrada</h2>
          <p className="text-[#5B7A9A] mb-4">Este curso não possui uma avaliação disponível</p>
          <Link href={`/dashboard/cursos/${params.id}`}>
            <Button className="bg-[#0D2745] hover:bg-[#14365E] text-white rounded-full">
              Voltar para o curso
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB] py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-[#0D2745]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#0D2745]">Avaliação</h1>
            <p className="text-sm text-[#5B7A9A]">{quiz.titulo}</p>
          </div>
        </div>

        {/* Quiz Player */}
        <QuizPlayer
          quiz={quiz}
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}
