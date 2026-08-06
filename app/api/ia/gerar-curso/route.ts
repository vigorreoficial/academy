import { NextResponse } from 'next/server'

// Simulação de geração de curso com IA
// Em produção, integrar com Gemini/OpenAI
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, fileContent } = body

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Estrutura gerada pela IA
    const cursoGerado = {
      titulo: gerarTitulo(prompt),
      subtitulo: 'Aprenda com a inteligência artificial',
      descricao: 'Curso completo gerado automaticamente pela IA da Vigorre Academy',
      carga_horaria: 20,
      nivel: 'INTERMEDIARIO',
      modulos: [
        {
          titulo: 'Introdução ao tema',
          aulas: [
            { titulo: 'Conceitos fundamentais', duracao: 10 },
            { titulo: 'Contexto e aplicação', duracao: 15 },
          ]
        },
        {
          titulo: 'Desenvolvimento prático',
          aulas: [
            { titulo: 'Primeiros passos', duracao: 20 },
            { titulo: 'Casos de uso', duracao: 25 },
          ]
        },
        {
          titulo: 'Avançado',
          aulas: [
            { titulo: 'Técnicas avançadas', duracao: 20 },
            { titulo: 'Melhores práticas', duracao: 15 },
          ]
        }
      ],
      questoes: gerarQuestoes(3)
    }

    return NextResponse.json(cursoGerado)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao gerar curso' },
      { status: 500 }
    )
  }
}

function gerarTitulo(prompt: string): string {
  const temas = {
    'liderança': 'Liderança e Gestão de Equipes',
    'rh': 'Gestão de Pessoas e RH Estratégico',
    'vendas': 'Vendas e Negociação',
    'marketing': 'Marketing Digital e Estratégia',
    'tecnologia': 'Tecnologia e Inovação',
    'default': 'Curso Personalizado'
  }

  for (const [key, value] of Object.entries(temas)) {
    if (prompt.toLowerCase().includes(key)) {
      return value
    }
  }
  return temas.default
}

function gerarQuestoes(quantidade: number) {
  const questoes = []
  for (let i = 0; i < quantidade; i++) {
    questoes.push({
      enunciado: `Questão ${i + 1}: Qual é o principal conceito abordado?`,
      alternativas: [
        { texto: 'Alternativa A', correta: true },
        { texto: 'Alternativa B', correta: false },
        { texto: 'Alternativa C', correta: false },
        { texto: 'Alternativa D', correta: false },
      ],
      explicacao: 'Explicação da resposta correta...'
    })
  }
  return questoes
}
