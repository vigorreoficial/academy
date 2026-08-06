'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Award, Calendar, Clock, User } from 'lucide-react'

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
        // Simular validação
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock - substituir por consulta real ao Supabase
        if (codigo === 'VIG-2026-001') {
          setDados({
            valido: true,
            nome: 'João Silva',
            curso: 'Liderança e Gestão de Equipes',
            carga_horaria: 20,
            data_emissao: '2026-01-15',
            data_validade: '2027-01-15',
            codigo: codigo,
            hash: 'a1b2c3d4e5f6g7h8i9j0',
            status: 'ativo'
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
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-8 h-8 text-vigorre-gold" />
              <span className="text-2xl font-bold text-vigorre-blue">Vigorre Academy</span>
            </div>
            <CardTitle className="text-xl">
              Validação de Certificado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dados?.valido ? (
              <>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">Certificado Válido ✅</h3>
                    <p className="text-sm text-green-700">
                      Este certificado foi emitido pela Vigorre Academy e é autêntico
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Certificado para</span>
                    <span className="font-semibold">{dados.nome}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Curso</span>
                    <span className="font-semibold">{dados.curso}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Carga horária</span>
                    <span className="font-semibold">{dados.carga_horaria}h</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-muted-foreground">Data de emissão</span>
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

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Hash de autenticação: <span className="font-mono text-xs">{dados.hash}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Este certificado pode ser verificado publicamente pela Vigorre Academy
                  </p>
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
