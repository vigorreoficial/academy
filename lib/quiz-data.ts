// ============================================
// BANCO DE QUESTÕES MOCK - VIGORRE ACADEMY
// ============================================

export interface Questao {
  id: string
  enunciado: string
  alternativas: string[]
  resposta_correta: number // índice da alternativa correta (0-3)
  explicacao: string
  nivel: 'FACIL' | 'MEDIO' | 'DIFICIL'
  categoria: string
  peso: number
}

export interface Quiz {
  id: string
  titulo: string
  descricao: string
  questoes: Questao[]
  nota_minima: number
  tempo_limite_minutos: number
  max_tentativas: number
}

export interface ResultadoQuiz {
  quizId: string
  usuarioId: string
  questoes: {
    questaoId: string
    resposta_dada: number
    correta: boolean
  }[]
  acertos: number
  total: number
  nota: number
  aprovado: boolean
  tempo_gasto_segundos: number
  data_realizacao: string
  tentativa: number
}

// ============================================
// QUESTÕES MOCK POR CATEGORIA
// ============================================

const questoesLideranca: Questao[] = [
  {
    id: 'q1',
    enunciado: 'Qual estilo de liderança se caracteriza pela participação da equipe nas decisões?',
    alternativas: ['Autocrático', 'Democrático', 'Liberal', 'Situacional'],
    resposta_correta: 1,
    explicacao: 'O estilo democrático envolve a participação da equipe nas decisões, promovendo engajamento e colaboração.',
    nivel: 'FACIL',
    categoria: 'Liderança',
    peso: 1
  },
  {
    id: 'q2',
    enunciado: 'O que é feedback construtivo?',
    alternativas: ['Crítica destrutiva', 'Avaliação negativa', 'Retorno que visa o desenvolvimento', 'Elogio vazio'],
    resposta_correta: 2,
    explicacao: 'Feedback construtivo é aquele que visa o desenvolvimento e melhoria, com foco em soluções.',
    nivel: 'MEDIO',
    categoria: 'Liderança',
    peso: 1
  },
  {
    id: 'q3',
    enunciado: 'Qual dos seguintes NÃO é um estilo de liderança situacional?',
    alternativas: ['Direcionar', 'Treinar', 'Apoiar', 'Autoritário'],
    resposta_correta: 3,
    explicacao: 'Autoritário não é um estilo da liderança situacional, que inclui Direcionar, Treinar, Apoiar e Delegar.',
    nivel: 'DIFICIL',
    categoria: 'Liderança',
    peso: 2
  },
  {
    id: 'q4',
    enunciado: 'Qual a principal característica de um líder transformacional?',
    alternativas: ['Foco em resultados imediatos', 'Inspirar e motivar a equipe', 'Manter o status quo', 'Tomar decisões sozinho'],
    resposta_correta: 1,
    explicacao: 'Líderes transformacionais inspiram e motivam a equipe a alcançar resultados além do esperado.',
    nivel: 'MEDIO',
    categoria: 'Liderança',
    peso: 1
  },
  {
    id: 'q5',
    enunciado: 'O que é inteligência emocional na liderança?',
    alternativas: ['Ignorar emoções', 'Capacidade de gerenciar emoções próprias e dos outros', 'Ser sempre racional', 'Evitar conflitos'],
    resposta_correta: 1,
    explicacao: 'Inteligência emocional é a capacidade de reconhecer e gerenciar emoções próprias e alheias.',
    nivel: 'FACIL',
    categoria: 'Liderança',
    peso: 1
  }
]

const questoesSeguranca: Questao[] = [
  {
    id: 'q6',
    enunciado: 'Qual é a NR que trata de segurança em instalações elétricas?',
    alternativas: ['NR-1', 'NR-10', 'NR-12', 'NR-18'],
    resposta_correta: 1,
    explicacao: 'A NR-10 trata de segurança em instalações e serviços em eletricidade.',
    nivel: 'FACIL',
    categoria: 'Segurança',
    peso: 1
  },
  {
    id: 'q7',
    enunciado: 'Qual equipamento de proteção é obrigatório para trabalhos com eletricidade?',
    alternativas: ['Luva de borracha', 'Óculos de segurança', 'Protetor auricular', 'Capacete comum'],
    resposta_correta: 0,
    explicacao: 'Luvas de borracha são obrigatórias para proteção contra choques elétricos.',
    nivel: 'MEDIO',
    categoria: 'Segurança',
    peso: 1
  },
  {
    id: 'q8',
    enunciado: 'O que significa a sigla EPI?',
    alternativas: ['Equipamento de Proteção Individual', 'Equipamento de Prevenção Integral', 'Estudo de Proteção Industrial', 'Equipamento de Proteção Interna'],
    resposta_correta: 0,
    explicacao: 'EPI significa Equipamento de Proteção Individual, utilizado para proteger o trabalhador.',
    nivel: 'FACIL',
    categoria: 'Segurança',
    peso: 1
  }
]

