// ============================================
// PROCESSADOR DE ARQUIVOS - VIGORRE ACADEMY
// ============================================

/**
 * Tipos de arquivo suportados
 */
export type FileType = 'pdf' | 'docx' | 'pptx' | 'txt' | 'epub' | 'html'

/**
 * Resultado do processamento
 */
export interface ProcessedFile {
  fileName: string
  fileType: FileType
  text: string
  textLength: number
  pages?: number
}

/**
 * Verifica se o tipo de arquivo é suportado
 */
export function isSupportedFileType(file: File): boolean {
  const supportedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
    'text/plain',
    'application/epub+zip',
    'text/html',
  ]
  return supportedTypes.includes(file.type)
}

/**
 * Extrai texto de um arquivo (simulação para ambiente local)
 */
export async function extractTextFromFile(file: File): Promise<ProcessedFile> {
  const fileType = getFileType(file)
  
  // Simular extração de texto para ambiente local
  // Em produção, usaria bibliotecas como pdf-parse, mammoth, etc.
  const mockText = `
CONTEÚDO EXTRAÍDO DO ARQUIVO

Título: ${file.name}
Tipo: ${file.type}
Tamanho: ${(file.size / 1024).toFixed(2)} KB

---
Este é um exemplo de conteúdo extraído do arquivo ${file.name}.

Em produção, este texto seria extraído utilizando bibliotecas como:
- pdf-parse para PDFs
- mammoth para DOCX
- pptx-parser para PPTXs
- fs para TXTs

O texto extraído seria então enviado para a IA (Gemini/OpenAI)
para gerar um curso estruturado com:
- Módulos
- Aulas
- Quizzes
- Certificados

---
Fim do conteúdo extraído.
  `

  return {
    fileName: file.name,
    fileType: fileType,
    text: mockText,
    textLength: mockText.length,
    pages: 1
  }
}

/**
 * Identifica o tipo do arquivo
 */
function getFileType(file: File): FileType {
  if (file.type === 'application/pdf') return 'pdf'
  if (file.type.includes('wordprocessingml')) return 'docx'
  if (file.type.includes('presentationml')) return 'pptx'
  if (file.type === 'text/plain') return 'txt'
  if (file.type === 'application/epub+zip') return 'epub'
  if (file.type === 'text/html') return 'html'
  return 'txt'
}

/**
 * Processa múltiplos arquivos
 */
export async function processMultipleFiles(files: File[]): Promise<ProcessedFile[]> {
  const results: ProcessedFile[] = []
  for (const file of files) {
    if (isSupportedFileType(file)) {
      const result = await extractTextFromFile(file)
      results.push(result)
    }
  }
  return results
}
