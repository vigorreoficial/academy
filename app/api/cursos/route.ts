import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: cursos, error } = await supabase
      .from('cursos')
      .select(`
        *,
        categorias (nome, slug),
        modulos (
          id,
          titulo,
          ordem,
          aulas (id, titulo, duracao_minutos, ordem)
        )
      `)
      .eq('status', 'publicado')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(cursos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar cursos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()

    const { data: curso, error } = await supabase
      .from('cursos')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(curso)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar curso' },
      { status: 500 }
    )
  }
}
