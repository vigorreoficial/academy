'use client'

import { useState } from 'react'
import { useRouter } rel="noopener" target="_new">'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, ArrowRight, Sparkles, Shield } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simular login - substituir por autenticação real
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock login
      const userData = { 
        id: 'user-1', 
        name: email.split('@')[0] || 'Usuário', 
        email,
        role: 'user'
      }
      localStorage.setItem('user', JSON.stringify(userData))
      
      router.push('/dashboard')
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#0A2540]/20">
              V
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-xl uppercase" style={{ fontFamily: 'Poppins' }}>
                VIGORRE
              </span>
              <span className="font-extrabold text-xl uppercase" style={{ fontFamily: 'Poppins', color: '#D4AF37' }}>
                ACADEMY™
              </span>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm">
            Acesse sua conta para continuar aprendendo
          </p>
        </div>

        {/* Card */}
        <Card className="border-[#E5E7EB] shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
              Bem-vindo de volta 👋
            </CardTitle>
            <CardDescription className="text-[#6B7280]">
              Entre com suas credenciais para acessar o portal
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0A2540]">E-mail</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-[#E5E7EB] h-12 px-4 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280]"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0A2540]">Senha</label>
                  <Link href="/recuperar-senha" className="text-sm text-[#D4AF37] hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-[#E5E7EB] h-12 px-4 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280] pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A2540]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white font-bold h-12 rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:-translate-y-0.5 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-[#E5E7EB] pt-6">
            <p className="text-sm text-[#6B7280]">
              Não tem uma conta?{' '}
              <Link href="/signup" className="text-[#0A2540] font-semibold hover:text-[#D4AF37] transition">
                Cadastre-se gratuitamente
              </Link>
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <Shield className="w-4 h-4" />
              <span>Ambiente seguro • LGPD compliant</span>
            </div>
          </CardFooter>
        </Card>

        {/* Rodapé */}
        <p className="text-center text-xs text-[#6B7280] mt-6">
          Ao continuar, você concorda com nossos{' '}
          <Link href="/termos" className="text-[#0A2540] hover:text-[#D4AF37]">Termos de Uso</Link>
          {' '}e{' '}
          <Link href="/privacidade" className="text-[#0A2540] hover:text-[#D4AF37]">Política de Privacidade</Link>
        </p>
      </div>
    </div>
  )
}
