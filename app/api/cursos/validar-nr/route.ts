import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateNR1Compliance, gerarChecklistNR } from '@/lib/validations/nr-1'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { cursoId } = body

    if (!cursoId) {
      return NextResponse.json(
        { error: 'ID do curso é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar curso com todos os dados
    const { data: curso, error } = await supabase
      .from('cursos')
      .select(`
        *,
        modulos (
          id,
          titulo,
          ordem,
          aulas (
            id,
            titulo,
            duracao_minutos,
            tempo_minimo_segundos
          )
        )
      `)
      .eq('id', cursoId)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Curso não encontrado' },
        { status: 404 }
      )
    }

    // Validar compliance NR-1
    const validation = validateNR1Compliance(curso)
    const checklist = gerarChecklistNR(curso)

    // Atualizar status do curso se necessário
    if (validation.isValid && curso.status === 'rascunho') {
      // Se válido e está em rascunho, pode ser publicado
      // Deixamos a decisão para o usuário
    }

    return NextResponse.json({
      curso: curso.id,
      titulo: curso.titulo,
      isValid: validation.isValid,
      errors: validation.errors,
      warnings: validation.warnings,
      nrRequisitos: validation.nrRequisitos,
      checklist,
      status: curso.status
    })

  } catch (error) {
    console.error('Erro ao validar curso:', error)
    return NextResponse.json(
      { error: 'Erro ao validar curso' },
      { status: 500 }
    )
  }
}
