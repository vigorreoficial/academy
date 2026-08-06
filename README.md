# 🎓 Vigorre Academy™

**Plataforma Inteligente de Educação Corporativa, Treinamentos e Certificação**

---

## 📋 Sobre o Projeto

A Vigorre Academy é uma plataforma completa de Learning Management System (LMS) desenvolvida com tecnologias modernas para oferecer treinamentos corporativos, certificações e desenvolvimento profissional com suporte a Inteligência Artificial.

### 🚀 Diferenciais

- **IA Generativa:** Transforme PDFs, DOCXs e outros documentos em cursos completos
- **Certificação Verificável:** QR Code + Hash criptográfico + Página pública de validação
- **Gamificação:** Sistema de XP, níveis, badges e rankings
- **NR-1 Compliance:** Validações automáticas para cursos de Segurança do Trabalho
- **Multi-tenant:** Isolamento total entre empresas
- **LGPD by Design:** Segurança e privacidade desde a arquitetura
- **Custo Zero:** MVP rodando em Supabase (Free) + Vercel (Hobby)

---

## 🛠️ Tecnologias

| Camada | Tecnologia | Versão |
| :--- | :--- | :--- |
| **Frontend/Backend** | Next.js (App Router) | 14.x |
| **Linguagem** | TypeScript | 5.x |
| **Estilização** | Tailwind CSS + shadcn/ui | 3.x |
| **Banco de Dados** | Supabase (PostgreSQL) | Latest |
| **Autenticação** | Supabase Auth | Latest |
| **Armazenamento** | Supabase Storage | Latest |
| **Deploy** | Vercel | Hobby |

---

## 📁 Estrutura do Projeto
vigorre-academy/
├── app/
│ ├── (auth)/ # Autenticação (login, signup, confirm)
│ ├── (public)/ # Landing page, catálogo público
│ ├── (dashboard)/ # Dashboard do aluno
│ │ ├── dashboard/ # Página principal
│ │ ├── cursos/ # Meus cursos
│ │ │ ├── [id]/ # Detalhe do curso
│ │ │ └── novo/ # Criar curso com IA
│ │ └── certificados/ # Meus certificados
│ ├── (admin)/ # Painel administrativo
│ ├── api/ # API Routes
│ │ ├── auth/ # Autenticação
│ │ ├── cursos/ # CRUD de cursos
│ │ ├── ia/ # IA (gerar curso, processar PDF)
│ │ └── certificados/ # Certificados
│ └── validar/[codigo]/ # Validação pública de certificados
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── courses/ # Componentes de cursos
│ ├── dashboard/ # Componentes do dashboard
│ ├── gamification/ # Sistema de gamificação
│ └── certificates/ # Componentes de certificados
├── lib/
│ ├── supabase/ # Supabase clients
│ ├── utils/ # Funções utilitárias
│ └── validations/ # Validações (NR-1, tempo mínimo)
├── types/ # TypeScript types
├── .env.local # Variáveis de ambiente
└── package.json # Dependências

---

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/vigoreofficial/academy.git
cd academy
