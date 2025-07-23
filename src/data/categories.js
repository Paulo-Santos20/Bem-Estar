export const categories = [
  {
    id: 'saude',
    name: 'Saúde',
    icon: '🩺',
    subcategories: [
      { 
        id: 'bem-estar', 
        name: 'Bem Estar',
        items: [
          { id: 'fitness', name: 'Fitness' },
          { id: 'relaxamento', name: 'Relaxamento' },
          { id: 'sono', name: 'Sono e Descanso' }
        ]
      },
      { 
        id: 'diabetes', 
        name: 'Diabetes',
        items: [
          { id: 'alimentos-dieteticos', name: 'Alimentos Dietéticos' },
          { id: 'adocantes', name: 'Adoçantes' },
          { id: 'medidores-glicose', name: 'Medidores de Glicose' }
        ]
      },
      { 
        id: 'saude-sexual', 
        name: 'Saúde Sexual',
        items: [
          { id: 'preservativos', name: 'Preservativos' },
          { id: 'higiene-intima', name: 'Higiene Íntima' },
          { id: 'lubrificantes', name: 'Lubrificantes' },
          { id: 'acessorios-saude-sexual', name: 'Acessórios para Saúde Sexual' }
        ]
      },
      { 
        id: 'pele-cabelos-unhas', 
        name: 'Pele, Cabelos e Unhas',
        items: [
          { id: 'assadura', name: 'Assadura' },
          { id: 'acne', name: 'Acne' },
          { id: 'cicatrizes', name: 'Cicatrizes e Imperfeições' },
          { id: 'micoses', name: 'Micoses de Pele e Unha' },
          { id: 'piolhos', name: 'Tratamento Contra Piolhos' }
        ]
      },
      { 
        id: 'cuidado-adulto', 
        name: 'Cuidado Adulto',
        items: [
          { id: 'absorvente-adulto', name: 'Absorvente Adulto' },
          { id: 'fralda-adulta', name: 'Fralda Adulta' },
          { id: 'lencos-pomadas', name: 'Lenços e Pomadas' }
        ]
      }
    ]
  },
  {
    id: 'medicamentos',
    name: 'Medicamentos',
    icon: '💊',
    subcategories: [
      { 
        id: 'remedios', 
        name: 'Remédios',
        items: [
          { id: 'alergias', name: 'Para Alergias' },
          { id: 'anticoncepcionais', name: 'Pílulas Anticoncepcionais e DIU' },
          { id: 'anti-inflamatorios', name: 'Anti-Inflamatórios' },
          { id: 'antidepressivos', name: 'Antidepressivos' },
          { id: 'anti-tabagismo', name: 'Para Parar de Fumar' },
          { id: 'calmantes', name: 'Calmantes' },
          { id: 'asma', name: 'Para Asma' },
          { id: 'congestao-nasal', name: 'Congestão Nasal' },
          { id: 'diabetes', name: 'Para Diabetes' },
          { id: 'dor-febre', name: 'Para Dor e Febre' },
          { id: 'rinite-sinusite', name: 'Para Rinite e Sinusite' },
          { id: 'dor-garganta', name: 'Para Dor de Garganta' },
          { id: 'gripe-resfriado', name: 'Para Gripe e Resfriado' },
          { id: 'emagrecedores', name: 'Controle de Peso' },
          { id: 'gastrite', name: 'Para Gastrite' },
          { id: 'enxaqueca', name: 'Para Enxaqueca' },
          { id: 'colesterol', name: 'Para Colesterol' },
          { id: 'infeccoes', name: 'Para Infecções' },
          { id: 'insonia', name: 'Para Insônia' },
          { id: 'tireoide', name: 'Para Tireoide' },
          { id: 'visao', name: 'Para a Visão' },
          { id: 'azia-digestao', name: 'Para Azia e Má Digestão' },
          { id: 'hipertensao', name: 'Para Pressão Alta' },
          { id: 'tosse', name: 'Para Tosse' }
        ]
      },
      { 
        id: 'medicamentos-especiais', 
        name: 'Medicamentos Especiais',
        items: [
          { id: 'endocrinologia', name: 'Endocrinologia' },
          { id: 'ginecologia', name: 'Ginecologia' },
          { id: 'infertilidade', name: 'Infertilidade' },
          { id: 'oncologia', name: 'Oncologia' },
          { id: 'reumatologia', name: 'Reumatologia' },
          { id: 'clinica-geral', name: 'Clínica Geral' },
          { id: 'outras-especialidades', name: 'Outras Especialidades' }
        ]
      },
      { 
        id: 'medicina-natural', 
        name: 'Medicina Natural',
        items: [
          { id: 'ayurveda', name: 'Ayurveda' },
          { id: 'florais', name: 'Florais' },
          { id: 'calmantes-naturais', name: 'Calmantes' },
          { id: 'fitoterapicos', name: 'Fitoterápicos' },
          { id: 'homeopatia', name: 'Homeopatia' },
          { id: 'remedios-naturais', name: 'Remédios Naturais' },
          { id: 'aromaterapia', name: 'Aromaterapia' },
          { id: 'canabidiol', name: 'Canabidiol' }
        ]
      },
      { 
        id: 'primeiros-socorros', 
        name: 'Primeiros-Socorros',
        items: [
          { id: 'curativos', name: 'Curativos' },
          { id: 'algodao', name: 'Algodão' },
          { id: 'soros', name: 'Soros' },
          { id: 'higienizadores', name: 'Higienizadores' },
          { id: 'acessorios-primeiros-socorros', name: 'Acessórios para Primeiros-Socorros' },
          { id: 'contusoes-machucados', name: 'Contusões e Machucados' }
        ]
      },
      { 
        id: 'monitores-testes', 
        name: 'Monitores e Testes',
        items: [
          { id: 'monitores-pressao', name: 'Monitores de Pressão' },
          { id: 'medidores-glicose', name: 'Medidores de Glicose' },
          { id: 'canetas-insulina', name: 'Canetas de Insulina' },
          { id: 'termometros', name: 'Termômetros' },
          { id: 'oximetros', name: 'Oxímetros' },
          { id: 'pilhas-baterias', name: 'Pilhas e Baterias' },
          { id: 'testes', name: 'Testes' }
        ]
      },
      { 
        id: 'ortopedicos', 
        name: 'Ortopédicos',
        items: [
          { id: 'joelheiras-tornozeleiras', name: 'Joelheiras e Tornozeleiras' },
          { id: 'munhequeiras-cotoveleiras', name: 'Munhequeiras e Cotoveleiras' },
          { id: 'tipoias-colar-cervical', name: 'Tipoias e Colar Cervical' },
          { id: 'muletas-bengalas', name: 'Muletas e Bengalas' },
          { id: 'botas-ortopedicas', name: 'Botas Ortopédicas' },
          { id: 'meias-compressao-cintas', name: 'Meias de Compressão e Cintas' },
          { id: 'lesoes-luxacoes-torcoes', name: 'Para Lesões, Luxações e Torções' },
          { id: 'massageadores', name: 'Massageadores' }
        ]
      }
    ]
  },
  {
    id: 'vitaminas-suplementos',
    name: 'Vitaminas e Suplementos',
    icon: '💪',
    subcategories: [
      { 
        id: 'vitaminas', 
        name: 'Vitaminas',
        items: [
          { id: 'multivitaminicos', name: 'Multivitamínicos' },
          { id: 'vitamina-a', name: 'Vitamina A' },
          { id: 'vitamina-b', name: 'Vitamina B' },
          { id: 'vitamina-c', name: 'Vitamina C' },
          { id: 'vitamina-d', name: 'Vitamina D' },
          { id: 'vitamina-e', name: 'Vitamina E' },
          { id: 'calcio', name: 'Cálcio' },
          { id: 'minerais', name: 'Minerais' },
          { id: 'omega', name: 'Ômega' },
          { id: 'oleos', name: 'Óleos' },
          { id: 'colageno', name: 'Colágeno' }
        ]
      },
      { 
        id: 'suplementos-alimentos', 
        name: 'Suplementos e Alimentos',
        items: [
          { id: 'cereais', name: 'Cereais' },
          { id: 'bebidas', name: 'Bebidas' },
          { id: 'energeticos', name: 'Energéticos' },
          { id: 'proteinas', name: 'Proteínas' },
          { id: 'termogenicos', name: 'Termogênicos' },
          { id: 'complementos-alimentares', name: 'Complementos Alimentares' },
          { id: 'shakes', name: 'Shakes' },
          { id: 'organicos-integrais', name: 'Orgânicos e Integrais' }
        ]
      }
    ]
  },
  {
    id: 'beleza',
    name: 'Beleza',
    icon: '💄',
    subcategories: [
      { 
        id: 'cuidados-pele', 
        name: 'Cuidados com a Pele',
        items: [
          { id: 'protetor-solar', name: 'Protetor Solar' },
          { id: 'bronzeadores', name: 'Bronzeadores' },
          { id: 'antiidade', name: 'Anti-idade' },
          { id: 'hidratante', name: 'Hidratante' },
          { id: 'limpeza-pele', name: 'Limpeza da Pele' },
          { id: 'pos-sol', name: 'Pós-Sol' },
          { id: 'antiacne', name: 'Antiacne' },
          { id: 'antirrugas', name: 'Antirrugas' },
          { id: 'esfoliante', name: 'Esfoliante' },
          { id: 'oleo-corporal', name: 'Óleo Corporal' }
        ]
      },
      { 
        id: 'maquiagem', 
        name: 'Maquiagem',
        items: [
          { id: 'base-corretivo-po', name: 'Base, Corretivo e Pó' },
          { id: 'batom', name: 'Batom' },
          { id: 'lapis-delineador', name: 'Lápis e Delineadores' },
          { id: 'mascara-cilios', name: 'Máscara para Cílios' },
          { id: 'demaquilante', name: 'Demaquilante' },
          { id: 'gloss', name: 'Gloss' },
          { id: 'sombras', name: 'Sombras' },
          { id: 'blush', name: 'Blush' },
          { id: 'acessorios-maquiagem', name: 'Acessórios' },
          { id: 'pincas', name: 'Pinças' }
        ]
      },
      { 
        id: 'tratamento-capilar', 
        name: 'Tratamento Capilar',
        items: [
          { id: 'anticaspa', name: 'Anticaspa' },
          { id: 'antiqueda', name: 'Antiqueda' },
          { id: 'cacheados', name: 'Cacheados' },
          { id: 'frizz', name: 'Frizz' },
          { id: 'hidratacao', name: 'Hidratação' },
          { id: 'lisos', name: 'Lisos' },
          { id: 'oleosos', name: 'Oleosos' },
          { id: 'secos-danificados', name: 'Secos e Danificados' },
          { id: 'pontas-duplas', name: 'Pontas Duplas' },
          { id: 'tratamentos', name: 'Tratamentos' }
        ]
      },
      { 
        id: 'perfumes', 
        name: 'Perfumes',
        items: [
          { id: 'feminino', name: 'Feminino' },
          { id: 'masculino', name: 'Masculino' },
          { id: 'unissex', name: 'Unissex' },
          { id: 'infantil', name: 'Infantil' }
        ]
      }
    ]
  },
  {
    id: 'cosmeticos',
    name: 'Cosméticos',
    icon: '💋',
    subcategories: [
      { 
        id: 'dermocosmeticos', 
        name: 'Dermocosméticos',
        items: [
          { id: 'labios', name: 'Lábios' },
          { id: 'corpo', name: 'Corpo' },
          { id: 'olhos', name: 'Olhos' },
          { id: 'tratamento-facial', name: 'Tratamento Facial' },
          { id: 'tratamento-capilar-dermo', name: 'Tratamento Capilar' },
          { id: 'maos-pes', name: 'Mãos e Pés' },
          { id: 'protetores-solares', name: 'Protetores Solares' }
        ]
      },
      { 
        id: 'nutricosmeticos', 
        name: 'Nutricosméticos',
        items: [
          { id: 'fortalecedor-cabelos-unhas', name: 'Fortalecedor de Cabelos e Unhas' },
          { id: 'antioxidante', name: 'Antioxidante' },
          { id: 'anticelulite-firmadores', name: 'Anticelulite e Firmadores' }
        ]
      }
    ]
  },
  {
    id: 'mamae-bebe',
    name: 'Mamãe & Bebê',
    icon: '👶',
    subcategories: [
      { 
        id: 'alimentacao', 
        name: 'Alimentação',
        items: [
          { id: 'fase-1', name: 'Fase 1' },
          { id: 'fase-2', name: 'Fase 2' },
          { id: 'fase-3', name: 'Fase 3' },
          { id: 'compostos-lacteos', name: 'Compostos Lácteos' },
          { id: 'formulas-infantis', name: 'Fórmulas Infantis' },
          { id: 'complementos-suplementos', name: 'Complementos e Suplementos' },
          { id: 'papinhas', name: 'Papinhas' },
          { id: 'sem-lactose', name: 'Sem Lactose' },
          { id: 'soja', name: 'Soja' },
          { id: 'cereais-infantis', name: 'Cereais Infantis' },
          { id: 'anti-refluxo', name: 'Anti Refluxo' },
          { id: 'acessorios-alimentacao', name: 'Acessórios' }
        ]
      },
      { 
        id: 'fraldas-troca', 
        name: 'Fraldas e Troca',
        items: [
          { id: 'assaduras', name: 'Assaduras' },
          { id: 'fraldas', name: 'Fraldas' },
          { id: 'lencos-umedecidos', name: 'Lenços Umedecidos' },
          { id: 'algodao-bebe', name: 'Algodão' },
          { id: 'talcos', name: 'Talcos' }
        ]
      },
      { 
        id: 'cuidados-mamae', 
        name: 'Cuidados para a Mamãe',
        items: [
          { id: 'meias-compressao', name: 'Meias de Compressão' },
          { id: 'protetores-seios', name: 'Protetores de Seios' },
          { id: 'antiestrias', name: 'Antiestrias' },
          { id: 'hidratantes-mamae', name: 'Hidratantes' },
          { id: 'absorventes-mamae', name: 'Absorventes' }
        ]
      },
      { 
        id: 'hora-banho', 
        name: 'Hora do Banho',
        items: [
          { id: 'sabonetes-bebe', name: 'Sabonetes' },
          { id: 'shampoos-bebe', name: 'Shampoos' },
          { id: 'condicionadores-bebe', name: 'Condicionadores' },
          { id: 'acessorios-banho', name: 'Acessórios' },
          { id: 'hastes-flexiveis', name: 'Hastes Flexíveis' },
          { id: 'cremes-gel-cabelo', name: 'Cremes e Gel para Cabelo' }
        ]
      }
    ]
  },
  {
    id: 'cuidados-diarios',
    name: 'Cuidados Diários',
    icon: '🧼',
    subcategories: [
      { 
        id: 'higiene-pessoal', 
        name: 'Higiene Pessoal',
        items: [
          { id: 'shampoo', name: 'Shampoo' },
          { id: 'condicionador', name: 'Condicionador' },
          { id: 'sabonetes', name: 'Sabonetes' },
          { id: 'absorventes', name: 'Absorventes' },
          { id: 'algodao-hastes', name: 'Algodão e Hastes Flexíveis' },
          { id: 'lencos-papel', name: 'Lenços de Papel' },
          { id: 'talcos-higiene', name: 'Talcos' },
          { id: 'antissepticos', name: 'Antissépticos' },
          { id: 'banho', name: 'Banho' },
          { id: 'protetores-descartaveis', name: 'Protetores Descartáveis' }
        ]
      },
      { 
        id: 'higiene-bucal', 
        name: 'Higiene Bucal',
        items: [
          { id: 'escovas-dentais', name: 'Escovas Dentais' },
          { id: 'escovas-interdentais', name: 'Escovas Interdentais' },
          { id: 'cremes-dentais', name: 'Cremes Dentais' },
          { id: 'acessorios-bucal', name: 'Acessórios' },
          { id: 'anti-septicos-bucais', name: 'Anti-Sépticos Bucais' },
          { id: 'fios-dentais', name: 'Fios Dentais e Passadores' },
          { id: 'dentadura', name: 'Fixadores de Dentadura' },
          { id: 'escova-eletrica', name: 'Escova Elétrica' }
        ]
      },
      { 
        id: 'cuidados-masculinos', 
        name: 'Cuidados Masculinos',
        items: [
          { id: 'aparelhos-barbear', name: 'Aparelhos de Barbear' },
          { id: 'barba', name: 'Barba' },
          { id: 'cabelo-masculino', name: 'Cabelo' }
        ]
      },
      { 
        id: 'repelentes', 
        name: 'Repelentes',
        items: [
          { id: 'aerosol', name: 'Aerosol' },
          { id: 'locao', name: 'Loção' },
          { id: 'spray', name: 'Spray' },
          { id: 'gel-repelente', name: 'Gel' },
          { id: 'eletrico', name: 'Elétrico' }
        ]
      }
    ]
  },
  {
    id: 'pet',
    name: 'Pet',
    icon: '🐕',
    subcategories: [
      { 
        id: 'medicamentos-pet', 
        name: 'Medicamentos Pet',
        items: [
          { id: 'antipulgas-carrapatos', name: 'Antipulgas e Carrapatos' },
          { id: 'anti-inflamatorios-pet', name: 'Anti-Inflamatórios Pet' },
          { id: 'antiparasitario-pet', name: 'Antiparasitário Pet' },
          { id: 'antibiotico-pet', name: 'Antibiótico Pet' },
          { id: 'antialergico-pet', name: 'Antialérgico Pet' },
          { id: 'antiestresse-pet', name: 'Antiestresse Pet' },
          { id: 'dermatite-pet', name: 'Remédio para Dermatite Pet' },
          { id: 'regenerador-articular-pet', name: 'Regenerador Articular Pet' }
        ]
      },
      { 
        id: 'vida-saudavel-pet', 
        name: 'Vida Saudável Pet',
        items: [
          { id: 'probioticos-pet', name: 'Probióticos Pet' },
          { id: 'vitaminas-suplementos-pet', name: 'Vitaminas e Suplementos Pet' },
          { id: 'outros-produtos-saude-pet', name: 'Outros Produtos de Saúde Pet' }
        ]
      },
      { 
        id: 'higiene-limpeza-pet', 
        name: 'Higiene e Limpeza Pet',
        items: [
          { id: 'shampoo-pet', name: 'Shampoo Pet' },
          { id: 'tapetes-higienicos-pet', name: 'Tapetes Higiênicos Pet' }
        ]
      }
    ]
  }
];

// Categorias principais para exibir no menu
export const mainCategories = [
  'medicamentos',
  'vitaminas-suplementos', 
  'beleza',
  'mamae-bebe'
];

// Função para obter categoria por ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Função para obter subcategoria por ID
export const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};