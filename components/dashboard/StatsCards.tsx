'use client'

import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Award, Clock, TrendingUp, Flame, Trophy } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    cursosEmAndamento: number
    certificados: number
    horasTreinadas: number
    cursosConcluidos: number
    racha: number
    nivel: string
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      icon: BookOpen,
      label: 'Em andamento',
      value: stats.cursosEmAndamento,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Award,
      label: 'Certificados',
      value: stats.certificados,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Horas treinadas',
      value: `${stats.horasTreinadas}h`,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: TrendingUp,
      label: 'Concluídos',
      value: stats.cursosConcluidos,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
