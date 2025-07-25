import React, { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState('medicamentos');

  // Estados para navegação mobile hierárquica
  const [mobileMenuView, setMobileMenuView] = useState('main'); // 'main' ou 'subcategory'
  const [selectedMobileCategory, setSelectedMobileCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null); // Para terceira categoria

  const { items, itemCount, total, formatPrice, removeFromCart, updateQuantity } = useCart();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset para view principal quando fechar
    if (isMobileMenuOpen) {
      setMobileMenuView('main');
      setSelectedMobileCategory(null);
      setExpandedSubcategory(null);
    }
  };

  // Navegar para subcategorias no mobile
  const handleMobileCategoryClick = (categoryKey) => {
    setSelectedMobileCategory(categoryKey);
    setMobileMenuView('subcategory');
    setExpandedSubcategory(null); // Reset subcategoria expandida
  };

  // Voltar para categorias principais no mobile
  const handleMobileBackToMain = () => {
    setMobileMenuView('main');
    setSelectedMobileCategory(null);
    setExpandedSubcategory(null);
  };

  // Toggle terceira categoria (expandir/colapsar)
  const handleSubcategoryClick = (subcategoryIndex) => {
    if (expandedSubcategory === subcategoryIndex) {
      setExpandedSubcategory(null); // Colapsar se já estiver expandido
    } else {
      setExpandedSubcategory(subcategoryIndex); // Expandir nova subcategoria
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Categorias principais
  const mainCategories = [
    { name: 'Medicamentos', href: '#medicamentos' },
    { name: 'Vitaminas', href: '#vitaminas' },
    { name: 'Beleza', href: '#beleza' },
    { name: 'Higiene', href: '#higiene' },
    { name: 'Suplementos', href: '#suplementos' }
  ];

  // Estrutura completa de categorias com terceira categoria
  const categoriesData = {
    medicamentos: {
      title: '💊 Medicamentos',
      icon: '💊',
      subcategories: [
        {
          title: 'Dor e Febre',
          items: ['Paracetamol', 'Ibuprofeno', 'Aspirina', 'Dipirona', 'Nimesulida'],
          thirdLevel: [
            { name: 'Paracetamol', items: ['500mg', '750mg', 'Gotas', 'Xarope'] },
            { name: 'Ibuprofeno', items: ['400mg', '600mg', 'Gel', 'Suspensão'] },
            { name: 'Aspirina', items: ['100mg', '500mg', 'Efervescente', 'Prevent'] },
            { name: 'Dipirona', items: ['500mg', 'Gotas', 'Ampola', 'Sódica'] },
            { name: 'Nimesulida', items: ['100mg', 'Gotas', 'Gel', 'Granulado'] }
          ]
        },
        {
          title: 'Digestivos',
          items: ['Antiácidos', 'Probióticos', 'Laxantes', 'Antidiarreicos', 'Enzimas'],
          thirdLevel: [
            { name: 'Antiácidos', items: ['Omeprazol', 'Pantoprazol', 'Esomeprazol', 'Lansoprazol'] },
            { name: 'Probióticos', items: ['Lactobacillus', 'Bifidobacterium', 'Floratil', 'Kefir'] },
            { name: 'Laxantes', items: ['Lactulose', 'Bisacodil', 'Docusato', 'Psyllium'] },
            { name: 'Antidiarreicos', items: ['Loperamida', 'Racecadotrila', 'Floratil', 'Smecta'] },
            { name: 'Enzimas', items: ['Pancreatina', 'Bromelina', 'Papaína', 'Lactase'] }
          ]
        },
        {
          title: 'Respiratórios',
          items: ['Xaropes', 'Descongestionantes', 'Antialérgicos', 'Broncodilatadores'],
          thirdLevel: [
            { name: 'Xaropes', items: ['Expectorante', 'Antitussígeno', 'Mel', 'Natural'] },
            { name: 'Descongestionantes', items: ['Spray Nasal', 'Gotas', 'Comprimidos', 'Inalação'] },
            { name: 'Antialérgicos', items: ['Loratadina', 'Cetirizina', 'Desloratadina', 'Fexofenadina'] },
            { name: 'Broncodilatadores', items: ['Salbutamol', 'Fenoterol', 'Formoterol', 'Budesonida'] }
          ]
        },
        {
          title: 'Antibióticos',
          items: ['Amoxicilina', 'Azitromicina', 'Cefalexina', 'Ciprofloxacino'],
          thirdLevel: [
            { name: 'Amoxicilina', items: ['500mg', '875mg', 'Suspensão', 'Clavulanato'] },
            { name: 'Azitromicina', items: ['500mg', 'Suspensão', 'Comprimidos', 'Pó'] },
            { name: 'Cefalexina', items: ['500mg', 'Suspensão', 'Cápsulas', 'Comprimidos'] },
            { name: 'Ciprofloxacino', items: ['500mg', 'Gotas', 'Pomada', 'Injetável'] }
          ]
        }
      ],
      featured: [
        {
          name: 'Paracetamol 500mg',
          price: 8.90,
          originalPrice: 15.90,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop'
        },
        {
          name: 'Dipirona Gotas',
          price: 12.50,
          originalPrice: 18.90,
          image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=60&h=60&fit=crop'
        },
        {
          name: 'Ibuprofeno 600mg',
          price: 15.90,
          originalPrice: 22.90,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop'
        }
      ]
    },
    vitaminas: {
      title: '🌿 Vitaminas & Suplementos',
      icon: '🌿',
      subcategories: [
        {
          title: 'Vitaminas',
          items: ['Vitamina C', 'Vitamina D', 'Complexo B', 'Vitamina E', 'Ácido Fólico'],
          thirdLevel: [
            { name: 'Vitamina C', items: ['1000mg', '500mg', 'Efervescente', 'Mastigável'] },
            { name: 'Vitamina D', items: ['1000UI', '2000UI', '5000UI', 'Gotas'] },
            { name: 'Complexo B', items: ['Comprimidos', 'Cápsulas', 'Injetável', 'Sublingual'] },
            { name: 'Vitamina E', items: ['400UI', 'Cápsulas', 'Óleo', 'Natural'] },
            { name: 'Ácido Fólico', items: ['5mg', 'Gestante', 'Comprimidos', 'Metilfolato'] }
          ]
        },
        {
          title: 'Minerais',
          items: ['Cálcio', 'Ferro', 'Zinco', 'Magnésio', 'Selênio'],
          thirdLevel: [
            { name: 'Cálcio', items: ['Carbonato', 'Citrato', 'D3', 'Quelato'] },
            { name: 'Ferro', items: ['Sulfato', 'Quelato', 'Heme', 'Bisglicinato'] },
            { name: 'Zinco', items: ['Quelato', 'Picolinato', 'Gluconato', 'Óxido'] },
            { name: 'Magnésio', items: ['Dimalato', 'Glicina', 'Óxido', 'Cloreto'] },
            { name: 'Selênio', items: ['Metionina', 'Levedura', 'Quelato', 'Orgânico'] }
          ]
        },
        {
          title: 'Ômega',
          items: ['Ômega 3', 'Ômega 6', 'Óleo de Peixe', 'DHA', 'EPA'],
          thirdLevel: [
            { name: 'Ômega 3', items: ['1000mg', '2000mg', 'Concentrado', 'Vegetal'] },
            { name: 'Ômega 6', items: ['Prímula', 'Borragem', 'Cártamo', 'Girassol'] },
            { name: 'Óleo de Peixe', items: ['Salmão', 'Sardinha', 'Bacalhau', 'Krill'] },
            { name: 'DHA', items: ['Infantil', 'Gestante', 'Concentrado', 'Algas'] },
            { name: 'EPA', items: ['Concentrado', 'Puro', 'Combinado', 'Ultra'] }
          ]
        },
        {
          title: 'Multivitamínicos',
          items: ['Adulto', 'Infantil', 'Idoso', 'Gestante', 'Esportista'],
          thirdLevel: [
            { name: 'Adulto', items: ['Homem', 'Mulher', 'Unissex', 'Premium'] },
            { name: 'Infantil', items: ['Gomas', 'Líquido', 'Mastigável', 'Pó'] },
            { name: 'Idoso', items: ['50+', '60+', 'Memória', 'Energia'] },
            { name: 'Gestante', items: ['Pré-natal', 'DHA', 'Ferro', 'Ácido Fólico'] },
            { name: 'Esportista', items: ['Energia', 'Recuperação', 'Performance', 'Resistência'] }
          ]
        }
      ],
      featured: [
        {
          name: 'Vitamina C 1000mg',
          price: 22.90,
          originalPrice: 35.90,
          image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=60&h=60&fit=crop'
        },
        {
          name: 'Ômega 3 Premium',
          price: 39.90,
          originalPrice: 58.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'Multivitamínico',
          price: 28.90,
          originalPrice: 42.90,
          image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=60&h=60&fit=crop'
        }
      ]
    },
    beleza: {
      title: '💄 Beleza & Cuidados',
      icon: '💄',
      subcategories: [
        {
          title: 'Proteção Solar',
          items: ['FPS 30', 'FPS 60', 'Infantil', 'Facial', 'Corporal'],
          thirdLevel: [
            { name: 'FPS 30', items: ['Loção', 'Spray', 'Bastão', 'Gel'] },
            { name: 'FPS 60', items: ['Facial', 'Corporal', 'Sport', 'Resistente'] },
            { name: 'Infantil', items: ['Bebê', 'Criança', 'Hipoalergênico', 'Natural'] },
            { name: 'Facial', items: ['Base', 'Mousse', 'Fluido', 'Toque Seco'] },
            { name: 'Corporal', items: ['Loção', 'Óleo', 'Spray', 'Bastão'] }
          ]
        },
        {
          title: 'Hidratantes',
          items: ['Facial', 'Corporal', 'Mãos', 'Pés', 'Anti-idade'],
          thirdLevel: [
            { name: 'Facial', items: ['Dia', 'Noite', 'Sérum', 'Gel'] },
            { name: 'Corporal', items: ['Loção', 'Creme', 'Óleo', 'Manteiga'] },
            { name: 'Mãos', items: ['Creme', 'Loção', 'Reparador', 'Noturno'] },
            { name: 'Pés', items: ['Creme', 'Esfoliante', 'Reparador', 'Uréia'] },
            { name: 'Anti-idade', items: ['Sérum', 'Creme', 'Contorno', 'Firmador'] }
          ]
        },
        {
          title: 'Maquiagem',
          items: ['Base', 'Batom', 'Rímel', 'Pó Compacto', 'Corretivo'],
          thirdLevel: [
            { name: 'Base', items: ['Líquida', 'Compacta', 'Mousse', 'Stick'] },
            { name: 'Batom', items: ['Matte', 'Cremoso', 'Líquido', 'Gloss'] },
            { name: 'Rímel', items: ['Volume', 'Alongamento', 'Curvatura', 'À Prova D\'água'] },
            { name: 'Pó Compacto', items: ['Translúcido', 'Com Cor', 'Matificante', 'Iluminador'] },
            { name: 'Corretivo', items: ['Líquido', 'Bastão', 'Paleta', 'Concealer'] }
          ]
        },
        {
          title: 'Perfumes',
          items: ['Feminino', 'Masculino', 'Infantil', 'Desodorante Colônia'],
          thirdLevel: [
            { name: 'Feminino', items: ['Floral', 'Frutado', 'Oriental', 'Amadeirado'] },
            { name: 'Masculino', items: ['Amadeirado', 'Cítrico', 'Oriental', 'Aromático'] },
            { name: 'Infantil', items: ['Menina', 'Menino', 'Unissex', 'Suave'] },
            { name: 'Desodorante Colônia', items: ['Feminino', 'Masculino', 'Infantil', 'Unissex'] }
          ]
        }
      ],
      featured: [
        {
          name: 'Protetor Solar FPS 60',
          price: 34.90,
          originalPrice: 49.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        },
        {
          name: 'Hidratante Facial',
          price: 25.90,
          originalPrice: 38.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        },
        {
          name: 'Base Líquida',
          price: 45.90,
          originalPrice: 65.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        }
      ]
    },
    higiene: {
      title: '🧼 Higiene Pessoal',
      icon: '🧼',
      subcategories: [
        {
          title: 'Cabelos',
          items: ['Shampoo', 'Condicionador', 'Máscara', 'Finalizadores', 'Anticaspa'],
          thirdLevel: [
            { name: 'Shampoo', items: ['Anticaspa', 'Hidratante', 'Oleoso', 'Seco'] },
            { name: 'Condicionador', items: ['Hidratante', 'Reparador', 'Leave-in', 'Sem Enxágue'] },
            { name: 'Máscara', items: ['Hidratante', 'Nutritiva', 'Reparadora', 'Reconstrução'] },
            { name: 'Finalizadores', items: ['Creme', 'Óleo', 'Sérum', 'Spray'] },
            { name: 'Anticaspa', items: ['Shampoo', 'Loção', 'Tônico', 'Tratamento'] }
          ]
        },
        {
          title: 'Corpo',
          items: ['Sabonetes', 'Gel de Banho', 'Esfoliantes', 'Óleos Corporais'],
          thirdLevel: [
            { name: 'Sabonetes', items: ['Líquido', 'Barra', 'Íntimo', 'Antibacteriano'] },
            { name: 'Gel de Banho', items: ['Hidratante', 'Relaxante', 'Energizante', 'Perfumado'] },
            { name: 'Esfoliantes', items: ['Corporal', 'Facial', 'Pés', 'Natural'] },
            { name: 'Óleos Corporais', items: ['Hidratante', 'Relaxante', 'Aromático', 'Seco'] }
          ]
        },
        {
          title: 'Bucal',
          items: ['Creme Dental', 'Enxaguante', 'Fio Dental', 'Escova de Dente'],
          thirdLevel: [
            { name: 'Creme Dental', items: ['Branqueador', 'Sensibilidade', 'Total', 'Natural'] },
            { name: 'Enxaguante', items: ['Antisséptico', 'Branqueador', 'Sensibilidade', 'Herbal'] },
            { name: 'Fio Dental', items: ['Encerado', 'Sem Cera', 'Sabor', 'Fita'] },
            { name: 'Escova de Dente', items: ['Macia', 'Média', 'Elétrica', 'Infantil'] }
          ]
        },
        {
          title: 'Desodorantes',
          items: ['Roll-on', 'Aerosol', 'Stick', 'Antitranspirante'],
          thirdLevel: [
            { name: 'Roll-on', items: ['48h', '72h', 'Natural', 'Sem Álcool'] },
            { name: 'Aerosol', items: ['Masculino', 'Feminino', 'Unissex', 'Compacto'] },
            { name: 'Stick', items: ['Sólido', 'Gel', 'Transparente', 'Cremoso'] },
            { name: 'Antitranspirante', items: ['Clinical', 'Extra Seco', 'Noturno', 'Intenso'] }
          ]
        }
      ],
      featured: [
        {
          name: 'Shampoo Anticaspa',
          price: 16.90,
          originalPrice: 24.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        },
        {
          name: 'Sabonete Líquido',
          price: 8.90,
          originalPrice: 12.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        },
        {
          name: 'Creme Dental',
          price: 5.90,
          originalPrice: 8.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        }
      ]
    },
    suplementos: {
      title: '💪 Suplementos',
      icon: '💪',
      subcategories: [
        {
          title: 'Proteínas',
          items: ['Whey Protein', 'Caseína', 'Albumina', 'Proteína Vegetal'],
          thirdLevel: [
            { name: 'Whey Protein', items: ['Concentrado', 'Isolado', 'Hidrolisado', 'Blend'] },
            { name: 'Caseína', items: ['Micelar', 'Hidrolisada', 'Noturna', 'Lenta'] },
            { name: 'Albumina', items: ['Pura', 'Sabor', 'Pasteurizada', 'Natural'] },
            { name: 'Proteína Vegetal', items: ['Ervilha', 'Soja', 'Arroz', 'Hemp'] }
          ]
        },
        {
          title: 'Energéticos',
          items: ['Creatina', 'Cafeína', 'Taurina', 'Guaraná', 'Açaí'],
          thirdLevel: [
            { name: 'Creatina', items: ['Monohidratada', 'Alcalina', 'HCL', 'Micronizada'] },
            { name: 'Cafeína', items: ['Anidra', 'Natural', 'Cápsulas', 'Pó'] },
            { name: 'Taurina', items: ['Pura', 'Combinada', 'Cápsulas', 'Pó'] },
            { name: 'Guaraná', items: ['Extrato', 'Pó', 'Cápsulas', 'Natural'] },
            { name: 'Açaí', items: ['Pó', 'Cápsulas', 'Extrato', 'Liofilizado'] }
          ]
        },
        {
          title: 'Emagrecimento',
          items: ['Termogênicos', 'Bloqueadores', 'Diuréticos', 'Fibras'],
          thirdLevel: [
            { name: 'Termogênicos', items: ['Cafeína', 'Chá Verde', 'Sinefrina', 'Natural'] },
            { name: 'Bloqueadores', items: ['Carboidrato', 'Gordura', 'Açúcar', 'Apetite'] },
            { name: 'Diuréticos', items: ['Natural', 'Chás', 'Cápsulas', 'Hibisco'] },
            { name: 'Fibras', items: ['Psyllium', 'Glucomannan', 'Quitosana', 'Solúveis'] }
          ]
        },
        {
          title: 'Recuperação',
          items: ['BCAA', 'Glutamina', 'Arginina', 'HMB'],
          thirdLevel: [
            { name: 'BCAA', items: ['2:1:1', '4:1:1', '8:1:1', 'Instantâneo'] },
            { name: 'Glutamina', items: ['L-Glutamina', 'Peptídeo', 'Pura', 'Micronizada'] },
            { name: 'Arginina', items: ['L-Arginina', 'AAKG', 'Pura', 'Combinada'] },
            { name: 'HMB', items: ['Cálcio', 'Livre', 'Cápsulas', 'Pó'] }
          ]
        }
      ],
      featured: [
        {
          name: 'Whey Protein 1kg',
          price: 89.90,
          originalPrice: 129.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'Creatina 300g',
          price: 45.90,
          originalPrice: 65.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'BCAA 120 caps',
          price: 35.90,
          originalPrice: 52.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        }
      ]
    }
  };

  const currentCategory = categoriesData[activeMainCategory];
  const selectedCategory = selectedMobileCategory ? categoriesData[selectedMobileCategory] : null;

  return (
    <header className="header">
      {/* ===== LAYOUT DESKTOP (mantido igual) ===== */}
      <div className="header__desktop">
        {/* SEÇÃO SUPERIOR */}
        <div className="header__top">
          <div className="container">
            <div className="header__top-content">
              {/* Logo */}
              <a href="/" className="header__logo">
                <div className="header__logo-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#E53935" />
                    <path d="M20 8c-3 0-5 2-5 5 0 2 1 4 3 5v8c0 1 1 2 2 2s2-1 2-2v-8c2-1 3-3 3-5 0-3-2-5-5-5z" fill="white" />
                    <circle cx="20" cy="30" r="2" fill="white" />
                  </svg>
                </div>
                <div className="header__logo-text">
                  <span className="header__logo-name">Bem Estar</span>
                  <span className="header__logo-tagline">Farmácia</span>
                </div>
              </a>

              {/* Busca Central */}
              <div className="header__search">
                <input
                  type="text"
                  placeholder="Busque por medicamentos, vitaminas, beleza..."
                  className="header__search-input"
                />
                <button className="header__search-button">
                  <span>🔍</span>
                </button>
              </div>

              {/* Ações do Header */}
              <div className="header__actions">
                {/* Carrinho */}
                <div className="header__cart">
                  <button
                    className="header__cart-button"
                    onClick={toggleCart}
                    aria-label="Abrir carrinho"
                  >
                    <span className="header__cart-icon">🛒</span>
                    <div className="header__cart-info">
                      <span className="header__cart-label">Carrinho</span>
                      <span className="header__cart-count-text">
                        {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                      </span>
                    </div>
                    {itemCount > 0 && (
                      <span className="header__cart-badge">{itemCount}</span>
                    )}
                  </button>

                  {/* Dropdown do Carrinho (mantido igual) */}
                  {isCartOpen && (
                    <div className="header__cart-dropdown">
                      <div className="header__cart-header">
                        <h3>Meu Carrinho</h3>
                        <button
                          className="header__cart-close"
                          onClick={toggleCart}
                          aria-label="Fechar carrinho"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="header__cart-items">
                        {items.length === 0 ? (
                          <p className="header__cart-empty">Seu carrinho está vazio</p>
                        ) : (
                          items.map(item => (
                            <div key={item.id} className="header__cart-item">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="header__cart-item-image"
                              />
                              <div className="header__cart-item-info">
                                <h4 className="header__cart-item-title">{item.title}</h4>
                                <p className="header__cart-item-price">
                                  {formatPrice(item.offerPrice)}
                                </p>
                                <div className="header__cart-item-quantity">
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="header__cart-quantity-btn"
                                    aria-label="Diminuir quantidade"
                                  >
                                    -
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="header__cart-quantity-btn"
                                    aria-label="Aumentar quantidade"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="header__cart-item-remove"
                                aria-label="Remover item"
                              >
                                🗑️
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {items.length > 0 && (
                        <div className="header__cart-footer">
                          <div className="header__cart-total">
                            <strong>Total: {formatPrice(total)}</strong>
                          </div>
                          <button className="header__cart-checkout">
                            Finalizar Compra
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO INFERIOR - NAVEGAÇÃO (mantida igual) */}
        <div className="header__bottom">
          <div className="container">
            <div className="header__nav">
              {/* Botão Todas as Categorias */}
              <div className="header__categories">
                <button
                  className={`header__categories-button ${isCategoriesOpen ? 'header__categories-button--active' : ''}`}
                  onClick={toggleCategories}
                  aria-label="Todas as categorias"
                  aria-expanded={isCategoriesOpen}
                >
                  <span className="header__categories-icon">☰</span>
                  <span className="header__categories-text">Todas as Categorias</span>
                  <span className="header__categories-arrow">▼</span>
                </button>

                {/* Dropdown de Categorias - LAYOUT 3 COLUNAS (mantido igual) */}
                {isCategoriesOpen && (
                  <div className="header__categories-dropdown">
                    <div className="header__categories-content">


                      {/* COLUNA 1 - CATEGORIAS PRINCIPAIS */}
                      <div className="header__categories-main">
                        {Object.keys(categoriesData).map((categoryKey) => (
                          <button
                            key={categoryKey}
                            className={`header__main-category ${activeMainCategory === categoryKey ? 'header__main-category--active' : ''
                              }`}
                            onMouseEnter={() => setActiveMainCategory(categoryKey)}
                            onClick={() => setActiveMainCategory(categoryKey)}
                          >
                            <span className="header__main-category-icon">
                              {categoriesData[categoryKey].icon}
                            </span>
                            <span className="header__main-category-text">
                              {categoriesData[categoryKey].title.replace(/^[^\s]+ /, '')}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* COLUNA 2 - SUBCATEGORIAS */}
                      <div className="header__subcategories">
                        <h3 className="header__subcategories-title">
                          {currentCategory.title}
                        </h3>
                        <div className="header__subcategories-list">
                          {currentCategory.subcategories.map((subcat, index) => (
                            <div key={index} className="header__subcategory-group">
                              <h4 className="header__subcategory-title">{subcat.title}</h4>
                              <ul className="header__subcategory-items">
                                {subcat.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <a
                                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="header__subcategory-link"
                                    >
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* COLUNA 3 - PRODUTOS EM DESTAQUE */}
                      <div className="header__featured-products">
                        <h3 className="header__featured-title">
                          Produtos em Destaque
                        </h3>
                        <div className="header__featured-list">
                          {currentCategory.featured.map((product, index) => (
                            <div
                              key={index}
                              className="header__featured-product"
                              onClick={() => console.log('Produto clicado:', product.name)}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="header__featured-image"
                              />
                              <div className="header__featured-info">
                                <h4 className="header__featured-name">{product.name}</h4>
                                <p className="header__featured-price">
                                  {formatPrice(product.price)}
                                  <span className="header__featured-original-price">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Categorias Principais */}
              <nav className="header__main-nav">
                <ul className="header__main-nav-list">
                  {mainCategories.map((category, index) => (
                    <li key={index}>
                      <a href={category.href} className="header__main-nav-link">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Links Adicionais */}
              <div className="header__extra-links">
                <a href="#ofertas" className="header__extra-link header__extra-link--highlight">
                  🔥 Ofertas
                </a>
                <a href="#contato" className="header__extra-link">
                  Contato
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LAYOUT MOBILE ===== */}
      <div className="header__mobile">
        {/* Linha Superior Mobile */}
        <div className="header__mobile-top">
          <div className="container">
            <div className="header__mobile-content">
              {/* Hambúrguer */}
              <button
                className="header__mobile-hamburger"
                onClick={toggleMobileMenu}
                aria-label="Menu de categorias"
              >
                <span className="header__hamburger-icon">☰</span>
              </button>

              {/* Logo Mobile */}
              <a href="/" className="header__mobile-logo">
                <div className="header__mobile-logo-icon">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#E53935" />
                    <path d="M20 8c-3 0-5 2-5 5 0 2 1 4 3 5v8c0 1 1 2 2 2s2-1 2-2v-8c2-1 3-3 3-5 0-3-2-5-5-5z" fill="white" />
                    <circle cx="20" cy="30" r="2" fill="white" />
                  </svg>
                </div>
                <div className="header__mobile-logo-text">
                  <span className="header__mobile-logo-name">Bem Estar</span>
                  <span className="header__mobile-logo-tagline">Farmácia</span>
                </div>
              </a>

              {/* Carrinho Mobile */}
              <div className="header__mobile-cart">
                <button
                  className="header__mobile-cart-button"
                  onClick={toggleCart}
                  aria-label="Abrir carrinho"
                >
                  <span className="header__mobile-cart-icon">🛒</span>
                  {itemCount > 0 && (
                    <span className="header__mobile-cart-badge">{itemCount}</span>
                  )}
                </button>

                {/* Dropdown do Carrinho Mobile (mantido igual) */}
                {isCartOpen && (
                  <div className="header__cart-dropdown">
                    <div className="header__cart-header">
                      <h3>Meu Carrinho</h3>
                      <button
                        className="header__cart-close"
                        onClick={toggleCart}
                        aria-label="Fechar carrinho"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="header__cart-items">
                      {items.length === 0 ? (
                        <p className="header__cart-empty">Seu carrinho está vazio</p>
                      ) : (
                        items.map(item => (
                          <div key={item.id} className="header__cart-item">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="header__cart-item-image"
                            />
                            <div className="header__cart-item-info">
                              <h4 className="header__cart-item-title">{item.title}</h4>
                              <p className="header__cart-item-price">
                                {formatPrice(item.offerPrice)}
                              </p>
                              <div className="header__cart-item-quantity">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="header__cart-quantity-btn"
                                  aria-label="Diminuir quantidade"
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="header__cart-quantity-btn"
                                  aria-label="Aumentar quantidade"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="header__cart-item-remove"
                              aria-label="Remover item"
                            >
                              🗑️
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="header__cart-footer">
                        <div className="header__cart-total">
                          <strong>Total: {formatPrice(total)}</strong>
                        </div>
                        <button className="header__cart-checkout">
                          Finalizar Compra
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Busca Mobile */}
        <div className="header__mobile-search">
          <div className="container">
            <div className="header__mobile-search-container">
              <input
                type="text"
                placeholder="Busque por medicamentos, vitaminas..."
                className="header__mobile-search-input"
              />
              <button className="header__mobile-search-button">
                <span>🔍</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Mobile */}
      <div
        className={`header__mobile-overlay ${isMobileMenuOpen ? 'header__mobile-overlay--show' : ''}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Menu Mobile Hierárquico com Terceira Categoria */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--show' : ''}`}>
        <div className="header__mobile-menu-header">
          {mobileMenuView === 'main' ? (
            <>
              <div className="header__mobile-menu-spacer"></div>
              <h3 className="header__mobile-menu-title">
                <span className="header__mobile-title-icon">📂</span>
                Categorias
              </h3>
              <button
                className="header__mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <button
                className="header__mobile-back-button"
                onClick={handleMobileBackToMain}
                aria-label="Voltar para categorias"
              >
                <span className="header__mobile-back-icon">←</span>
                <span className="header__mobile-back-text">Voltar</span>
              </button>
              <h3 className="header__mobile-menu-title">
                <span className="header__mobile-title-icon">{selectedCategory?.icon}</span>
                {selectedCategory?.title?.replace(/^[^\s]+ /, '')}
              </h3>
              <button
                className="header__mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </>
          )}
        </div>

        <div className="header__mobile-content-area">
          {mobileMenuView === 'main' ? (
            /* VIEW PRINCIPAL - CATEGORIAS PRINCIPAIS */
            <div className="header__mobile-main-categories">
              {Object.keys(categoriesData).map((categoryKey) => (
                <button
                  key={categoryKey}
                  className="header__mobile-main-category"
                  onClick={() => handleMobileCategoryClick(categoryKey)}
                >
                  <div className="header__mobile-category-info">
                    <span className="header__mobile-category-icon">
                      {categoriesData[categoryKey].icon}
                    </span>
                    <span className="header__mobile-category-name">
                      {categoriesData[categoryKey].title.replace(/^[^\s]+ /, '')}
                    </span>
                  </div>
                  <span className="header__mobile-category-arrow">→</span>
                </button>
              ))}
            </div>
          ) : (
            /* VIEW SUBCATEGORIAS COM TERCEIRA CATEGORIA */
            <div className="header__mobile-subcategories">
              {selectedCategory?.subcategories.map((subcat, index) => (
                <div key={index} className="header__mobile-subcategory-group">
                  <button
                    className={`header__mobile-subcategory-header ${expandedSubcategory === index ? 'header__mobile-subcategory-header--expanded' : ''
                      }`}
                    onClick={() => handleSubcategoryClick(index)}
                  >
                    <div className="header__mobile-subcategory-info">
                      <span className="header__mobile-subcategory-icon">📋</span>
                      <span className="header__mobile-subcategory-title">{subcat.title}</span>
                    </div>
                    <span className={`header__mobile-subcategory-toggle ${expandedSubcategory === index ? 'header__mobile-subcategory-toggle--expanded' : ''
                      }`}>
                      ▼
                    </span>
                  </button>

                  {/* Itens da Segunda Categoria */}
                  <div className="header__mobile-subcategory-items">
                    {subcat.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="header__mobile-subcategory-link"
                        onClick={toggleMobileMenu}
                      >
                        <span className="header__mobile-item-icon">•</span>
                        {item}
                      </a>
                    ))}
                  </div>

                  
                </div>
              ))}

              {/* Botão Ver Todos */}
              <div className="header__mobile-view-all">
                <a
                  href={`#${selectedMobileCategory}`}
                  className="header__mobile-view-all-button"
                  onClick={toggleMobileMenu}
                >
                  <span className="header__mobile-view-all-icon">🛍️</span>
                  <div className="header__mobile-view-all-content">
                    <span className="header__mobile-view-all-title">
                      Ver Todos
                    </span>
                    <span className="header__mobile-view-all-subtitle">
                      {selectedCategory?.title?.replace(/^[^\s]+ /, '')}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;