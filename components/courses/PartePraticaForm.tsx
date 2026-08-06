'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, Camera, Video, FileText, CheckCircle, XCircle } from 'lucide-react'

interface PartePraticaFormProps {
  cursoId: string
  aulaId: string
  onComplete?: () => void
}

export function PartePraticaForm({ cursoId, aulaId, onComplete }: PartePraticaFormProps) {
  const [data, setData] = useState('')
  const [local, setLocal] = useState('')
  const [equipamentos, setEquipamentos] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [evidencias, setEvidencias] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [concluido, setConcluido] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 2000))
      setConcluido(true)
      if (onComplete) onComplete()
    } catch (error) {
      console.error('Erro ao salvar parte prática:', error)
    } finally {
      setLoading(false)
    }
  }

  if (concluido) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800">
            Parte prática registrada com sucesso!
          </h3>
          <p className="text-sm text-green-700">
            As evidências foram salvas e o treinamento está completo.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Badge variant="gold">NR-1</Badge>
          Registro da Parte Prática
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data da realização *</Label>
              <Input
                id="data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="local">Local *</Label>
              <Input
                id="local"
                placeholder="Ex: Fábrica 1 - Setor de Produção"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipamentos">Equipamentos utilizados</Label>
            <Input
              id="equipamentos"
              placeholder="Ex: EPIs, ferramentas, máquinas"
              value={equipamentos}
              onChange={(e) => setEquipamentos(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações relevantes sobre a prática..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Evidências (fotos, vídeos, documentos)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Arraste arquivos ou clique para selecionar
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <Button type="button" variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Foto
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Vídeo
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Documento
                </Button>
              </div>
              {evidencias.length > 0 && (
                <div className="mt-3 text-left">
                  {evidencias.map((file, i) => (
                    <div key={i} className="text-sm text-vigorre-blue">
                      📎 {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-vigorre-gold hover:bg-vigorre-gold/90 text-white"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Registrar parte prática'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Campos obrigatórios. As evidências serão armazenadas para auditoria.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
