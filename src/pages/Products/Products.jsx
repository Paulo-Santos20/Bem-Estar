// src/pages/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/products';
import './Products.css';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInfo, setSearchInfo] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, formatPrice } = useCart();
  
  const productsPerPage = 12;

  // Função para normalizar texto (remover acentos e converter para minúsculo)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  };

  // Função para calcular relevância da busca
  const calculateRelevance = (product, searchTerm) => {
    if (!searchTerm) return 0;
    
    const normalizedSearchTerm = normalizeText(searchTerm);
    const productName = normalizeText(product.name);
    const productBrand = normalizeText(product.brand);
    const productCategory = normalizeText(product.category);
    const productDescription = normalizeText(product.description);
    
    let relevanceScore = 0;
    
    // Correspondência exata no nome (maior pontuação)
    if (productName === normalizedSearchTerm) {
      relevanceScore += 100;
    }
    // Nome contém o termo completo
    else if (productName.includes(normalizedSearchTerm)) {
      relevanceScore += 80;
    }
    // Nome contém palavras do termo
    else {
      const searchWords = normalizedSearchTerm.split(' ');
      const nameWords = productName.split(' ');
      const matchingWords = searchWords.filter(word => 
        nameWords.some(nameWord => nameWord.includes(word) || word.includes(nameWord))
      );
      relevanceScore += (matchingWords.length / searchWords.length) * 60;
    }
    
    // Correspondência na marca
    if (productBrand.includes(normalizedSearchTerm)) {
      relevanceScore += 40;
    }
    
    // Correspondência na categoria
    if (productCategory.includes(normalizedSearchTerm)) {
      relevanceScore += 30;
    }
    
    // Correspondência na descrição
    if (productDescription.includes(normalizedSearchTerm)) {
      relevanceScore += 20;
    }
    
    // Bonus para produtos em promoção
    if (product.originalPrice && product.originalPrice > product.price) {
      relevanceScore += 5;
    }
    
    // Bonus para produtos bem avaliados
    if (product.rating >= 4.5) {
      relevanceScore += 3;
    }
    
    return relevanceScore;
  };

  // useEffect para capturar parâmetros da URL e aplicar filtros
  useEffect(() => {
    setIsLoading(true);
    
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('busca') || urlParams.get('search');
    const category = urlParams.get('categoria') || urlParams.get('category');
    const brand = urlParams.get('marca') || urlParams.get('brand');
    const filter = urlParams.get('filter');
    
    let filtered = [...products];
    let searchDescription = null;

    if (searchTerm) {
      // Filtrar produtos por termo de busca com pontuação de relevância
      const normalizedSearchTerm = normalizeText(searchTerm);
      
      // Primeiro, filtrar produtos que têm alguma correspondência
      const matchingProducts = products.filter(product => {
        const productName = normalizeText(product.name);
        const productBrand = normalizeText(product.brand);
        const productCategory = normalizeText(product.category);
        const productDescription = normalizeText(product.description);

        return (
          productName.includes(normalizedSearchTerm) ||
          productBrand.includes(normalizedSearchTerm) ||
          productCategory.includes(normalizedSearchTerm) ||
          productDescription.includes(normalizedSearchTerm) ||
          // Busca por palavras individuais
          normalizedSearchTerm.split(' ').some(word => 
            productName.includes(word) || 
            productBrand.includes(word) || 
            productCategory.includes(word)
          )
        );
      });

      // Calcular relevância e ordenar
      const productsWithRelevance = matchingProducts.map(product => ({
        ...product,
        relevanceScore: calculateRelevance(product, searchTerm)
      }));

      // Ordenar por relevância (maior para menor)
      filtered = productsWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore);

      searchDescription = {
        type: 'search',
        term: searchTerm,
        count: filtered.length,
        exactMatches: filtered.filter(p => p.relevanceScore >= 80).length
      };

      // Definir ordenação padrão como relevância para buscas
      setSortBy('relevance');

    } else if (category) {
      // Filtrar por categoria
      filtered = products.filter(product => 
        normalizeText(product.category) === normalizeText(category)
      );

      searchDescription = {
        type: 'category',
        term: category,
        count: filtered.length
      };

    } else if (brand) {
      // Filtrar por marca
      filtered = products.filter(product => 
        normalizeText(product.brand) === normalizeText(brand)
      );

      searchDescription = {
        type: 'brand',
        term: brand,
        count: filtered.length
      };

    } else if (filter) {
      // Filtros especiais
      switch (filter) {
        case 'new':
          filtered = products.filter(product => product.isNew);
          searchDescription = {
            type: 'filter',
            term: 'Novos Produtos',
            count: filtered.length
          };
          break;
        case 'sale':
          filtered = products.filter(product => 
            product.originalPrice && product.originalPrice > product.price
          );
          searchDescription = {
            type: 'filter',
            term: 'Produtos em Promoção',
            count: filtered.length
          };
          break;
        case 'bestseller':
          filtered = products.filter(product => product.isBestSeller);
          searchDescription = {
            type: 'filter',
            term: 'Mais Vendidos',
            count: filtered.length
          };
          break;
        default:
          filtered = products;
      }
    }

    // Aplicar filtros adicionais se existirem
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'promotion':
          filtered = filtered.filter(product => 
            product.originalPrice && product.originalPrice > product.price
          );
          break;
        case 'new':
          filtered = filtered.filter(product => product.isNew);
          break;
        case 'bestseller':
          filtered = filtered.filter(product => product.isBestSeller);
          break;
      }
    }

    // Aplicar filtro de preço
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
    setSearchInfo(searchDescription);
    setCurrentPage(1); // Resetar para primeira página
    
    // Simular loading
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

  }, [location.search, filterBy, priceRange]);

  // Aplicar ordenação
  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // Se há pontuação de relevância, usar ela
          if (a.relevanceScore !== undefined && b.relevanceScore !== undefined) {
            return b.relevanceScore - a.relevanceScore;
          }
          // Caso contrário, ordenar por rating
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
  }, [sortBy]);

  // Calcular produtos da página atual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Função para adicionar ao carrinho
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.name,
      offerPrice: product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  // Função para navegar para produto
  const handleProductClick = (product) => {
    navigate(`/produto/${product.slug}`);
  };

  // Calcular desconto
  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || !price || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Função para limpar filtros
  const clearFilters = () => {
    navigate('/produtos');
    setFilterBy('all');
    setPriceRange([0, 1000]);
    setSortBy('name');
  };

  // Obter categorias únicas
  const categories = [...new Set(products.map(product => product.category))];
  const brands = [...new Set(products.map(product => product.brand))];

  return (
    <div className="products-page">
      <div className="container">
        {/* Breadcrumb e informações de busca */}
        <div className="products-header">
          <nav className="breadcrumb">
            <button onClick={() => navigate('/')} className="breadcrumb-link">
              Início
            </button>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Produtos</span>
          </nav>

          {searchInfo && (
            <div className="search-info">
              <div className="search-info-content">
                <h1 className="search-info-title">
                  {searchInfo.type === 'search' && `Resultados para "${searchInfo.term}"`}
                  {searchInfo.type === 'category' && `Categoria: ${searchInfo.term}`}
                  {searchInfo.type === 'brand' && `Marca: ${searchInfo.term}`}
                  {searchInfo.type === 'filter' && searchInfo.term}
                </h1>
                <p className="search-info-count">
                  {searchInfo.count} produto{searchInfo.count !== 1 ? 's' : ''} encontrado{searchInfo.count !== 1 ? 's' : ''}
                  {searchInfo.exactMatches > 0 && searchInfo.type === 'search' && (
                    <span className="exact-matches">
                      {' '}• {searchInfo.exactMatches} correspondência{searchInfo.exactMatches !== 1 ? 's' : ''} exata{searchInfo.exactMatches !== 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
              
              {(searchInfo.type === 'search' || searchInfo.type === 'category' || searchInfo.type === 'brand') && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  <span className="clear-filters-icon">✕</span>
                  Limpar Filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filtros Mobile - Topo */}
        <div className="mobile-filters-top">
          <button 
            className="mobile-filters-toggle"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="mobile-filters-icon">🔧</span>
            Filtros
            <span className={`mobile-filters-arrow ${showMobileFilters ? 'open' : ''}`}>▼</span>
          </button>
          
          {showMobileFilters && (
            <div className="mobile-filters-dropdown">
              <div className="filters-section">
                {/* Filtros Especiais */}
                <div className="filter-group">
                  <h4 className="filter-group-title">Filtros Rápidos</h4>
                  <div className="filter-options-horizontal">
                    <button
                      className={`filter-option ${filterBy === 'all' ? 'active' : ''}`}
                      onClick={() => setFilterBy('all')}
                    >
                      Todos
                    </button>
                    <button
                      className={`filter-option ${filterBy === 'promotion' ? 'active' : ''}`}
                      onClick={() => setFilterBy('promotion')}
                    >
                      🔥 Promoção
                    </button>
                    <button
                      className={`filter-option ${filterBy === 'new' ? 'active' : ''}`}
                      onClick={() => setFilterBy('new')}
                    >
                      🆕 Novos
                    </button>
                    <button
                      className={`filter-option ${filterBy === 'bestseller' ? 'active' : ''}`}
                      onClick={() => setFilterBy('bestseller')}
                    >
                      ⭐ Mais Vendidos
                    </button>
                  </div>
                </div>

                {/* Filtro de Preço */}
                <div className="filter-group">
                  <h4 className="filter-group-title">Faixa de Preço</h4>
                  <div className="price-range">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="price-slider"
                    />
                    <div className="price-range-display">
                      R\$ 0 - {formatPrice(priceRange[1])}
                    </div>
                  </div>
                </div>

                {/* Categorias */}
                <div className="filter-group">
                  <h4 className="filter-group-title">Categorias</h4>
                  <div className="filter-options-grid">
                    {categories.slice(0, 6).map(category => (
                      <button
                        key={category}
                        className="filter-option"
                        onClick={() => navigate(`/produtos?categoria=${encodeURIComponent(category)}`)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="products-content">
          {/* Sidebar de Filtros - Desktop */}
          <aside className="products-sidebar">
            <div className="filters-section">
              <h3 className="filters-title">Filtros</h3>
              
              {/* Filtro por Categoria */}
              <div className="filter-group">
                <h4 className="filter-group-title">Categorias</h4>
                <div className="filter-options">
                  <button
                    className={`filter-option ${filterBy === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterBy('all')}
                  >
                    Todas as Categorias
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      className="filter-option"
                      onClick={() => navigate(`/produtos?categoria=${encodeURIComponent(category)}`)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por Marca */}
              <div className="filter-group">
                <h4 className="filter-group-title">Marcas</h4>
                <div className="filter-options">
                  {brands.slice(0, 8).map(brand => (
                    <button
                      key={brand}
                      className="filter-option"
                      onClick={() => navigate(`/produtos?marca=${encodeURIComponent(brand)}`)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros Especiais */}
              <div className="filter-group">
                <h4 className="filter-group-title">Filtros Especiais</h4>
                <div className="filter-options">
                  <button
                    className={`filter-option ${filterBy === 'promotion' ? 'active' : ''}`}
                    onClick={() => setFilterBy('promotion')}
                  >
                    🔥 Em Promoção
                  </button>
                  <button
                    className={`filter-option ${filterBy === 'new' ? 'active' : ''}`}
                    onClick={() => setFilterBy('new')}
                  >
                    🆕 Novos Produtos
                  </button>
                  <button
                    className={`filter-option ${filterBy === 'bestseller' ? 'active' : ''}`}
                    onClick={() => setFilterBy('bestseller')}
                  >
                    ⭐ Mais Vendidos
                  </button>
                </div>
              </div>

              {/* Filtro de Preço */}
              <div className="filter-group">
                <h4 className="filter-group-title">Faixa de Preço</h4>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-range-display">
                    R\$ 0 - {formatPrice(priceRange[1])}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Lista de Produtos */}
          <main className="products-main">
            {/* Barra de Ordenação */}
            <div className="products-toolbar">
              <div className="products-count">
                Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} produtos
              </div>
              
              <div className="sort-controls">
                <label htmlFor="sort-select" className="sort-label">
                  Ordenar por:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="relevance">Mais Relevantes</option>
                  <option value="name">Nome A-Z</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliado</option>
                  <option value="newest">Mais Recentes</option>
                </select>
              </div>
            </div>

            {/* Grid de Produtos */}
            {isLoading ? (
              <div className="products-loading">
                <div className="loading-spinner"></div>
                <p>Carregando produtos...</p>
              </div>
            ) : currentProducts.length > 0 ? (
              <div className="products-grid">
                {currentProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`product-card ${product.relevanceScore >= 80 ? 'product-card--high-relevance' : ''}`}
                  >
                    {/* Badges */}
                    <div className="product-badges">
                      {calculateDiscount(product.originalPrice, product.price) > 0 && (
                        <span className="product-badge product-badge--discount">
                          -{calculateDiscount(product.originalPrice, product.price)}%
                        </span>
                      )}
                      {product.isNew && (
                        <span className="product-badge product-badge--new">
                          Novo
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="product-badge product-badge--bestseller">
                          Mais Vendido
                        </span>
                      )}
                    </div>

                    {/* Imagem */}
                    <div 
                      className="product-image-container"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop';
                        }}
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className="product-content">
                      {product.brand && (
                        <div className="product-brand">{product.brand}</div>
                      )}
                      
                      <h3 
                        className="product-name"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="product-rating">
                        <div className="product-stars">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`product-star ${
                                i < Math.round(product.rating) ? 'filled' : ''
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="product-rating-score">
                          ({product.rating.toFixed(1)})
                        </span>
                      </div>
                      
                      <div className="product-pricing">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="product-original-price">
                            De {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        <div className="product-price-row">
                          <span className="product-price">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="product-cart-btn"
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                          >
                            🛒
                          </button>
                        </div>
                      </div>
                      
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="product-savings">
                          Economize {formatPrice(product.originalPrice - product.price)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3 className="no-products-title">Nenhum produto encontrado</h3>
                <p className="no-products-message">
                  {searchInfo?.type === 'search' 
                    ? `Não encontramos produtos para "${searchInfo.term}". Tente buscar por termos mais gerais ou verifique a ortografia.`
                    : 'Tente ajustar os filtros ou buscar por outros termos.'
                  }
                </p>
                <button onClick={clearFilters} className="no-products-btn">
                  Ver Todos os Produtos
                </button>
              </div>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn pagination-btn--prev"
                  aria-label="Página anterior"
                >
                  ← Anterior
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`pagination-number ${
                          currentPage === pageNumber ? 'active' : ''
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn pagination-btn--next"
                  aria-label="Próxima página"
                >
                  Próxima →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;