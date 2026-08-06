'use client'

import { Badge as UIBadge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Lock, Unlock } from 'lucide-react'

interface BadgeCardProps {
  id: string
  nome: string
  descricao: string
  icone: string
  cor: string
  xpRecompensa: number
  desbloqueado: boolean
  progresso?: number
}

export function BadgeCard({
  id,
  nome,
  descricao,
  icone,
  cor,
  xpRecompensa,
  desbloqueado,
  progresso
}: BadgeCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`p-4 text-center transition-all ${
            desbloqueado 
              ? 'border-2 border-vigorre-gold shadow-lg hover:shadow-xl' 
              : 'opacity-50 grayscale hover:opacity-70'
          }`}>
            <CardContent className="p-0">
              <div 
                className={`text-4xl mb-2 transition-all ${
                  desbloqueado ? 'animate-bounce' : ''
                }`}
              >
                {icone}
              </div>
              <p className="text-sm font-medium">{nome}</p>
              <p className="text-xs text-muted-foreground">{descricao}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <UIBadge variant="outline" className="text-xs">
                  +{xpRecompensa} XP
                </UIBadge>
                {desbloqueado ? (
                  <UIBadge variant="success" className="text-xs">
                    <Unlock className="w-3 h-3 mr-1" />
                    Desbloqueado
                  </UIBadge>
                ) : (
                  <UIBadge variant="secondary" className="text-xs">
                    <Lock className="w-3 h-3 mr-1" />
                    Bloqueado
                  </UIBadge>
                )}
              </div>
              {progresso !== undefined && progresso < 100 && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Progresso: {progresso}%
                </div>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{nome}</p>
          <p className="text-sm text-muted-foreground">{descricao}</p>
          <p className="text-sm text-vigorre-gold">+{xpRecompensa} XP</p>
          {!desbloqueado && progresso !== undefined && (
            <p className="text-sm">Progresso: {progresso}%</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
