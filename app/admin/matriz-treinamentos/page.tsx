'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Filter, AlertTriangle, CheckCircle } from 'lucide-react'

export default function MatrizTreinamentosPage() {
  const [search, setSearch] = useState('')

  // Dados mock
  const matriz = [
    {
      cargo: 'Eletricista',
      funcao: 'Manutenção Elétrica',
      nr_obrigatoria: 'NR-10',
      curso: 'Segurança em Instalações Elétricas',
      periodicidade: 12,
      status: 'ok'
    },
    {
      cargo: 'Operador de Máquinas',
      funcao: 'Produção',
      nr_obrigatoria: 'NR-12',
      curso: 'Segurança em Máquinas',
      periodicidade: 12,
      status: 'vencendo'
    },
    {
      cargo: 'Trabalhador em Espaço Confinado',
      funcao: 'Manutenção',
      nr_obrigatoria: 'NR-33',
      curso: 'Trabalho em Espaço Confinado',
      periodicidade: 12,
      status: 'atrasado'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Matriz de Treinamentos NR</h1>
            <p className="text-muted-foreground">
              Mapeamento de treinamentos obrigatórios por função
            </p>
          </div>
          <Button className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nova obrigação
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por cargo, função ou NR..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>NR</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Periodicidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matriz.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.cargo}</TableCell>
                    <TableCell>{item.funcao}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.nr_obrigatoria}</Badge>
                    </TableCell>
                    <TableCell>{item.curso}</TableCell>
                    <TableCell>{item.periodicidade} meses</TableCell>
                    <TableCell>
                      {item.status === 'ok' && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          OK
                        </Badge>
                      )}
                      {item.status === 'vencendo' && (
                        <Badge variant="gold" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Vencendo
                        </Badge>
                      )}
                      {item.status === 'atrasado' && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Atrasado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
