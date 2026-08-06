'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CourseCard } from '@/components/courses/CourseCard'
import { createClient } from '@/lib/supabase/client'
import { Search, BookOpen, Clock, Award, TrendingUp } from 'lucide-react'

export default function CursosPage() {
  const supabase = createClient()
  const [cursos, setCursos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    const carregarCursos = async () => {
      try {
        // Dados mock para teste
        const cursosMock = [
          {
            id: '1',
            titulo: 'Liderança e Gestão de Equipes',
            descricao: 'Aprenda a liderar equipes de alta performance com técnicas modernas',
            carga_horaria: 20,
            nivel: 'INTERMEDIARIO',
            categoria: 'Liderança',
            thumb_url: null,
            certificado: true
          },
          {
            id: '2',
            titulo: 'Gestão de Pessoas com IA',
            descricao: 'Como a inteligência artificial está transformando a gestão de RH',
            carga_horaria: 15,
            nivel: 'AVANCADO',
            categoria: 'RH',
            thumb_url: null,
            certificado: true
          },
          {
            id: '3',
            titulo: 'Comunicação Eficaz',
            descricao: 'Domine a arte da comunicação para melhorar seus resultados',
            carga_horaria: 10,
            nivel: 'BASICO',
            categoria: 'Comunicação',
            thumb_url: null,
            certificado: false
          },
          {
            id: '4',
            titulo: 'NR-10 - Segurança em Eletricidade',
            descricao: 'Curso completo de segurança em instalações elétricas conforme NR-10',
            carga_horaria: 40,
            nivel: 'AVANCADO',
            categoria: 'Segurança',
            thumb_url: null,
            certificado: true
          },
          {
            id: '5',
            titulo: 'Gestão de Projetos Ágeis',
            descricao: 'Metodologias ágeis para gestão de projetos e equipes',
            carga_horaria: 16,
            nivel: 'INTERMEDIARIO',
            categoria: 'Gestão',
            thumb_url: null,
            certificado: true
          },
          {
            id: '6',
            titulo: 'Excel Avançado para Negócios',
            descricao: 'Domine as funcionalidades avançadas do Excel para análise de dados',
            carga_horaria: 12,
            nivel: 'INTERMEDIARIO',
            categoria: 'Tecnologia',
            thumb_url: null,
            certificado: false
          }
        ]
        setCursos(cursosMock)
      } catch (error) {
        console.error('Erro ao carregar cursos:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarCursos()
  }, [])

  const cursosFiltrados = cursos.filter(curso => {
    const matchSearch = curso.titulo.toLowerCase().includes(search.toLowerCase()) ||
                        curso.descricao.toLowerCase().includes(search.toLowerCase())
    const matchFiltro = filtro === 'todos' || curso.categoria === filtro
    return matchSearch && matchFiltro
  })

  const categorias = [...new Set(cursos.map(c => c.categoria))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0D2745]">Vigorre</span>
            <span className="text-sm text-[#D4AF37] font-semibold">Academy™</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[#0D2745]">Meu dashboard</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-[#0D2745] text-[#0D2745] hover:bg-[#0D2745] hover:text-white">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0D2745] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Catálogo de Cursos
          </h1>
          <p className="text-[#9BB8D9] max-w-2xl mx-auto text-lg">
            Explore nossos cursos desenvolvidos com IA e transforme seu conhecimento em performance estratégica
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        {/* Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5B7A9A] w-4 h-4" />
            <Input
              placeholder="Buscar cursos por título, descrição ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-[#E2E8F0] focus:border-[#2A7BD8]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filtro === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro('todos')}
              className={filtro === 'todos' ? 'bg-[#0D2745] hover:bg-[#14365E]' : 'border-[#E2E8F0]'}
            >
              Todos
            </Button>
            {categorias.map((cat) => (
              <Button
                key={cat}
                variant={filtro === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFiltro(cat)}
                className={filtro === cat ? 'bg-[#0D2745] hover:bg-[#14365E]' : 'border-[#E2E8F0]'}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <BookOpen className="w-6 h-6 mx-auto text-[#0D2745] mb-2" />
            <div className="text-2xl font-bold text-[#0D2745]">{cursos.length}</div>
            <div className="text-sm text-[#5B7A9A]">Cursos</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <Clock className="w-6 h-6 mx-auto text-[#0D2745] mb-2" />
            <div className="text-2xl font-bold text-[#0D2745]">
              {cursos.reduce((acc, c) => acc + c.carga_horaria, 0)}h
            </div>
            <div className="text-sm text-[#5B7A9A]">Total de horas</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <Award className="w-6 h-6 mx-auto text-[#0D2745] mb-2" />
            <div className="text-2xl font-bold text-[#0D2745]">
              {cursos.filter(c => c.certificado).length}
            </div>
            <div className="text-sm text-[#5B7A9A]">Com certificado</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <TrendingUp className="w-6 h-6 mx-auto text-[#0D2745] mb-2" />
            <div className="text-2xl font-bold text-[#0D2745]">100%</div>
            <div className="text-sm text-[#5B7A9A]">Online</div>
          </Card>
        </div>

        {/* Grid de Cursos */}
        {cursosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-[#5B7A9A] opacity-50 mb-4" />
            <h3 className="text-xl font-semibold text-[#0D2745] mb-2">Nenhum curso encontrado</h3>
            <p className="text-[#5B7A9A]">
              Tente ajustar sua busca ou filtros para encontrar o que procura
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosFiltrados.map((curso) => (
              <CourseCard
                key={curso.id}
                id={curso.id}
                title={curso.titulo}
                description={curso.descricao}
                thumbnail={curso.thumb_url}
                cargaHoraria={curso.carga_horaria}
                nivel={curso.nivel}
                certificado={curso.certificado}
                categoria={curso.categoria}
              />
            ))}
          </div>
        )}

        {/* Footer da página */}
        <div className="mt-12 text-center text-sm text-[#5B7A9A]">
          <p>Empresas: curadoria sob medida + integração com PDI</p>
          <Link href="/dashboard/cursos/novo" className="text-[#2A7BD8] hover:underline">
            Criar curso com IA →
          </Link>
        </div>
      </main>
    </div>
  )
}