const questoesGestao: Questao[] = [
  {
    id: 'q9',
    enunciado: 'O que é gestão por competências?',
    alternativas: ['Gestão de pessoas baseada em habilidades', 'Gestão financeira', 'Gestão de projetos', 'Gestão de qualidade'],
    resposta_correta: 0,
    explicacao: 'Gestão por competências foca no desenvolvimento de habilidades e comportamentos dos colaboradores.',
    nivel: 'MEDIO',
    categoria: 'Gestão',
    peso: 1
  },
  {
    id: 'q10',
    enunciado: 'Qual a finalidade do PDI (Plano de Desenvolvimento Individual)?',
    alternativas: ['Avaliar desempenho financeiro', 'Desenvolver competências do colaborador', 'Controlar frequência', 'Gerenciar folha de pagamento'],
    resposta_correta: 1,
    explicacao: 'O PDI visa desenvolver competências e habilidades do colaborador para seu crescimento profissional.',
    nivel: 'MEDIO',
    categoria: 'Gestão',
    peso: 1
  }
]

// ============================================
// QUIZZES MOCK
// ============================================

export const quizzesMock: Quiz[] = [
  {
    id: 'quiz-1',
    titulo: 'Avaliação de Liderança',
    descricao: 'Teste seus conhecimentos sobre liderança e gestão de equipes',
    questoes: questoesLideranca,
    nota_minima: 70,
    tempo_limite_minutos: 15,
    max_tentativas: 3
  },
  {
    id: 'quiz-2',
    titulo: 'Segurança do Trabalho - NR-10',
    descricao: 'Avaliação sobre segurança em instalações elétricas',
    questoes: questoesSeguranca,
    nota_minima: 80,
    tempo_limite_minutos: 10,
    max_tentativas: 3
  },
  {
    id: 'quiz-3',
    titulo: 'Gestão por Competências',
    descricao: 'Avaliação sobre gestão de pessoas e competências',
    questoes: questoesGestao,
    nota_minima: 70,
    tempo_limite_minutos: 10,
    max_tentativas: 2
  }
]

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export function getQuestoesByCategoria(categoria: string): Questao[] {
  const categorias: Record<string, Questao[]> = {
    'Liderança': questoesLideranca,
    'Segurança': questoesSeguranca,
    'Gestão': questoesGestao
  }
  return categorias[categoria] || []
}

export function getQuizById(id: string): Quiz | undefined {
  return quizzesMock.find(q => q.id === id)
}

export function getQuestoesAleatorias(quantidade: number, categoria?: string): Questao[] {
  let questoes = categoria ? getQuestoesByCategoria(categoria) : [...questoesLideranca, ...questoesSeguranca, ...questoesGestao]
  
  // Embaralhar
  for (let i = questoes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questoes[i], questoes[j]] = [questoes[j], questoes[i]]
  }
  
  return questoes.slice(0, Math.min(quantidade, questoes.length))
}

export function calcularNota(respostas: { questaoId: string; resposta: number }[], questoes: Questao[]): {
  acertos: number
  total: number
  nota: number
  aprovado: boolean
  detalhes: { questaoId: string; correta: boolean; respostaCorreta: number; explicacao: string }[]
} {
  let acertos = 0
  const detalhes = []
  
  for (const resposta of respostas) {
    const questao = questoes.find(q => q.id === resposta.questaoId)
    if (!questao) continue
    
    const correta = resposta.resposta === questao.resposta_correta
    if (correta) acertos++
    
    detalhes.push({
      questaoId: resposta.questaoId,
      correta,
      respostaCorreta: questao.resposta_correta,
      explicacao: questao.explicacao
    })
  }
  
  const total = respostas.length
  const nota = total > 0 ? (acertos / total) * 100 : 0
  
  return {
    acertos,
    total,
    nota,
    aprovado: nota >= 70,
    detalhes
  }
}
