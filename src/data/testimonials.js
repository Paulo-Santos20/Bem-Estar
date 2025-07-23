export const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    age: 45,
    location: 'São Paulo, SP',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2024-01-15',
    service: 'Medicamentos com Prescrição',
    testimonial: 'Excelente atendimento! A farmacêutica me explicou tudo sobre o medicamento e ainda me deu dicas importantes sobre como tomar. Muito profissional e atenciosa.',
    verified: true,
    helpful: 24
  },
  {
    id: 2,
    name: 'João Santos',
    age: 38,
    location: 'Rio de Janeiro, RJ',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2024-01-10',
    service: 'Entrega a Domicílio',
    testimonial: 'Precisava urgente de um medicamento e o serviço de entrega foi super rápido. Chegou em menos de 1 hora! Recomendo muito.',
    verified: true,
    helpful: 18
  },
  {
    id: 3,
    name: 'Ana Costa',
    age: 52,
    location: 'Belo Horizonte, MG',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2024-01-08',
    service: 'Aplicação de Injetáveis',
    testimonial: 'Aplicação da vacina foi muito tranquila. A enfermeira foi super cuidadosa e o ambiente é muito limpo e organizado. Voltarei sempre!',
    verified: true,
    helpful: 31
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    age: 29,
    location: 'Salvador, BA',
    avatar: '/api/placeholder/80/80',
    rating: 4,
    date: '2024-01-05',
    service: 'Testes Rápidos',
    testimonial: 'Fiz o teste de glicemia e o resultado saiu na hora. Muito prático e o preço é justo. O atendimento poderia ser um pouco mais rápido, mas no geral foi bom.',
    verified: true,
    helpful: 12
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    age: 34,
    location: 'Fortaleza, CE',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2024-01-03',
    service: 'Medicamentos com Prescrição',
    testimonial: 'Sempre compro meus medicamentos aqui. Os preços são competitivos e o atendimento é excepcional. A equipe sempre me ajuda a encontrar o que preciso.',
    verified: true,
    helpful: 27
  },
  {
    id: 6,
    name: 'Roberto Mendes',
    age: 61,
    location: 'Porto Alegre, RS',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2023-12-28',
    service: 'Medição de Pressão',
    testimonial: 'Meço minha pressão aqui toda semana. O serviço é gratuito e os profissionais sempre me orientam sobre os resultados. Muito grato por esse cuidado.',
    verified: true,
    helpful: 35
  },
  {
    id: 7,
    name: 'Juliana Rocha',
    age: 26,
    location: 'Recife, PE',
    avatar: '/api/placeholder/80/80',
    rating: 5,
    date: '2023-12-25',
    service: 'Perfuração de Orelha',
    testimonial: 'Furei a orelha da minha filha aqui e foi perfeito! Muito higiênico, profissional e ela nem chorou. Os brincos são lindos e hipoalergênicos.',
    verified: true,
    helpful: 19
  },
  {
    id: 8,
    name: 'Pedro Almeida',
    age: 42,
    location: 'Brasília, DF',
    avatar: '/api/placeholder/80/80',
    rating: 4,
    date: '2023-12-20',
    service: 'Entrega a Domicílio',
    testimonial: 'Ótimo serviço de entrega. Pedido chegou no prazo e bem embalado. Única sugestão seria ter mais opções de horário para entrega.',
    verified: true,
    helpful: 15
  }
];

export const getTestimonialsByService = (service) => {
  return testimonials.filter(testimonial => testimonial.service === service);
};

export const getVerifiedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.verified);
};

export const getTopRatedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.rating >= 5);
};

export const getRecentTestimonials = (limit = 6) => {
  return testimonials
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};