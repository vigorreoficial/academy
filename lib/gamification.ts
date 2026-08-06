// ============================================
// SISTEMA DE GAMIFICAÇÃO - XP, NÍVEIS E BADGES
// ============================================

export interface Nivel {
  id: string
  nome: string
  xpMinimo: number
  icone: string
  cor: string
  beneficios: string[]
}

export interface Badge {
  id: string
  nome: string
  descricao: string
  icone: string
  cor: string
  xpRecompensa: number
  criterio: {
    tipo: 'cursos_concluidos' | 'certificados' | 'horas_estudo' | 'racha' | 'quiz_perfeito' | 'avaliacao_nota'
    valor: number
  }
}

export interface Conquista {
  id: string
  badgeId: string
  usuarioId: string
  desbloqueado_em: string
  progresso?: number
}

// ============================================
// NÍVEIS DO SISTEMA
// ============================================

export const NIVEIS: Nivel[] = [
  {
    id: 'bronze',
    nome: 'Bronze',
    xpMinimo: 0,
    icone: '🥉',
    cor: '#CD7F32',
    beneficios: ['Acesso ao catálogo básico', '1 curso por mês']
  },
  {
    id: 'prata',
    nome: 'Prata',
    xpMinimo: 1000,
    icone: '🥈',
    cor: '#C0C0C0',
    beneficios: ['Acesso ao catálogo completo', '3 cursos por mês', 'Certificados digitais']
  },
  {
    id: 'ouro',
    nome: 'Ouro',
    xpMinimo: 3000,
    icone: '🥇',
    cor: '#FFD700',
    beneficios: ['Acesso ilimitado', '5 cursos por mês', 'Certificados com validação QR Code', 'Badges exclusivas']
  },
  {
    id: 'platina',
    nome: 'Platina',
    xpMinimo: 6000,
    icone: '💎',
    cor: '#E5E4E2',
    beneficios: ['Acesso ilimitado', 'Cursos ilimitados', 'Certificados premium', 'Mentoria exclusiva', 'Badges raras']
  },
  {
    id: 'diamante',
    nome: 'Diamante',
    xpMinimo: 10000,
    icone: '👑',
    cor: '#B9F2FF',
    beneficios: ['Acesso ilimitado', 'Cursos ilimitados', 'Certificados executivos', 'Mentoria VIP', 'Badges lendárias', 'Convite para eventos']
  }
]

// ============================================
// BADGES DO SISTEMA
// ============================================

export const BADGES: Badge[] = [
  {
    id: 'primeiro_curso',
    nome: 'Primeiro Passo',
    descricao: 'Concluiu seu primeiro curso',
    icone: '🎯',
    cor: '#4CAF50',
    xpRecompensa: 100,
    criterio: { tipo: 'cursos_concluidos', valor: 1 }
  },
  {
    id: 'aprendiz_dedicado',
    nome: 'Aprendiz Dedicado',
    descricao: 'Concluiu 5 cursos',
    icone: '📚',
    cor: '#2196F3',
    xpRecompensa: 200,
    criterio: { tipo: 'cursos_concluidos', valor: 5 }
  },
  {
    id: 'mestre_do_saber',
    nome: 'Mestre do Saber',
    descricao: 'Concluiu 10 cursos',
    icone: '🏆',
    cor: '#FF9800',
    xpRecompensa: 500,
    criterio: { tipo: 'cursos_concluidos', valor: 10 }
  },
  {
    id: 'certificado_ouro',
    nome: 'Certificado de Ouro',
    descricao: 'Obteve 5 certificados',
    icone: '📜',
    cor: '#FFD700',
    xpRecompensa: 150,
    criterio: { tipo: 'certificados', valor: 5 }
  },
  {
    id: 'estudante_incansavel',
    nome: 'Estudante Incansável',
    descricao: 'Estudou por 10 horas',
    icone: '⏰',
    cor: '#9C27B0',
    xpRecompensa: 100,
    criterio: { tipo: 'horas_estudo', valor: 10 }
  },
  {
    id: 'racha_7_dias',
    nome: 'Foco Total',
    descricao: 'Estudou por 7 dias consecutivos',
    icone: '🔥',
    cor: '#F44336',
    xpRecompensa: 300,
    criterio: { tipo: 'racha', valor: 7 }
  },
  {
    id: 'racha_30_dias',
    nome: 'Disciplina Absoluta',
    descricao: 'Estudou por 30 dias consecutivos',
    icone: '⚡',
    cor: '#FF6F00',
    xpRecompensa: 1000,
    criterio: { tipo: 'racha', valor: 30 }
  },
  {
    id: 'quiz_perfeito',
    nome: 'Gênio do Quiz',
    descricao: 'Acertou 100% em um quiz',
    icone: '🧠',
    cor: '#00BCD4',
    xpRecompensa: 150,
    criterio: { tipo: 'quiz_perfeito', valor: 1 }
  },
  {
    id: 'nota_maxima',
    nome: 'Excelência Acadêmica',
    descricao: 'Obteve nota máxima (100%) em uma avaliação',
    icone: '⭐',
    cor: '#FFD700',
    xpRecompensa: 200,
    criterio: { tipo: 'avaliacao_nota', valor: 100 }
  }
]

