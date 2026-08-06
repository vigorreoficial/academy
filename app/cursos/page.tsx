'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Curso {
  id: string
  titulo: string
  descricao: string
  carga_horaria: number
  nivel: string
  categoria: string
  certificado: boolean
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    const cursosMock: Curso[] = [
      {
        id: '1',
        titulo: 'Liderança e Gestão de Equipes',
        descricao: 'Aprenda a liderar equipes de alta performance com técnicas modernas',
        carga_horaria: 20,
        nivel: 'INTERMEDIARIO',
        categoria: 'Liderança',
        certificado: true
      },
      {
        id: '2',
        titulo: 'Gestão de Pessoas com IA',
        descricao: 'Como a inteligência artificial está transformando a gestão de RH',
        carga_horaria: 15,
        nivel: 'AVANCADO',
        categoria: 'RH',
        certificado: true
      },
      {
        id: '3',
        titulo: 'Comunicação Eficaz',
        descricao: 'Domine a arte da comunicação para melhorar seus resultados',
        carga_horaria: 10,
        nivel: 'BASICO',
        categoria: 'Comunicação',
        certificado: false
      }
    ]
    setCursos(cursosMock)
    setLoading(false)
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
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#5B7A9A]">Carregando cursos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0D2745]">Vigorre</span>
            <span className="text-sm text-[#D4AF37] font-semibold">Academy™</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[#0D2745] hover:text-[#2A7BD8] transition">
              Meu dashboard
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-[#0D2745] text-[#0D2745] hover:bg-[#0D2745] hover:text-white rounded-full">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0D2745] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Catálogo de Cursos
          </h1>
          <p className="text-[#9BB8D9] max-w-2xl mx-auto text-lg">
            Explore nossos cursos desenvolvidos com IA e transforme seu conhecimento em performance estratégica
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar cursos por título, descrição ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-[#E2E8F0] bg-white focus:border-[#2A7BD8] focus:ring-2 focus:ring-[#2A7BD8]/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filtro === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro('todos')}
              className={filtro === 'todos' ? 'bg-[#0D2745] hover:bg-[#14365E] rounded-full' : 'rounded-full'}
            >
              Todos
            </Button>
            {categorias.map((cat) => (
              <Button
                key={cat}
                variant={filtro === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFiltro(cat)}
                className={filtro === cat ? 'bg-[#0D2745] hover:bg-[#14365E] rounded-full' : 'rounded-full'}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0D2745]">{cursos.length}</div>
            <div className="text-sm text-[#5B7A9A]">Cursos</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0D2745]">
              {cursos.reduce((acc, c) => acc + c.carga_horaria, 0)}h
            </div>
            <div className="text-sm text-[#5B7A9A]">Total de horas</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0D2745]">
              {cursos.filter(c => c.certificado).length}
            </div>
            <div className="text-sm text-[#5B7A9A]">Com certificado</div>
          </Card>
          <Card className="p-4 text-center border-[#E2E8F0] shadow-sm">
            <div className="text-2xl font-bold text-[#0D2745]">100%</div>
            <div className="text-sm text-[#5B7A9A]">Online</div>
          </Card>
        </div>

        {/* Grid de Cursos */}
        {cursosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-[#0D2745] mb-2">Nenhum curso encontrado</h3>
            <p className="text-[#5B7A9A]">Tente ajustar sua busca ou filtros</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosFiltrados.map((curso) => (
              <Card key={curso.id} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-[#E2E8F0]">
                <div className="aspect-video bg-gradient-to-br from-[#0D2745] to-[#2A7BD8] flex items-center justify-center relative">
                  <span className="text-white text-4xl opacity-30">📚</span>
                  {curso.certificado && (
                    <Badge className="absolute top-2 right-2 bg-[#D4AF37] text-white border-0">
                      Certificado
                    </Badge>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#0D2745] line-clamp-1">{curso.titulo}</h3>
                    <Badge variant="outline" className="text-xs border-[#E2E8F0] text-[#5B7A9A]">
                      {curso.nivel}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-[#F6F8FB] text-[#5B7A9A] border-0 mt-1">
                    {curso.categoria}
                  </Badge>
                  <p className="text-sm text-[#5B7A9A] mt-2 line-clamp-2">{curso.descricao}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-[#5B7A9A]">
                    <span>⏱ {curso.carga_horaria}h</span>
                    <span>📖 Módulos</span>
                  </div>
                  <Link href={`/cursos/${curso.id}`} className="mt-4 block">
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full">
                      Ver curso
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
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
