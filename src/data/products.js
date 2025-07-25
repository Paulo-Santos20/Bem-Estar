export const products = [
  {
    id: 1,
    name: "Paracetamol 500mg - 20 Comprimidos",
    brand: "Genérico",
    sku: "PAR-500-20",
    category: "Medicamentos",
    categorySlug: "medicamentos",
    price: 8.90,
    originalPrice: 15.90,
    shortDescription: "Alívio rápido para dores e febre",
    description: "O Paracetamol 500mg é um analgésico e antitérmico eficaz para o alívio de dores leves a moderadas e redução da febre. Cada comprimido contém 500mg de paracetamol, proporcionando alívio rápido e seguro.",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop"
    ],
    stock: 50,
    rating: 4.8,
    reviewCount: 127,
    isNew: false,
    isBestSeller: true,
    installments: { count: 2, value: 4.45 },
    variants: [
      { id: 1, name: "20 Comprimidos", price: 8.90, stock: 50 },
      { id: 2, name: "40 Comprimidos", price: 15.90, stock: 30 }
    ],
    specifications: {
      "Princípio Ativo": "Paracetamol 500mg",
      "Forma Farmacêutica": "Comprimido",
      "Quantidade": "20 comprimidos",
      "Registro MS": "1.0000.0000",
      "Fabricante": "Laboratório Genérico"
    },
    contraindications: "Hipersensibilidade ao paracetamol",
    sideEffects: "Raros: náuseas, vômitos, reações alérgicas",
    dosage: "Adultos: 1 a 2 comprimidos a cada 6 horas, não excedendo 8 comprimidos por dia"
  },
  {
    id: 2,
    name: "Vitamina C 1000mg - 60 Cápsulas",
    brand: "VitaLife",
    sku: "VIT-C-1000-60",
    category: "Vitaminas",
    categorySlug: "vitaminas",
    price: 22.90,
    originalPrice: 35.90,
    shortDescription: "Fortalece o sistema imunológico",
    description: "Vitamina C 1000mg em cápsulas, essencial para o fortalecimento do sistema imunológico, formação de colágeno e absorção de ferro. Suplemento de alta qualidade para manter sua saúde em dia.",
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop"
    ],
    stock: 30,
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    isBestSeller: false,
    installments: { count: 3, value: 7.63 },
    variants: [
      { id: 1, name: "60 Cápsulas", price: 22.90, stock: 30 },
      { id: 2, name: "120 Cápsulas", price: 39.90, stock: 20 }
    ],
    specifications: {
      "Princípio Ativo": "Ácido Ascórbico 1000mg",
      "Forma Farmacêutica": "Cápsula",
      "Quantidade": "60 cápsulas",
      "Registro ANVISA": "6.0000.0000",
      "Fabricante": "VitaLife Suplementos"
    },
    contraindications: "Hipersensibilidade à vitamina C",
    sideEffects: "Raros: distúrbios gastrointestinais em doses elevadas",
    dosage: "Adultos: 1 cápsula ao dia, preferencialmente após as refeições"
  },
  {
    id: 3,
    name: "Protetor Solar Facial FPS 60 - 50ml",
    brand: "SunCare",
    sku: "SUN-FPS60-50",
    category: "Beleza",
    categorySlug: "beleza",
    price: 34.90,
    originalPrice: 49.90,
    shortDescription: "Proteção máxima contra raios UV",
    description: "Protetor solar facial com FPS 60, oferece proteção máxima contra raios UVA e UVB. Fórmula não oleosa, resistente à água e ao suor, ideal para uso diário. Adequado para todos os tipos de pele.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop"
    ],
    stock: 25,
    rating: 4.7,
    reviewCount: 156,
    isNew: false,
    isBestSeller: true,
    installments: { count: 3, value: 11.63 },
    variants: [
      { id: 1, name: "50ml", price: 34.90, stock: 25 },
      { id: 2, name: "100ml", price: 59.90, stock: 15 }
    ],
    specifications: {
      "FPS": "60",
      "Proteção": "UVA e UVB",
      "Tipo": "Facial",
      "Volume": "50ml",
      "Resistente à água": "Sim"
    },
    contraindications: "Hipersensibilidade aos componentes da fórmula",
    sideEffects: "Raros: irritação cutânea em peles sensíveis",
    dosage: "Aplicar generosamente 30 minutos antes da exposição solar. Reaplicar a cada 2 horas"
  },
  {
    id: 4,
    name: "Dipirona 500mg - 10ml Gotas",
    brand: "Medley",
    sku: "DIP-500-10ML",
    category: "Medicamentos",
    categorySlug: "medicamentos",
    price: 7.90,
    originalPrice: 12.90,
    shortDescription: "Analgésico e antitérmico eficaz",
    description: "Dipirona sódica 500mg/ml em solução oral. Analgésico e antitérmico de ação rápida para alívio de dores e redução da febre. Fórmula em gotas para dosagem precisa.",
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"
    ],
    stock: 40,
    rating: 4.6,
    reviewCount: 203,
    isNew: false,
    isBestSeller: false,
    installments: { count: 2, value: 3.95 },
    variants: [
      { id: 1, name: "10ml Gotas", price: 7.90, stock: 40 },
      { id: 2, name: "20ml Gotas", price: 13.90, stock: 25 }
    ],
    specifications: {
      "Princípio Ativo": "Dipirona Sódica 500mg/ml",
      "Forma Farmacêutica": "Solução oral (gotas)",
      "Volume": "10ml",
      "Registro MS": "1.0000.0001",
      "Fabricante": "Medley Farmacêutica"
    },
    contraindications: "Hipersensibilidade à dipirona, porfiria, deficiência da G6PD",
    sideEffects: "Raros: reações alérgicas, agranulocitose",
    dosage: "Adultos: 20 a 40 gotas, 3 a 4 vezes ao dia"
  },
  {
    id: 5,
    name: "Ômega 3 1000mg - 60 Cápsulas",
    brand: "NutriMax",
    sku: "OME-1000-60",
    category: "Suplementos",
    categorySlug: "suplementos",
    price: 39.90,
    originalPrice: 58.90,
    shortDescription: "Suplemento para saúde cardiovascular",
    description: "Ômega 3 concentrado 1000mg, rico em EPA e DHA. Essencial para a saúde cardiovascular, cerebral e ocular. Óleo de peixe purificado de alta qualidade, livre de metais pesados.",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop"
    ],
    stock: 20,
    rating: 4.8,
    reviewCount: 94,
    isNew: true,
    isBestSeller: true,
    installments: { count: 4, value: 9.98 },
    variants: [
      { id: 1, name: "60 Cápsulas", price: 39.90, stock: 20 },
      { id: 2, name: "120 Cápsulas", price: 69.90, stock: 12 }
    ],
    specifications: {
      "Princípio Ativo": "Óleo de Peixe 1000mg",
      "EPA": "180mg",
      "DHA": "120mg",
      "Quantidade": "60 cápsulas",
      "Registro ANVISA": "6.0000.0001"
    },
    contraindications: "Hipersensibilidade aos componentes, uso de anticoagulantes",
    sideEffects: "Raros: distúrbios gastrointestinais, sabor residual",
    dosage: "Adultos: 1 a 2 cápsulas ao dia, preferencialmente com as refeições"
  },
  {
    id: 6,
    name: "Shampoo Anticaspa 400ml",
    brand: "Clear",
    sku: "SHA-ANTI-400",
    category: "Higiene",
    categorySlug: "higiene",
    price: 16.90,
    originalPrice: 24.90,
    shortDescription: "Tratamento eficaz contra caspa",
    description: "Shampoo anticaspa com fórmula avançada que combate a caspa desde a primeira aplicação. Contém zinco piritiona e ingredientes hidratantes que deixam o cabelo limpo, macio e livre de caspa.",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
    ],
    stock: 35,
    rating: 4.5,
    reviewCount: 178,
    isNew: false,
    isBestSeller: false,
    installments: { count: 2, value: 8.45 },
    variants: [
      { id: 1, name: "400ml", price: 16.90, stock: 35 },
      { id: 2, name: "200ml", price: 9.90, stock: 50 }
    ],
    specifications: {
      "Princípio Ativo": "Zinco Piritiona 1%",
      "Tipo": "Shampoo Anticaspa",
      "Volume": "400ml",
      "pH": "5.5 - 6.5",
      "Indicação": "Todos os tipos de cabelo"
    },
    contraindications: "Hipersensibilidade aos componentes",
    sideEffects: "Raros: irritação do couro cabeludo",
    dosage: "Aplicar no cabelo molhado, massagear e enxaguar. Usar 2-3 vezes por semana"
  },
  {
    id: 7,
    name: "Multivitamínico Completo - 60 Comprimidos",
    brand: "Centrum",
    sku: "MUL-COMP-60",
    category: "Vitaminas",
    categorySlug: "vitaminas",
    price: 28.90,
    originalPrice: 42.90,
    shortDescription: "Complexo vitamínico completo",
    description: "Multivitamínico completo com 13 vitaminas e 8 minerais essenciais. Fórmula balanceada para suprir as necessidades diárias de nutrientes, aumentar a energia e fortalecer o sistema imunológico.",
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop"
    ],
    stock: 15,
    rating: 4.7,
    reviewCount: 142,
    isNew: false,
    isBestSeller: true,
    installments: { count: 3, value: 9.63 },
    variants: [
      { id: 1, name: "60 Comprimidos", price: 28.90, stock: 15 },
      { id: 2, name: "30 Comprimidos", price: 18.90, stock: 25 }
    ],
    specifications: {
      "Vitaminas": "A, C, D, E, K, B1, B2, B6, B12, Ácido Fólico, Niacina, Biotina, Ácido Pantotênico",
      "Minerais": "Cálcio, Ferro, Zinco, Magnésio, Manganês, Cobre, Cromo, Selênio",
      "Quantidade": "60 comprimidos",
      "Registro ANVISA": "6.0000.0002"
    },
    contraindications: "Hipersensibilidade aos componentes",
    sideEffects: "Raros: distúrbios gastrointestinais",
    dosage: "Adultos: 1 comprimido ao dia, preferencialmente após o café da manhã"
  },
  {
    id: 8,
    name: "Hidratante Facial Nivea 100ml",
    brand: "Nivea",
    sku: "HID-FAC-100",
    category: "Beleza",
    categorySlug: "beleza",
    price: 25.90,
    originalPrice: 38.90,
    shortDescription: "Hidratação profunda para todos os tipos de pele",
    description: "Hidratante facial com fórmula enriquecida com vitamina E e ingredientes naturais. Proporciona hidratação profunda por 24 horas, deixando a pele macia, suave e protegida. Adequado para todos os tipos de pele.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop"
    ],
    stock: 28,
    rating: 4.9,
    reviewCount: 267,
    isNew: true,
    isBestSeller: true,
    installments: { count: 3, value: 8.63 },
    variants: [
      { id: 1, name: "100ml", price: 25.90, stock: 28 },
      { id: 2, name: "50ml", price: 16.90, stock: 40 }
    ],
    specifications: {
      "Tipo": "Hidratante Facial",
      "Volume": "100ml",
      "Ingredientes Principais": "Vitamina E, Glicerina, Ácido Hialurônico",
      "Indicação": "Todos os tipos de pele",
      "Testado Dermatologicamente": "Sim"
    },
    contraindications: "Hipersensibilidade aos componentes",
    sideEffects: "Raros: irritação cutânea em peles muito sensíveis",
    dosage: "Aplicar no rosto limpo, massageando suavemente. Usar pela manhã e à noite"
  }
];