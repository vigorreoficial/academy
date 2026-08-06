'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  Calendar, 
  Clock, 
  User, 
  BookOpen,
  Download,
  Share2,
  QrCode
} from 'lucide-react'
import QRCode from 'react-qr-code'

interface ValidacaoCertificado {
  valido: boolean
  nome?: string
  curso?: string
  carga_horaria?: number
  data_emissao?: string
  data_validade?: string | null
  codigo?: string
  hash?: string
  status?: string
  nr_aplicavel?: string[]
  mensagem?: string
}

export default function ValidarCertificadoPage() {
  const params = useParams()
  const codigo = params.codigo as string
  const [dados, setDados] = useState<ValidacaoCertificado | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validarCertificado = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simular validação - substituir por consulta real ao Supabase
        if (codigo === 'VIG-2026-001' || codigo.startsWith('VIG')) {
          setDados({
            valido: true,
            nome: 'João Silva',
            curso: 'NR-10 - Segurança em Instalações Elétricas',
            carga_horaria: 40,
            data_emissao: '2026-08-01',
            data_validade: '2027-08-01',
            codigo: codigo,
            hash: 'a1b2c3d4e5f6g7h8i9j0',
            status: 'ativo',
            nr_aplicavel: ['NR-1', 'NR-10']
          })
        } else {
          setDados({
            valido: false,
            mensagem: 'Certificado não encontrado ou inválido'
          })
        }
      } catch (error) {
        setDados({
          valido: false,
          mensagem: 'Erro ao validar certificado'
        })
      } finally {
        setLoading(false)
      }
    }

    validarCertificado()
  }, [codigo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigorre-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validando certificado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-vigorre-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                V
              </div>
              <div>
                <span className="text-2xl font-bold text-vigorre-blue">Vigorre Academy</span>
                <p className="text-xs text-muted-foreground">Validação de Certificado</p>
              </div>
            </div>
            <CardTitle className="text-xl">
              {dados?.valido ? '✅ Certificado Válido' : '❌ Certificado Inválido'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {dados?.valido ? (
              <>
                {/* Status */}
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">Certificado Autêntico</h3>
                    <p className="text-sm text-green-700">
                      Este certificado foi emitido pela Vigorre Academy e é válido
                    </p>
                  </div>
                </div>

                {/* Informações */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Certificado para
                    </span>
                    <span className="font-semibold">{dados.nome}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Curso
                    </span>
                    <span className="font-semibold">{dados.curso}</span>
                  </div>
                  {dados.nr_aplicavel && dados.nr_aplicavel.length > 0 && (
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-muted-foreground">Normas aplicáveis</span>
                      <div className="flex gap-1">
                        {dados.nr_aplicavel.map((nr) => (
                          <Badge key={nr} variant="gold" className="font-mono">
                            {nr}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Carga horária
                    </span>
                    <span className="font-semibold">{dados.carga_horaria}h</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de emissão
                    </span>
                    <span className="font-semibold">
                      {new Date(dados.data_emissao!).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {dados.data_validade && (
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-muted-foreground">Validade</span>
                      <span className="font-semibold">
                        {new Date(dados.data_validade).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Código</span>
                    <span className="font-mono text-sm text-vigorre-blue">{dados.codigo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="success">Ativo</Badge>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="bg-white p-2 rounded-lg inline-block border">
                      <QRCode value={`${window.location.origin}/validar/${dados.codigo}`} size={100} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">QR Code de validação</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Hash de autenticação</p>
                    <p className="font-mono text-xs text-muted-foreground">{dados.hash}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Este certificado pode ser verificado publicamente
                    </p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-2 justify-center pt-4 border-t">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                    <QrCode className="w-4 h-4" />
                    Imprimir
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 p-8">
                <XCircle className="w-16 h-16 text-red-500" />
                <h3 className="text-xl font-bold text-red-600">Certificado Inválido</h3>
                <p className="text-muted-foreground text-center">
                  {dados?.mensagem || 'Não foi possível validar este certificado'}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Verifique se o código está correto</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
