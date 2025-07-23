import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Buscar produtos...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Produtos de exemplo para sugestões
  const sampleProducts = [
    'Paracetamol 500mg',
    'Dipirona 500mg',
    'Ibuprofeno 600mg',
    'Vitamina C 1g',
    'Vitamina D3',
    'Protetor Solar FPS 60',
    'Shampoo Anticaspa',
    'Creme Hidratante',
    'Termômetro Digital',
    'Medidor de Pressão',
    'Álcool Gel 70%',
    'Máscara Cirúrgica',
    'Fralda Descartável',
    'Suplemento Whey Protein',
    'Ômega 3',
    'Probiótico',
    'Colágeno Hidrolisado',
    'Antisséptico Bucal'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = sampleProducts.filter(product =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch && onSearch(searchTerm);
      setShowSuggestions(false);
      setIsExpanded(false);
      // Aqui você pode redirecionar para página de resultados
      console.log('Buscando por:', searchTerm);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch && onSearch(suggestion);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleSearchIconClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (searchTerm.trim()) {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <div ref={searchRef} className={`search-bar ${isExpanded ? 'search-bar--expanded' : ''} ${className}`}>
      <form onSubmit={handleSubmit} className="search-bar__form">
        <div className="search-bar__input-container">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="search-bar__input"
            onFocus={() => setIsExpanded(true)}
          />
          <button
            type="button"
            className="search-bar__icon"
            onClick={handleSearchIconClick}
            aria-label="Buscar"
          >
            <span className="search-bar__icon-symbol">🔍</span>
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-bar__suggestions">
            <div className="search-bar__suggestions-header">
              <span className="search-bar__suggestions-title">Sugestões</span>
            </div>
            <ul className="search-bar__suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="search-bar__suggestion-item">
                  <button
                    type="button"
                    className="search-bar__suggestion-button"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="search-bar__suggestion-icon">💊</span>
                    <span className="search-bar__suggestion-text">{suggestion}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="search-bar__suggestions-footer">
              <button
                type="submit"
                className="search-bar__view-all"
                onClick={handleSubmit}
              >
                Ver todos os resultados para "{searchTerm}"
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;