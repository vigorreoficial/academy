'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { History, GitBranch, RotateCcw, Eye } from 'lucide-react'

export default function VersoesCursoPage() {
  const params = useParams()
  const [versoes, setVersoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const mockVersoes = [
      {
        versao: 3,
        alterado_em: '2026-02-20',
        alterado_por: 'Administrador',
        motivo: 'Atualização de conteúdo NR-10',
        dados: {}
      },
      {
        versao: 2,
        alterado_em: '2026-01-15',
        alterado_por: 'Administrador',
        motivo: 'Correção de erros ortográficos',
        dados: {}
      },
      {
        versao: 1,
        alterado_em: '2025-12-01',
        alterado_por: 'Administrador',
        motivo: 'Criação inicial do curso',
        dados: {}
      }
    ]
    setVersoes(mockVersoes)
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-vigorre-blue" />
          <h1 className="text-2xl font-bold">Histórico de Versões</h1>
        </div>

        <div className="space-y-4">
          {versoes.map((versao, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-base">
                      Versão {versao.versao}
                    </CardTitle>
                    {versao.versao === versoes[0]?.versao && (
                      <Badge variant="gold">Atual</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {versao.versao !== versoes[0]?.versao && (
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Restaurar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Alterado por:</span>{' '}
                    {versao.alterado_por}
                  </p>
                  <p>
                    <span className="font-medium">Data:</span>{' '}
                    {formatDate(versao.alterado_em)}
                  </p>
                  <p>
                    <span className="font-medium">Motivo:</span>{' '}
                    {versao.motivo}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
