'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RecuperarSenhaPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/atualizar-senha`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error) {
      alert('Erro ao enviar e-mail de recuperação')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0A2540]">E-mail enviado!</h2>
            <p className="text-[#6B7280] mt-2">
              Enviamos um link para redefinir sua senha para <strong>{email}</strong>
            </p>
            <Link href="/login">
              <Button className="mt-6 w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white">
                Voltar para o login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-[#E5E7EB] shadow-xl rounded-3xl">
        <CardHeader>
          <Link href="/login" className="text-[#6B7280] hover:text-[#0A2540] inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <CardTitle className="text-2xl text-[#0A2540]">Recuperar senha</CardTitle>
          <CardDescription>
            Digite seu e-mail para receber um link de redefinição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-[#E5E7EB] h-12 pl-12 focus:border-[#D4AF37]"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C49F27] text-white font-bold h-12 rounded-xl"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
