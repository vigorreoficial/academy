// ============================================
// VALIDAÇÕES NR-1 - COMPLIANCE COMPLETO
// ============================================

export interface NR1Validation {
  isValid: boolean
  errors: string[]
  warnings: string[]
  nrRequisitos: NRRequisito[]
}

export interface NRRequisito {
  nr: string
  nome: string
  cargaHorariaMinima: number
  possuiPartePratica: boolean
  reciclagemMeses: number
  descricao: string
}

// ============================================
// 1. CATÁLOGO DE NORMAS REGULAMENTADORAS
// ============================================

export const NR_CATALOGO: Record<string, NRRequisito> = {
  'NR-1': {
    nr: 'NR-1',
    nome: 'Disposições Gerais',
    cargaHorariaMinima: 0,
    possuiPartePratica: false,
    reciclagemMeses: 0,
    descricao: 'Disposições gerais sobre segurança e saúde no trabalho'
  },
  'NR-5': {
    nr: 'NR-5',
    nome: 'Comissão Interna de Prevenção de Acidentes - CIPA',
    cargaHorariaMinima: 20,
    possuiPartePratica: false,
    reciclagemMeses: 12,
    descricao: 'Treinamento para membros da CIPA'
  },
  'NR-6': {
    nr: 'NR-6',
    nome: 'Equipamentos de Proteção Individual - EPI',
    cargaHorariaMinima: 4,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Uso e conservação de EPIs'
  },
  'NR-7': {
    nr: 'NR-7',
    nome: 'Programa de Controle Médico de Saúde Ocupacional - PCMSO',
    cargaHorariaMinima: 8,
    possuiPartePratica: false,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre PCMSO'
  },
  'NR-8': {
    nr: 'NR-8',
    nome: 'Edificações',
    cargaHorariaMinima: 8,
    possuiPartePratica: false,
    reciclagemMeses: 24,
    descricao: 'Segurança em edificações'
  },
  'NR-9': {
    nr: 'NR-9',
    nome: 'Programa de Prevenção de Riscos Ambientais - PPRA',
    cargaHorariaMinima: 8,
    possuiPartePratica: false,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre PPRA'
  },
  'NR-10': {
    nr: 'NR-10',
    nome: 'Segurança em Instalações e Serviços em Eletricidade',
    cargaHorariaMinima: 40,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre segurança elétrica'
  },
  'NR-11': {
    nr: 'NR-11',
    nome: 'Transporte, Movimentação, Armazenagem e Manuseio de Materiais',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Segurança no transporte e armazenagem'
  },
  'NR-12': {
    nr: 'NR-12',
    nome: 'Segurança no Trabalho em Máquinas e Equipamentos',
    cargaHorariaMinima: 16,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre segurança em máquinas'
  },
  'NR-13': {
    nr: 'NR-13',
    nome: 'Caldeiras, Vasos de Pressão e Tubulações',
    cargaHorariaMinima: 16,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Segurança em caldeiras e vasos de pressão'
  },
  'NR-15': {
    nr: 'NR-15',
    nome: 'Atividades e Operações Insalubres',
    cargaHorariaMinima: 8,
    possuiPartePratica: false,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre insalubridade'
  },
  'NR-16': {
    nr: 'NR-16',
    nome: 'Atividades e Operações Perigosas',
    cargaHorariaMinima: 8,
    possuiPartePratica: false,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre periculosidade'
  },
  'NR-17': {
    nr: 'NR-17',
    nome: 'Ergonomia',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre ergonomia'
  },
  'NR-18': {
    nr: 'NR-18',
    nome: 'Segurança no Trabalho na Indústria da Construção',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento para construção civil'
  },
  'NR-20': {
    nr: 'NR-20',
    nome: 'Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',
    cargaHorariaMinima: 16,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre inflamáveis e combustíveis'
  },
  'NR-23': {
    nr: 'NR-23',
    nome: 'Proteção Contra Incêndios',
    cargaHorariaMinima: 4,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento sobre combate a incêndios'
  },
  'NR-24': {
    nr: 'NR-24',
    nome: 'Condições Sanitárias e de Conforto nos Locais de Trabalho',
    cargaHorariaMinima: 4,
    possuiPartePratica: false,
    reciclagemMeses: 24,
    descricao: 'Condições sanitárias e conforto'
  },
  'NR-26': {
    nr: 'NR-26',
    nome: 'Sinalização de Segurança',
    cargaHorariaMinima: 4,
    possuiPartePratica: false,
    reciclagemMeses: 24,
    descricao: 'Treinamento sobre sinalização'
  },
  'NR-33': {
    nr: 'NR-33',
    nome: 'Segurança e Saúde nos Trabalhos em Espaços Confinados',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento para espaços confinados'
  },
  'NR-35': {
    nr: 'NR-35',
    nome: 'Trabalho em Altura',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento para trabalho em altura'
  },
  'NR-36': {
    nr: 'NR-36',
    nome: 'Segurança e Saúde no Trabalho em Abate e Processamento de Carnes',
    cargaHorariaMinima: 8,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento para abate e processamento'
  },
  'NR-37': {
    nr: 'NR-37',
    nome: 'Segurança e Saúde em Plataformas de Petróleo',
    cargaHorariaMinima: 40,
    possuiPartePratica: true,
    reciclagemMeses: 12,
    descricao: 'Treinamento para plataformas de petróleo'
  }
}

