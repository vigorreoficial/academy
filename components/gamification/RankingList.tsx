'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Star, Crown } from 'lucide-react'

interface RankingUser {
  id: string
  nome: string
  nivel: string
  xp: number
  badges: number
  posicao: number
}

interface RankingListProps {
  usuarios: RankingUser[]
  usuarioId?: string
}

export function RankingList({ usuarios, usuarioId }: RankingListProps) {
  const getMedalha = (posicao: number) => {
    if (posicao === 0) return <Crown className="w-5 h-5 text-yellow-400" />
    if (posicao === 1) return <Medal className="w-5 h-5 text-gray-400" />
    if (posicao === 2) return <Medal className="w-5 h-5 text-amber-600" />
    return null
  }

  const getCorPosicao = (posicao: number) => {
    if (posicao === 0) return 'bg-yellow-100 border-yellow-300'
    if (posicao === 1) return 'bg-gray-100 border-gray-300'
    if (posicao === 2) return 'bg-amber-100 border-amber-300'
    return ''
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-vigorre-gold" />
          Ranking de Aprendizagem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
              usuario.id === usuarioId ? 'border-vigorre-gold bg-vigorre-gold/5' : ''
            } ${getCorPosicao(usuario.posicao)}`}
          >
            <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-muted-foreground">
              {usuario.posicao + 1}
            </div>

            <div className="flex-1 flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-vigorre-blue text-white">
                  {usuario.nome.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {usuario.nome}
                  {usuario.id === usuarioId && (
                    <Badge variant="gold" className="ml-2 text-xs">Você</Badge>
                  )}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Nível {usuario.nivel}</span>
                  <span>•</span>
                  <span>{usuario.xp} XP</span>
                  <span>•</span>
                  <span>{usuario.badges} badges</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getMedalha(usuario.posicao)}
              {usuario.posicao === 0 && (
                <Badge variant="gold" className="text-xs">🥇 1º</Badge>
              )}
              {usuario.posicao === 1 && (
                <Badge variant="secondary" className="text-xs">🥈 2º</Badge>
              )}
              {usuario.posicao === 2 && (
                <Badge variant="outline" className="text-xs">🥉 3º</Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