// ============================================
// FUNÇÕES DE CÁLCULO
// ============================================

export function calcularNivel(xpTotal: number): Nivel {
  let nivelAtual = NIVEIS[0]
  
  for (const nivel of NIVEIS) {
    if (xpTotal >= nivel.xpMinimo) {
      nivelAtual = nivel
    }
  }
  
  return nivelAtual
}

export function calcularProximoNivel(xpTotal: number): Nivel | null {
  for (let i = 0; i < NIVEIS.length; i++) {
    if (xpTotal < NIVEIS[i].xpMinimo) {
      return NIVEIS[i]
    }
  }
  return null
}

export function calcularProgressoNivel(xpTotal: number): number {
  const nivelAtual = calcularNivel(xpTotal)
  const proximoNivel = calcularProximoNivel(xpTotal)
  
  if (!proximoNivel) return 100
  
  const xpAtualNivel = xpTotal - nivelAtual.xpMinimo
  const xpNecessario = proximoNivel.xpMinimo - nivelAtual.xpMinimo
  
  return Math.min((xpAtualNivel / xpNecessario) * 100, 100)
}

export function verificarBadges(
  usuarioId: string,
  stats: {
    cursosConcluidos: number
    certificados: number
    horasEstudo: number
    rachaDias: number
    quizPerfeito: boolean
    ultimaNota: number
  },
  badgesAtuais: string[]
): Badge[] {
  const novasBadges: Badge[] = []
  
  for (const badge of BADGES) {
    // Se já tem a badge, pular
    if (badgesAtuais.includes(badge.id)) continue
    
    let desbloqueado = false
    
    switch (badge.criterio.tipo) {
      case 'cursos_concluidos':
        desbloqueado = stats.cursosConcluidos >= badge.criterio.valor
        break
      case 'certificados':
        desbloqueado = stats.certificados >= badge.criterio.valor
        break
      case 'horas_estudo':
        desbloqueado = stats.horasEstudo >= badge.criterio.valor
        break
      case 'racha':
        desbloqueado = stats.rachaDias >= badge.criterio.valor
        break
      case 'quiz_perfeito':
        desbloqueado = stats.quizPerfeito && badge.criterio.valor === 1
        break
      case 'avaliacao_nota':
        desbloqueado = stats.ultimaNota >= badge.criterio.valor
        break
    }
    
    if (desbloqueado) {
      novasBadges.push(badge)
    }
  }
  
  return novasBadges
}

export function calcularXPTotal(acoes: {
  cursosConcluidos: number
  certificados: number
  horasEstudo: number
  rachaDias: number
  quizzesPerfeitos: number
  notasMaximas: number
}): number {
  let xp = 0
  
  // XP por cursos concluídos
  xp += acoes.cursosConcluidos * 100
  
  // XP por certificados
  xp += acoes.certificados * 50
  
  // XP por horas de estudo
  xp += Math.floor(acoes.horasEstudo * 10)
  
  // XP por racha
  if (acoes.rachaDias >= 7) xp += 50
  if (acoes.rachaDias >= 30) xp += 200
  
  // XP por quizzes perfeitos
  xp += acoes.quizzesPerfeitos * 50
  
  // XP por notas máximas
  xp += acoes.notasMaximas * 100
  
  return xp
}
