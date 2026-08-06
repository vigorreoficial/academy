'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Award, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-vigorre-blue">Vigorre</span>
            <span className="text-sm text-vigorre-gold font-semibold">Academy™</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-vigorre-blue/10 text-vigorre-blue px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Inteligência Artificial aplicada à educação corporativa</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Crie cursos completos com
            <span className="text-vigorre-gold"> IA</span> em minutos
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Transforme qualquer PDF, documento ou ideia em um curso estruturado com
            módulos, quizzes e certificados automaticamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white text-lg px-8">
                Começar grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cursos">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Ver catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-vigorre-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-vigorre-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Criação com IA</h3>
            <p className="text-muted-foreground text-sm">
              Upload de PDF, DOCX, PPTX ou URL e a IA gera o curso completo
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-vigorre-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-vigorre-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Certificação</h3>
            <p className="text-muted-foreground text-sm">
              Certificados com QR Code e validação online para comprovação
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border bg-card">
            <div className="w-12 h-12 bg-vigorre-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-vigorre-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Para empresas</h3>
            <p className="text-muted-foreground text-sm">
              Gestão de colaboradores, trilhas de aprendizagem e indicadores
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Vigorre Academy™. Todos os direitos reservados.</p>
          <p className="text-xs mt-1">
            Feito com ❤️ no Brasil
          </p>
        </div>
      </footer>
    </div>
  )
}
