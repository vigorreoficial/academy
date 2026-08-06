'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, XCircle, Info, Shield } from 'lucide-react'
import { gerarChecklistNR } from '@/lib/validations/nr-1'

interface NRChecklistProps {
  curso: any
  onValidationChange?: (isValid: boolean) => void
}

export function NRChecklist({ curso, onValidationChange }: NRChecklistProps) {
  const [checklist, setChecklist] = useState<any[]>([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const items = gerarChecklistNR(curso)
    setChecklist(items)
    
    const error = items.some(item => item.status === 'error')
    setHasError(error)
    
    if (onValidationChange) {
      onValidationChange(!error)
    }
  }, [curso, onValidationChange])

  return (
    <Card className={`border-2 ${hasError ? 'border-red-200' : 'border-green-200'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className={`w-5 h-5 ${hasError ? 'text-red-500' : 'text-green-500'}`} />
          Checklist NR-1
          {hasError ? (
            <Badge variant="destructive" className="ml-2">Pendente</Badge>
          ) : (
            <Badge variant="success" className="ml-2">✅ Conforme</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {checklist.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
              item.status === 'ok' ? 'bg-green-50' :
              item.status === 'warning' ? 'bg-yellow-50' :
              'bg-red-50'
            }`}
          >
            {item.status === 'ok' && (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            {item.status === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            )}
            {item.status === 'error' && (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-medium">{item.item}</span>
              <span className="ml-2 text-muted-foreground">{item.mensagem}</span>
            </div>
          </div>
        ))}

        {hasError && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Correções necessárias</AlertTitle>
            <AlertDescription>
              Revise os itens marcados em vermelho para atender aos requisitos da NR-1.
            </AlertDescription>
          </Alert>
        )}

        {!hasError && checklist.length > 0 && (
          <Alert className="mt-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">✅ Curso conforme NR-1</AlertTitle>
            <AlertDescription className="text-green-700">
              Todos os requisitos da NR-1 foram atendidos.
            </AlertDescription>
          </Alert>
        )}

        {checklist.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Nenhuma NR aplicável a este curso</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
