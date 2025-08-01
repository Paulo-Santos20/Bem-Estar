import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import useSearch from '../../../hooks/useSearch';
import './SearchBar.css';

const SearchBar = ({ isExpanded, onToggle, onClose }) => {
  const navigate = useNavigate();
  const { formatPrice } = useCart();
  const searchInputRef = useRef(null);
  
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showResults,
    setShowResults,
    clearSearch,
    totalResults
  } = useSearch();

  // Focar no input quando expandir
  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  // Fechar resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.closest('.search-bar').contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  // Navegar para resultado
  const handleResultClick = (result) => {
    if (result.type === 'product') {
      navigate(`/produto/${result.slug}`);
    } else if (result.type === 'category') {
      navigate(`/produtos?categoria=${encodeURIComponent(result.category)}`);
    } else if (result.type === 'brand') {
      navigate(`/produtos?marca=${encodeURIComponent(result.brand)}`);
    }
    
    setShowResults(false);
    if (onClose) onClose();
  };

  // Buscar ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
      if (onClose) onClose();
    }
  };

  // Calcular desconto
  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || !price || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar produtos, categorias ou marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
            className="search-input"
          />
          
          <div className="search-actions">
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="search-clear"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
            
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  navigate(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
                  setShowResults(false);
                  if (onClose) onClose();
                }
              }}
              className="search-submit"
              aria-label="Buscar"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Loading indicator */}
        {isSearching && (
          <div className="search-loading">
            <div className="search-spinner"></div>
          </div>
        )}
      </div>

      {/* Resultados da busca */}
      {showResults && (
        <div className="search-results">
          <div className="search-results-header">
            <span className="search-results-count">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
            </span>
            {searchTerm && (
              <button
                onClick={() => {
                  navigate(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
                  setShowResults(false);
                  if (onClose) onClose();
                }}
                className="search-view-all"
              >
                Ver todos
              </button>
            )}
          </div>

          <div className="search-results-list">
            {searchResults.slice(0, 8).map((result) => (
              <div
                key={result.id}
                className={`search-result-item search-result-item--${result.type}`}
                onClick={() => handleResultClick(result)}
              >
                {result.type === 'product' && (
                  <>
                    <div className="search-result-image">
                      <img
                        src={result.image}
                        alt={result.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                        }}
                      />
                      {calculateDiscount(result.originalPrice, result.price) > 0 && (
                        <span className="search-result-discount">
                          -{calculateDiscount(result.originalPrice, result.price)}%
                        </span>
                      )}
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-subtitle">{result.subtitle}</div>
                      <div className="search-result-price">
                        {result.originalPrice && result.originalPrice > result.price && (
                          <span className="search-result-original-price">
                            {formatPrice(result.originalPrice)}
                          </span>
                        )}
                        <span className="search-result-current-price">
                          {formatPrice(result.price)}
                        </span>
                      </div>
                      <div className="search-result-rating">
                        <span className="search-result-stars">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`search-result-star ${
                                i < Math.round(result.rating) ? 'filled' : ''
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </span>
                        <span className="search-result-rating-score">
                          ({result.rating?.toFixed(1)})
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {result.type === 'category' && (
                  <>
                    <div className="search-result-icon">
                      📂
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-subtitle">{result.subtitle}</div>
                    </div>
                  </>
                )}

                {result.type === 'brand' && (
                  <>
                    <div className="search-result-icon">
                      🏷️
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-subtitle">{result.subtitle}</div>
                    </div>
                  </>
                )}
              </div>
            ))}

            {searchResults.length === 0 && !isSearching && searchTerm.length >= 2 && (
              <div className="search-no-results">
                <div className="search-no-results-icon">🔍</div>
                <div className="search-no-results-title">Nenhum resultado encontrado</div>
                <div className="search-no-results-subtitle">
                  Tente buscar por outros termos ou categorias
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;