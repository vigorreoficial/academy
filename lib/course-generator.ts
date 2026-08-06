// ============================================
// GERADOR DE CURSOS COM IA - VIGORRE ACADEMY
// ============================================

export interface GeneratedCourse {
  titulo: string
  subtitulo: string
  descricao: string
  objetivo_geral: string
  objetivos_especificos: string[]
  publico_alvo: string
  pre_requisitos: string
  competencias: string[]
  carga_horaria: number
  nivel: 'BASICO' | 'INTERMEDIARIO' | 'AVANCADO'
  nr_aplicavel: string[]
  modulos: {
    titulo: string
    descricao: string
    aulas: {
      titulo: string
      descricao: string
      duracao_minutos: number
    }[]
  }[]
  avaliacao: {
    questoes: {
      enunciado: string
      alternativas: string[]
      resposta_correta: number
      explicacao: string
    }[]
  }
  bibliografia: string[]
  legislacao: string[]
}

/**
 * Gera um curso a partir do conteúdo de um arquivo
 * Versão MOCK para ambiente local
 */
export async function generateCourseFromFile(
  fileContent: string,
  fileName: string
): Promise<GeneratedCourse> {
  // Simular delay da IA
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Identificar tema baseado no conteúdo
  const tema = identificarTema(fileContent, fileName)

  return gerarCursoMock(tema)
}

/**
 * Gera um curso a partir de um prompt
 */
export async function generateCourseFromPrompt(
  prompt: string
): Promise<GeneratedCourse> {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const tema = identificarTemaPorPrompt(prompt)
  return gerarCursoMock(tema)
}

/**
 * Identifica o tema do conteúdo
 */
function identificarTema(content: string, fileName: string): string {
  const texto = content.toLowerCase() + ' ' + fileName.toLowerCase()
  
  if (texto.includes('lider') || texto.includes('gestão') || texto.includes('equipe')) {
    return 'lideranca'
  }
  if (texto.includes('segurança') || texto.includes('nr') || texto.includes('risco')) {
    return 'seguranca'
  }
  if (texto.includes('rh') || texto.includes('pessoas') || texto.includes('recursos')) {
    return 'rh'
  }
  if (texto.includes('tecnologia') || texto.includes('software') || texto.includes('dados')) {
    return 'tecnologia'
  }
  if (texto.includes('qualidade') || texto.includes('iso') || texto.includes('processo')) {
    return 'qualidade'
  }
  return 'default'
}

function identificarTemaPorPrompt(prompt: string): string {
  const texto = prompt.toLowerCase()
  
  if (texto.includes('lider') || texto.includes('gestão') || texto.includes('equipe')) {
    return 'lideranca'
  }
  if (texto.includes('segurança') || texto.includes('nr') || texto.includes('risco')) {
    return 'seguranca'
  }
  if (texto.includes('rh') || texto.includes('pessoas')) {
    return 'rh'
  }
  if (texto.includes('tecnologia') || texto.includes('software')) {
    return 'tecnologia'
  }
  return 'default'
}

/**
 * Gera um curso mock baseado no tema
 */