// ============================================
// 2. VALIDAÇÃO PRINCIPAL NR-1
// ============================================

export function validateNR1Compliance(curso: any): NR1Validation {
  const errors: string[] = []
  const warnings: string[] = []
  const nrRequisitos: NRRequisito[] = []

  // 1. Verificar se tem NR aplicável
  const hasNR = curso.nr_aplicavel && curso.nr_aplicavel.length > 0

  // 2. Validar responsável técnico (obrigatório para cursos NR)
  if (hasNR) {
    if (!curso.responsavel_tecnico_id && !curso.responsavel_tecnico_nome) {
      errors.push('⚠️ Responsável Técnico é obrigatório para cursos com NR aplicável')
    }
    
    // Validar registro profissional
    if (curso.responsavel_tecnico_registro) {
      const registroValido = validarRegistroProfissional(curso.responsavel_tecnico_registro)
      if (!registroValido) {
        warnings.push('⚠️ Formato do registro profissional pode estar incorreto (ex: CREA, CRC, CRF)')
      }
    }
  }

  // 3. Validar conteúdo programático
  if (!curso.modulos || curso.modulos.length === 0) {
    errors.push('⚠️ Curso deve ter pelo menos um módulo')
  } else {
    // Validar se cada módulo tem aulas
    let totalAulas = 0
    for (const modulo of curso.modulos) {
      if (!modulo.aulas || modulo.aulas.length === 0) {
        warnings.push(`⚠️ Módulo "${modulo.titulo}" não tem aulas cadastradas`)
      } else {
        totalAulas += modulo.aulas.length
      }
    }
    
    if (totalAulas < 3 && hasNR) {
      warnings.push('⚠️ Curso com NR deve ter pelo menos 3 aulas para atender requisitos mínimos')
    }
  }

  // 4. Validar carga horária mínima por NR
  if (hasNR && curso.nr_aplicavel) {
    for (const nr of curso.nr_aplicavel) {
      const requisito = NR_CATALOGO[nr]
      if (requisito) {
        nrRequisitos.push(requisito)
        
        if (curso.carga_horaria < requisito.cargaHorariaMinima) {
          errors.push(`⚠️ ${nr} exige carga horária mínima de ${requisito.cargaHorariaMinima} horas (atual: ${curso.carga_horaria}h)`)
        }
        
        // Validar parte prática
        if (requisito.possuiPartePratica && !curso.possui_parte_pratica) {
          errors.push(`⚠️ ${nr} exige parte prática obrigatória`)
        }
      } else {
        warnings.push(`⚠️ NR ${nr} não encontrada no catálogo - verifique se está correta`)
      }
    }
  }

  // 5. Validar avaliação
  if (hasNR && !curso.possui_avaliacao) {
    errors.push('⚠️ Cursos com NR aplicável devem ter avaliação final')
  }

  // 6. Validar nota mínima (NR-1 exige 70%)
  if (hasNR) {
    const notaMinima = curso.nota_minima_aprovacao || 70
    if (notaMinima < 70) {
      errors.push(`⚠️ Nota mínima para cursos NR deve ser 70% (atual: ${notaMinima}%)`)
    }
  }

  // 7. Validar tentativas
  if (curso.max_tentativas && curso.max_tentativas < 1) {
    errors.push('⚠️ Número de tentativas deve ser pelo menos 1')
  }

  // 8. Validar tempo mínimo por aula
  if (curso.tempo_minimo_por_aula_minutos && curso.tempo_minimo_por_aula_minutos < 5) {
    warnings.push('⚠️ Tempo mínimo por aula muito baixo (recomendado 5+ minutos para cursos NR)')
  }

  // 9. Validar reciclagem
  if (hasNR && curso.nr_aplicavel) {
    for (const nr of curso.nr_aplicavel) {
      const requisito = NR_CATALOGO[nr]
      if (requisito && requisito.reciclagemMeses > 0) {
        warnings.push(`ℹ️ ${nr} recomenda reciclagem a cada ${requisito.reciclagemMeses} meses`)
      }
    }
  }

  // 10. Validar público-alvo
  if (hasNR && !curso.publico_alvo) {
    warnings.push('⚠️ Defina o público-alvo para cursos com NR')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    nrRequisitos
  }
}

