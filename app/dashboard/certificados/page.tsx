'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { Award, Download, Share2, Calendar, CheckCircle, Clock, ExternalLink } from 'lucide-react'

interface Certificado {
  id: string
  curso_nome: string
  curso_id: string
  codigo: string
  data_emissao: string
  data_validade: string | null
  status: 'ativo' | 'revogado'
  carga_horaria: number
  url: string
}

export default function CertificadosPage() {
  const router = useRouter()
  const supabase = createClient()
  const [certificados, setCertificados] = useState<Certificado[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarCertificados = async () => {
      try {
        // Simular dados
        const certificadosMock: Certificado[] = [
          {
            id: '1',
            curso_nome: 'Liderança e Gestão de Equipes',
            curso_id: 'curso-1',
            codigo: 'VIG-2026-001',
            data_emissao: '2026-01-15',
            data_validade: '2027-01-15',
            status: 'ativo',
            carga_horaria: 20,
            url: '/certificados/1'
          },
          {
            id: '2',
            curso_nome: 'Gestão de Pessoas com IA',
            curso_id: 'curso-2',
            codigo: 'VIG-2026-002',
            data_emissao: '2026-02-20',
            data_validade: null,
            status: 'ativo',
            carga_horaria: 15,
            url: '/certificados/2'
          }
        ]
        setCertificados(certificadosMock)
      } catch (error) {
        console.error('Erro ao carregar certificados:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarCertificados()
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigorre-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Meus Certificados</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {certificados.length === 0 ? (
          <div className="text-center py-16">
            <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nenhum certificado ainda</h2>
            <p className="text-muted-foreground mb-4">
              Complete um curso para receber seu certificado
            </p>
            <Link href="/cursos">
              <Button className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white">
                Explorar cursos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificados.map((cert) => (
              <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-vigorre-blue/5 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{cert.curso_nome}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Award className="w-4 h-4" />
                        Código: {cert.codigo}
                      </CardDescription>
                    </div>
                    <Badge variant="success">Válido</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Carga horária</span>
                      <span className="font-medium">{cert.carga_horaria}h</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data de emissão</span>
                      <span className="font-medium">{formatDate(cert.data_emissao)}</span>
                    </div>
                    {cert.data_validade && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Validade</span>
                        <span className="font-medium">{formatDate(cert.data_validade)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-3 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => window.open(cert.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verificar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
