import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductCard } from '../../components/ui/ProductCard';
import { Loading } from '../../components/common/Loading';
import { products } from '../../data/products';
import './Products.css';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados dos filtros
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    priceRange: searchParams.get('priceRange') || '',
    rating: searchParams.get('rating') || '',
    availability: searchParams.get('availability') || '',
    search: searchParams.get('search') || ''
  });
  
  // Estados da interface
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const itemsPerPage = 12;

  // Simular carregamento
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Atualizar URL quando filtros mudarem
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [filters, sortBy, setSearchParams]);

  // Obter categorias únicas
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.map(cat => ({
      name: cat,
      count: products.filter(p => p.category === cat).length
    }));
  }, []);

  // Obter marcas únicas
  const brands = useMemo(() => {
    const brandsSet = [...new Set(products.map(p => p.brand))];
    return brandsSet.map(brand => ({
      name: brand,
      count: products.filter(p => p.brand === brand).length
    }));
  }, []);

  // Faixas de preço
  const priceRanges = [
    { id: '0-20', label: 'Até R\$ 20', min: 0, max: 20 },
    { id: '20-50', label: 'R\$ 20 - R\$ 50', min: 20, max: 50 },
    { id: '50-100', label: 'R\$ 50 - R\$ 100', min: 50, max: 100 },
    { id: '100-200', label: 'R\$ 100 - R\$ 200', min: 100, max: 200 },
    { id: '200+', label: 'Acima de R\$ 200', min: 200, max: Infinity }
  ];

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filtro por marca
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Filtro por avaliação
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Filtro por disponibilidade
    if (filters.availability === 'in-stock') {
      filtered = filtered.filter(p => p.stock > 0);
    } else if (filters.availability === 'on-sale') {
      filtered = filtered.filter(p => p.originalPrice && p.originalPrice > p.price);
    } else if (filters.availability === 'new') {
      filtered = filtered.filter(p => p.isNew);
    }

    // Filtro por busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [products, filters, priceRanges]);

  // Ordenar produtos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.isNew - a.isNew);
      case 'bestseller':
        return sorted.sort((a, b) => b.isBestSeller - a.isBestSeller);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Paginação
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Atualizar filtro
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Limpar filtros
  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: '',
      rating: '',
      availability: '',
      search: ''
    });
    setSortBy('relevance');
    setCurrentPage(1);
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos', active: true }
  ];

  if (filters.category) {
    breadcrumbItems.splice(-1, 0, {
      label: filters.category,
      href: `/produtos?category=${filters.category}`
    });
  }

  return (
    <Layout>
      <div className="products-page">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Cabeçalho */}
          <div className="products-page__header">
            <div className="products-page__title-section">
              <h1 className="products-page__title">
                {filters.category ? `${filters.category}` : 'Todos os Produtos'}
              </h1>
              <p className="products-page__subtitle">
                {loading ? 'Carregando...' : `${sortedProducts.length} produtos encontrados`}
              </p>
            </div>

            {/* Controles do Mobile */}
            <div className="products-page__mobile-controls">
              <button 
                className="products-page__filter-toggle"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <span className="icon">🔍</span>
                Filtros
              </button>
            </div>
          </div>

          <div className="products-page__content">
            {/* Sidebar de Filtros */}
            <aside className={`products-page__sidebar ${mobileFiltersOpen ? 'products-page__sidebar--open' : ''}`}>
              <div className="products-page__sidebar-header">
                <h3 className="products-page__sidebar-title">
                  <span className="icon">🔧</span>
                  Filtros
                </h3>
                <button 
                  className="products-page__clear-filters"
                  onClick={clearFilters}
                >
                  Limpar Filtros
                </button>
                <button 
                  className="products-page__close-sidebar"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="products-page__filters">
                {/* Busca */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Buscar</h4>
                  <div className="filter-group__content">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Categorias */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Categorias</h4>
                  <div className="filter-group__content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ''}
                        onChange={(e) => updateFilter('category', e.target.value)}
                      />
                      <span className="filter-option__label">
                        Todas as categorias
                        <span className="filter-option__count">({products.length})</span>
                      </span>
                    </label>
                    {categories.map(category => (
                      <label key={category.name} className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value={category.name}
                          checked={filters.category === category.name}
                          onChange={(e) => updateFilter('category', e.target.value)}
                        />
                        <span className="filter-option__label">
                          {category.name}
                          <span className="filter-option__count">({category.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marcas */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Marcas</h4>
                  <div className="filter-group__content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="brand"
                        value=""
                        checked={filters.brand === ''}
                        onChange={(e) => updateFilter('brand', e.target.value)}
                      />
                      <span className="filter-option__label">
                        Todas as marcas
                      </span>
                    </label>
                    {brands.map(brand => (
                      <label key={brand.name} className="filter-option">
                        <input
                          type="radio"
                          name="brand"
                          value={brand.name}
                          checked={filters.brand === brand.name}
                          onChange={(e) => updateFilter('brand', e.target.value)}
                        />
                        <span className="filter-option__label">
                          {brand.name}
                          <span className="filter-option__count">({brand.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Faixa de Preço */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Preço</h4>
                  <div className="filter-group__content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="priceRange"
                        value=""
                        checked={filters.priceRange === ''}
                        onChange={(e) => updateFilter('priceRange', e.target.value)}
                      />
                      <span className="filter-option__label">Qualquer preço</span>
                    </label>
                    {priceRanges.map(range => (
                      <label key={range.id} className="filter-option">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.id}
                          checked={filters.priceRange === range.id}
                          onChange={(e) => updateFilter('priceRange', e.target.value)}
                        />
                        <span className="filter-option__label">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Avaliação */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Avaliação</h4>
                  <div className="filter-group__content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="rating"
                        value=""
                        checked={filters.rating === ''}
                        onChange={(e) => updateFilter('rating', e.target.value)}
                      />
                      <span className="filter-option__label">Qualquer avaliação</span>
                    </label>
                    {[4.5, 4.0, 3.5, 3.0].map(rating => (
                      <label key={rating} className="filter-option">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating.toString()}
                          onChange={(e) => updateFilter('rating', e.target.value)}
                        />
                        <span className="filter-option__label">
                          <span className="rating-stars">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>
                                ★
                              </span>
                            ))}
                          </span>
                          {rating}+ estrelas
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Disponibilidade */}
                <div className="filter-group">
                  <h4 className="filter-group__title">Disponibilidade</h4>
                  <div className="filter-group__content">
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="availability"
                        value=""
                        checked={filters.availability === ''}
                        onChange={(e) => updateFilter('availability', e.target.value)}
                      />
                      <span className="filter-option__label">Todos os produtos</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="availability"
                        value="in-stock"
                        checked={filters.availability === 'in-stock'}
                        onChange={(e) => updateFilter('availability', e.target.value)}
                      />
                      <span className="filter-option__label">Em estoque</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="availability"
                        value="on-sale"
                        checked={filters.availability === 'on-sale'}
                        onChange={(e) => updateFilter('availability', e.target.value)}
                      />
                      <span className="filter-option__label">Em promoção</span>
                    </label>
                    <label className="filter-option">
                      <input
                        type="radio"
                        name="availability"
                        value="new"
                        checked={filters.availability === 'new'}
                        onChange={(e) => updateFilter('availability', e.target.value)}
                      />
                      <span className="filter-option__label">Novidades</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="products-page__main">
              {/* Barra de Ferramentas */}
              <div className="products-page__toolbar">
                <div className="products-page__results-info">
                  {!loading && (
                    <span className="products-page__results-count">
                      Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedProducts.length)} de {sortedProducts.length} produtos
                    </span>
                  )}
                </div>

                <div className="products-page__toolbar-controls">
                  {/* Ordenação */}
                  <div className="products-page__sort">
                    <label htmlFor="sort" className="products-page__sort-label">
                      Ordenar por:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="products-page__sort-select"
                    >
                      <option value="relevance">Relevância</option>
                      <option value="name">Nome A-Z</option>
                      <option value="price-low">Menor preço</option>
                      <option value="price-high">Maior preço</option>
                      <option value="rating">Melhor avaliação</option>
                      <option value="newest">Mais novos</option>
                      <option value="bestseller">Mais vendidos</option>
                    </select>
                  </div>

                  {/* Modo de Visualização */}
                  <div className="products-page__view-mode">
                    <button
                      className={`products-page__view-button ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Visualização em grade"
                    >
                      ⊞
                    </button>
                    <button
                      className={`products-page__view-button ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      title="Visualização em lista"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de Produtos */}
              {loading ? (
                <div className="products-page__loading">
                  <Loading type="skeleton" />
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className={`products-page__grid products-page__grid--${viewMode}`}>
                    {paginatedProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {/* Paginação */}
                  {totalPages > 1 && (
                    <div className="products-page__pagination">
                      <button
                        className="products-page__page-button"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        ‹ Anterior
                      </button>

                      <div className="products-page__page-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            className={`products-page__page-number ${
                              page === currentPage ? 'active' : ''
                            }`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        className="products-page__page-button"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Próxima ›
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="products-page__empty">
                  <div className="products-page__empty-icon">🔍</div>
                  <h3 className="products-page__empty-title">
                    Nenhum produto encontrado
                  </h3>
                  <p className="products-page__empty-message">
                    Tente ajustar os filtros ou fazer uma nova busca.
                  </p>
                  <button 
                    className="products-page__clear-filters-button"
                    onClick={clearFilters}
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {mobileFiltersOpen && (
        <div 
          className="products-page__overlay"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
    </Layout>
  );
};

export default Products;