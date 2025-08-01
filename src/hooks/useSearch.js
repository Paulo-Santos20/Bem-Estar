import { useState, useEffect, useMemo } from 'react';
import { products } from '../data/products';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Extrair categorias únicas dos produtos
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.filter(Boolean); // Remove valores vazios
  }, []);

  // Extrair marcas únicas dos produtos
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    return uniqueBrands.filter(Boolean); // Remove valores vazios
  }, []);

  // Função para normalizar texto (remover acentos e converter para minúsculo)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  };

  // Função de busca
  const performSearch = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const normalizedSearchTerm = normalizeText(searchTerm);
    const results = [];

    // Buscar em produtos
    const productResults = products.filter(product => {
      const productName = normalizeText(product.name);
      const productBrand = normalizeText(product.brand);
      const productCategory = normalizeText(product.category);
      const productDescription = normalizeText(product.description);

      return (
        productName.includes(normalizedSearchTerm) ||
        productBrand.includes(normalizedSearchTerm) ||
        productCategory.includes(normalizedSearchTerm) ||
        productDescription.includes(normalizedSearchTerm)
      );
    });

    // Adicionar produtos aos resultados
    productResults.forEach(product => {
      results.push({
        type: 'product',
        id: product.id,
        title: product.name,
        subtitle: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        slug: product.slug,
        rating: product.rating
      });
    });

    // Buscar em categorias
    const categoryResults = categories.filter(category => 
      normalizeText(category).includes(normalizedSearchTerm)
    );

    categoryResults.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      results.push({
        type: 'category',
        id: `category-${category}`,
        title: category,
        subtitle: `${categoryProducts.length} produtos`,
        category: category,
        productCount: categoryProducts.length
      });
    });

    // Buscar em marcas
    const brandResults = brands.filter(brand => 
      normalizeText(brand).includes(normalizedSearchTerm)
    );

    brandResults.forEach(brand => {
      const brandProducts = products.filter(p => p.brand === brand);
      results.push({
        type: 'brand',
        id: `brand-${brand}`,
        title: brand,
        subtitle: `${brandProducts.length} produtos`,
        brand: brand,
        productCount: brandProducts.length
      });
    });

    // Ordenar resultados: produtos primeiro, depois categorias, depois marcas
    return results.sort((a, b) => {
      const typeOrder = { product: 1, category: 2, brand: 3 };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  }, [searchTerm, categories, brands]);

  // Atualizar resultados quando o termo de busca mudar
  useEffect(() => {
    setIsSearching(true);
    
    const timeoutId = setTimeout(() => {
      setSearchResults(performSearch);
      setIsSearching(false);
      setShowResults(searchTerm.length >= 2);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [performSearch, searchTerm]);

  // Função para limpar busca
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    setIsSearching(false);
  };

  // Função para buscar por categoria
  const searchByCategory = (category) => {
    setSearchTerm(category);
  };

  // Função para buscar por marca
  const searchByBrand = (brand) => {
    setSearchTerm(brand);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showResults,
    setShowResults,
    clearSearch,
    searchByCategory,
    searchByBrand,
    categories,
    brands,
    totalResults: searchResults.length
  };
};

export default useSearch;