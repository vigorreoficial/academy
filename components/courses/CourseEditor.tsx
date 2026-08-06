'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  X, 
  MoveUp,
  MoveDown,
  Video,
  FileText,
  Image,
  Link,
  CheckSquare,
  ListChecks,
  Clock,
  AlertCircle,
  Edit2,
  Check
} from 'lucide-react'

interface Aula {
  id: string
  titulo: string
  descricao: string
  tipo: 'video' | 'texto' | 'pdf' | 'imagem' | 'quiz' | 'exercicio'
  conteudo: string
  duracao_minutos: number
  tempo_minimo_segundos: number
  ordem: number
}

interface Modulo {
  id: string
  titulo: string
  descricao: string
  ordem: number
  aulas: Aula[]
}

interface CourseEditorProps {
  initialData?: {
    titulo: string
    descricao: string
    carga_horaria: number
    modulos: Modulo[]
  }
  onSave?: (data: any) => void
  onCancel?: () => void
}

export function CourseEditor({ initialData, onSave, onCancel }: CourseEditorProps) {
  const [titulo, setTitulo] = useState(initialData?.titulo || '')
  const [descricao, setDescricao] = useState(initialData?.descricao || '')
  const [modulos, setModulos] = useState<Modulo[]>(initialData?.modulos || [])
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(
    initialData?.modulos?.[0]?.id || null
  )
  const [editandoAula, setEditandoAula] = useState<string | null>(null)

  // Adicionar módulo
  const adicionarModulo = () => {
    const novoModulo: Modulo = {
      id: `mod-${Date.now()}`,
      titulo: `Módulo ${modulos.length + 1}`,
      descricao: '',
      ordem: modulos.length + 1,
      aulas: []
    }
    setModulos([...modulos, novoModulo])
    setModuloAtivo(novoModulo.id)
  }

  // Remover módulo
  const removerModulo = (moduloId: string) => {
    if (modulos.length <= 1) {
      alert('O curso deve ter pelo menos um módulo')
      return
    }
    setModulos(modulos.filter(m => m.id !== moduloId))
    if (moduloAtivo === moduloId) {
      setModuloAtivo(modulos[0]?.id || null)
    }
  }

  // Mover módulo
  const moverModulo = (moduloId: string, direcao: 'up' | 'down') => {
    const index = modulos.findIndex(m => m.id === moduloId)
    if (direcao === 'up' && index === 0) return
    if (direcao === 'down' && index === modulos.length - 1) return
    
    const newModulos = [...modulos]
    const targetIndex = direcao === 'up' ? index - 1 : index + 1
    ;[newModulos[index], newModulos[targetIndex]] = [newModulos[targetIndex], newModulos[index]]
    
    // Atualizar ordem
    newModulos.forEach((m, i) => m.ordem = i + 1)
    setModulos(newModulos)
  }

  // Atualizar módulo
  const atualizarModulo = (moduloId: string, campo: string, valor: any) => {
    setModulos(modulos.map(m => 
      m.id === moduloId ? { ...m, [campo]: valor } : m
    ))
  }

  // Adicionar aula
  const adicionarAula = (moduloId: string) => {
    const modulo = modulos.find(m => m.id === moduloId)
    if (!modulo) return

    const novaAula: Aula = {
      id: `aul-${Date.now()}`,
      titulo: `Aula ${modulo.aulas.length + 1}`,
      descricao: '',
      tipo: 'video',
      conteudo: '',
      duracao_minutos: 10,
      tempo_minimo_segundos: 300,
      ordem: modulo.aulas.length + 1
    }

    setModulos(modulos.map(m => 
      m.id === moduloId 
        ? { ...m, aulas: [...m.aulas, novaAula] }
        : m
    ))
    setEditandoAula(novaAula.id)
  }

  // Remover aula
  const removerAula = (moduloId: string, aulaId: string) => {
    setModulos(modulos.map(m => 
      m.id === moduloId 
        ? { ...m, aulas: m.aulas.filter(a => a.id !== aulaId) }
        : m
    ))
  }

  // Atualizar aula
  const atualizarAula = (moduloId: string, aulaId: string, campo: string, valor: any) => {
    setModulos(modulos.map(m => 
      m.id === moduloId 
        ? { 
            ...m, 
            aulas: m.aulas.map(a => 
              a.id === aulaId ? { ...a, [campo]: valor } : a
            )
          }
        : m
    ))
  }

  // Mover aula
  const moverAula = (moduloId: string, aulaId: string, direcao: 'up' | 'down') => {
    const modulo = modulos.find(m => m.id === moduloId)
    if (!modulo) return
    
    const index = modulo.aulas.findIndex(a => a.id === aulaId)
    if (direcao === 'up' && index === 0) return
    if (direcao === 'down' && index === modulo.aulas.length - 1) return
    
    const newAulas = [...modulo.aulas]
    const targetIndex = direcao === 'up' ? index - 1 : index + 1
    ;[newAulas[index], newAulas[targetIndex]] = [newAulas[targetIndex], newAulas[index]]
    
    // Atualizar ordem
    newAulas.forEach((a, i) => a.ordem = i + 1)
    
    setModulos(modulos.map(m => 
      m.id === moduloId ? { ...m, aulas: newAulas } : m
    ))
  }

  const tiposAula = [
    { value: 'video', label: 'Vídeo', icon: Video },
    { value: 'texto', label: 'Texto', icon: FileText },
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'imagem', label: 'Imagem', icon: Image },
    { value: 'quiz', label: 'Quiz', icon: CheckSquare },
    { value: 'exercicio', label: 'Exercício', icon: ListChecks }
  ]

  const handleSave = () => {
    if (onSave) {
      onSave({
        titulo,
        descricao,
        modulos,
        carga_horaria: modulos.reduce((total, m) => {
          return total + m.aulas.reduce((sum, a) => sum + a.duracao_minutos, 0)
        }, 0) / 60
      })
    }
  }

  const moduloAtual = modulos.find(m => m.id === moduloAtivo)

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar - Lista de módulos */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border-[#E2E8F0] sticky top-20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#0D2745]">Módulos</CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={adicionarModulo}
                className="border-[#E2E8F0] text-[#0D2745]"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
            {modulos.map((modulo) => (
              <div
                key={modulo.id}
                className={`p-3 rounded-xl cursor-pointer transition-colors border ${
                  moduloAtivo === modulo.id 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                    : 'border-transparent hover:bg-[#F6F8FB]'
                }`}
                onClick={() => setModuloAtivo(modulo.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate flex-1 text-[#0D2745]">
                    {modulo.titulo}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-[#5B7A9A] hover:text-[#0D2745]"
                      onClick={(e) => {
                        e.stopPropagation()
                        moverModulo(modulo.id, 'up')
                      }}
                      disabled={modulo.ordem === 1}
                    >
                      <MoveUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-[#5B7A9A] hover:text-[#0D2745]"
                      onClick={(e) => {
                        e.stopPropagation()
                        moverModulo(modulo.id, 'down')
                      }}
                      disabled={modulo.ordem === modulos.length}
                    >
                      <MoveDown className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-red-400 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        removerModulo(modulo.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <span className="text-xs text-[#5B7A9A]">
                  {modulo.aulas.length} aulas
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo principal */}
      <div className="lg:col-span-3 space-y-4">
        {/* Informações do curso */}
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[#0D2745]">Título do curso</label>
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título do curso"
                  className="border-[#E2E8F0] focus:border-[#2A7BD8]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0D2745]">Descrição</label>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do curso"
                  rows={2}
                  className="border-[#E2E8F0] focus:border-[#2A7BD8]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editor do módulo atual */}
        {moduloAtual && moduloAtual && (
          <Card className="border-[#E2E8F0]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Input
                    value={moduloAtual.titulo}
                    onChange={(e) => atualizarModulo(moduloAtual.id, 'titulo', e.target.value)}
                    className="text-lg font-bold border-none px-0 focus-visible:ring-0 text-[#0D2745]"
                    placeholder="Título do módulo"
                  />
                  <Textarea
                    value={moduloAtual.descricao}
                    onChange={(e) => atualizarModulo(moduloAtual.id, 'descricao', e.target.value)}
                    className="border-none px-0 focus-visible:ring-0 text-sm text-[#5B7A9A] resize-none"
                    placeholder="Descrição do módulo"
                    rows={1}
                  />
                </div>
                <Button 
                  size="sm" 
                  onClick={adicionarAula.bind(null, moduloAtual.id)}
                  className="bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Aula
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {moduloAtual.aulas.length === 0 ? (
                <div className="text-center py-8 text-[#5B7A9A]">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma aula neste módulo</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-[#E2E8F0] text-[#0D2745]"
                    onClick={adicionarAula.bind(null, moduloAtual.id)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar primeira aula
                  </Button>
                </div>
              ) : (
                moduloAtual.aulas.map((aula, index) => (
                  <div
                    key={aula.id}
                    className={`border rounded-2xl p-4 space-y-3 transition-colors ${
                      editandoAula === aula.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#E2E8F0] hover:border-[#2A7BD8]/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 text-[#5B7A9A]">
                        <GripVertical className="w-4 h-4 cursor-move" />
                        <span className="text-sm font-mono">#{index + 1}</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={aula.titulo}
                            onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'titulo', e.target.value)}
                            className="text-sm font-medium border-none px-0 focus-visible:ring-0 text-[#0D2745]"
                            placeholder="Título da aula"
                          />
                          <Badge variant="outline" className="text-xs border-[#E2E8F0] text-[#5B7A9A]">
                            {aula.tipo}
                          </Badge>
                        </div>
                        <Textarea
                          value={aula.descricao}
                          onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'descricao', e.target.value)}
                          className="text-sm border-none px-0 focus-visible:ring-0 resize-none text-[#5B7A9A]"
                          placeholder="Descrição da aula"
                          rows={1}
                        />
                        <div className="flex flex-wrap gap-3 items-center">
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-[#5B7A9A]">Tipo:</label>
                            <select
                              value={aula.tipo}
                              onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'tipo', e.target.value)}
                              className="text-xs border border-[#E2E8F0] rounded-full px-2 py-0.5 bg-transparent text-[#0D2745] focus:outline-none focus:border-[#2A7BD8]"
                            >
                              {tiposAula.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-[#5B7A9A]">Duração:</label>
                            <Input
                              type="number"
                              value={aula.duracao_minutos}
                              onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'duracao_minutos', parseInt(e.target.value) || 0)}
                              className="w-16 text-xs py-0.5 h-7 border-[#E2E8F0]"
                              min={1}
                            />
                            <span className="text-xs text-[#5B7A9A]">min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-[#5B7A9A]">Tempo mín.:</label>
                            <Input
                              type="number"
                              value={aula.tempo_minimo_segundos / 60}
                              onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'tempo_minimo_segundos', parseInt(e.target.value) * 60 || 0)}
                              className="w-16 text-xs py-0.5 h-7 border-[#E2E8F0]"
                              min={0}
                            />
                            <span className="text-xs text-[#5B7A9A]">min</span>
                          </div>
                          <div className="flex-1 min-w-[150px]">
                            <Input
                              value={aula.conteudo}
                              onChange={(e) => atualizarAula(moduloAtual.id, aula.id, 'conteudo', e.target.value)}
                              className="text-xs py-0.5 h-7 border-[#E2E8F0]"
                              placeholder="URL do conteúdo (vídeo/PDF/imagem)"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-[#5B7A9A] hover:text-[#0D2745]"
                          onClick={() => moverAula(moduloAtual.id, aula.id, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-[#5B7A9A] hover:text-[#0D2745]"
                          onClick={() => moverAula(moduloAtual.id, aula.id, 'down')}
                          disabled={index === moduloAtual.aulas.length - 1}
                        >
                          <MoveDown className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-400 hover:text-red-600"
                          onClick={() => removerAula(moduloAtual.id, aula.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#5B7A9A]">
            {modulos.reduce((total, m) => total + m.aulas.length, 0)} aulas no total
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-[#E2E8F0] text-[#0D2745] rounded-full"
            >
              <X className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-[#D4AF37] hover:bg-[#C49F27] text-white rounded-full"
            >
              <Save className="w-4 h-4 mr-1" />
              Salvar curso
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
