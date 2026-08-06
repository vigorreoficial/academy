'use client'

import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { calcularNivel, calcularProximoNivel, calcularProgressoNivel, NIVEIS } from '@/lib/gamification'
import { Trophy, Sparkles } from 'lucide-react'

interface XPBarProps {
  xpTotal: number
  className?: string
}

export function XPBar({ xpTotal, className }: XPBarProps) {
  const nivelAtual = calcularNivel(xpTotal)
  const proximoNivel = calcularProximoNivel(xpTotal)
  const progresso = calcularProgressoNivel(xpTotal)

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">{nivelAtual.icone}</span>
          <span className="font-medium" style={{ color: nivelAtual.cor }}>
            Nível {nivelAtual.nome}
          </span>
        </div>
        {proximoNivel ? (
          <span className="text-muted-foreground">
            {xpTotal} / {proximoNivel.xpMinimo} XP
          </span>
        ) : (
          <span className="text-muted-foreground">
            🏆 Max Level!
          </span>
        )}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Progress value={progresso} className="h-3" />
              {progresso >= 100 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {proximoNivel 
                ? `${xpTotal} de ${proximoNivel.xpMinimo} XP para ${proximoNivel.nome}`
                : '🏆 Nível máximo alcançado!'
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {proximoNivel && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Faltam {proximoNivel.xpMinimo - xpTotal} XP</span>
          <span>Próximo nível: {proximoNivel.icone} {proximoNivel.nome}</span>
        </div>
      )}
    </div>
  )
}
