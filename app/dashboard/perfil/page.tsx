'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { XPBar } from '@/components/gamification/XPBar'
import { ConquistasGrid } from '@/components/gamification/ConquistasGrid'
import { BADGES, calcularNivel, NIVEIS } from '@/lib/gamification'
import { 
  User, 
  Mail, 
  Shield, 
  Award, 
  Settings, 
  Save, 
  Camera,
  LogOut,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function PerfilPage() {
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('')
  const [empresa, setEmpresa] = useState('')

  // Dados mock para gamificação
  const xpTotal = 2450
  const nivelAtual = calcularNivel(xpTotal)
  
  const badgesMock = BADGES.map((badge, index) => ({
    ...badge,
    desbloqueado: index < 5,
    progresso: index < 5 ? 100 : Math.min(Math.random() * 100, 80)
  }))

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setNome(user.user_metadata?.name || '')
      setEmail(user.email || '')
      setCargo(user.user_metadata?.cargo || '')
      setEmpresa(user.user_metadata?.empresa || '')
      setTelefone(user.user_metadata?.telefone || '')
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const handleSalvar = async () => {
    setSalvando(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: nome,
          cargo,
          empresa,
          telefone
        }
      })

      if (error) throw error

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram salvas com sucesso!',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o perfil',
        variant: 'destructive',
      })
    } finally {
      setSalvando(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vigorre-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar - Info do usuário */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-vigorre-gold">
                    <AvatarFallback className="bg-vigorre-blue text-white text-2xl">
                      {nome?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold mt-3">{nome || 'Usuário'}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
                {cargo && (
                  <Badge variant="outline" className="mt-2">
                    {cargo}
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Nível e XP */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{nivelAtual.icone}</span>
                  <div>
                    <p className="font-semibold">Nível {nivelAtual.nome}</p>
                    <p className="text-xs text-muted-foreground">{xpTotal} XP</p>
                  </div>
                </div>
                <XPBar xpTotal={xpTotal} />
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {BADGES.slice(0, 5).map((badge, index) => (
                    <div
                      key={badge.id}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm"
                      title={badge.nome}
                    >
                      {badge.icone}
                    </div>
                  ))}
                  {BADGES.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                      +{BADGES.length - 5}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da conta
            </Button>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="dados" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
                <TabsTrigger value="conquistas">Conquistas</TabsTrigger>
                <TabsTrigger value="seguranca">Segurança</TabsTrigger>
              </TabsList>

              <TabsContent value="dados">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        value={email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        O e-mail não pode ser alterado
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input
                        id="cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        placeholder="Seu cargo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Sua empresa"
                      />
                    </div>
                    <Button 
                      onClick={handleSalvar} 
                      disabled={salvando}
                      className="bg-vigorre-gold hover:bg-vigorre-gold/90 text-white"
                    >
                      {salvando ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar alterações
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conquistas">
                <ConquistasGrid badges={badgesMock} />
              </TabsContent>

              <TabsContent value="seguranca">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da conta</CardTitle>
                    <CardDescription>
                      Gerencie a segurança da sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Alterar senha</Label>
                      <div className="flex gap-2">
                        <Input type="password" placeholder="Senha atual" />
                      </div>
                      <div className="flex gap-2">
                        <Input type="password" placeholder="Nova senha" />
                      </div>
                      <div className="flex gap-2">
                        <Input type="password" placeholder="Confirmar nova senha" />
                      </div>
                      <Button variant="outline">Alterar senha</Button>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Autenticação em dois fatores</p>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança
                          </p>
                        </div>
                        <Button variant="outline">Ativar</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-500">Sessões ativas</p>
                          <p className="text-sm text-muted-foreground">
                            Dispositivos conectados à sua conta
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Desconectar todos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
