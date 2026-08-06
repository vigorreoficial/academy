'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, BookOpen, Award } from 'lucide-react'

interface CourseCardProps {
  id: string
  title: string
  description: string
  thumbnail?: string
  cargaHoraria: number
  nivel: string
  progresso?: number
  status?: string
  certificado?: boolean
  categoria?: string
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  cargaHoraria,
  nivel,
  progresso = 0,
  status = 'disponivel',
  certificado = true,
  categoria,
}: CourseCardProps) {
  const isMatriculado = progresso > 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {thumbnail && (
        <div className="aspect-video bg-gray-100 relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          {certificado && (
            <Badge className="absolute top-2 right-2 bg-[#D4AF37] text-white">
              <Award className="w-3 h-3 mr-1" />
              Certificado
            </Badge>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
          <Badge variant="outline">{nivel}</Badge>
        </div>
        {categoria && (
          <Badge variant="secondary" className="text-xs w-fit">
            {categoria}
          </Badge>
        )}
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cargaHoraria}h</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>Módulos</span>
          </div>
        </div>
        {isMatriculado && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progresso</span>
              <span>{Math.round(progresso)}%</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isMatriculado ? (
          <Link href={`/dashboard/cursos/${id}`} className="w-full">
            <Button className="w-full bg-[#0D2745] hover:bg-[#14365E]">
              {progresso >= 100 ? 'Ver certificado' : 'Continuar'}
            </Button>
          </Link>
        ) : (
          <Link href={`/cursos/${id}`} className="w-full">
            <Button className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white">
              Ver curso
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
