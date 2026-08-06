// ============================================
// VALIDAÇÃO DE TEMPO MÍNIMO POR AULA
// ============================================

import { createClient } from '@/lib/supabase/server'

export interface TempoMinimoValidation {
  podeConcluir: boolean
  faltamSegundos: number
  faltamMinutos: number
  progresso: number
  mensagem: string
  tempoMinimoSegundos: number
  tempoAssistidoSegundos: number
}

/**
 * Busca o tempo mínimo configurado para uma aula
 */
export async function getTempoMinimoAula(aulaId: string): Promise<number> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('aulas')
    .select('tempo_minimo_segundos')
    .eq('id', aulaId)
    .single()
  
  if (error || !data) {
    // Se não tiver configurado, retorna o padrão (5 minutos = 300 segundos)
    return 300
  }
  
  return data.tempo_minimo_segundos || 300
}

/**
 * Valida o tempo assistido contra o tempo mínimo
 */
export function validateTempoMinimo(
  tempoMinimoSegundos: number,
  tempoAssistidoSegundos: number
): TempoMinimoValidation {
  const faltamSegundos = Math.max(0, tempoMinimoSegundos - tempoAssistidoSegundos)
  const progresso = Math.min((tempoAssistidoSegundos / tempoMinimoSegundos) * 100, 100)
  const podeConcluir = tempoAssistidoSegundos >= tempoMinimoSegundos

  let mensagem = ''
  if (podeConcluir) {
    mensagem = '✅ Tempo mínimo cumprido! Você pode concluir esta aula.'
  } else {
    const minutos = Math.floor(faltamSegundos / 60)
    const segundos = Math.floor(faltamSegundos % 60)
    mensagem = `⏱️ Faltam ${minutos}m ${segundos}s para cumprir o tempo mínimo (${Math.floor(tempoMinimoSegundos / 60)}min)`
  }

  return {
    podeConcluir,
    faltamSegundos,
    faltamMinutos: Math.floor(faltamSegundos / 60),
    progresso,
    mensagem,
    tempoMinimoSegundos,
    tempoAssistidoSegundos
  }
}

/**
 * Validação completa com busca no banco de dados
 */
export async function validateTempoMinimoCompleto(
  aulaId: string,
  tempoAssistidoSegundos: number
): Promise<TempoMinimoValidation> {
  const tempoMinimoSegundos = await getTempoMinimoAula(aulaId)
  return validateTempoMinimo(tempoMinimoSegundos, tempoAssistidoSegundos)
}

/**
 * Verifica se o usuário pode concluir a aula
 */
export async function podeConcluirAula(
  aulaId: string,
  tempoAssistidoSegundos: number
): Promise<{ pode: boolean; mensagem: string }> {
  const validation = await validateTempoMinimoCompleto(aulaId, tempoAssistidoSegundos)
  
  return {
    pode: validation.podeConcluir,
    mensagem: validation.mensagem
  }
}
