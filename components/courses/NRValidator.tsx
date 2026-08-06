'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Shield, 
  Loader2,
  FileCheck,
  BookOpen,
  Clock,
  User,
  GraduationCap,
  Award
} from 'lucide-react'

interface NRValidatorProps {
  cursoId: string
  onValidated?: (isValid: boolean) => void
}

export function NRValidator({ cursoId, onValidated }: NRValidatorProps) {
  const [loading, setLoading] = useState(true)
  const [resultado, setResultado] = useState<any>(null)
  const [validando, setValidando] = useState(false)

  useEffect(() => {
    validarCurso()
  }, [cursoId])

  const validarCurso = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cursos/validar-nr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursoId })
      })

      const data = await response.json()
      setResultado(data)
      
      if (onValidated) {
        onValidated(data.isValid)
      }
    } catch (error) {
      console.error('Erro ao validar:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-vigorre-gold mb-3" />
          <p className="text-muted-foreground">Validando curso...</p>
        </CardContent>
      </Card>
    )
  }

  if (!resultado) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <AlertTriangle className="w-8 h-8 mx-auto text-yellow-500 mb-3" />
          <p className="text-muted-foreground">Erro ao validar curso</p>
          <Button variant="outline" onClick={validarCurso} className="mt-4">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    )
  }

  const hasErrors = !resultado.isValid
  const hasWarnings = resultado.warnings?.length > 0

  return (
    <Card className="border-2 shadow-lg overflow-hidden">
      <CardHeader className={`${
        hasErrors ? 'bg-red-50 border-red-200' :
        hasWarnings ? 'bg-yellow-50 border-yellow-200' :
        'bg-green-50 border-green-200'
      } border-b`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className={`w-6 h-6 ${
              hasErrors ? 'text-red-500' :
              hasWarnings ? 'text-yellow-500' :
              'text-green-500'
            }`} />
            <CardTitle className="text-lg">Validação NR-1</CardTitle>
          </div>
          <Badge variant={
            hasErrors ? 'destructive' :
            hasWarnings ? 'gold' :
            'success'
          } className="text-sm px-4 py-1">
            {hasErrors ? '❌ Não conforme' :
             hasWarnings ? '⚠️ Com observações' :
             '✅ Conforme'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Status */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant="outline" className="font-normal">
            {resultado.status || 'rascunho'}
          </Badge>
          {resultado.nrRequisitos?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">NRs:</span>
              {resultado.nrRequisitos.map((req: any) => (
                <Badge key={req.nr} variant="gold" className="font-mono">
                  {req.nr}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Errors */}
        {resultado.errors?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-red-600 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Correções necessárias
            </h4>
            <div className="space-y-2">
              {resultado.errors.map((error: string, index: number) => (
                <Alert key={index} variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {resultado.warnings?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-yellow-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Recomendações
            </h4>
            <div className="space-y-2">
              {resultado.warnings.map((warning: string, index: number) => (
                <Alert key={index} className="border-yellow-200 bg-yellow-50 py-2">
                  <AlertDescription className="text-sm text-yellow-800">
                    {warning}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Checklist */}
        {resultado.checklist?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Checklist NR-1
            </h4>
            <div className="grid gap-2">
              {resultado.checklist.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                    item.status === 'ok' ? 'bg-green-50' :
                    item.status === 'warning' ? 'bg-yellow-50' :
                    'bg-red-50'
                  }`}
                >
                  {item.status === 'ok' && (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                  {item.status === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  )}
                  {item.status === 'error' && (
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span className="font-medium">{item.item}</span>
                  <span className="text-muted-foreground">{item.mensagem}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumo NRs */}
        {resultado.nrRequisitos?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Requisitos por NR
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {resultado.nrRequisitos.map((req: any) => (
                <div key={req.nr} className="border rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" className="font-mono">{req.nr}</Badge>
                    {req.possuiPartePratica && (
                      <Badge variant="secondary" className="text-xs">
                        Prática obrigatória
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium">{req.nome}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {req.cargaHorariaMinima}h mín.
                    </span>
                    {req.reciclagemMeses > 0 && (
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Reciclagem: {req.reciclagemMeses}m
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant={hasErrors ? 'destructive' : 'default'}
            onClick={validarCurso}
            className="gap-2"
          >
            <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Revalidar
          </Button>
          {!hasErrors && (
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <CheckCircle className="w-4 h-4" />
              Curso conforme
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
