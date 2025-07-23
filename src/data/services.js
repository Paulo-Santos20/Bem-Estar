export const services = [
  {
    id: 'medicamentos-prescritos',
    title: 'Medicamentos com Prescrição',
    description: 'Dispensação segura de medicamentos com receita médica, com orientação farmacêutica especializada.',
    icon: '💊',
    features: ['Receita digital', 'Orientação farmacêutica', 'Controle de estoque', 'Entrega rápida'],
    price: 'Conforme receita',
    duration: '5-10 min',
    availability: '24/7',
    popular: true
  },
  {
    id: 'aplicacao-injetaveis',
    title: 'Aplicação de Injetáveis',
    description: 'Aplicação segura de vacinas e medicamentos injetáveis por profissionais qualificados.',
    icon: '💉',
    features: ['Profissionais capacitados', 'Material descartável', 'Ambiente seguro', 'Certificado de aplicação'],
    price: 'A partir de R\$ 15,00',
    duration: '10-15 min',
    availability: 'Seg-Sex 8h-18h',
    popular: true
  },
  {
    id: 'testes-rapidos',
    title: 'Testes Rápidos',
    description: 'Exames rápidos de glicemia, pressão arterial, teste de gravidez e outros.',
    icon: '🧪',
    features: ['Resultados imediatos', 'Equipamentos modernos', 'Relatório detalhado', 'Orientação profissional'],
    price: 'A partir de R\$ 10,00',
    duration: '5-20 min',
    availability: 'Seg-Sáb 8h-20h',
    popular: false
  },
  {
    id: 'medicao-pressao',
    title: 'Medição de Pressão',
    description: 'Aferição da pressão arterial com equipamentos calibrados e orientação sobre os resultados.',
    icon: '🩺',
    features: ['Equipamentos calibrados', 'Medição precisa', 'Histórico de medições', 'Orientação gratuita'],
    price: 'Gratuito',
    duration: '5 min',
    availability: 'Todos os dias',
    popular: true
  },
  {
    id: 'perfuracao-orelha',
    title: 'Perfuração de Orelha',
    description: 'Serviço de perfuração de orelha com materiais esterilizados e brincos hipoalergênicos.',
    icon: '👂',
    features: ['Material esterilizado', 'Brincos hipoalergênicos', 'Profissional treinado', 'Cuidados pós-perfuração'],
    price: 'A partir de R\$ 25,00',
    duration: '15-20 min',
    availability: 'Seg-Sáb 9h-17h',
    popular: false
  },
  {
    id: 'entrega-domicilio',
    title: 'Entrega a Domicílio',
    description: 'Entrega rápida e segura dos seus medicamentos no conforto da sua casa.',
    icon: '🚚',
    features: ['Entrega rápida', 'Rastreamento online', 'Embalagem segura', 'Pagamento na entrega'],
    price: 'Frete grátis acima de R\$ 50',
    duration: '30min-2h',
    availability: '24/7',
    popular: true
  }
];

export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

export const getPopularServices = () => {
  return services.filter(service => service.popular);
};