// ============================================
// 3. VALIDAÇÃO DE REGISTRO PROFISSIONAL
// ============================================

function validarRegistroProfissional(registro: string): boolean {
  // Exemplos: CREA 123456, CRC 123456/O, CRF 123456
  const regex = /^(CREA|CRC|CRF|CRA|CRM|COREN|CRP|CRO|CRQ|CRT)\s*[0-9]+\/?[A-Z]?$/i
  return regex.test(registro.trim())
}

// ============================================
// 4. VALIDAÇÃO DE TEMPO MÍNIMO POR AULA
// ============================================

export interface TempoMinimoValidation {
  podeConcluir: boolean
  faltamSegundos: number
  faltamMinutos: number
  progresso: number
  mensagem: string
}

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
    mensagem = `⏱️ Faltam ${minutos}m ${segundos}s para cumprir o tempo mínimo`
  }

  return {
    podeConcluir,
    faltamSegundos,
    faltamMinutos: Math.floor(faltamSegundos / 60),
    progresso,
    mensagem
  }
}

// ============================================
// 5. VALIDAÇÃO DE CERTIFICADO NR
// ============================================

export interface CertificadoNRValidation {
  isValid: boolean
  errors: string[]
  camposObrigatorios: string[]
}

export function validateCertificadoNR(
  certificado: any,
  curso: any
): CertificadoNRValidation {
  const errors: string[] = []
  const camposObrigatorios: string[] = []

  // Campos obrigatórios por NR-1
  const camposBase = [
    'nome_completo',
    'cpf',
    'curso',
    'carga_horaria',
    'data_emissao',
    'responsavel_tecnico'
  ]

  for (const campo of camposBase) {
    camposObrigatorios.push(campo)
    if (!certificado[campo]) {
      errors.push(`⚠️ Campo "${campo}" é obrigatório`)
    }
  }

  // Campos adicionais para NR
  if (curso?.nr_aplicavel && curso.nr_aplicavel.length > 0) {
    const camposNR = [
      'nr_aplicavel',
      'conteudo_programatico',
      'instrutor_nome',
      'instrutor_registro'
    ]
    
    for (const campo of camposNR) {
      camposObrigatorios.push(campo)
      if (!certificado[campo]) {
        errors.push(`⚠️ Campo "${campo}" é obrigatório para cursos NR`)
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    camposObrigatorios
  }
}

// ============================================
// 6. FUNÇÃO PARA BUSCAR REQUISITOS NR
// ============================================

export function getNRRequisitos(nrs: string[]): NRRequisito[] {
  const requisitos: NRRequisito[] = []
  
  for (const nr of nrs) {
    const requisito = NR_CATALOGO[nr]
    if (requisito) {
      requisitos.push(requisito)
    }
  }
  
  return requisitos
}

// ============================================
// 7. FUNÇÃO PARA GERAR CHECKLIST NR
// ============================================

export function gerarChecklistNR(curso: any): { item: string; status: 'ok' | 'warning' | 'error'; mensagem: string }[] {
  const checklist: { item: string; status: 'ok' | 'warning' | 'error'; mensagem: string }[] = []
  const hasNR = curso.nr_aplicavel && curso.nr_aplicavel.length > 0

  // 1. Responsável Técnico
  if (hasNR) {
    if (curso.responsavel_tecnico_nome) {
      checklist.push({
        item: 'Responsável Técnico',
        status: 'ok',
        mensagem: `✅ ${curso.responsavel_tecnico_nome}`
      })
    } else {
      checklist.push({
        item: 'Responsável Técnico',
        status: 'error',
        mensagem: '❌ Não definido'
      })
    }
  }

  // 2. Carga Horária
  if (hasNR && curso.nr_aplicavel) {
    let cargaOk = true
    for (const nr of curso.nr_aplicavel) {
      const requisito = NR_CATALOGO[nr]
      if (requisito && curso.carga_horaria < requisito.cargaHorariaMinima) {
        cargaOk = false
        checklist.push({
          item: `Carga Horária (${nr})`,
          status: 'error',
          mensagem: `❌ ${curso.carga_horaria}h (mínimo ${requisito.cargaHorariaMinima}h)`
        })
      }
    }
    if (cargaOk) {
      checklist.push({
        item: 'Carga Horária',
        status: 'ok',
        mensagem: `✅ ${curso.carga_horaria}h`
      })
    }
  }

  // 3. Módulos
  if (curso.modulos && curso.modulos.length > 0) {
    checklist.push({
      item: 'Módulos',
      status: 'ok',
      mensagem: `✅ ${curso.modulos.length} módulos`
    })
  } else {
    checklist.push({
      item: 'Módulos',
      status: 'error',
      mensagem: '❌ Nenhum módulo cadastrado'
    })
  }

  // 4. Avaliação
  if (curso.possui_avaliacao) {
    checklist.push({
      item: 'Avaliação Final',
      status: 'ok',
      mensagem: `✅ Nota mínima: ${curso.nota_minima_aprovacao || 70}%`
    })
  } else if (hasNR) {
    checklist.push({
      item: 'Avaliação Final',
      status: 'error',
      mensagem: '❌ Obrigatória para cursos NR'
    })
  }

  // 5. Parte Prática
  if (hasNR) {
    let praticaOk = true
    for (const nr of curso.nr_aplicavel) {
      const requisito = NR_CATALOGO[nr]
      if (requisito?.possuiPartePratica && !curso.possui_parte_pratica) {
        praticaOk = false
        checklist.push({
          item: `Parte Prática (${nr})`,
          status: 'error',
          mensagem: '❌ Obrigatória'
        })
      }
    }
    if (praticaOk) {
      checklist.push({
        item: 'Parte Prática',
        status: 'ok',
        mensagem: curso.possui_parte_pratica ? '✅ Incluída' : 'ℹ️ Não obrigatória'
      })
    }
  }

  // 6. Reciclagem
  if (hasNR && curso.nr_aplicavel) {
    let reciclagemInfo = ''
    for (const nr of curso.nr_aplicavel) {
      const requisito = NR_CATALOGO[nr]
      if (requisito?.reciclagemMeses > 0) {
        reciclagemInfo += `${nr}: ${requisito.reciclagemMeses}m `
      }
    }
    if (reciclagemInfo) {
      checklist.push({
        item: 'Reciclagem',
        status: 'ok',
        mensagem: `ℹ️ ${reciclagemInfo}`
      })
    }
  }

  return checklist
}
