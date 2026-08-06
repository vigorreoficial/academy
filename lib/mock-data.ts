// Dados mockados para desenvolvimento
export const mockUser = {
  id: '1',
  name: 'Aluno Vigorre',
  email: 'aluno@vigorre.com.br',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'student' as const,
  xp: 1250,
  level: 5,
  coursesEnrolled: 3,
  certificates: 2,
}

export const mockCourses = [
  {
    id: 1,
    title: 'Liderança Estratégica 360°',
    category: 'Liderança',
    progress: 78,
    duration: '18h',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
  },
  {
    id: 2,
    title: 'NRs e Segurança do Trabalho',
    category: 'Operacional',
    progress: 45,
    duration: '24h',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    id: 3,
    title: 'Analytics & Data Driven HR',
    category: 'Tecnologia',
    progress: 92,
    duration: '10h',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
]

export const mockStats = {
  totalCourses: 3,
  completedCourses: 1,
  totalHours: 52,
  certificates: 2,
  xp: 1250,
  level: 5,
}

export const mockAchievements = [
  { id: 1, name: 'Primeiro Curso', icon: '🎯', unlocked: true },
  { id: 2, name: 'Maratonista', icon: '🏃', unlocked: true },
  { id: 3, name: 'Expert', icon: '⭐', unlocked: false },
  { id: 4, name: 'Mentor', icon: '👑', unlocked: false },
]
