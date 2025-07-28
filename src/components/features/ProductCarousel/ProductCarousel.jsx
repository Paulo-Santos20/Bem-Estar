import React, { useEffect, useState, useRef } from 'react';
import styles from './ProductCarousel.module.css';
import ProductCard from './ProductCard/ProductCard';
import { products } from '../../../data/products';

function getVisibleCount(width) {
  if (width <= 600) return 1;
  if (width <= 1024) return 2;
  return 3;
}

const AUTO_SCROLL_INTERVAL = 3000; // em milissegundos

const ProductCarousel = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount(window.innerWidth));
  const [startIdx, setStartIdx] = useState(0);
  const intervalRef = useRef();

  // Atualiza o número de itens quando a tela muda
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = products.length;

  // Scroll Automático, com looping infinito
  useEffect(() => {
    // Limpa qualquer intervalo antigo
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + visibleCount) % total);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [visibleCount, total]);

  // Determina quais produtos mostrar, usando slice circular
  const currentProducts = [];
  for (let i = 0; i < visibleCount; i++) {
    currentProducts.push(products[(startIdx + i) % total]);
  }

  // Opcional: controles manuais
  const goPrev = () =>
    setStartIdx((prev) => (prev - visibleCount + total) % total);
  const goNext = () =>
    setStartIdx((prev) => (prev + visibleCount) % total);

  return (
    <section className={styles.productCarouselSection}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.sectionTitle}>Destaques</h2>
        <p className={styles.sectionDescription}>
          Produtos em promoção para cuidar da sua saúde e bem-estar
        </p>
      </div>
      <div className={styles.carouselSimpleContainer}>
        <button
          className={styles.carouselButton}
          onClick={goPrev}
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <div className={styles.carouselViewport}>
          {currentProducts.map((product, idx) => (
            <ProductCard key={product.id + '-' + idx} product={product} />
          ))}
        </div>
        <button
          className={styles.carouselButton}
          onClick={goNext}
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;