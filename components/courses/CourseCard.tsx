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
  thumbnail?: string | null
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
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-[#E2E8F0] bg-white">
      {thumbnail ? (
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
          {certificado && (
            <Badge className="absolute top-2 right-2 bg-[#D4AF37] text-white border-0">
              <Award className="w-3 h-3 mr-1" />
              Certificado
            </Badge>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-[#0D2745] to-[#2A7BD8] flex items-center justify-center relative">
          <span className="text-white text-4xl opacity-30">📚</span>
          {certificado && (
            <Badge className="absolute top-2 right-2 bg-[#D4AF37] text-white border-0">
              <Award className="w-3 h-3 mr-1" />
              Certificado
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold text-[#0D2745] line-clamp-1">
            {title}
          </CardTitle>
          <Badge variant="outline" className="text-xs whitespace-nowrap border-[#E2E8F0] text-[#5B7A9A]">
            {nivel}
          </Badge>
        </div>
        {categoria && (
          <Badge variant="secondary" className="text-xs w-fit bg-[#F6F8FB] text-[#5B7A9A] border-0">
            {categoria}
          </Badge>
        )}
        <CardDescription className="line-clamp-2 text-[#5B7A9A]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-[#5B7A9A]">
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
              <span className="text-[#5B7A9A]">Progresso</span>
              <span className="font-semibold text-[#0D2745]">{Math.round(progresso)}%</span>
            </div>
            <Progress value={progresso} className="h-2 bg-[#F6F8FB]" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {isMatriculado ? (
          <Link href={`/dashboard/cursos/${id}`} className="w-full">
            <Button className="w-full bg-[#0D2745] hover:bg-[#14365E] text-white rounded-full">
              {progresso >= 100 ? 'Ver certificado' : 'Continuar'}
            </Button>
          </Link>
        ) : (
          <Link href={`/cursos/${id}`} className="w-full">
            <Button className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full">
              Ver curso
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
