'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Award,
  Send,
  RefreshCw
} from 'lucide-react'
import { Questao, Quiz, calcularNota } from '@/lib/quiz-data'

interface QuizPlayerProps {
  quiz: Quiz
  onComplete?: (resultado: { acertos: number; total: number; nota: number; aprovado: boolean }) => void
  onCancel?: () => void
}

export function QuizPlayer({ quiz, onComplete, onCancel }: QuizPlayerProps) {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [finalizado, setFinalizado] = useState(false)
  const [resultado, setResultado] = useState<any>(null)
  const [tempoRestante, setTempoRestante] = useState(quiz.tempo_limite_minutos * 60)
  const [quizIniciado, setQuizIniciado] = useState(false)
  const [mostrarExplicacao, setMostrarExplicacao] = useState<string | null>(null)

  const questaoAtual = quiz.questoes[indiceAtual]
  const totalQuestoes = quiz.questoes.length
  const respondidas = Object.keys(respostas).length
  const progresso = (respondidas / totalQuestoes) * 100

  // Timer
  useEffect(() => {
    if (!quizIniciado || finalizado) return
    
    const timer = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          handleFinalizar()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [quizIniciado, finalizado])

  const handleResposta = (questaoId: string, alternativa: number) => {
    setRespostas({ ...respostas, [questaoId]: alternativa })
  }

  const handleFinalizar = () => {
    const resultadoQuiz = calcularNota(
      Object.entries(respostas).map(([questaoId, resposta]) => ({ questaoId, resposta })),
      quiz.questoes
    )
    setResultado(resultadoQuiz)
    setFinalizado(true)
    
    if (onComplete) {
      onComplete({
        acertos: resultadoQuiz.acertos,
        total: resultadoQuiz.total,
        nota: resultadoQuiz.nota,
        aprovado: resultadoQuiz.aprovado
      })
    }
  }

  const handleProximo = () => {
    if (indiceAtual < totalQuestoes - 1) {
      setIndiceAtual(indiceAtual + 1)
      setMostrarExplicacao(null)
    }
  }

  const handleAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1)
      setMostrarExplicacao(null)
    }
  }

  const toggleExplicacao = (questaoId: string) => {
    setMostrarExplicacao(mostrarExplicacao === questaoId ? null : questaoId)
  }

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Tela de início
  if (!quizIniciado) {
    return (
      <Card className="border-[#E2E8F0]">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-[#0D2745]">{quiz.titulo}</h3>
          <p className="text-[#5B7A9A] mt-2">{quiz.descricao}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto text-sm">
            <div className="bg-[#F6F8FB] p-3 rounded-xl">
              <div className="text-[#5B7A9A]">Questões</div>
              <div className="font-bold text-[#0D2745]">{totalQuestoes}</div>
            </div>
            <div className="bg-[#F6F8FB] p-3 rounded-xl">
              <div className="text-[#5B7A9A]">Tempo</div>
              <div className="font-bold text-[#0D2745]">{quiz.tempo_limite_minutos} min</div>
            </div>
            <div className="bg-[#F6F8FB] p-3 rounded-xl">
              <div className="text-[#5B7A9A]">Nota mínima</div>
              <div className="font-bold text-[#0D2745]">{quiz.nota_minima}%</div>
            </div>
            <div className="bg-[#F6F8FB] p-3 rounded-xl">
              <div className="text-[#5B7A9A]">Tentativas</div>
              <div className="font-bold text-[#0D2745]">{quiz.max_tentativas}</div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 justify-center">
            <Button onClick={onCancel} variant="outline" className="border-[#E2E8F0]">
              Cancelar
            </Button>
            <Button onClick={() => setQuizIniciado(true)} className="bg-[#D4AF37] hover:bg-[#C49F27] text-white">
              Iniciar quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Tela de resultados
  if (finalizado && resultado) {
    const aprovado = resultado.aprovado

    return (
      <Card className="border-[#E2E8F0]">
        <CardHeader className={`border-b ${aprovado ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-center py-4">
            <Award className={`w-16 h-16 mx-auto mb-3 ${aprovado ? 'text-green-500' : 'text-red-500'}`} />
            <CardTitle className="text-2xl font-bold">
              {aprovado ? '🎉 Parabéns!' : '😔 Não foi desta vez'}
            </CardTitle>
            <p className="text-[#5B7A9A] mt-1">
              Você acertou {resultado.acertos} de {resultado.total} questões
            </p>
            <Badge variant={aprovado ? 'success' : 'destructive'} className="mt-2 text-lg px-4 py-1">
              {resultado.nota.toFixed(0)}% - {aprovado ? 'Aprovado' : 'Reprovado'}
            </Badge>
            {!aprovado && (
              <p className="text-sm text-[#5B7A9A] mt-2">
                Nota mínima: {quiz.nota_minima}% • Tentativas restantes: {quiz.max_tentativas - 1}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {quiz.questoes.map((q, idx) => {
              const resposta = respostas[q.id]
              const isRespondida = resposta !== undefined
              const isCorreta = resultado.detalhes.find((d: any) => d.questaoId === q.id)?.correta
              const respostaCorreta = resultado.detalhes.find((d: any) => d.questaoId === q.id)?.respostaCorreta
              const explicacao = resultado.detalhes.find((d: any) => d.questaoId === q.id)?.explicacao
              const mostrar = mostrarExplicacao === q.id

              return (
                <div key={q.id} className={`border rounded-xl p-4 ${
                  isCorreta ? 'border-green-200 bg-green-50' :
                  isRespondida ? 'border-red-200 bg-red-50' :
                  'border-[#E2E8F0] bg-[#F6F8FB]'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-[#5B7A9A] mt-0.5">
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-[#0D2745]">{q.enunciado}</p>
                      <div className="mt-2 space-y-1">
                        {q.alternativas.map((alt, aidx) => (
                          <div key={aidx} className="flex items-center gap-2 text-sm">
                            {aidx === respostaCorreta && (
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                            {aidx === resposta && !isCorreta && (
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                            {aidx !== respostaCorreta && aidx !== resposta && (
                              <span className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className={`
                              ${aidx === respostaCorreta ? 'font-medium text-green-700' : ''}
                              ${aidx === resposta && !isCorreta ? 'text-red-700' : ''}
                              ${!isRespondida ? 'text-[#5B7A9A]' : ''}
                            `}>
                              {alt}
                            </span>
                            {aidx === resposta && (
                              <Badge variant={isCorreta ? 'success' : 'destructive'} className="text-xs">
                                {isCorreta ? '✓ Sua resposta' : '✗ Sua resposta'}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => toggleExplicacao(q.id)}
                        className="text-sm text-[#2A7BD8] hover:underline mt-2"
                      >
                        {mostrar ? 'Ocultar explicação' : 'Ver explicação'}
                      </button>
                      {mostrar && explicacao && (
                        <div className="mt-2 p-3 bg-white rounded-lg border border-[#E2E8F0] text-sm">
                          <span className="font-medium">💡 Explicação:</span> {explicacao}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1 border-[#E2E8F0]"
              onClick={() => {
                setFinalizado(false)
                setResultado(null)
                setRespostas({})
                setIndiceAtual(0)
                setTempoRestante(quiz.tempo_limite_minutos * 60)
                setMostrarExplicacao(null)
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refazer quiz
            </Button>
            <Button
              className="flex-1 bg-[#D4AF37] hover:bg-[#C49F27] text-white"
              onClick={onCancel}
            >
              Sair
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Tela do quiz
  return (
    <Card className="border-[#E2E8F0]">
      <CardHeader className="border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-[#0D2745]">{quiz.titulo}</CardTitle>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#5B7A9A]">
              {respondidas}/{totalQuestoes} respondidas
            </span>
            <Progress value={progresso} className="w-24 h-2 bg-[#F6F8FB]" />
            <div className={`flex items-center gap-1 font-medium ${
              tempoRestante < 60 ? 'text-red-500' : 'text-[#0D2745]'
            }`}>
              <Clock className="w-4 h-4" />
              {formatarTempo(tempoRestante)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Indicadores */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#E2E8F0]">
              Questão {indiceAtual + 1} de {totalQuestoes}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#5B7A9A]">Peso: {questaoAtual.peso || 1}</span>
            <Badge variant="outline" className="border-[#E2E8F0]">
              {questaoAtual.nivel}
            </Badge>
          </div>
        </div>

        {/* Questão */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-[#0D2745]">{questaoAtual.enunciado}</p>
          
          <div className="space-y-3">
            {questaoAtual.alternativas.map((alternativa, index) => {
              const isSelected = respostas[questaoAtual.id] === index
              
              return (
                <button
                  key={index}
                  onClick={() => handleResposta(questaoAtual.id, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-sm'
                      : 'border-[#E2E8F0] hover:border-[#2A7BD8] hover:bg-[#F6F8FB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-[#E2E8F0]'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={isSelected ? 'font-medium text-[#0D2745]' : 'text-[#5B7A9A]'}>
                      {alternativa}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnterior}
              disabled={indiceAtual === 0}
              className="border-[#E2E8F0]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
          </div>
          <div className="flex gap-2">
            {indiceAtual < totalQuestoes - 1 ? (
              <Button
                onClick={handleProximo}
                className="bg-[#0D2745] hover:bg-[#14365E] text-white"
                disabled={respostas[questaoAtual.id] === undefined}
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleFinalizar}
                className="bg-[#D4AF37] hover:bg-[#C49F27] text-white"
                disabled={respondidas < totalQuestoes}
              >
                <Send className="w-4 h-4 mr-1" />
                Finalizar avaliação
              </Button>
            )}
          </div>
        </div>

        {respondidas < totalQuestoes && indiceAtual === totalQuestoes - 1 && (
          <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Responda todas as questões antes de finalizar
          </p>
        )}
      </CardContent>
    </Card>
  )
}
