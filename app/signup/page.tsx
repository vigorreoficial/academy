'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, CheckCircle, Shield } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      setLoading(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const userData = { 
        id: 'user-1', 
        name,
        email,
        role: 'user'
      }
      localStorage.setItem('user', JSON.stringify(userData))
      
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[#16A34A]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#16A34A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
            Conta criada com sucesso! 🎉
          </h2>
          <p className="text-[#6B7280] mt-2">
            Você será redirecionado para o dashboard em instantes...
          </p>
          <div className="mt-6 w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
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
            Crie sua conta gratuita e comece a aprender
          </p>
        </div>

        {/* Card */}
        <Card className="border-[#E5E7EB] shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-[#0A2540]" style={{ fontFamily: 'Poppins' }}>
              Criar conta 🚀
            </CardTitle>
            <CardDescription className="text-[#6B7280]">
              Preencha os dados abaixo para começar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0A2540]">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-[#E5E7EB] h-12 pl-12 pr-4 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0A2540]">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-[#E5E7EB] h-12 pl-12 pr-4 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0A2540]">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-[#E5E7EB] h-12 pl-12 pr-12 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280]"
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0A2540]">Confirmar senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-xl border-[#E5E7EB] h-12 pl-12 pr-4 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-[#0A2540] placeholder:text-[#6B7280]"
                    required
                  />
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
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar conta
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t border-[#E5E7EB] pt-6">
            <p className="text-sm text-[#6B7280]">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#0A2540] font-semibold hover:text-[#D4AF37] transition">
                Faça login
              </Link>
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <Shield className="w-4 h-4" />
              <span>Seus dados estão seguros • LGPD compliant</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
