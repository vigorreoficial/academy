'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgeCard } from './BadgeCard'

interface ConquistasGridProps {
  badges: Array<{
    id: string
    nome: string
    descricao: string
    icone: string
    cor: string
    xpRecompensa: number
    desbloqueado: boolean
    progresso?: number
  }>
}

export function ConquistasGrid({ badges }: ConquistasGridProps) {
  const desbloqueadas = badges.filter(b => b.desbloqueado).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🏅 Conquistas
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {desbloqueadas} / {badges.length} desbloqueadas
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              id={badge.id}
              nome={badge.nome}
              descricao={badge.descricao}
              icone={badge.icone}
              cor={badge.cor}
              xpRecompensa={badge.xpRecompensa}
              desbloqueado={badge.desbloqueado}
              progresso={badge.progresso}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
