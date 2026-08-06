import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const codigo = searchParams.get('codigo')

    if (!codigo) {
      return NextResponse.json(
        { error: 'Código do certificado é obrigatório' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Buscar certificado
    const { data: certificado, error } = await supabase
      .from('certificados')
      .select(`
        *,
        cursos (
          titulo,
          carga_horaria,
          nr_aplicavel
        ),
        usuarios (
          nome,
          email
        )
      `)
      .eq('codigo', codigo)
      .single()

    if (error || !certificado) {
      return NextResponse.json({
        valido: false,
        mensagem: 'Certificado não encontrado'
      })
    }

    // Verificar se está ativo
    if (certificado.status !== 'ativo') {
      return NextResponse.json({
        valido: false,
        mensagem: 'Certificado revogado ou expirado'
      })
    }

    // Verificar validade
    if (certificado.data_validade && new Date(certificado.data_validade) < new Date()) {
      return NextResponse.json({
        valido: false,
        mensagem: 'Certificado expirado'
      })
    }

    return NextResponse.json({
      valido: true,
      nome: certificado.usuarios?.nome || 'Usuário',
      curso: certificado.cursos?.titulo || 'Curso',
      carga_horaria: certificado.cursos?.carga_horaria || 0,
      nr_aplicavel: certificado.cursos?.nr_aplicavel || [],
      data_emissao: certificado.data_emissao,
      data_validade: certificado.data_validade,
      codigo: certificado.codigo,
      hash: certificado.hash,
      status: certificado.status
    })

  } catch (error) {
    console.error('Erro ao validar certificado:', error)
    return NextResponse.json(
      { error: 'Erro ao validar certificado' },
      { status: 500 }
    )
  }
}
