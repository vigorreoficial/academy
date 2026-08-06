'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Download, Share2, CheckCircle, Clock, Award, Calendar, QrCode } from 'lucide-react'
import QRCode from 'react-qr-code'

interface CertificadoDetalhe {
  id: string
  curso_nome: string
  curso_descricao: string
  aluno_nome: string
  aluno_cpf: string
  codigo: string
  hash: string
  data_emissao: string
  data_validade: string | null
  carga_horaria: number
  nota_final: number
  conteudo_programatico: string[]
  instrutor: string
  status: 'ativo' | 'revogado'
}

export default function CertificadoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [certificado, setCertificado] = useState<CertificadoDetalhe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarCertificado = async () => {
      try {
        // Simular dados
        const certificadoMock: CertificadoDetalhe = {
          id: params.id as string,
          curso_nome: 'Liderança e Gestão de Equipes',
          curso_descricao: 'Curso completo de liderança para gestores',
          aluno_nome: 'João Silva',
          aluno_cpf: '123.456.789-00',
          codigo: 'VIG-2026-001',
          hash: 'a1b2c3d4e5f6g7h8i9j0',
          data_emissao: '2026-01-15',
          data_validade: '2027-01-15',
          carga_horaria: 20,
          nota_final: 92,
          conteudo_programatico: [
            'Fundamentos da Liderança',
            'Gestão de Equipes',
            'Motivação e Engajamento',
            'Comunicação Eficaz',
            'Inteligência Emocional'
          ],
          instrutor: 'Dr. Carlos Mendes',
          status: 'ativo'
        }
        setCertificado(certificadoMock)
      } catch (error) {
        console.error('Erro ao carregar certificado:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarCertificado()
  }, [params.id])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
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

  if (!certificado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold">Certificado não encontrado</h2>
          <Link href="/dashboard/certificados">
            <Button className="mt-4">Voltar</Button>
          </Link>
        </div>
      </div>
    )
  }

  // URL para validação pública
  const validationUrl = `${window.location.origin}/validar/${certificado.codigo}`

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Certificado</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Válido
            </Badge>
          </div>
        </div>

        {/* Certificado */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-0">
            {/* Frente do certificado */}
            <div className="p-8 md:p-12 bg-white rounded-lg border-8 border-vigorre-gold/20">
              {/* Selo da Vigorre */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 bg-vigorre-blue rounded-full flex items-center justify-center text-white font-bold">
                  V
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-vigorre-blue">Vigorre Academy</h2>
                  <p className="text-xs text-muted-foreground text-center">Certificado de Conclusão</p>
                </div>
              </div>

              {/* Corpo do certificado */}
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Certificamos que</p>
                <h3 className="text-3xl md:text-4xl font-bold text-vigorre-blue">
                  {certificado.aluno_nome}
                </h3>
                <p className="text-muted-foreground">
                  concluiu o curso
                </p>
                <h4 className="text-2xl md:text-3xl font-semibold">
                  {certificado.curso_nome}
                </h4>
                <p className="text-muted-foreground">
                  com carga horária de <strong>{certificado.carga_horaria} horas</strong>,
                  obtendo nota <strong>{certificado.nota_final}%</strong>
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span>Emissão: {formatDate(certificado.data_emissao)}</span>
                  {certificado.data_validade && (
                    <span>Validade: {formatDate(certificado.data_validade)}</span>
                  )}
                </div>
              </div>

              {/* QR Code e validação */}
              <div className="mt-8 flex items-center justify-center gap-8 flex-wrap border-t pt-6">
                <div className="text-center">
                  <div className="bg-white p-2 rounded-lg inline-block">
                    <QRCode value={validationUrl} size={100} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Escanear para validar</p>
                </div>
                <div className="text-left text-sm">
                  <p className="font-medium">Código de autenticação</p>
                  <p className="font-mono text-vigorre-blue">{certificado.codigo}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hash: {certificado.hash}
                  </p>
                  <a 
                    href={validationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vigorre-gold hover:underline text-sm flex items-center gap-1 mt-2"
                  >
                    Validar online →
                  </a>
                </div>
              </div>

              {/* Assinaturas */}
              <div className="mt-8 pt-6 border-t flex justify-around text-center">
                <div>
                  <div className="h-12 border-b border-gray-300 w-40 mx-auto mb-1"></div>
                  <p className="text-sm font-medium">{certificado.instrutor}</p>
                  <p className="text-xs text-muted-foreground">Instrutor</p>
                </div>
                <div>
                  <div className="h-12 border-b border-gray-300 w-40 mx-auto mb-1"></div>
                  <p className="text-sm font-medium">Vigorre Academy</p>
                  <p className="text-xs text-muted-foreground">Instituição</p>
                </div>
              </div>
            </div>

            {/* Verso do certificado (opcional) */}
            <div className="p-6 bg-gray-50 border-t">
              <h4 className="font-semibold mb-2">Conteúdo programático</h4>
              <ul className="text-sm text-muted-foreground grid md:grid-cols-2 gap-1">
                {certificado.conteudo_programatico.map((item, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          <Button className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white gap-2">
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar no LinkedIn
          </Button>
          <Button variant="outline" className="gap-2">
            <QrCode className="w-4 h-4" />
            QR Code
          </Button>
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => window.print()}
          >
            <Award className="w-4 h-4" />
            Imprimir
          </Button>
        </div>

        {/* Validação pública */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Este certificado pode ser verificado publicamente</p>
                <p className="text-xs text-muted-foreground">
                  Qualquer pessoa pode escanear o QR Code ou acessar a URL de validação
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
