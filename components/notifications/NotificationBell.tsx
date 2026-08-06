'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Bell, CheckCircle, Award, Clock, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'

interface Notification {
  id: string
  tipo: 'curso' | 'certificado' | 'badge' | 'sistema'
  titulo: string
  mensagem: string
  lida: boolean
  data: string
  link?: string
}

export function NotificationBell() {
  const supabase = createClient()
  const [notificacoes, setNotificacoes] = useState<Notification[]>([])
  const [naoLidas, setNaoLidas] = useState(0)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    carregarNotificacoes()
  }, [])

  const carregarNotificacoes = async () => {
    // Simular notificações
    const mockNotificacoes: Notification[] = [
      {
        id: '1',
        tipo: 'badge',
        titulo: 'Nova conquista!',
        mensagem: 'Você desbloqueou a badge "Primeiro Passo"',
        lida: false,
        data: '2026-08-06T14:30:00Z'
      },
      {
        id: '2',
        tipo: 'certificado',
        titulo: 'Certificado emitido',
        mensagem: 'Seu certificado de NR-10 está disponível',
        lida: false,
        data: '2026-08-05T10:00:00Z',
        link: '/dashboard/certificados'
      },
      {
        id: '3',
        tipo: 'curso',
        titulo: 'Curso recomendado',
        mensagem: 'Baseado no seu perfil, recomendamos "Liderança Avançada"',
        lida: true,
        data: '2026-08-04T08:00:00Z',
        link: '/cursos/lideranca-avancada'
      }
    ]
    setNotificacoes(mockNotificacoes)
    setNaoLidas(mockNotificacoes.filter(n => !n.lida).length)
  }

  const marcarComoLida = (id: string) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ))
    setNaoLidas(naoLidas - 1)
  }

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })))
    setNaoLidas(0)
  }

  const getIcone = (tipo: string) => {
    switch (tipo) {
      case 'badge': return <Award className="w-4 h-4 text-amber-500" />
      case 'certificado': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'curso': return <Clock className="w-4 h-4 text-blue-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const formatarData = (data: string) => {
    const diff = Date.now() - new Date(data).getTime()
    const horas = Math.floor(diff / (1000 * 60 * 60))
    if (horas < 24) return `${horas}h atrás`
    const dias = Math.floor(horas / 24)
    if (dias < 7) return `${dias}d atrás`
    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <DropdownMenu open={aberto} onOpenChange={setAberto}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {naoLidas > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {naoLidas}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="p-3 border-b flex items-center justify-between">
          <span className="font-semibold">Notificações</span>
          {naoLidas > 0 && (
            <Button variant="ghost" size="sm" onClick={marcarTodasComoLidas}>
              Marcar todas como lidas
            </Button>
          )}
        </div>
        {notificacoes.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Nenhuma notificação</p>
          </div>
        ) : (
          notificacoes.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className={`p-3 cursor-pointer ${!notif.lida ? 'bg-blue-50' : ''}`}
              onClick={() => {
                marcarComoLida(notif.id)
                if (notif.link) {
                  window.location.href = notif.link
                }
                setAberto(false)
              }}
            >
              <div className="flex items-start gap-3 w-full">
                {getIcone(notif.tipo)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notif.titulo}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {notif.mensagem}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatarData(notif.data)}
                  </p>
                </div>
                {!notif.lida && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
