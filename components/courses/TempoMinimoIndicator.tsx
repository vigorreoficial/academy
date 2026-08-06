'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Clock, AlertCircle, CheckCircle } from 'lucide-react'

interface TempoMinimoIndicatorProps {
  tempoMinimoSegundos: number
  tempoAssistidoSegundos: number
  onTempoCompleto?: () => void
}

export function TempoMinimoIndicator({
  tempoMinimoSegundos,
  tempoAssistidoSegundos,
  onTempoCompleto,
}: TempoMinimoIndicatorProps) {
  const [progresso, setProgresso] = useState(0)
  const [completo, setCompleto] = useState(false)

  useEffect(() => {
    const p = Math.min(
      (tempoAssistidoSegundos / tempoMinimoSegundos) * 100,
      100
    )
    setProgresso(p)

    if (p >= 100 && !completo) {
      setCompleto(true)
      if (onTempoCompleto) onTempoCompleto()
    }
  }, [tempoAssistidoSegundos, tempoMinimoSegundos, completo, onTempoCompleto])

  const tempoRestante = Math.max(0, tempoMinimoSegundos - tempoAssistidoSegundos)
  const minutosRestantes = Math.floor(tempoRestante / 60)
  const segundosRestantes = Math.floor(tempoRestante % 60)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Tempo mínimo:</span>
          <span className="font-medium">
            {Math.floor(tempoMinimoSegundos / 60)} min
          </span>
        </div>
        {completo ? (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle className="w-4 h-4" />
            Concluído
          </span>
        ) : (
          <span className="text-amber-600 text-sm">
            Faltam {minutosRestantes}m {segundosRestantes}s
          </span>
        )}
      </div>
      <Progress
        value={progresso}
        className={`h-2 ${completo ? 'bg-green-100' : 'bg-amber-100'}`}
        indicatorClassName={completo ? 'bg-green-500' : 'bg-amber-500'}
      />
      {!completo && tempoRestante > 0 && (
        <div className="flex items-center gap-1 text-xs text-amber-600">
          <AlertCircle className="w-3 h-3" />
          <span>
            Continue assistindo para liberar a conclusão da aula
          </span>
        </div>
      )}
    </div>
  )
}
