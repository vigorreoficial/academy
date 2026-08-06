// ============================================
// DADOS MOCK - DESENVOLVIMENTO LOCAL
// ============================================

export const mockCursos = [
  {
    id: '1',
    titulo: 'Liderança e Gestão de Equipes',
    descricao: 'Aprenda a liderar equipes de alta performance com técnicas modernas',
    descricao_curta: 'Curso completo de liderança',
    carga_horaria: 20,
    modalidade: 'EAD',
    nivel: 'INTERMEDIARIO',
    categoria: 'Liderança',
    preco: 0,
    thumb_url: null,
    certificado_incluso: true,
    status: 'publicado',
    modulos: [
      {
        id: 'm1',
        titulo: 'Fundamentos da Liderança',
        descricao: 'Conceitos básicos',
        aulas: [
          { id: 'a1', titulo: 'O que é liderança', descricao: 'Definição', duracao_minutos: 15 },
          { id: 'a2', titulo: 'Estilos de liderança', descricao: 'Tipos', duracao_minutos: 20 },
        ]
      }
    ]
  },
  {
    id: '2',
    titulo: 'Gestão de Pessoas com IA',
    descricao: 'Como a inteligência artificial está transformando o RH',
    descricao_curta: 'IA aplicada ao RH',
    carga_horaria: 15,
    modalidade: 'EAD',
    nivel: 'AVANCADO',
    categoria: 'RH',
    preco: 0,
    thumb_url: null,
    certificado_incluso: true,
    status: 'publicado',
    modulos: []
  },
  {
    id: '3',
    titulo: 'NR-10 - Segurança em Eletricidade',
    descricao: 'Curso completo de segurança em instalações elétricas',
    descricao_curta: 'NR-10 completa',
    carga_horaria: 40,
    modalidade: 'EAD',
    nivel: 'AVANCADO',
    categoria: 'Segurança',
    preco: 0,
    thumb_url: null,
    certificado_incluso: true,
    status: 'publicado',
    modulos: []
  }
]

export const mockAluno = {
  id: 'user-1',
  nome: 'João Silva',
  email: 'joao@email.com',
  cpf: '123.456.789-00',
  cargo: 'Analista de RH',
  empresa_atual: 'Vigorre',
  certificados: [
    {
      id: 'cert-1',
      curso_nome: 'Liderança e Gestão de Equipes',
      codigo: 'VIG-2026-001',
      data_emissao: '2026-01-15',
      carga_horaria: 20
    }
  ],
  inscricoes: [
    {
      curso_id: '1',
      progresso: 75,
      status: 'em_andamento'
    }
  ]
}

export const mockStats = {
  cursosEmAndamento: 3,
  certificados: 5,
  horasTreinadas: 42,
  cursosConcluidos: 8
}