function gerarCursoMock(tema: string): GeneratedCourse {
  const cursos = {
    lideranca: {
      titulo: 'Liderança e Gestão de Equipes de Alta Performance',
      subtitulo: 'Desenvolva habilidades essenciais para liderar equipes com excelência',
      descricao: 'Curso completo de liderança com técnicas modernas de gestão de equipes',
      objetivo_geral: 'Capacitar líderes a gerenciar equipes com foco em resultados e engajamento',
      objetivos_especificos: [
        'Identificar estilos de liderança e sua aplicação',
        'Desenvolver habilidades de comunicação e feedback',
        'Gerenciar conflitos e promover colaboração',
        'Tomar decisões estratégicas com base em dados'
      ],
      publico_alvo: 'Gestores, coordenadores e profissionais que lideram equipes',
      pre_requisitos: 'Experiência em gestão de pessoas (desejável)',
      competencias: ['Liderança', 'Comunicação', 'Gestão de Conflitos', 'Tomada de Decisão'],
      carga_horaria: 20,
      nivel: 'INTERMEDIARIO' as const,
      nr_aplicavel: [],
      modulos: [
        {
          titulo: 'Fundamentos da Liderança',
          descricao: 'Conceitos básicos e estilos de liderança',
          aulas: [
            { titulo: 'O que é liderança', descricao: 'Definição e importância da liderança', duracao_minutos: 15 },
            { titulo: 'Estilos de liderança', descricao: 'Autocrático, democrático e liberal', duracao_minutos: 20 },
            { titulo: 'Liderança situacional', descricao: 'Adaptando o estilo à situação', duracao_minutos: 15 },
          ]
        },
        {
          titulo: 'Comunicação e Feedback',
          descricao: 'Técnicas de comunicação para líderes',
          aulas: [
            { titulo: 'Comunicação eficaz', descricao: 'Elementos da comunicação', duracao_minutos: 15 },
            { titulo: 'Feedback construtivo', descricao: 'Como dar e receber feedback', duracao_minutos: 20 },
            { titulo: 'Escuta ativa', descricao: 'Técnicas de escuta para líderes', duracao_minutos: 15 },
          ]
        },
        {
          titulo: 'Gestão de Equipes',
          descricao: 'Estratégias para gerenciar equipes de alta performance',
          aulas: [
            { titulo: 'Formação de equipes', descricao: 'Como montar equipes eficazes', duracao_minutos: 15 },
            { titulo: 'Motivação e engajamento', descricao: 'Técnicas de motivação', duracao_minutos: 20 },
            { titulo: 'Delegação de tarefas', descricao: 'Como delegar com eficiência', duracao_minutos: 15 },
          ]
        }
      ],
      avaliacao: {
        questoes: [
          {
            enunciado: 'Qual estilo de liderança se caracteriza pela participação da equipe nas decisões?',
            alternativas: ['Autocrático', 'Democrático', 'Liberal', 'Situacional'],
            resposta_correta: 1,
            explicacao: 'O estilo democrático envolve a participação da equipe nas decisões.'
          },
          {
            enunciado: 'O que é feedback construtivo?',
            alternativas: ['Crítica destrutiva', 'Avaliação negativa', 'Retorno que visa o desenvolvimento', 'Elogio vazio'],
            resposta_correta: 2,
            explicacao: 'Feedback construtivo é aquele que visa o desenvolvimento e melhoria.'
          },
          {
            enunciado: 'Qual dos seguintes NÃO é um estilo de liderança situacional?',
            alternativas: ['Direcionar', 'Treinar', 'Apoiar', 'Autoritário'],
            resposta_correta: 3,
            explicacao: 'Autoritário não é um estilo da liderança situacional.'
          }
        ]
      },
      bibliografia: [
        'KOTTER, John. Liderança. 2. ed. Rio de Janeiro: Elsevier, 2015.',
        'GREENLEAF, Robert. Servant Leadership. New York: Paulist Press, 1977.',
        'SENGE, Peter. A Quinta Disciplina. São Paulo: BestSeller, 2019.'
      ],
      legislacao: []
    },
    seguranca: {
      titulo: 'Segurança no Trabalho - NR-10',
      subtitulo: 'Treinamento completo em segurança em instalações elétricas',
      descricao: 'Curso completo de segurança em instalações elétricas conforme NR-10',
      objetivo_geral: 'Capacitar profissionais para atuar com segurança em instalações elétricas',
      objetivos_especificos: [
        'Identificar riscos elétricos',
        'Aplicar medidas de prevenção',
        'Utilizar EPIs corretamente',
        'Realizar procedimentos de segurança'
      ],
      publico_alvo: 'Profissionais da área de SST, engenheiros, técnicos',
      pre_requisitos: 'Conhecimentos básicos em segurança do trabalho',
      competencias: ['Segurança', 'Prevenção', 'Gestão de Riscos', 'NR-10'],
      carga_horaria: 40,
      nivel: 'INTERMEDIARIO' as const,
      nr_aplicavel: ['NR-1', 'NR-10'],
      modulos: [
        {
          titulo: 'Introdução à Segurança do Trabalho',
          descricao: 'Conceitos fundamentais',
          aulas: [
            { titulo: 'O que é segurança do trabalho', descricao: 'Conceitos básicos', duracao_minutos: 20 },
            { titulo: 'Riscos ocupacionais', descricao: 'Tipos de riscos', duracao_minutos: 25 },
            { titulo: 'NR-10 - Visão geral', descricao: 'Principais requisitos', duracao_minutos: 20 },
          ]
        },
        {
          titulo: 'Segurança em Eletricidade',
          descricao: 'Proteção contra riscos elétricos',
          aulas: [
            { titulo: 'Riscos elétricos', descricao: 'Identificação e prevenção', duracao_minutos: 30 },
            { titulo: 'EPIs para eletricidade', descricao: 'Equipamentos obrigatórios', duracao_minutos: 20 },
            { titulo: 'Procedimentos seguros', descricao: 'Como agir com segurança', duracao_minutos: 25 },
          ]
        }
      ],
      avaliacao: {
        questoes: [
          {
            enunciado: 'Qual é a NR que trata de segurança em instalações elétricas?',
            alternativas: ['NR-1', 'NR-10', 'NR-12', 'NR-18'],
            resposta_correta: 1,
            explicacao: 'A NR-10 trata de segurança em instalações e serviços em eletricidade.'
          },
          {
            enunciado: 'Qual equipamento de proteção é obrigatório para trabalhos com eletricidade?',
            alternativas: ['Luva de borracha', 'Óculos de segurança', 'Protetor auricular', 'Capacete comum'],
            resposta_correta: 0,
            explicacao: 'Luvas de borracha são obrigatórias para proteção contra choques elétricos.'
          }
        ]
      },
      bibliografia: [
        'NR-10 - Segurança em Instalações e Serviços em Eletricidade',
        'Manual de EPIs - MTE',
        'Segurança do Trabalho - Fundamentos e Práticas'
      ],
      legislacao: ['NR-1', 'NR-10']
    },
    default: {
      titulo: 'Curso Personalizado de Desenvolvimento Profissional',
      subtitulo: 'Capacitação para o mercado de trabalho',
      descricao: 'Curso desenvolvido especialmente para suas necessidades',
      objetivo_geral: 'Desenvolver competências essenciais para o ambiente profissional',
      objetivos_especificos: [
        'Aprimorar habilidades técnicas',
        'Desenvolver competências comportamentais',
        'Preparar para desafios do mercado'
      ],
      publico_alvo: 'Profissionais de todas as áreas',
      pre_requisitos: 'Não há pré-requisitos',
      competencias: ['Desenvolvimento Pessoal', 'Gestão do Tempo', 'Comunicação'],
      carga_horaria: 15,
      nivel: 'BASICO' as const,
      nr_aplicavel: [],
      modulos: [
        {
          titulo: 'Fundamentos',
          descricao: 'Base do conhecimento',
          aulas: [
            { titulo: 'Introdução', descricao: 'Apresentação do curso', duracao_minutos: 10 },
            { titulo: 'Conceitos básicos', descricao: 'Principais conceitos', duracao_minutos: 15 },
            { titulo: 'Aplicação prática', descricao: 'Como aplicar no dia a dia', duracao_minutos: 20 },
          ]
        },
        {
          titulo: 'Desenvolvimento de Habilidades',
          descricao: 'Competências essenciais',
          aulas: [
            { titulo: 'Comunicação eficaz', descricao: 'Técnicas de comunicação', duracao_minutos: 15 },
            { titulo: 'Gestão do tempo', descricao: 'Como organizar seu tempo', duracao_minutos: 20 },
            { titulo: 'Trabalho em equipe', descricao: 'Colaboração e sinergia', duracao_minutos: 15 },
          ]
        }
      ],
      avaliacao: {
        questoes: [
          {
            enunciado: 'Qual a importância do desenvolvimento profissional contínuo?',
            alternativas: ['Baixa', 'Média', 'Alta', 'Nenhuma'],
            resposta_correta: 2,
            explicacao: 'O desenvolvimento contínuo é essencial para se manter atualizado.'
          },
          {
            enunciado: 'Qual habilidade é fundamental para o trabalho em equipe?',
            alternativas: ['Competitividade', 'Colaboração', 'Individualismo', 'Hierarquia'],
            resposta_correta: 1,
            explicacao: 'A colaboração é essencial para o trabalho em equipe.'
          }
        ]
      },
      bibliografia: [
        'Livro de referência 1 - Desenvolvimento Pessoal',
        'Livro de referência 2 - Gestão do Tempo'
      ],
      legislacao: []
    }
  }

  return cursos[tema as keyof typeof cursos] || cursos.default
}
